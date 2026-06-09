import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Rates 2026 — RV, Cabin & Tent Pricing | Rush No More',
  description: '2026 Sturgis Motorcycle Rally rates at Rush No More — full-hookup RV from $1,792.65/10 nights, luxury sites from $2,357.11, luxury spa with private hot tub from $2,472.32. Dry sites from $940.70. Pre-rally rates from $89/night. Cabins & tent camping pricing included. 5 mi from Main Street Sturgis.',
  path: '/rally-rates',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis rally rates 2026',
    'sturgis rally prices',
    'sturgis rally camping prices',
    'sturgis rally rv rates',
    'sturgis rally cabin rates',
    'sturgis rally pricing',
    'rally rates sturgis sd',
    'sturgis motorcycle rally cost',
    'how much sturgis rally camping',
    'sturgis rally 10 day package',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
