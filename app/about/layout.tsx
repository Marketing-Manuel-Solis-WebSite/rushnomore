import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'About Us — Our Story, Team & Values',
  description: 'Learn the story behind Rush No More RV Resort in Sturgis, SD. Family-owned campground with 4.8-star rating, 16 amenities, presidential cabins & a legendary beer garden in the Black Hills.',
  path: '/about',
  image: '/images/GeneralImagesPark/IMG_7379.jpeg',
  keywords: ['about rush no more', 'black hills campground history', 'family owned rv resort south dakota', 'sturgis campground story', 'rush no more reviews'],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
