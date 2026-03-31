import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Events — Sturgis Rally 2026, Car Show, Weddings & Group Events',
  description: 'Rush No More events: Sturgis Motorcycle Rally base camp (Aug 2-18, 2026) with RV sites from $53.99, Dakota Rods & Classics Car Show (Sep 12), weddings, reunions & group events for 20-200 guests in the Black Hills.',
  path: '/events',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: ['sturgis rally campground 2026', 'sturgis motorcycle rally lodging', 'sturgis rally rv sites', 'car show sturgis sd', 'wedding venue black hills', 'group events south dakota', 'sturgis rally base camp', 'rally rates 2026'],
});

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
