import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Legal Notices & Privacy Policy | Rush No More',
  description: 'Privacy policy, terms of use, cookie policy & legal notices for Rush No More RV Resort in Sturgis, South Dakota. How we protect your data and our booking terms.',
  path: '/legal',
  keywords: [
    'rush no more privacy policy', 'campground terms of use',
    'rush no more legal notices', 'rv resort privacy policy south dakota',
    'campground booking terms', 'rush no more data policy',
    'rush no more terms and conditions', 'campground cookie policy',
    'campground data retention policy', 'rv park gdpr',
    'rush no more copyright notice', 'campground ccpa',
    'rv resort liability terms', 'rush no more user agreement',
    'sturgis campground privacy', 'rv park terms south dakota',
  ],
});

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
