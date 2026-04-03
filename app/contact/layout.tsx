import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Contact Rush No More — Reservations, Phone & Directions to Sturgis, SD',
  description: 'Contact Rush No More RV Resort & Campground: call 605-423-2545, email info@rushnomore.com, or visit 21137 Brimstone Place, Sturgis SD 57785 (I-90 Exit 37). Office open daily 8 AM-5 PM MT. We reply within 24 hours.',
  path: '/contact',
  image: '/images/PeoplePlaying/IMG_7078.jpeg',
  keywords: [
    'rush no more phone number', 'contact rush no more', 'rush no more address',
    'campground reservations sturgis sd', 'rv park reservations near mount rushmore',
    'directions to rush no more', 'sturgis campground phone number',
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
