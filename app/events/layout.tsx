import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Campground 2026 (Aug 2–18) — RV Sites, Cabins & Tent Camping',
  description: 'Book your Sturgis Motorcycle Rally 2026 campsite (August 2–18): RV sites from $899/10 days, cabins & tent camping just 5 miles from Main Street Sturgis. Rush No More is the ultimate rally headquarters — beer garden, hot tubs, live music. Dakota Rods & Classics Car Show September 12, 2026. Weddings, reunions & group events for 20–200 guests. Book early — we sell out every year.',
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
