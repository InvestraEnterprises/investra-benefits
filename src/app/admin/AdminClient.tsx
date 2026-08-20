'use client';

import { FormEvent, useState } from 'react';
import QRCodeDisplay from '@/components/QRCodeDisplay';

type Item = { id: string; name: string; slug?: string };

type OfferRow = { id: string; slug: string; title: string; discount: string | null; offerType: string; partner: Item; category: Item | null };

type Props = { counts: Record<string, number>; offers: OfferRow[]; partners: Item[]; categories: Item[]; properties: Item[] };

export default function AdminClient({ counts, offers, partners, categories, properties }: Props) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(url: string, body: Record<string, unknown>, form: HTMLFormElement) {
    setBusy(true); setMessage('');
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setMessage(data.error || 'Something went wrong.'); return; }
    setMessage('Saved successfully. Refresh the page to see the new item.'); form.reset();
  }

  async function addPartner(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const f = new FormData(form);
    await submit('/api/admin/partners', { name: f.get('name'), websiteUrl: f.get('websiteUrl'), logoUrl: f.get('logoUrl'), description: f.get('description') }, form);
  }

  async function addOffer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const f = new FormData(form);
    await submit('/api/admin/offers', { title: f.get('title'), description: f.get('description'), discount: f.get('discount'), regularPrice: f.get('regularPrice'), guestPrice: f.get('guestPrice'), imageUrl: f.get('imageUrl'), offerType: f.get('offerType'), affiliateUrl: f.get('affiliateUrl'), voucherCode: f.get('voucherCode'), partnerId: f.get('partnerId'), categoryId: f.get('categoryId') }, form);
  }

  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/admin/login'; }

  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return <main className="min-h-screen bg-investra-light px-5 py-7">
    <div className="mx-auto max-w-6xl">
      <header className="flex items-center justify-between"><img src="/brand/investra-logo.svg" alt="INVESTRA ENTERPRISES LTD" className="h-10 w-auto" /><button onClick={logout} className="rounded-full border bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-investra-blue">Logout</button></header>
      <div className="mt-7"><h1 className="serif text-4xl text-investra-blue">Admin Dashboard</h1>{message && <div className="mt-4 rounded-xl bg-[#E8F2E9] px-4 py-3 text-sm font-semibold text-[#256B35]">{message}</div>}</div>
      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5">{Object.entries(counts).map(([key, value]) => <div className="card p-4" key={key}><div className="text-2xl font-black text-investra-blue">{value}</div><div className="mt-1 text-[10px] font-extrabold uppercase tracking-wider text-investra-muted">{key.replace(/([A-Z])/g, ' $1')}</div></div>)}</div>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <section className="card p-6"><h2 className="serif text-2xl text-investra-blue">Add partner</h2><p className="mt-1 text-xs text-investra-muted">Use a hosted image URL for the partner logo. Direct uploads can be added later with storage.</p><form onSubmit={addPartner} className="mt-5 grid gap-3"><input name="name" className="field" placeholder="Partner name" required /><input name="websiteUrl" className="field" placeholder="Website URL (optional)" /><input name="logoUrl" className="field" placeholder="Logo/image URL (optional)" /><textarea name="description" className="field min-h-24" placeholder="Short description" /><button className="brand-btn" disabled={busy}>Add partner</button></form></section>
        <section className="card p-6"><h2 className="serif text-2xl text-investra-blue">Add offer</h2><form onSubmit={addOffer} className="mt-5 grid gap-3"><input name="title" className="field" placeholder="Offer title" required /><textarea name="description" className="field min-h-20" placeholder="Description" /><select name="partnerId" className="field" required><option value="">Partner</option>{partners.map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}</select><select name="categoryId" className="field"><option value="">Category (optional)</option>{categories.map((c) => <option value={c.id} key={c.id}>{c.name}</option>)}</select><select name="offerType" className="field" defaultValue="AFFILIATE"><option value="AFFILIATE">Affiliate / Online</option><option value="VOUCHER">QR Voucher / Offline</option></select><input name="discount" className="field" placeholder="Discount e.g. 10% OFF" /><div className="grid grid-cols-2 gap-3"><input name="regularPrice" className="field" placeholder="Regular price" /><input name="guestPrice" className="field" placeholder="Guest price" /></div><input name="imageUrl" className="field" placeholder="Offer photo URL (optional)" /><input name="affiliateUrl" className="field" placeholder="Affiliate/partner URL (online offers)" /><input name="voucherCode" className="field" placeholder="Voucher code (offline offers)" /><button className="brand-btn" disabled={busy}>Add offer</button></form></section>
      </div>

      <section className="card mt-7 p-6"><h2 className="serif text-2xl text-investra-blue">Add property / guest QR source</h2><form onSubmit={async (e) => { e.preventDefault(); const form=e.currentTarget; const f=new FormData(form); await submit('/api/admin/properties',{name:f.get('name')},form); }} className="mt-5 flex flex-col gap-3 sm:flex-row"><input name="name" className="field" placeholder="Property name" required/><button className="brand-btn" disabled={busy}>Add property</button></form></section><section className="card mt-7 overflow-hidden"><div className="flex items-center justify-between bg-investra-blue p-5 text-white"><div><h2 className="font-bold">Property QR codes</h2><p className="text-xs text-white/70">QR opens /guest/{'{source}'}</p></div><span className="text-xs font-bold uppercase tracking-wider text-investra-gold">{properties.length} properties</span></div><div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">{properties.map((p) => <div className="rounded-2xl border border-slate-200 p-5" key={p.id}><div className="font-bold text-investra-blue">{p.name}</div><div className="mt-1 break-all text-[11px] text-slate-400">{base}/guest/{p.slug}</div><div className="mt-4 rounded-xl bg-investra-light p-4 text-center"><QRCodeDisplay value={`${base}/guest/${p.slug}`} size={150} /></div></div>)}</div></section>

      <section className="card mt-7 overflow-hidden"><div className="bg-white p-5"><h2 className="serif text-2xl text-investra-blue">Offers</h2></div><div className="divide-y divide-slate-100">{offers.map((offer) => <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between" key={offer.id}><div><div className="font-bold text-investra-blue">{offer.title}</div><div className="text-xs uppercase tracking-wider text-slate-400">{offer.partner.name} · {offer.category?.name || 'Uncategorised'}</div></div><div className="flex items-center gap-2"><span className="gold-pill">{offer.discount || offer.offerType}</span><a className="text-xs font-bold uppercase tracking-wider text-investra-blue underline" href={`/offer/${offer.slug}`} target="_blank">View</a></div></div>)}</div></section>
    </div>
  </main>;
}
