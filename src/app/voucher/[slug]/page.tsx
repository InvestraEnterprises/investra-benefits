import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ClientTracker from '@/components/ClientTracker';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export const dynamic = 'force-dynamic';

export default async function VoucherPage({ params, searchParams }: any) {
  const source = searchParams.source || 'UNKNOWN';
  const offer = await prisma.offer.findUnique({
    where: { slug: params.slug },
    include: { partner: true }
  });

  if (!offer || offer.offerType !== 'VOUCHER') return notFound();

  const validationUrl = `https://investra.com/verify?voucher=${offer.voucherCode || offer.id}`;
  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#103B56] flex flex-col items-center p-6 text-center">
      <ClientTracker eventType="VOUCHER_VIEW" source={source} offerId={offer.id} partnerId={offer.partnerId} />
      
      <div className="w-full flex justify-start mb-8 mt-2">
        <Link href={`/offer/${offer.slug}?source=${source}`} className="text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider">
          ← Return to Offer
        </Link>
      </div>

      <div className="w-full max-w-[320px] bg-white rounded-3xl p-8 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-3 bg-[#D2B06A] rounded-t-3xl"></div>
        
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 mb-4">
          Investra Guest Benefit
        </div>

        <h1 className="text-4xl font-black text-[#103B56] mb-1">
          {offer.discount || 'VIP'}
        </h1>
        
        <div className="text-sm font-bold text-[#D2B06A] uppercase tracking-widest mb-6">
          {offer.partner.name}
        </div>

        <p className="text-xs text-gray-500 mb-6 border-t border-b border-dashed border-gray-200 py-4">
          Show this QR code to the partner before payment to apply your discount.
        </p>

        <div className="bg-[#F7F9FA] p-4 rounded-2xl flex justify-center mb-6">
          <QRCodeDisplay value={validationUrl} size={180} />
        </div>

        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          CODE: <span className="font-bold text-[#103B56]">{offer.voucherCode || 'VIP-ACCESS'}</span>
        </div>
        <div className="text-[10px] text-gray-400 mt-3 font-medium uppercase tracking-widest">
          Valid: {currentDate}
        </div>
      </div>
      
      <div className="mt-auto pt-10 pb-6">
        <img 
          src="/1680098193895.jpg" 
          alt="INVESTRA ENTERPRISES LTD" 
          className="h-16 object-contain opacity-90 rounded-md"
        />
      </div>
    </div>
  );
}
