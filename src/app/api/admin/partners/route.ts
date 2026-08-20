import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.name) return NextResponse.json({ error: 'Partner name is required' }, { status: 400 });
  const partner = await prisma.partner.create({ data: { name: String(body.name), logoUrl: body.logoUrl || null, websiteUrl: body.websiteUrl || null, description: body.description || null } });
  return NextResponse.json(partner);
}
