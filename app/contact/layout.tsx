import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Contact Us — 605-423-2545 | Rush No More Sturgis, SD',
  description: 'Contact Rush No More RV Resort: call 605-423-2545, email rushnomoresd@gmail.com, or visit 21137 Brimstone Place, Sturgis SD. I-90 Exit 37. Office open daily 8 AM–5 PM MT.',
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
    // Long-tail intent queries
    'rush no more 605-423-2545', 'rush no more info email',
    'rush no more customer service', 'rush no more bilingual staff',
    'rush no more spanish staff', 'campground front desk sturgis',
    'rush no more 21137 brimstone place', 'rush no more check out time',
    'how far is rush no more from sturgis', 'how far is rush no more from deadwood',
    'how far is rush no more from mount rushmore', 'rush no more driving directions',
    // Rapid City + emerging queries
    'campground near rapid city sd phone', 'rv park near rapid city contact',
    'sturgis sd campgrounds', 'rv parks black hills sd',
    'rapid city airport to rush no more',
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
