import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
export const dynamic = 'force-dynamic';
function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
export async function POST(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null); if (!body?.name) return NextResponse.json({ error: 'Property name is required' }, { status: 400 });
  try { const name=String(body.name); const slug=`${slugify(name)}-${Date.now().toString(36)}`; return NextResponse.json(await prisma.property.create({ data: { name, slug } })); }
  catch { return NextResponse.json({ error: 'Could not create property' }, { status: 400 }); }
}
