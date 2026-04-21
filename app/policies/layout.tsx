import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Campground Rules & Cancellation Policy | Rush No More',
  description: 'Cancellation policy, check-in 2 PM / check-out 11 AM, pet rules, quiet hours & fire rules at Rush No More. No wood fires — propane & charcoal only. Sturgis Rally & holiday policies.',
  path: '/policies',
  keywords: [
    'rush no more cancellation policy', 'campground rules sturgis sd',
    'rv park cancellation policy south dakota', 'sturgis rally cancellation policy',
    'campground check in time sturgis', 'rush no more pet policy',
    'black hills campground rules', 'campground quiet hours sturgis',
    'rush no more fire rules', 'campground pet rules black hills',
    'rv park check in check out times', 'campground refund policy south dakota',
    'sturgis rally reservation policy', 'holiday reservation policy campground',
    // Long-tail
    'rush no more refund policy', 'rush no more pet rules',
    'rush no more quiet hours', 'rush no more fire pit rules',
    'rush no more deposit policy', 'rush no more extra vehicle fee',
    'rush no more speed limit', 'rush no more no wood fires',
    'campground propane campfire sturgis', 'campground no shows policy',
    'sturgis rally non-refundable', 'campground memorial day policy',
    'rush no more july 4th policy', 'campground labor day policy south dakota',
  ],
});

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
