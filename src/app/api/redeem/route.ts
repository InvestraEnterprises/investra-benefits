import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const body = await request.json(); const voucher = String(body.voucher || ''); const source = String(body.source || 'UNKNOWN').slice(0, 200);
    if (!voucher) return NextResponse.json({ error: 'Voucher code is required' }, { status: 400 });
    const offer = await prisma.offer.findFirst({ where: { voucherCode: voucher, active: true }, select: { id: true, partnerId: true } });
    if (!offer) return NextResponse.json({ error: 'Invalid voucher' }, { status: 404 });
    await prisma.$transaction([
      prisma.voucherRedemption.create({ data: { offerId: offer.id, source } }),
      prisma.trackingEvent.create({ data: { eventType: 'VOUCHER_REDEEMED', offerId: offer.id, partnerId: offer.partnerId, source } }),
    ]);
    return NextResponse.json({ redeemed: true });
  } catch { return NextResponse.json({ error: 'Could not redeem voucher' }, { status: 500 }); }
}
