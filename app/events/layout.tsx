import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Campground 2026 — Car Show, Weddings & Group Events',
  description: 'Official Sturgis Motorcycle Rally campground 2026 (Aug 2-18): RV sites from $899, cabins & tent camping just 5 miles from Main Street. Dakota Rods & Classics Car Show Sep 12. Weddings, reunions & group events for 20-200 guests at Rush No More in Sturgis, SD.',
  path: '/events',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis rally campground', 'sturgis rally campground 2026',
    'sturgis motorcycle rally lodging', 'sturgis rally rv sites',
    'sturgis rally base camp', 'rally rates 2026',
    'car show sturgis sd', 'dakota rods classics car show',
    'wedding venue black hills', 'group events sturgis south dakota',
    'sturgis rally accommodations', 'camping near sturgis rally',
    'sturgis rally 2026 dates', 'motorcycle rally south dakota',
    'event venue sturgis sd', 'reunion venue black hills',
  ],
});

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
