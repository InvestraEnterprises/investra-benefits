import { NextResponse } from 'next/server';
import { EventType } from '@prisma/client';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!Object.values(EventType).includes(body.eventType)) return NextResponse.json({ recorded: false }, { status: 400 });
    await prisma.trackingEvent.create({
      data: {
        eventType: body.eventType,
        source: String(body.source || 'UNKNOWN').slice(0, 200),
        offerId: body.offerId ? String(body.offerId) : null,
        partnerId: body.partnerId ? String(body.partnerId) : null,
      },
    });
    return NextResponse.json({ recorded: true });
  } catch {
    return NextResponse.json({ recorded: false }, { status: 200 });
  }
}
