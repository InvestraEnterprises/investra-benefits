import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function POST(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.partnerId || !body?.offerType) return NextResponse.json({ error: 'Title, partner and offer type are required' }, { status: 400 });
  const type = body.offerType === 'VOUCHER' ? 'VOUCHER' : 'AFFILIATE';
  const base = slugify(String(body.title)) || `offer-${Date.now()}`;
  const slug = `${base}-${Date.now().toString(36)}`;
  try {
    const offer = await prisma.offer.create({
      data: {
        slug,
        title: String(body.title),
        description: body.description || null,
        discount: body.discount || null,
        regularPrice: body.regularPrice || null,
        guestPrice: body.guestPrice || null,
        imageUrl: body.imageUrl || null,
        offerType: type,
        affiliateUrl: type === 'AFFILIATE' ? (body.affiliateUrl || null) : null,
        voucherCode: type === 'VOUCHER' ? (body.voucherCode || `INVESTRA-${Date.now()}`) : null,
        partnerId: String(body.partnerId),
        categoryId: body.categoryId || null,
      },
    });
    return NextResponse.json(offer);
  } catch {
    return NextResponse.json({ error: 'Could not create offer. Check the submitted data.' }, { status: 400 });
  }
}
