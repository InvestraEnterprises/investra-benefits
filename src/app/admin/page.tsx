import prisma from '@/lib/prisma';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default async function AdminPage() {
  const events = await prisma.trackingEvent.findMany();
  const pageViews = events.filter(e => e.eventType === 'PAGE_VIEW').length;
  const offerViews = events.filter(e => e.eventType === 'OFFER_VIEW').length;
  const affiliateClicks = events.filter(e => e.eventType === 'AFFILIATE_CLICK').length;
  const voucherViews = events.filter(e => e.eventType === 'VOUCHER_VIEW').length;

  const offers = await prisma.offer.findMany({ include: { partner: true } });
  const dummyUrl = "https://investra.com/guest/INVESTRA_VILLA_1";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto space-y-6 pb-12">
        
        <h1 className="text-2xl font-bold text-[#103B56]">Admin Dashboard</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Total Scans" value={pageViews} />
          <StatCard title="Offer Views" value={offerViews} />
          <StatCard title="Link Clicks" value={affiliateClicks} />
          <StatCard title="Vouchers Used" value={voucherViews} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#103B56] mb-2">QR Code Generator</h2>
          <p className="text-xs text-gray-500 mb-5">Print this code for the property.</p>
          <div className="bg-gray-50 p-4 inline-block rounded-xl border border-gray-100 mb-4">
            <QRCodeDisplay value={dummyUrl} size={150} />
          </div>
          <div className="text-[10px] font-mono text-gray-400 break-all bg-gray-50 p-2 rounded">
            {dummyUrl}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#103B56] text-white p-4 font-bold text-sm">Active Offers List</div>
          <div className="divide-y divide-gray-100">
            {offers.map(o => (
              <div key={o.id} className="p-4 flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-[#103B56]">{o.title}</div>
                  <div className="text-[10px] text-gray-500 uppercase">{o.partner.name}</div>
                </div>
                <div className="text-xs bg-[#F7F9FA] text-[#103B56] px-2 py-1 rounded font-bold border border-gray-200">
                  {o.offerType}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string, value: number }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
      <div className="text-3xl font-black text-[#103B56] mb-1">{value}</div>
      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{title}</div>
    </div>
  )
}
