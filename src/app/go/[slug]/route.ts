import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const url = new URL(request.url);
  const source = url.searchParams.get('source') || 'UNKNOWN';
  const offer = await prisma.offer.findUnique({ where: { slug: params.slug }, select: { id: true, partnerId: true, offerType: true, affiliateUrl: true, active: true } }).catch(() => null);

  if (!offer || !offer.active || offer.offerType !== 'AFFILIATE' || !offer.affiliateUrl) {
    return NextResponse.redirect(new URL(`/offer/${encodeURIComponent(params.slug)}`, request.url));
  }

  try {
    await prisma.trackingEvent.create({ data: { eventType: 'AFFILIATE_CLICK', offerId: offer.id, partnerId: offer.partnerId, source } });
  } catch {
    // Redirect should still work if tracking temporarily fails.
  }

  let destination: URL;
  try {
    destination = new URL(offer.affiliateUrl);
  } catch {
    return NextResponse.redirect(new URL(`/offer/${encodeURIComponent(params.slug)}`, request.url));
  }
  if (!['http:', 'https:'].includes(destination.protocol)) {
    return NextResponse.redirect(new URL(`/offer/${encodeURIComponent(params.slug)}`, request.url));
  }

  return NextResponse.redirect(destination);
}
