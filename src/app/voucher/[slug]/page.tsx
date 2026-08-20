import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ClientTracker from '@/components/ClientTracker';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { getSiteUrl } from '@/lib/config';

export const dynamic = 'force-dynamic';

export default async function VoucherPage({ params, searchParams }: { params: { slug: string }; searchParams: { source?: string } }) {
  const source = searchParams?.source || 'UNKNOWN';
  const offer = await prisma.offer.findUnique({ where: { slug: params.slug }, include: { partner: true } }).catch(() => null);
  if (!offer || !offer.active || offer.offerType !== 'VOUCHER') notFound();

  const code = offer.voucherCode || offer.id;
  const validationUrl = `${getSiteUrl()}/verify?voucher=${encodeURIComponent(code)}&source=${encodeURIComponent(source)}`;
  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="flex min-h-screen flex-col items-center bg-investra-blue p-5 text-center">
      <ClientTracker eventType="VOUCHER_VIEW" source={source} offerId={offer.id} partnerId={offer.partnerId} />
      <div className="mb-6 mt-2 w-full max-w-md text-left"><Link href={`/offer/${offer.slug}?source=${encodeURIComponent(source)}`} className="text-xs font-bold uppercase tracking-wider text-white/75">← Return to offer</Link></div>
      <div className="relative w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="absolute left-0 top-0 h-3 w-full rounded-t-[28px] bg-investra-gold" />
        <img src="/brand/investra-logo.svg" alt="INVESTRA ENTERPRISES LTD" className="mx-auto mt-3 h-10 w-auto" />
        <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Guest benefit</div>
        <h1 className="serif mt-2 text-5xl text-investra-blue">{offer.discount || 'Special Offer'}</h1>
        <div className="mt-2 text-sm font-extrabold uppercase tracking-[0.16em] text-investra-gold">{offer.partner.name}</div>
        <p className="mt-6 border-y border-dashed border-slate-200 py-4 text-sm leading-6 text-investra-muted">Show this QR code to the partner before payment to apply your discount.</p>
        <div className="mx-auto mt-6 flex w-fit rounded-2xl bg-investra-light p-4"><QRCodeDisplay value={validationUrl} size={190} /></div>
        <div className="mt-5 text-xs font-mono uppercase tracking-widest text-slate-500">Code: <strong className="text-investra-blue">{code}</strong></div>
        <div className="mt-3 text-[10px] font-medium uppercase tracking-widest text-slate-400">Generated {currentDate}</div>
      </div>
    </div>
  );
}
