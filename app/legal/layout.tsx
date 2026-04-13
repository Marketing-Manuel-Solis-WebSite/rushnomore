import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Legal Notices, Privacy Policy & Terms of Use',
  description: 'Privacy policy, terms of use, cookie policy, data retention and legal notices for Rush No More RV Resort & Campground in Sturgis, South Dakota. Learn how we protect your personal information and our terms for booking RV sites, cabins & tent camping near Mount Rushmore.',
  path: '/legal',
  keywords: [
    'rush no more privacy policy', 'campground terms of use',
    'rush no more legal notices', 'rv resort privacy policy south dakota',
    'campground booking terms', 'rush no more data policy',
  ],
});

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
