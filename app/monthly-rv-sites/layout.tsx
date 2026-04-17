import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Monthly RV Sites in Sturgis, SD — Long-Term Rates Near Mount Rushmore',
  description: 'Long-term and monthly RV sites at Rush No More in Sturgis, South Dakota. Full hookups (water/electric/sewer), 30/50 AMP, big-rig pull-throughs. Quiet Black Hills setting 5 mi from Sturgis, 12 mi from Deadwood, 55 mi from Mount Rushmore. Call for monthly availability.',
  path: '/monthly-rv-sites',
  image: '/images/rv-camper-van.png',
  keywords: [
    'monthly rv sites sturgis sd',
    'long term rv park sturgis',
    'monthly rv rates black hills',
    'extended stay rv park south dakota',
    'long term rv sites near mount rushmore',
    'rv park monthly rates sturgis',
    'winter rv park south dakota',
    'snowbird rv park black hills',
    'long term rv stay sturgis sd',
    'extended stay rv sites black hills',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
