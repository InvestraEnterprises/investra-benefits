import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ success: true, received: body });
  } catch (error) {
    return NextResponse.json({ success: true });
  }
}
