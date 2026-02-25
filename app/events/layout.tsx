import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Events — Sturgis Rally, Car Show, Weddings & More',
  description: 'Rush No More events: Sturgis Motorcycle Rally base camp, rally rates, Dakota Rods & Classics Car Show, weddings, reunions & group events in the Black Hills of South Dakota.',
  path: '/events',
});

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
