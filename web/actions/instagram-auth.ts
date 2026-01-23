'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { saveInstagramConnection } from '@/lib/instagram-service';

const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'; // Fallback safely
const REDIRECT_URI = `${APP_URL}/api/auth/instagram/callback`;

export async function initiateInstagramAuth() {
  if (!INSTAGRAM_CLIENT_ID) {
    console.error('Missing INSTAGRAM_CLIENT_ID');
    throw new Error('Configuração do Instagram ausente (Client ID).');
  }

  const scope = 'user_profile,user_media';
  const state = 'vasta_instagram_connect'; 
  
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code&state=${state}`;

  return authUrl;
}

export async function processInstagramCallback(code: string) {
  if (!INSTAGRAM_CLIENT_ID || !INSTAGRAM_CLIENT_SECRET) {
    throw new Error('Configuração do Instagram ausente.');
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
    throw new Error('Falha ao conectar com Instagram (Token Inválido).');
  }

  const shortData = await shortRes.json();
  const shortToken = shortData.access_token;
  const instagramUserId = shortData.user_id;

  // 2. Exchange Short-Lived for Long-Lived Token
  const longUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CLIENT_SECRET}&access_token=${shortToken}`;
  
  const longRes = await fetch(longUrl);
   if (!longRes.ok) {
    const error = await longRes.json();
    console.error('Instagram Long Token Error:', error);
    throw new Error('Falha ao obter token de longa duração.');
  }

  const longData = await longRes.json();
  const longToken = longData.access_token;
  const expiresIn = longData.expires_in; // Seconds

  // 3. Get User Profile (Username)
  const userRes = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${longToken}`);
  const userData = await userRes.json();

  // 4. Save to Database
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Usuário não autenticado.');
  }

  await saveInstagramConnection(user.id, {
    access_token: longToken,
    user_id: instagramUserId, 
    username: userData.username,
    expires_in: expiresIn
  });
  
  return { success: true };
}
