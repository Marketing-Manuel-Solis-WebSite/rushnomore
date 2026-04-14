import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'RV Park Near Mount Rushmore — 200+ Full Hookup Sites from $41/Night | Sturgis, SD',
  description: '200+ full-hookup RV sites near Mount Rushmore at Rush No More in Sturgis, SD. Starting at $41.22/night. 30/50 AMP service, pull-throughs up to 100ft, luxury sites with cement slabs & gas BBQ grills, and Luxury Spa sites with private hot tub. Heated pool, beer garden & 16 free amenities. Big rig friendly. Open year-round. Just off I-90 Exit 37. 55 mi from Mount Rushmore, 12 mi from Deadwood.',
  path: '/stay/rv-sites',
  image: '/images/RushMore-rv-camper-van.png',
  keywords: [
    'rv park near mount rushmore', 'rv resort sturgis south dakota',
    'full hookup rv park black hills', 'rv sites near sturgis sd',
    '50 amp rv park south dakota', '30 amp rv sites sturgis sd',
    'pull through rv sites near mount rushmore', 'pull through rv park black hills',
    'rv park with pool near mount rushmore', 'luxury rv sites south dakota',
    'rv sites with private hot tub', 'rv campground near deadwood sd',
    'best rv park black hills', 'rv park with hot tub south dakota',
    'rv park near i-90 south dakota', 'rv park i-90 exit 37',
    'long term rv park sturgis sd', 'monthly rv rates sturgis sd',
    'rv park with beer garden sturgis', 'big rig friendly rv park south dakota',
    'rv camping near sturgis rally', 'class a rv park south dakota',
    'fifth wheel rv park black hills', 'motorhome park near mount rushmore',
    'rv park with sewer hookup', 'rv park with water hookup',
    'rv park with cement pad', 'rv park with bbq grill',
    'rv resort with amenities south dakota', 'rv park open year round south dakota',
    'winter rv park south dakota', 'overnight rv parking near mount rushmore',
    'rv park near crazy horse memorial', 'rv park near custer state park',
    'rv park near spearfish canyon', 'rv park near needles highway',
    'rv park with 100 ft sites', 'extra long rv sites south dakota',
    // Rapid City target
    'rv park near rapid city sd', 'rv parks near rapid city south dakota',
    'rv campground rapid city area', 'full hookup rv park near rapid city',
    // Price intent
    'rv park prices sturgis sd', 'rv site rates near mount rushmore',
    'how much rv camping sturgis', 'rv park nightly rates black hills',
    'private rv lots for rent south dakota', 'private rv sites sturgis',
  ],
});

export default function RVSitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
