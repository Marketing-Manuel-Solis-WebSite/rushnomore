import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({ title: 'Rules & Cancellation Policies', description: 'Cancellation policies for RV sites, cabins, tent camping and Sturgis Rally reservations at Rush No More.', path: '/policies' });

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
