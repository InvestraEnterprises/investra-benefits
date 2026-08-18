import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INVESTRA GUEST BENEFITS",
  description: "Exclusive offers and special benefits for our guests in North Cyprus.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-md mx-auto min-h-screen bg-[#F7F9FA] shadow-2xl relative overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
