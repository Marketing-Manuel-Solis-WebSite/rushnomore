import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Campground — RV, Cabins & Tents | Rush No More',
  description: 'Sturgis Rally campsite bookings at Rush No More — RV, cabins & tents 5 mi from Main Street. Next rally & car show dates to be confirmed. Group events 20–200. Book early.',
  path: '/events',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis rally campground', 'sturgis motorcycle rally campground',
    'sturgis rally rv sites', 'sturgis rally accommodations',
    'where to stay sturgis rally', 'sturgis rally lodging',
    'sturgis motorcycle rally lodging', 'sturgis rally base camp',
    'camping near sturgis rally', 'sturgis rally rv park',
    'sturgis rally tent camping', 'sturgis rally cabin rentals',
    'sturgis rally rates', 'sturgis rally reservations',
    'best campground sturgis rally', 'motorcycle rally south dakota',
    'sturgis rally camping with pool', 'sturgis rally beer garden',
    'car show sturgis sd', 'dakota rods classics car show',
    'wedding venue black hills outdoor', 'wedding venue sturgis sd',
    'group events sturgis south dakota', 'reunion venue black hills',
    'corporate retreat black hills', 'event venue near mount rushmore',
    'outdoor wedding venue south dakota', 'group camping south dakota',
    'sturgis rally dates august', 'motorcycle rally campground south dakota',
    // Emerging queries with real traffic
    'sturgis camping', 'sturgis campground reservations',
    'sturgis rally camping prices',
    'sturgis rally campground near main street', 'sturgis sd campgrounds',
    'campground sturgis south dakota', 'rv park sturgis sd',
  ],
});

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
