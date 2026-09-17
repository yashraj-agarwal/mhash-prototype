import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getPersona, SESSION_COOKIE } from '@/lib/auth/personas';

export async function GET() {
  const jar = await cookies();
  const persona = getPersona(jar.get(SESSION_COOKIE)?.value);
  if (!persona) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: persona });
}
