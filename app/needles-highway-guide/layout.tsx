import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Needles Highway Guide — Granite Spires & the Needles Eye',
  description: 'Needles Highway (SD-87) guide from Rush No More: 14 miles of granite spires, one-lane tunnels and the Needles Eye. Tunnel sizes, RV limits and best timing.',
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
