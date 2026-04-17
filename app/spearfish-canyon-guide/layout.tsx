import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Spearfish Canyon Guide — Waterfalls, Fly Fishing & Fall Foliage',
  description: 'Spearfish Canyon Scenic Byway guide from Rush No More in Sturgis, SD. Bridal Veil Falls, Roughlock Falls, Spearfish Creek fly fishing and the 20-mile limestone-walled byway. Drive route, trailheads and best seasons.',
  path: '/spearfish-canyon-guide',
  image: '/images/rv-camper-van.png',
  keywords: [
    'spearfish canyon guide',
    'spearfish canyon byway',
    'bridal veil falls south dakota',
    'roughlock falls',
    'spearfish canyon waterfalls',
    'spearfish canyon fall foliage',
    'spearfish creek fly fishing',
    'spearfish canyon drive',
    'black hills waterfalls',
    'scenic drives south dakota',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
