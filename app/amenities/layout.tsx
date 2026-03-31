import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Amenities — Pool, Hot Tubs, Beer Garden & 16 Free Features',
  description: 'All 16 resort amenities included free: heated pool, hot tub spas, beer garden & bar, game room, nature trails, modern bathhouses, free Wi-Fi, pet friendly grounds, camp store & 24/7 security at Rush No More.',
  path: '/amenities',
  image: '/images/Pool/PoolWithPeople.jpeg',
  keywords: ['rv park with pool south dakota', 'campground amenities black hills', 'beer garden campground sturgis', 'hot tub rv resort', 'campground with game room', 'pet friendly rv park black hills', 'campground with pool near mount rushmore'],
});

export default function AmenitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
