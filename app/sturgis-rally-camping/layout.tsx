import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Camping 2026 — 5 mi from Main Street | Rush No More',
  description: 'Book your 2026 Sturgis Motorcycle Rally stay (Aug 2–18) at Rush No More. Rally RV sites from $1,792.65/10 days (dry sites $940.70), cabins & tent sites 5 miles from Main Street Sturgis. Beer garden, pool, hot tubs. 10+ years as rally HQ — book early, we sell out.',
  path: '/sturgis-rally-camping',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis rally camping',
    'sturgis rally campground',
    'sturgis rally rv park',
    'sturgis motorcycle rally camping 2026',
    'sturgis rally lodging 2026',
    'where to stay sturgis rally',
    'sturgis rally base camp',
    'sturgis rally cabin rental',
    'sturgis rally tent camping',
    'sturgis rally rv sites 2026',
    'rally camping near main street sturgis',
    'sturgis rally accommodations',
    'motorcycle rally campground south dakota',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
