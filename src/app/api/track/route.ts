import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await prisma.trackingEvent.create({
      data: {
        eventType: body.eventType,
        offerId: body.offerId || null,
        partnerId: body.partnerId || null,
        source: body.source || 'UNKNOWN'
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
