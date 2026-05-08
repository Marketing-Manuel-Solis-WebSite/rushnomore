import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Motorcycle Rally 2026 — Dates, Schedule, Map & Rides | Rush No More',
  description: 'The complete 2026 Sturgis Motorcycle Rally guide — official dates Aug 2–18, daily schedule, things to do, top motorcycle rides, where to stay, and how to plan your trip. Hosted from Rush No More, your Sturgis Rally HQ 5 miles from Main Street.',
  path: '/sturgis-rally',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis motorcycle rally 2026',
    'sturgis rally 2026',
    'sturgis rally dates 2026',
    '86th sturgis rally',
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
