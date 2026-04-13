import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Contact Us — Phone 605-423-2545 | Email & Directions | Rush No More Sturgis, SD',
  description: 'Contact Rush No More RV Resort: call 605-423-2545, email info@rushnomore.com, or visit 21137 Brimstone Place, Sturgis SD 57785. Just off I-90 Exit 37 — less than 2 minutes from the interstate. Office open daily 8 AM–5 PM Mountain Time. We respond within 24 hours. Book RV sites, cabins & tent camping near Mount Rushmore, Deadwood & Crazy Horse Memorial.',
  path: '/contact',
  image: '/images/PeoplePlaying/IMG_7078.jpeg',
  keywords: [
    'rush no more phone number', 'contact rush no more', 'rush no more address',
    'rush no more email', 'rush no more reservations phone',
    'directions to rush no more campground', 'how to get to rush no more',
    'campground reservations sturgis sd', 'rv park reservations near mount rushmore',
    'sturgis campground phone number', 'campground near i-90 south dakota',
    'sturgis sd campground contact', 'book campsite near mount rushmore',
    'reserve rv site black hills', 'reserve cabin sturgis sd',
    'rush no more check in time', 'rush no more office hours',
    'campground i-90 exit 37 sturgis', 'rv park near interstate south dakota',
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
