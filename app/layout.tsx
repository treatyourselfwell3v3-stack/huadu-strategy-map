import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Huadu Strategy Map',
  description: 'Interactive strategy map built with Next.js + D3'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
