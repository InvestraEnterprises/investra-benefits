import { NextResponse } from 'next/server';
import { setAdminCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { password?: string } | null;
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || body?.password !== expected) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  setAdminCookie();
  return NextResponse.json({ ok: true });
}
