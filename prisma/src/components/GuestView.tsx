import prisma from '@/lib/prisma';
import ClientTracker from './ClientTracker';
import Header from './Header';
import OfferCard from './OfferCard';

export default async function GuestView({ source }: { source: string }) {
  const categories = await prisma.category.findMany();
  const offers = await prisma.offer.findMany({
    where: { status: 'ACTIVE' },
    include: { partner: true }
  });

  return (
    <div className="pb-12">
      <ClientTracker eventType="PAGE_VIEW" source={source} />
      <Header />
      
      <div className="px-6 py-10 text-center bg-white border-b border-gray-100 shadow-sm relative z-10">
        <h1 className="text-3xl font-light tracking-tight text-[#103B56] mb-3">
          Discover more.<br/><span className="font-bold text-[#D2B06A]">Pay less.</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-[260px] mx-auto leading-relaxed">
          Exclusive offers and special benefits for our guests in North Cyprus.
        </p>
      </div>

      <div className="px-4 py-6">
        <div className="flex overflow-x-auto hide-scrollbar space-x-3 pb-2">
          <div className="flex-shrink-0 px-5 py-2 bg-[#103B56] text-white rounded-full text-xs font-bold tracking-wide uppercase shadow-md">
            All Offers
          </div>
          {categories.map(c => (
            <div key={c.id} className="flex-shrink-0 px-5 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
              {c.name}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4">
        {offers.map(offer => (
          <OfferCard key={offer.id} offer={offer} source={source} />
        ))}
      </div>
    </div>
  )
}
