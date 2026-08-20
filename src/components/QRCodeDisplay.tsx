'use client';

import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDisplay({ value, size = 180 }: { value: string; size?: number }) {
  return <QRCodeSVG value={value} size={size} includeMargin bgColor="#ffffff" fgColor="#103B56" />;
}
