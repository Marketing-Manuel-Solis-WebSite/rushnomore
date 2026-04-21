import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'ADA Accessible Campground Near Mount Rushmore | Rush No More',
  description: 'ADA-compliant campground near Mount Rushmore. Rush No More offers wheelchair-accessible RV sites, ADA bathhouses, accessible cabins & paved paths in Sturgis, SD. Call 605-423-2545.',
  path: '/ada',
  keywords: [
    'ada accessible campground south dakota', 'wheelchair accessible rv park mount rushmore',
    'accessible campground near mount rushmore', 'ada compliant rv resort sturgis',
    'handicap accessible cabins black hills', 'wheelchair friendly campground black hills',
    'accessible camping south dakota', 'ada rv sites sturgis sd',
    'disability friendly campground mount rushmore', 'accessible pool campground south dakota',
    'wheelchair accessible tent camping black hills', 'ada bathhouse campground sturgis',
    'accessible campground near sturgis', 'mobility friendly rv park south dakota',
    // Long-tail + device-specific
    'wheelchair accessible cabins mount rushmore', 'rollator friendly campground',
    'accessible shower campground black hills', 'roll-in shower rv park sd',
    'scooter accessible campground sturgis', 'service animal friendly campground',
    'grab bars campground sturgis', 'accessible parking rv park',
    'low step cabin sturgis', 'paved pathways campground mount rushmore',
    'hearing impaired friendly campground', 'visually impaired rv resort',
    'senior friendly campground black hills', 'wheelchair ramp cabin south dakota',
    // Assistive tech / WCAG
    'wcag 2.1 aa campground website', 'rush no more accessibility statement',
  ],
});

export default function ADALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
