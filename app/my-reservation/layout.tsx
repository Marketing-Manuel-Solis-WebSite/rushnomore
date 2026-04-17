// app/my-reservation/layout.tsx
// Disabled route. Noindex defense-in-depth.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Reservation — Rush No More',
  description: 'Manage your reservation.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: 'https://www.rushnomore.com/' },
};

export default function MyReservationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
