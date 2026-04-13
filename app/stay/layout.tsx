import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Stay Near Mount Rushmore — RV Sites from $41, Cabins from $51, Tent from $35',
  description: 'Book your Black Hills vacation at Rush No More in Sturgis, SD: 200+ full-hookup RV sites from $41.22/night (30/50 AMP, pull-throughs up to 100ft), 16 unique presidential cabins from $51.76/night (sleep 2–10), & tent camping from $35/night under Ponderosa pines. Heated pool, hot tub spas, beer garden & 16 free amenities. 55 mi from Mount Rushmore, 12 mi from Deadwood, 5 mi from Sturgis. Open year-round.',
  path: '/stay',
  image: '/images/GeneralImagesPark/IMG_7386.jpeg',
  keywords: [
    'black hills camping', 'camping near mount rushmore', 'where to stay near mount rushmore',
    'rv park near mount rushmore', 'cabins near mount rushmore', 'tent camping black hills',
    'campground near sturgis sd', 'rv resort sturgis south dakota',
    'cabins sturgis south dakota', 'black hills lodging',
    'mount rushmore lodging', 'accommodations near mount rushmore',
    'black hills vacation rentals', 'sturgis sd lodging',
    'campground near deadwood sd', 'campground with pool near mount rushmore',
    'where to camp black hills', 'best place to stay near mount rushmore',
    'affordable lodging near mount rushmore', 'year round campground south dakota',
    'campground open all year south dakota', 'winter rv park south dakota',
    'summer camping black hills 2026', 'fall camping black hills south dakota',
    'spring camping south dakota', 'overnight camping near mount rushmore',
    'multi night stay near mount rushmore', 'weekly rv rates black hills',
    'monthly rv rates south dakota', 'long term rv stay sturgis sd',
    'vacation lodging black hills', 'place to stay near crazy horse memorial',
  ],
});

export default function StayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
