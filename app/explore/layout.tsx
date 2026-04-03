import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Things to Do Near Mount Rushmore — Black Hills Attractions & Day Trips',
  description: 'Explore Black Hills attractions from Rush No More campground: Mount Rushmore (55 mi), Deadwood (12 mi), Crazy Horse Memorial, Custer State Park, Spearfish Canyon & Needles Highway. Day trip guides, distances & insider tips from Sturgis, SD.',
  path: '/explore',
  image: '/images/GeneralImagesPark/IMG_7383.jpeg',
  keywords: [
    'things to do near mount rushmore', 'black hills attractions', 'deadwood south dakota things to do',
    'custer state park', 'spearfish canyon', 'needles highway scenic drive',
    'crazy horse memorial', 'black hills day trips from sturgis',
    'mount rushmore nearby attractions', 'what to do in sturgis sd',
  ],
});

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
