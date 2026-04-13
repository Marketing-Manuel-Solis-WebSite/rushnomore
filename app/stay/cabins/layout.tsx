import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Cabins Near Mount Rushmore — 16 Presidential Cabins from $51/Night | Sturgis, SD',
  description: '16 unique presidential cabins near Mount Rushmore at Rush No More in Sturgis, SD. Sleep 2–10 guests from $51.76/night. Economy, standard, family & luxury options. Full kitchens, A/C & heating, private bathrooms, pet-friendly. Free heated pool, hot tub spas, beer garden & 16 amenities. Named after US Presidents — The George Washington, Thomas Jefferson, Abe Lincoln & more. 55 miles from Mount Rushmore.',
  path: '/stay/cabins',
  image: '/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png',
  keywords: [
    'cabins near mount rushmore', 'cabins sturgis south dakota', 'cabin rentals near mount rushmore',
    'presidential cabins black hills', 'black hills cabin rentals',
    'affordable cabins near mount rushmore', 'cheap cabins black hills',
    'pet friendly cabins sturgis sd', 'pet friendly cabins near mount rushmore',
    'family cabins black hills south dakota', 'cabins near deadwood sd',
    'mount rushmore cabin lodging', 'cabins with kitchen near mount rushmore',
    'couples cabin black hills', 'romantic cabin getaway black hills',
    'group cabin rental sturgis sd', 'large cabin black hills sleeps 10',
    'cabin vacation black hills', 'cabins near sturgis rally',
    'cabin camping south dakota', 'themed cabins south dakota',
    'unique cabins near mount rushmore', 'cabin with pool access black hills',
    'cabin with hot tub access sturgis', 'budget cabin rentals south dakota',
    'overnight cabin near mount rushmore', 'weekly cabin rental black hills',
    'cabin near crazy horse memorial', 'cabin near deadwood casino',
    'cabin near custer state park', 'cabin near spearfish canyon',
    'cabin near needles highway', 'cabin vacation sturgis sd',
  ],
});

export default function CabinsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
