import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Tent Camping Near Mount Rushmore — Shaded Sites from $35/Night | Black Hills, SD',
  description: 'Tent camping from $35/night under Ponderosa pines near Mount Rushmore at Rush No More in Sturgis, SD. 20+ spacious sites — 15 with 20 AMP electric hookup ($40/night). Modern bathhouses, heated pool, hot tub spas, beer garden & 16 free amenities included. Perfect base camp for Mount Rushmore (55 mi), Deadwood (12 mi) & Custer State Park (70 mi). Book your Black Hills camping adventure.',
  path: '/stay/tent-camping',
  image: '/images/tent_camping_RNM.png',
  keywords: [
    'tent camping near mount rushmore', 'tent camping black hills',
    'camping near mount rushmore', 'tent sites sturgis south dakota',
    'affordable camping near mount rushmore', 'cheap camping black hills',
    'budget camping south dakota', 'campground with pool black hills',
    'tent camping near deadwood sd', 'ponderosa pine camping south dakota',
    'best tent camping black hills', 'family tent camping near sturgis',
    'tent camping with electric hookup south dakota', 'tent camping with amenities',
    'shaded campsite black hills', 'camping under pines mount rushmore',
    'tent camping near sturgis rally', 'tent camping with bathhouse',
    'tent camping with pool access', 'tent camping with hot tub access',
    'backpacking base camp black hills', 'primitive camping south dakota',
    'camping near crazy horse memorial', 'camping near custer state park',
    'overnight tent camping mount rushmore', 'weekend camping black hills',
    'summer tent camping south dakota', 'fall tent camping black hills',
    'camping with kids near mount rushmore', 'couples camping black hills',
    'cheap place to camp near mount rushmore', 'tent camping near i-90 south dakota',
  ],
});

export default function TentCampingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
