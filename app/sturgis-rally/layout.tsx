import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Guide — Rides, Tips & Where to Stay | Rush No More',
  description: 'Sturgis Motorcycle Rally guide: held every August, next dates to be confirmed. Top rides, tips and where to stay — Rush No More is 5 miles from Main Street.',
  path: '/sturgis-rally',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis motorcycle rally',
    'sturgis rally dates',
    'sturgis bike rally',
    'sturgis south dakota motorcycle rally',
    'sturgis rally schedule',
    'sturgis rally events',
    'sturgis rally guide',
    'what to do at sturgis rally',
    'sturgis rally map',
    'sturgis rally main street',
    'sturgis rally rides',
    'best motorcycle rides sturgis',
    'sturgis rally history',
    'sturgis rally tickets',
    'sturgis rally lineup',
    'sturgis rally vendors',
    'sturgis rally first time',
    'rush no more sturgis rally',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
