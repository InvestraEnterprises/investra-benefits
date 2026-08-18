import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ClientTracker from '@/components/ClientTracker';

export const dynamic = 'force-dynamic';

export default async function OfferPage({ params, searchParams }: any) {
  const source = searchParams.source || 'UNKNOWN';
  const offer = await prisma.offer.findUnique({
    where: { slug: params.slug },
    include: { partner: true, category: true }
  });

  if (!offer) return notFound();

  const isAffiliate = offer.offerType === 'AFFILIATE';
  const actionUrl = isAffiliate 
    ? `/go/${offer.slug}?source=${source}` 
    : `/voucher/${offer.slug}?source=${source}`;

  return (
    <div className="min-h-screen bg-white">
      <ClientTracker eventType="OFFER_VIEW" source={source} offerId={offer.id} partnerId={offer.partnerId} />
      
      <div className="absolute top-4 left-4 z-10">
        <Link href={`/guest/${source !== 'UNKNOWN' ? source : ''}`} className="bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-md text-xs font-bold tracking-wider text-[#103B56] inline-flex items-center uppercase">
           ← Back
        </Link>
      </div>

      <div className="h-72 w-full relative bg-gray-100">
        {offer.imageUrl ? (
          <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#103B56]/5 flex items-center justify-center">
            <span className="text-[#103B56]/30 font-bold text-2xl uppercase tracking-widest">{offer.partner.name}</span>
          </div>
        )}
      </div>

      <div className="p-6 -mt-8 bg-white rounded-t-[32px] relative z-10 min-h-[50vh] flex flex-col shadow-[-0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-[10px] font-bold text-[#D2B06A] uppercase tracking-widest mb-2">{offer.category.name}</div>
            <h1 className="text-2xl font-bold text-[#103B56] leading-tight mb-1">{offer.title}</h1>
            <div className="text-sm text-gray-500 font-medium">by {offer.partner.name}</div>
          </div>
          {offer.discount && (
            <div className="bg-[#D2B06A] text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm whitespace-nowrap ml-4">
              {offer.discount}
            </div>
          )}
        </div>

        {offer.description && (
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">
            {offer.description}
          </p>
        )}

        {(offer.regularPrice || offer.guestPrice) && (
          <div className="bg-[#F7F9FA] p-4 rounded-xl mb-8 flex justify-between items-center border border-gray-100">
            {offer.regularPrice && (
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Regular Price</div>
                <div className="text-lg text-gray-400 line-through">{offer.regularPrice}</div>
              </div>
            )}
            {offer.guestPrice && (
              <div className="text-right">
                <div className="text-[10px] text-[#D2B06A] uppercase tracking-widest font-bold mb-1">Guest Price</div>
                <div className="text-2xl font-bold text-[#103B56]">{offer.guestPrice}</div>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto pt-4">
          <Link href={actionUrl} className="block w-full text-center bg-[#103B56] text-white py-4 rounded-2xl font-bold tracking-wide uppercase shadow-xl shadow-[#103B56]/25 active:scale-[0.98] transition-transform">
            {isAffiliate ? 'Get Offer Online' : 'Get Digital Voucher'}
          </Link>
        </div>
      </div>
    </div>
  );
}
