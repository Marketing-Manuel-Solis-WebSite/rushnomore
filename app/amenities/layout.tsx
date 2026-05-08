import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Free Resort Amenities — Pool, Hot Tubs & Beer Garden | Rush No More',
  description: 'Free resort amenities at Rush No More — heated pool, hot tubs, beer garden, game room, nature trails, bathhouses, complimentary Wi-Fi, cafe & more. No resort fees. Sturgis, SD.',
  path: '/amenities',
  image: '/images/Pool/PoolWithPeople.jpeg',
  keywords: [
    'campground with pool near mount rushmore', 'rv park with pool south dakota',
    'campground amenities black hills', 'beer garden campground sturgis',
    'hot tub rv resort south dakota', 'campground with hot tub near mount rushmore',
    'pet friendly campground south dakota', 'pet friendly rv park black hills',
    'campground with game room south dakota', 'rv resort amenities sturgis sd',
    'campground with beer garden sturgis', 'black hills resort with hot tubs',
    'heated pool campground black hills', 'nature trails campground south dakota',
    'campground with wifi sturgis sd', 'campground with laundry black hills',
    'rv park no resort fees south dakota', 'swimming pool rv park mount rushmore',
    'campground with bar south dakota', 'family friendly amenities campground',
    'campground with bathhouse south dakota',
    'propane campfire campground south dakota',
    'campground with camp store black hills', 'best amenities campground south dakota',
    'campground with picnic area black hills',
    // Rapid City + emerging
    'campground with pool near rapid city', 'rv park with pool rapid city sd',
    'campground with hot tub near rapid city', 'rv park amenities rapid city area',
  ],
});

export default function AmenitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
