import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Monthly RV Sites in Sturgis, SD — Long-Term Stays | Rush No More',
  description: 'Monthly and long-term RV sites at Rush No More in Sturgis, SD. Hookups, 30/50 AMP and big-rig pull-throughs, 5 mi from Sturgis. Call for monthly availability.',
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
