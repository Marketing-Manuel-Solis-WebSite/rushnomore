import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Campground Amenities — Pool, Hot Tubs, Beer Garden & 16 Free Features',
  description: '16 free resort amenities at Rush No More campground near Mount Rushmore: heated pool, hot tub spas, beer garden & bar, game room, nature trails, modern bathhouses, free Wi-Fi, pet-friendly grounds, camp store & 24/7 gated security in Sturgis, SD.',
  path: '/amenities',
  image: '/images/Pool/PoolWithPeople.jpeg',
  keywords: [
    'campground with pool near mount rushmore', 'rv park with pool south dakota',
    'campground amenities black hills', 'beer garden campground sturgis',
    'hot tub rv resort south dakota', 'pet friendly campground south dakota',
    'campground with game room', 'rv resort amenities sturgis sd',
    'campground with beer garden', 'black hills resort with hot tubs',
  ],
});

export default function AmenitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
