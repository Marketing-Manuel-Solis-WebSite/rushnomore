import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'RV Park Near Mount Rushmore — Full Hookups | Rush No More',
  description: 'RV park near Mount Rushmore in Sturgis, SD: 156 RV sites, full hookups, 30/50 AMP, pull-throughs up to 100 ft, pool, hot tubs & beer garden. Book online.',
  path: '/rv-park-near-mount-rushmore',
  image: '/images/rv-camper-van.png',
  keywords: [
    'rv park near mount rushmore',
    'rv parks near mount rushmore',
    'rv park near me',
    'rv parks near me',
    'rv parks near me monthly rates',
    'rv parks monthly rates near me',
    'rv park prices near me',
    'cheap rv parks near me',
    'cheap rv parks with hookups',
    'rv parks close to me',
    'rv park rental near me',
    'rv spots near me',
    'rv sites near me',
    'rv parking near me',
    'rv hookups near me',
    'full hookup campgrounds near me',
    'places to park rv near me',
    'rv camping sites near me',
    'rv camping near me',
    'rv campgrounds near me',
    'best rv parks near me',
    'black hills rv park',
    'south dakota rv camping',
    'rv park south dakota',
    'quiet rv park south dakota',
    'rv park sturgis sd',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
