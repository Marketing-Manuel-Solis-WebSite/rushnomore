import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Things to Do Near Mount Rushmore — Black Hills Attractions & Day Trips',
  description: 'Explore Black Hills attractions from Rush No More campground: Mount Rushmore (55 mi), Deadwood (12 mi), Crazy Horse Memorial (60 mi), Custer State Park (70 mi), Spearfish Canyon (25 mi) & Needles Highway. Complete 6-day itinerary, distances & insider tips from Sturgis, SD.',
  path: '/explore',
  image: '/images/GeneralImagesPark/IMG_7383.jpeg',
  keywords: [
    'things to do near mount rushmore', 'black hills attractions',
    'deadwood south dakota things to do', 'custer state park',
    'spearfish canyon', 'needles highway scenic drive',
    'crazy horse memorial', 'black hills day trips from sturgis',
    'mount rushmore nearby attractions', 'what to do in sturgis sd',
    'black hills itinerary', 'things to do near sturgis sd',
    'mount rushmore day trip', 'black hills scenic drives',
    'bear country usa', 'wind cave national park',
  ],
});

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
