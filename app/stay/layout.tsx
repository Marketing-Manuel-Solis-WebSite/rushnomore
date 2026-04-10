import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Black Hills Camping — RV Sites, Presidential Cabins & Tent Camping',
  description: 'Book your Black Hills camping vacation: 200+ full-hookup RV sites from $41.22, 16 presidential cabins from $51.76 & tent camping from $35/night. Heated pool, hot tubs, beer garden & 16 free amenities near Mount Rushmore at Rush No More in Sturgis, SD. Open year-round.',
  path: '/stay',
  image: '/images/GeneralImagesPark/IMG_7386.jpeg',
  keywords: [
    'black hills camping', 'camping near mount rushmore',
    'rv park near mount rushmore', 'cabins near mount rushmore',
    'tent camping black hills', 'campground near sturgis sd',
    'rv resort sturgis south dakota', 'cabins sturgis south dakota',
    'black hills lodging', 'campground with pool near mount rushmore',
    'accommodations near mount rushmore', 'where to stay near mount rushmore',
    'black hills vacation rentals', 'sturgis sd lodging',
    'campground near deadwood sd', 'mount rushmore lodging',
  ],
});

export default function StayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
