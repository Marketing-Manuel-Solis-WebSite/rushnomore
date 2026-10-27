import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Camping — 5 mi from Main Street | Rush No More',
  description: 'Sturgis Rally camping at Rush No More: RV sites, cabins & tent sites 5 miles from Main Street. Pool, hot tubs & beer garden. Next rally dates to be confirmed.',
  path: '/sturgis-rally-camping',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis rally camping',
    'sturgis rally campground',
    'sturgis rally rv park',
    'sturgis motorcycle rally camping',
    'sturgis rally lodging',
    'where to stay sturgis rally',
    'sturgis rally base camp',
    'sturgis rally cabin rental',
    'sturgis rally tent camping',
    'sturgis rally rv sites',
    'rally camping near main street sturgis',
    'sturgis rally accommodations',
    'motorcycle rally campground south dakota',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
