'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError('');
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (!res.ok) setError('Invalid password.'); else router.push('/admin');
    setBusy(false);
  }

  return <form onSubmit={submit} className="card mx-auto w-full max-w-sm p-7">
    <img src="/brand/investra-logo.svg" alt="INVESTRA ENTERPRISES LTD" className="mx-auto h-12 w-auto" />
    <h1 className="serif mt-8 text-center text-3xl text-investra-blue">Admin access</h1>
    <input className="field mt-6" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" required />
    {error && <p className="mt-3 text-center text-sm font-semibold text-red-600">{error}</p>}
    <button className="brand-btn mt-5 w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
  </form>;
}
