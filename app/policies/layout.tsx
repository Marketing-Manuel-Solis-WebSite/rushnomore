import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Campground Rules & Cancellation Policies — Rush No More RV Resort',
  description: 'Cancellation policies, check-in/check-out times, pet rules, quiet hours & campground regulations for RV sites, cabins and tent camping at Rush No More near Mount Rushmore. Sturgis Rally reservation policies included.',
  path: '/policies',
  keywords: [
    'rush no more cancellation policy', 'campground rules sturgis sd',
    'rv park cancellation policy', 'sturgis rally cancellation policy',
    'campground check in time', 'rush no more pet policy',
    'black hills campground rules',
  ],
});

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
