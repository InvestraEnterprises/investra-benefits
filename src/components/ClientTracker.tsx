'use client';
import { useEffect } from 'react';

export default function ClientTracker({ eventType, source, offerId, partnerId }: any) {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      body: JSON.stringify({ eventType, source, offerId, partnerId }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(() => {});
  }, [eventType, source, offerId, partnerId]);
  
  return null;
}
