'use client';

import { useEffect } from 'react';

type EventType = 'PAGE_VIEW' | 'OFFER_VIEW' | 'AFFILIATE_CLICK' | 'VOUCHER_VIEW' | 'VOUCHER_REDEEMED';

export default function ClientTracker({
  eventType,
  source,
  offerId,
  partnerId,
}: {
  eventType: EventType;
  source: string;
  offerId?: string;
  partnerId?: string;
}) {
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, source, offerId, partnerId }),
      signal: controller.signal,
      keepalive: true,
    }).catch(() => undefined);
    return () => controller.abort();
  }, [eventType, source, offerId, partnerId]);

  return null;
}
