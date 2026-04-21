import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Campground 2026 — RV, Cabins & Tents | Rush No More',
  description: 'Sturgis Rally 2026 (Aug 2–18) campsite bookings at Rush No More — RV from $899/10 days, cabins & tents. 5 mi from Main Street. Car show Sept 12. Group events 20–200. Book early.',
  path: '/events',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis rally campground 2026', 'sturgis motorcycle rally campground',
    'sturgis rally rv sites 2026', 'sturgis rally accommodations 2026',
    'where to stay sturgis rally 2026', 'sturgis rally lodging 2026',
    'sturgis motorcycle rally lodging', 'sturgis rally base camp',
    'camping near sturgis rally', 'sturgis rally rv park',
    'sturgis rally tent camping', 'sturgis rally cabin rentals',
    'sturgis rally rates 2026', 'sturgis rally reservations',
    'best campground sturgis rally', 'motorcycle rally south dakota 2026',
    'sturgis rally camping with pool', 'sturgis rally beer garden',
    'car show sturgis sd 2026', 'dakota rods classics car show 2026',
    'wedding venue black hills outdoor', 'wedding venue sturgis sd',
    'group events sturgis south dakota', 'reunion venue black hills',
    'corporate retreat black hills', 'event venue near mount rushmore',
    'outdoor wedding venue south dakota', 'group camping south dakota',
    'sturgis rally 2026 dates august', 'motorcycle rally campground south dakota',
    // Emerging queries with real traffic
    'sturgis 2026 camping', 'sturgis 2026 campground reservations',
    'sturgis rally camping prices 2026', 'sturgis rally camping with pool',
    'sturgis rally campground near main street', 'sturgis sd campgrounds',
    'campground sturgis south dakota', 'rv park sturgis sd',
  ],
});

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
