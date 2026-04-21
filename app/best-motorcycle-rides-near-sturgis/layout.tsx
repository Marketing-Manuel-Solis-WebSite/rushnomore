import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Best Motorcycle Rides Near Sturgis — Scenic Black Hills Routes',
  description: 'The classic Black Hills motorcycle rides from Sturgis, SD — Needles Highway, Iron Mountain Road, Spearfish Canyon, Boulder Canyon and Vanocker Canyon. Route notes, highlights and tips from Rush No More, your rally basecamp 5 miles from Main Street Sturgis.',
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
