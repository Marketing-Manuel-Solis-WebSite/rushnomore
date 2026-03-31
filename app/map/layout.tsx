import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Resort Map & Directions — Find Your Perfect Spot',
  description: 'Interactive campground map of Rush No More RV Resort. Find RV sites, cabins, tent areas, pool, beer garden & all 16 amenities. Just off I-90 Exit 37, 5 miles from Sturgis, 12 mi from Deadwood.',
  path: '/map',
  image: '/images/UTV/ParkingFrontPoll_RNM.jpeg',
  keywords: ['rush no more map', 'campground map sturgis sd', 'directions to rush no more', 'rv park near i-90 south dakota', 'how to get to rush no more', 'sturgis campground location'],
});

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
