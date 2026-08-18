'use client';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDisplay({ value, size = 200 }: { value: string, size?: number }) {
  return <QRCodeSVG value={value} size={size} />;
}
