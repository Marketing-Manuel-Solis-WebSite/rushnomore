import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Contact Us — Phone, Email & Directions',
  description: 'Contact Rush No More RV Resort: call 605-423-2545, email info@rushnomore.com, or visit at 21137 Brimstone Place, Sturgis SD 57785. Office open daily 8 AM – 5 PM MT. We reply within 24 hours.',
  path: '/contact',
  image: '/images/PeoplePlaying/IMG_7078.jpeg',
  keywords: ['rush no more phone number', 'contact rush no more', 'sturgis campground reservations', 'rush no more address', 'rv park reservations sturgis sd'],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
