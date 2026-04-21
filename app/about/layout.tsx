import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'About Rush No More — 4.8★ Campground Near Mount Rushmore',
  description: 'Family-owned Rush No More in Sturgis, SD — 4.8★ (420+ reviews). 200+ RV sites, 16 cabins, shaded tent camping. Pool, hot tubs & beer garden. 55 mi to Mount Rushmore, 12 mi to Deadwood.',
  path: '/about',
  image: '/images/GeneralImagesPark/IMG_7379.jpeg',
  keywords: [
    'about rush no more', 'rush no more reviews', 'rush no more tripadvisor',
    'rush no more google reviews', 'rush no more rating', 'rush no more campground',
    'best campground near mount rushmore', 'top rated campground black hills',
    'best rated rv park south dakota', 'family owned rv resort south dakota',
    'family owned campground sturgis', '4 star campground south dakota',
    'campground near mount rushmore reviews', 'sturgis campground reviews',
    'black hills campground reviews', 'rush no more history',
    'most popular campground sturgis sd', 'award winning rv park south dakota',
    'recommended campground black hills', 'campground with best reviews sturgis',
    // Long-tail brand intent
    'rush no more owners', 'rush no more yelp', 'rush no more facebook',
    'rush no more instagram', 'rush no more youtube', 'rush no more tiktok',
    'rush no more founded', 'rush no more since 2014', 'rush no more 84 rallies',
    'rush no more 420 reviews', 'rush no more 4.8 stars',
    'who owns rush no more', 'is rush no more worth it',
    'rush no more vs other sturgis campgrounds', 'rush no more vs koa sturgis',
    // Photo/gallery + brand intent
    'rush no more photos', 'rush no more campground photos',
    'rush no more campground pictures', 'rush no more campground reviews photos',
    'rush no more aerial view', 'rush no more drone photo',
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
