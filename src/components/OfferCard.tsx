import Link from 'next/link';

export default function OfferCard({ offer, source }: { offer: any, source: string }) {
  const isAffiliate = offer.offerType === 'AFFILIATE';
  const targetUrl = `/offer/${offer.slug}?source=${source}`;
    
  return (
    <Link href={targetUrl} className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform">
      <div className="h-36 relative bg-gray-100">
        {offer.imageUrl ? (
          <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#103B56]/5 flex items-center justify-center">
            <span className="text-[#103B56]/40 font-bold uppercase tracking-wider">{offer.partner.name}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-[#D2B06A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {offer.discount || 'SPECIAL'}
        </div>
      </div>
      
      <div className="p-5">
        <div className="text-[10px] font-bold text-[#D2B06A] mb-1 tracking-wider uppercase">
          {offer.partner.name}
        </div>
        <h3 className="text-lg font-bold text-[#103B56] mb-2 leading-tight">
          {offer.title}
        </h3>
        
        <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex flex-col">
            {offer.regularPrice && <span className="text-xs text-gray-400 line-through">{offer.regularPrice}</span>}
            {offer.guestPrice && <span className="text-sm font-bold text-[#103B56]">{offer.guestPrice}</span>}
          </div>
          <div className="text-[#103B56] text-xs font-bold uppercase flex items-center gap-1">
            {isAffiliate ? 'View Offer' : 'View Voucher'} <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
