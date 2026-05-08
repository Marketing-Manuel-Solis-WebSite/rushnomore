import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Cabins Near Mount Rushmore — 20 Cabins from $51 | Rush No More',
  description: '20 presidential cabins near Mount Rushmore at Rush No More, Sturgis SD — from $51.76. Sleep 2–10, A/C, private baths, pet-friendly options. Free pool, hot tubs & beer garden.',
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
    // Rapid City + Sturgis direct matches (real queries)
    'cabins in sturgis sd', 'cabins near rapid city sd',
    'cabin rentals rapid city area', 'cabins near rapid city south dakota',
    // Price intent
    'cabin prices sturgis sd', 'cabin rates near mount rushmore',
    'cheap cabins sturgis south dakota', 'affordable cabins black hills sd',
    'cabin rental prices black hills',
  ],
});

export default function CabinsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
