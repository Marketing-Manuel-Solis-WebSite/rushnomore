import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Best Motorcycle Rides Near Sturgis — Scenic Black Hills Routes',
  description: 'Classic Black Hills motorcycle rides from Sturgis: Needles Highway, Iron Mountain Road, Spearfish, Boulder and Vanocker Canyons. Route notes from Rush No More.',
  path: '/best-motorcycle-rides-near-sturgis',
  image: '/images/BikeRally/IMG_9865.JPG',
  keywords: [
    'best motorcycle rides near sturgis',
    'sturgis motorcycle rides',
    'black hills motorcycle routes',
    'scenic motorcycle rides south dakota',
    'motorcycle rides from sturgis',
    'needles highway motorcycle',
    'iron mountain road motorcycle',
    'spearfish canyon motorcycle',
    'black hills scenic rides',
    'sturgis rally rides',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
