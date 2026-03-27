import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({ title: 'Legal Notices & Privacy Policy', description: 'Privacy policy, terms of use, and cookie information for Rush No More RV Resort.', path: '/legal' });

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
