import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Needles Highway Guide (SD-87) — Granite Spires, Tunnels & the Needles Eye',
  description: 'Needles Highway (SD-87) guide from Rush No More — 14 miles of granite spires, narrow one-lane tunnels and the iconic Needles Eye in Custer State Park. Tunnel dimensions, best timing, RV restrictions and how to loop with Iron Mountain Road.',
  path: '/needles-highway-guide',
  image: '/images/GeneralImagesPark/IMG_7383.jpeg',
  keywords: [
    'needles highway guide',
    'needles highway south dakota',
    'needles eye south dakota',
    'needles highway tunnel dimensions',
    'needles highway motorcycle',
    'sd-87 scenic drive',
    'cathedral spires',
    'custer state park scenic drive',
    'black hills scenic drives',
    'sylvan lake needles',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
