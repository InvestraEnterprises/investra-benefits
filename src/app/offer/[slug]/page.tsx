import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ClientTracker from '@/components/ClientTracker';

export const dynamic = 'force-dynamic';

export default async function OfferPage({ params, searchParams }: { params: { slug: string }; searchParams: { source?: string } }) {
  const source = searchParams?.source || 'UNKNOWN';
  const offer = await prisma.offer.findUnique({ where: { slug: params.slug }, include: { partner: true, category: true } }).catch(() => null);
  if (!offer || !offer.active) notFound();

  const actionUrl = offer.offerType === 'AFFILIATE'
    ? `/go/${offer.slug}?source=${encodeURIComponent(source)}`
    : `/voucher/${offer.slug}?source=${encodeURIComponent(source)}`;

  return (
    <div className="min-h-screen bg-white">
      <ClientTracker eventType="OFFER_VIEW" source={source} offerId={offer.id} partnerId={offer.partnerId} />
      <div className="absolute left-4 top-4 z-10">
        <Link href={`/guest/${encodeURIComponent(source)}`} className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-investra-blue shadow-md">← Back</Link>
      </div>
      <div className="h-72 w-full bg-investra-light sm:h-96">
        {offer.imageUrl ? <img src={offer.imageUrl} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center bg-investra-blue px-8 text-center"><span className="serif text-3xl italic text-white/90">{offer.partner.name}</span></div>}
      </div>
      <div className="relative z-10 -mt-8 min-h-[52vh] rounded-t-[32px] bg-white p-6 shadow-[-0_-10px_40px_rgba(0,0,0,.05)] sm:p-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-investra-gold">{offer.category?.name || 'Guest Benefit'}</div>
              <h1 className="serif mt-2 text-4xl leading-tight text-investra-blue">{offer.title}</h1>
              <div className="mt-1 text-sm font-medium text-investra-muted">by {offer.partner.name}</div>
            </div>
            {offer.discount && <div className="gold-pill mt-1">{offer.discount}</div>}
          </div>
          {offer.description && <p className="mt-7 leading-7 text-investra-muted">{offer.description}</p>}
          {(offer.regularPrice || offer.guestPrice) && <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-100 bg-investra-light p-5"><div>{offer.regularPrice && <><div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Regular price</div><div className="mt-1 text-lg text-slate-400 line-through">{offer.regularPrice}</div></>}</div>{offer.guestPrice && <div className="text-right"><div className="text-[10px] font-bold uppercase tracking-widest text-investra-gold">Guest price</div><div className="mt-1 text-2xl font-black text-investra-blue">{offer.guestPrice}</div></div>}</div>}
          <Link href={actionUrl} className="brand-btn mt-8 block text-center">{offer.offerType === 'AFFILIATE' ? 'Get Offer Online' : 'Get Digital Voucher'}</Link>
        </div>
      </div>
    </div>
  );
}
