import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Deadwood Day Trip from Sturgis — Casinos, Gold Mines & Wild West History',
  description: 'The complete Deadwood, SD day trip guide from Rush No More — 12 miles and 15 minutes from camp. 80+ gaming halls, Adams Museum, gold panning at Broken Boot, Mt. Moriah Cemetery and the Trial of Jack McCall. Route, timing, parking and dining tips.',
  path: '/deadwood-day-trip',
  image: '/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg',
  keywords: [
    'deadwood day trip',
    'deadwood sd from sturgis',
    'things to do deadwood south dakota',
    'deadwood casinos',
    'deadwood gold mine tour',
    'adams museum deadwood',
    'mt moriah cemetery',
    'trial of jack mccall',
    'deadwood historic tour',
    'sturgis to deadwood',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
