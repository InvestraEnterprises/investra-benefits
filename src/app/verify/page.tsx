import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import VerifyClient from '@/components/VerifyClient';
export const dynamic = 'force-dynamic';
export default async function VerifyPage({ searchParams }: { searchParams: { voucher?: string; source?: string } }) {
  const voucher = searchParams.voucher; const source = searchParams.source || 'UNKNOWN'; if (!voucher) redirect('/');
  const offer = await prisma.offer.findFirst({ where: { voucherCode: voucher, active: true }, include: { partner: true } }).catch(() => null);
  if (!offer) return <div className="flex min-h-screen items-center justify-center bg-investra-light p-6"><div className="card max-w-md p-8 text-center"><div className="text-5xl">✕</div><h1 className="serif mt-4 text-3xl text-investra-blue">Invalid voucher</h1><p className="mt-2 text-sm text-investra-muted">This voucher could not be verified.</p></div></div>;
  return <div className="flex min-h-screen items-center justify-center bg-investra-light p-6"><div className="card w-full max-w-md p-8"><img src="/brand/investra-logo.svg" alt="INVESTRA ENTERPRISES LTD" className="mx-auto h-10 w-auto"/><div className="mt-7 rounded-2xl bg-investra-blue p-6 text-center text-white"><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-investra-gold">Valid offer</div><h1 className="serif mt-2 text-4xl">{offer.discount || 'Special Offer'}</h1><div className="mt-2 text-sm font-bold uppercase tracking-widest">{offer.partner.name}</div></div><VerifyClient voucher={voucher} source={source}/><p className="mt-4 text-center text-[11px] leading-5 text-slate-400">Only confirm redemption immediately before the guest receives the discount.</p></div></div>;
}
