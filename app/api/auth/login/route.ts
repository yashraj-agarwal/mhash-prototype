import { NextResponse } from 'next/server';
import { getPersona, SESSION_COOKIE } from '@/lib/auth/personas';

export async function POST(req: Request) {
  const { userId } = await req.json();
  const persona = getPersona(userId);
  if (!persona) {
    return NextResponse.json({ error: 'Unknown persona' }, { status: 400 });
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
