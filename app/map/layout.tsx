import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Campground Map & Directions — Rush No More Near Mount Rushmore',
  description: 'Interactive map of Rush No More RV Resort & Campground near Mount Rushmore. Find RV sites, presidential cabins, tent areas, pool, beer garden & 16 amenities. Located off I-90 Exit 37, 5 mi from Sturgis, 55 mi from Mount Rushmore.',
  path: '/map',
  image: '/images/UTV/ParkingFrontPoll_RNM.jpeg',
  keywords: [
    'rush no more campground map', 'campground map sturgis sd',
    'directions to rush no more', 'rv park near i-90 south dakota',
    'campground near mount rushmore directions', 'sturgis campground location',
  ],
});

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
