import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Iron Mountain Road Guide (US-16A) — Pigtail Bridges & Framed Rushmore Views',
  description: 'Iron Mountain Road (US-16A) guide from Rush No More — 17 miles of pigtail bridges and three tunnels that frame Mount Rushmore through the granite. Route, tunnel sizes, motorcycle tips and how to loop with Needles Highway.',
  path: '/iron-mountain-road-guide',
  image: '/images/DSC05580-s.png',
  keywords: [
    'iron mountain road guide',
    'iron mountain road us-16a',
    'iron mountain road motorcycle',
    'pigtail bridges black hills',
    'mount rushmore framed tunnel',
    'iron mountain scenic drive',
    'black hills scenic byways',
    'custer state park scenic drives',
    'needles and iron mountain loop',
    'sd motorcycle routes',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
