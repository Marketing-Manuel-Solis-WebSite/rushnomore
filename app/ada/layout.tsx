import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({ title: 'ADA Compliance & Accessibility', description: 'ADA accessibility statement for Rush No More RV Resort. Learn about our commitment to accessibility for all guests.', path: '/ada' });

export default function ADALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
