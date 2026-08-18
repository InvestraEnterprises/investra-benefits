import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'UNKNOWN';

  const offer = await prisma.offer.findUnique({ where: { slug: params.slug } });
  
  if (!offer || !offer.affiliateUrl) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  await prisma.trackingEvent.create({
    data: {
      eventType: 'AFFILIATE_CLICK',
      offerId: offer.id,
      partnerId: offer.partnerId,
      source: source
    }
  });

  return NextResponse.redirect(offer.affiliateUrl);
}
