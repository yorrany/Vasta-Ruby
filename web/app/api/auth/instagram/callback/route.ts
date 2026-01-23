import { NextRequest, NextResponse } from 'next/server';
import { processInstagramCallback } from '@/actions/instagram-auth';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/dashboard?error=instagram_denied', req.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/dashboard?error=no_code', req.url));
  }

  try {
    await processInstagramCallback(code);
    return NextResponse.redirect(new URL('/dashboard?success=instagram_connected', req.url));
  } catch (err) {
    console.error('Instagram Callback Error:', err);
    return NextResponse.redirect(new URL('/dashboard?error=instagram_failed', req.url));
  }
}
