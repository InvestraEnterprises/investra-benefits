import './globals.css';

export const metadata = {
  title: 'INVESTRA Guest Benefits',
  description: 'Exclusive offers and guest benefits in North Cyprus.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
