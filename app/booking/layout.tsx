// app/booking/layout.tsx
// Disabled route. Middleware redirects to /. Noindex defense-in-depth.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking — Rush No More RV Resort',
  description: 'Internal booking flow.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: 'https://www.rushnomore.com/' },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
