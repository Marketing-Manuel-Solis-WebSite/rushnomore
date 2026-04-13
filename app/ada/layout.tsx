import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'ADA Accessible Campground Near Mount Rushmore — Wheelchair Friendly RV Park & Cabins',
  description: 'ADA-compliant RV park & campground near Mount Rushmore. Rush No More offers wheelchair-accessible RV sites, ADA bathhouses, accessible cabins & paved pathways. Pool with accessible entry, ramp access & disability-friendly facilities in Sturgis, SD. Call 605-423-2545 for accessibility questions.',
  path: '/ada',
  keywords: [
    'ada accessible campground south dakota', 'wheelchair accessible rv park mount rushmore',
    'accessible campground near mount rushmore', 'ada compliant rv resort sturgis',
    'handicap accessible cabins black hills', 'wheelchair friendly campground black hills',
    'accessible camping south dakota', 'ada rv sites sturgis sd',
    'disability friendly campground mount rushmore', 'accessible pool campground south dakota',
    'wheelchair accessible tent camping black hills', 'ada bathhouse campground sturgis',
    'accessible campground near sturgis', 'mobility friendly rv park south dakota',
  ],
});

export default function ADALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
