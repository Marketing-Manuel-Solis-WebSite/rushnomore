// app/thanks/layout.tsx
// This route is disabled via middleware (redirects to /). Kept noindex as
// defense-in-depth in case middleware changes.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You — Rush No More RV Resort',
  description: 'Thank you for contacting Rush No More.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: 'https://www.rushnomore.com/' },
};

export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
