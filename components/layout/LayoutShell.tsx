'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookingBar } from '@/components/layout/BookingBar';
import { AIChatWidget } from '@/components/chat/AIChatWidget';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <main>{children}</main>
      {!isAdmin && (
        <>
          <Footer />
          <BookingBar />
          <AIChatWidget />
        </>
      )}
    </>
  );
}
