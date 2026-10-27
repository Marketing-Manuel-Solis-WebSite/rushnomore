import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Weddings & Group Events — Black Hills Venue in Sturgis, SD',
  description: 'Weddings, reunions, retreats and group events at Rush No More in the Black Hills. Pavilion for 20–200 guests plus cabins, RV and tent sites so everyone stays.',
  path: '/weddings-groups',
  image: '/images/EventCenter/IMG_7513.jpeg',
  keywords: [
    'wedding venue sturgis sd',
    'wedding venue black hills',
    'outdoor wedding venue south dakota',
    'reunion venue black hills',
    'family reunion venue south dakota',
    'group camping south dakota',
    'corporate retreat black hills',
    'event venue near mount rushmore',
    'event pavilion sturgis',
    'group lodging sturgis sd',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
