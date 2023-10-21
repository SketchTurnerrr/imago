import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import type { Metadata } from 'next';
import { Ysabeau } from 'next/font/google';

const ysabeau = Ysabeau({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'covenantly',
  description: 'Місце зустрічі для християн України',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning className={ysabeau.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
