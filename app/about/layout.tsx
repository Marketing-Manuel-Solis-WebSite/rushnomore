import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'About Rush No More — 4.8★ Award-Winning Campground Near Mount Rushmore',
  description: 'Rush No More RV Resort & Campground — Sturgis, SD. 4.8★ with 420+ reviews on TripAdvisor & Google. Family-owned since 2014 with 200+ full-hookup RV sites, 16 presidential cabins & shaded tent camping. Heated pool, hot tub spas, beer garden & 16 free amenities. Official Sturgis Rally headquarters. 55 miles from Mount Rushmore, 12 miles from Deadwood, 5 miles from Sturgis. Meet the team behind the Black Hills\' top-rated campground.',
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
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
