// app/book/layout.tsx
// This route is disabled via middleware (redirects to /). Kept noindex as
// defense-in-depth in case middleware changes.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Stay — Rush No More RV Resort',
  description: 'Reserve your RV site, cabin, or tent camping spot at Rush No More.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: 'https://www.rushnomore.com/' },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
