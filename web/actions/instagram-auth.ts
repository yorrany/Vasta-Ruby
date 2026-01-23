'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { saveInstagramConnection } from '@/lib/instagram-service';

const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const REDIRECT_URI = `${APP_URL}/api/auth/instagram/callback`;

export async function initiateInstagramAuth() {
  if (!INSTAGRAM_CLIENT_ID || !APP_URL) {
    throw new Error('Missing Instagram Configuration');
  }

  const scope = 'user_profile,user_media';
  // State handles CSRF protection usually, but for simplicity here we skip complex state management
  // In production, generate random state, store in cookie, verify in callback
  const state = 'vasta_instagram_connect'; 
  
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code&state=${state}`;

  redirect(authUrl);
}

export async function processInstagramCallback(code: string) {
  if (!INSTAGRAM_CLIENT_ID || !INSTAGRAM_CLIENT_SECRET) {
    throw new Error('Missing Instagram Configuration');
  }

  // 1. Exchange Code for Short-Lived Token
  const form = new FormData();
  form.append('client_id', INSTAGRAM_CLIENT_ID);
  form.append('client_secret', INSTAGRAM_CLIENT_SECRET);
  form.append('grant_type', 'authorization_code');
  form.append('redirect_uri', REDIRECT_URI);
  form.append('code', code);

  const shortRes = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    body: form,
  });

  if (!shortRes.ok) {
    const error = await shortRes.json();
    console.error('Instagram Short Token Error:', error);
    throw new Error('Failed to retrieve Instagram token');
  }

  const shortData = await shortRes.json();
  const shortToken = shortData.access_token;
  const instagramUserId = shortData.user_id;

  // 2. Exchange Short-Lived for Long-Lived Token
  // url: https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={instagram-app-secret}&access_token={short-lived-access-token}
  
  const longUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CLIENT_SECRET}&access_token=${shortToken}`;
  
  const longRes = await fetch(longUrl);
   if (!longRes.ok) {
    const error = await longRes.json();
    console.error('Instagram Long Token Error:', error);
    throw new Error('Failed to exchange for long-lived token');
  }

  const longData = await longRes.json();
  const longToken = longData.access_token;
  const expiresIn = longData.expires_in; // Seconds

  // 3. Get User Profile (Username)
  // We need the username for display
  const userRes = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${longToken}`);
  const userData = await userRes.json();

  // 4. Save to Database
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  await saveInstagramConnection(user.id, {
    access_token: longToken,
    user_id: instagramUserId, // or userData.id, they should match generally but shortData.user_id is the connection ID
    username: userData.username,
    expires_in: expiresIn
  });
  
  return { success: true };
}
