'use client';
import { useState } from 'react';
export default function VerifyClient({ voucher, source }: { voucher: string; source: string }) {
  const [busy, setBusy] = useState(false); const [redeemed, setRedeemed] = useState(false); const [error, setError] = useState('');
  async function redeem() {
    setBusy(true); setError('');
    const res = await fetch('/api/redeem', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ voucher, source }) });
    const data = await res.json().catch(() => ({})); setBusy(false);
    if (!res.ok) { setError(data.error || 'Could not redeem voucher.'); return; }
    setRedeemed(true);
  }
  if (redeemed) return <div className="mt-6 rounded-2xl bg-[#E8F2E9] p-5 text-center"><div className="text-4xl">✓</div><div className="mt-2 text-sm font-extrabold text-[#256B35]">Voucher redeemed</div></div>;
  return <div className="mt-6"><button onClick={redeem} disabled={busy} className="brand-btn w-full">{busy ? 'Confirming…' : 'Confirm & Redeem'}</button>{error && <p className="mt-3 text-center text-sm font-semibold text-red-600">{error}</p>}</div>;
}
