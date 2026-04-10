import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'ADA Compliance & Accessibility Statement',
  description: 'ADA accessibility information for Rush No More RV Resort & Campground in Sturgis, SD. Accessible RV sites, ADA-compliant bathhouses and facilities for guests with disabilities near Mount Rushmore.',
  path: '/ada',
  keywords: [
    'ada accessible campground south dakota', 'wheelchair accessible rv park',
    'accessible campground near mount rushmore', 'ada compliant rv resort',
    'handicap accessible cabins black hills',
  ],
});

export default function ADALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
