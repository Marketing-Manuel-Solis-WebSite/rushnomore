import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: '16 Free Amenities — Pool, Hot Tubs, Beer Garden, Game Room & More | No Resort Fees',
  description: '16 free resort amenities at Rush No More campground near Mount Rushmore — no resort fees ever. Heated swimming pool, hot tub spas, beer garden & bar, game room, nature trails, modern bathhouses, laundromat, free Wi-Fi, pet-friendly dog run, bike wash station, propane campfire rentals, cafe, camp library, camp store, picnic pavilions & 24/7 gated security. Sturgis, SD — 55 mi to Mount Rushmore.',
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
    'campground with bathhouse south dakota', 'rv park with dog run sturgis',
    'bike wash station campground', 'propane campfire campground south dakota',
    'campground with camp store black hills', 'best amenities campground south dakota',
    '24 hour security campground sturgis', 'campground with picnic area black hills',
    // Rapid City + emerging
    'campground with pool near rapid city', 'rv park with pool rapid city sd',
    'campground with hot tub near rapid city', 'rv park amenities rapid city area',
  ],
});

export default function AmenitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
