import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Tent Camping in the Black Hills — Shaded Sites Near Mount Rushmore',
  description: 'Tent camping from $35/night under Ponderosa pines near Mount Rushmore. 20+ spacious sites (15 with electric), modern bathhouses, heated pool, hot tubs, beer garden & 16 free amenities at Rush No More in Sturgis, SD.',
  path: '/stay/tent-camping',
  image: '/images/tent_camping_RNM.png',
  keywords: [
    'tent camping black hills', 'camping near mount rushmore', 'tent sites sturgis south dakota',
    'black hills tent camping', 'affordable camping near mount rushmore',
    'campground with pool black hills', 'tent camping near deadwood sd',
    'ponderosa pine camping south dakota', 'best tent camping black hills',
    'family tent camping near sturgis',
  ],
});

export default function TentCampingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
