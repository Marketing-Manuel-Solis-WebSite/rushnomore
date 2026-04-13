import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Things to Do Near Mount Rushmore — Black Hills Attractions, Day Trips & 6-Day Itinerary',
  description: 'Explore 9 top Black Hills attractions from Rush No More campground in Sturgis: Mount Rushmore (55 mi), Deadwood (12 mi), Crazy Horse Memorial (60 mi), Custer State Park (70 mi), Spearfish Canyon (25 mi), Needles Highway, Bear Country USA & Wind Cave. Complete 6-day itinerary with distances, drive times & insider tips. Your perfect Black Hills base camp.',
  path: '/explore',
  image: '/images/GeneralImagesPark/IMG_7383.jpeg',
  keywords: [
    'things to do near mount rushmore', 'black hills attractions',
    'black hills things to do', 'deadwood south dakota things to do',
    'custer state park south dakota', 'spearfish canyon waterfalls',
    'needles highway scenic drive', 'crazy horse memorial south dakota',
    'black hills day trips from sturgis', 'mount rushmore nearby attractions',
    'what to do in sturgis sd', 'black hills itinerary 6 days',
    'things to do near sturgis sd', 'mount rushmore day trip from sturgis',
    'black hills scenic drives', 'bear country usa south dakota',
    'wind cave national park', 'black hills vacation itinerary',
    'black hills family activities', 'things to do black hills with kids',
    'gold panning deadwood sd', 'buffalo safari custer state park',
    'best scenic drives south dakota', 'waterfall hikes black hills',
    'black hills road trip planner', 'mount rushmore area activities',
    'mammoth site hot springs sd', '1880 train black hills',
    'sylvan lake swimming custer', 'iron mountain road south dakota',
    'wildlife loop road custer', 'bridal veil falls spearfish canyon',
  ],
});

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
