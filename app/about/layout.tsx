import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'About Rush No More — Top-Rated Campground Near Mount Rushmore',
  description: 'Rush No More RV Resort in Sturgis, SD — 4.8-star rated campground near Mount Rushmore. Family-owned resort with 200+ RV sites, 16 presidential cabins, heated pool, beer garden & 16 free amenities. Sturgis Rally headquarters since 2014.',
  path: '/about',
  image: '/images/GeneralImagesPark/IMG_7379.jpeg',
  keywords: [
    'about rush no more', 'rush no more reviews', 'campground near mount rushmore',
    'family owned rv resort south dakota', 'sturgis campground',
    'best campground black hills', 'top rated rv park sturgis sd',
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
