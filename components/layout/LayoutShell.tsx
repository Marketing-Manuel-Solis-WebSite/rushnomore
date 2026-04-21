'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Below-the-fold / deferred components. SSR is fine — but no need to inline
// them in the initial client chunk, since they render after scroll/idle.
const BookingBar = dynamic(
  () => import('@/components/layout/BookingBar').then(m => m.BookingBar),
  { ssr: false }
);
const AIChatWidget = dynamic(
  () => import('@/components/chat/AIChatWidget').then(m => m.AIChatWidget),
  { ssr: false }
);

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
