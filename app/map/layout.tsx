import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Campground Map & Directions — I-90 Exit 37, Sturgis SD | Rush No More',
  description: 'Interactive map of Rush No More RV Resort near Mount Rushmore. View RV sites, presidential cabins, tent areas, pool, beer garden & all amenities. Directions: I-90 Exit 37, right on Brimstone Place — under 2 minutes. 21137 Brimstone Place, Sturgis SD 57785. 5 mi from Sturgis, 12 mi from Deadwood, 55 mi from Mount Rushmore.',
  path: '/map',
  image: '/images/RushNoMoreMap.jpg',
  keywords: [
    'rush no more campground map', 'rush no more directions',
    'campground map sturgis sd', 'rv park near i-90 south dakota',
    'campground near mount rushmore directions', 'sturgis campground location',
    'rush no more location', 'campground i-90 exit 37 sturgis',
    'rv park directions sturgis sd', 'how to get to rush no more',
    'campground near interstate south dakota', 'rv park off i-90 sturgis',
    'rush no more address 21137 brimstone', 'sturgis sd campground map',
    'black hills campground location', 'rv park easy interstate access south dakota',
    'campground near sturgis main street', 'where is rush no more campground',
    // Rapid City directions
    'campground between rapid city and sturgis', 'rv park near rapid city directions',
    'how to get to rush no more from rapid city', 'campground near rapid city off i-90',
  ],
});

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
