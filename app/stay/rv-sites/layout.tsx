import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'RV Park Near Mount Rushmore — Full Hookup RV Sites in Sturgis, SD',
  description: '200+ full-hookup RV sites near Mount Rushmore starting at $41.22/night. 30/50 AMP, pull-throughs up to 100ft, luxury sites with cement slabs & gas BBQ, and Luxury Spa sites with private hot tubs. Heated pool, beer garden & 16 free amenities at Rush No More in Sturgis, SD. Open year-round.',
  path: '/stay/rv-sites',
  image: '/images/RushMore-rv-camper-van.png',
  keywords: [
    'rv park near mount rushmore', 'rv resort sturgis south dakota',
    'full hookup rv park black hills', 'rv sites near sturgis sd',
    '50 amp rv park south dakota', 'pull through rv sites black hills',
    'rv park with pool near mount rushmore', 'luxury rv sites south dakota',
    'rv campground near deadwood sd', 'best rv park black hills',
    'rv park with hot tub south dakota', 'rv park near i-90 south dakota',
    'long term rv park sturgis sd', 'rv park with beer garden',
    'big rig friendly rv park south dakota', 'rv camping near sturgis rally',
  ],
});

export default function RVSitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
