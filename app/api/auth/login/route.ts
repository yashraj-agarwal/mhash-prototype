import { NextResponse } from 'next/server';
import { authenticate, SESSION_COOKIE } from '@/lib/auth/personas';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const persona = authenticate(String(email ?? ''), String(password ?? ''));
  if (!persona) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const res = NextResponse.json({ user: persona });
  res.cookies.set(SESSION_COOKIE, persona.id, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
