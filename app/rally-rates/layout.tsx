import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Sturgis Rally Rates — RV, Cabin & Tent Pricing | Rush No More',
  description: 'Sturgis Rally rates at Rush No More: latest 10-night RV packages from $940.70 (dry) to $2,472.32 (luxury spa). 2027 rates to be announced — contact us.',
  path: '/rally-rates',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'sturgis rally rates',
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
