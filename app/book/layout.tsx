// app/book/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Stay — Rush No More RV Resort',
  description: 'Reserve your RV site, cabin, or tent camping spot at Rush No More. Real-time availability, instant booking.',
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
