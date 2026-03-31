import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Explore the Black Hills — Mount Rushmore, Deadwood, Custer & More',
  description: 'Discover Black Hills attractions from Rush No More: Mount Rushmore (55 mi), Deadwood (12 mi), Crazy Horse, Spearfish Canyon, Custer State Park, Needles Highway & Sturgis — all easy day trips from camp.',
  path: '/explore',
  image: '/images/GeneralImagesPark/IMG_7383.jpeg',
  keywords: ['things to do near mount rushmore', 'black hills attractions', 'deadwood south dakota', 'custer state park', 'spearfish canyon', 'needles highway', 'sturgis south dakota things to do', 'black hills day trips'],
});

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
