import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Pokušaj upisa u bazu ako je inicijalizovana
    try {
      await prisma.trackingEvent.create({
        data: {
          eventType: body.eventType || 'UNKNOWN',
          offerId: body.offerId || null,
          partnerId: body.partnerId || null,
          source: body.source || 'UNKNOWN'
        }
      });
    } catch (dbError) {
      // Ignoriši grešku baze tokom build-a ili ako tabele još ne postoje
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
