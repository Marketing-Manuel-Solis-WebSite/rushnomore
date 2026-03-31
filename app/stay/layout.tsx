import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Stay — RV Sites, Presidential Cabins & Tent Camping',
  description: 'Book your Black Hills stay: 200+ full-hookup RV sites (30/50 AMP, up to 100ft), 16 presidential cabins sleeping 2-10, and shaded tent camping from $35/night. All 16 amenities included at Rush No More.',
  path: '/stay',
  image: '/images/GeneralImagesPark/IMG_7386.jpeg',
  keywords: ['rv sites near mount rushmore', 'cabins near sturgis sd', 'tent camping black hills', 'full hookup rv park south dakota', 'presidential cabins sturgis', 'rv resort with hot tub sites', 'camping near deadwood sd', 'black hills lodging'],
});

export default function StayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
