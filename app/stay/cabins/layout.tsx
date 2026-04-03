import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Cabins Near Mount Rushmore — Presidential Cabins in Sturgis, SD',
  description: '16 unique presidential cabins near Mount Rushmore sleeping 2-10 guests, starting at $95/night. Full kitchens, A/C, private bathrooms & pet-friendly options. Pool, hot tubs, beer garden & 16 free amenities at Rush No More in Sturgis, South Dakota.',
  path: '/stay/cabins',
  image: '/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png',
  keywords: [
    'cabins near mount rushmore', 'cabins sturgis south dakota', 'presidential cabins black hills',
    'cabin rentals near mount rushmore', 'black hills cabin rentals',
    'pet friendly cabins sturgis sd', 'family cabins black hills south dakota',
    'cabins near deadwood sd', 'mount rushmore cabin lodging', 'affordable cabins black hills',
  ],
});

export default function CabinsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
