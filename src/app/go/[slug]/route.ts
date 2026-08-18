import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'UNKNOWN';

  // Bezbedan privremeni redirect dok baza ne bude aktivna
  return NextResponse.redirect(new URL('/', request.url));
}
