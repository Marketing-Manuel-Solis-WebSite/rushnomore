import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE } from '@/data/site';

export const metadata: Metadata = seo({ title: 'Legal Notices & Privacy Policy', description: 'Privacy policy, terms and conditions for Rush No More RV Resort.', path: '/legal' });

export default function LegalPage() {
  const sections = [
    { title: 'Privacy Policy', text: 'Rush No More RV Resort respects your privacy. We collect personal information only when voluntarily submitted. This information is used solely to fulfill your requests, such as reservation inquiries. We do not sell, trade, or share your personal information with third parties.' },
    { title: 'Terms of Use', text: 'By accessing this website, you agree to comply with these terms. All content is the property of Rush No More RV Resort and protected by copyright laws. Unauthorized use is prohibited.' },
    { title: 'Reservation Terms', text: 'All reservations are subject to our cancellation policies. Rally and holiday reservations are non-refundable. See our Policies page for full details.' },
    { title: 'Liability Limitation', text: 'Rush No More RV Resort is not responsible for personal injury, property damage, or theft. Guests assume all risks associated with outdoor recreational activities.' },
    { title: 'Cookie Policy', text: 'We use cookies to enhance your experience. By continuing to use our site, you consent to cookies as described in this policy. We use Google Analytics to understand website usage.' },
    { title: 'DMCA Compliance', text: 'We respect intellectual property rights. If you believe content on our site infringes your copyright, please contact us with a detailed description of the alleged infringement.' },
    { title: 'Contact', text: `For legal inquiries, contact us at: ${SITE.email} or ${SITE.phone}. Address: ${SITE.address}` },
  ];
  return (
    <>
      <Breadcrumbs items={[{ label: 'Legal Notices' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="mb-4">Legal Notices</h1>
          <p className="text-lg text-white/70">Privacy Policy, Terms & Conditions</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {sections.map((s, i) => (
            <div key={i} className="card-lodge p-6">
              <h3 className="text-lg mb-3">{s.title}</h3>
              <p className="text-brand-navy/70 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
