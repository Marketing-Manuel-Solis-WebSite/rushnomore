import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Campground Rules, Cancellation & Pet Policies — Rush No More RV Resort',
  description: 'Cancellation policies, check-in/check-out times (check-in 2 PM, check-out 11 AM), pet rules, quiet hours, fire rules & campground regulations for RV sites, cabins and tent camping at Rush No More near Mount Rushmore. Sturgis Rally & holiday reservation policies. No wood fires — propane and charcoal only.',
  path: '/policies',
  keywords: [
    'rush no more cancellation policy', 'campground rules sturgis sd',
    'rv park cancellation policy south dakota', 'sturgis rally cancellation policy',
    'campground check in time sturgis', 'rush no more pet policy',
    'black hills campground rules', 'campground quiet hours sturgis',
    'rush no more fire rules', 'campground pet rules black hills',
    'rv park check in check out times', 'campground refund policy south dakota',
    'sturgis rally reservation policy', 'holiday reservation policy campground',
  ],
});

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
