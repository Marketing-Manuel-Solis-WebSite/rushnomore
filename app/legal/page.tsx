import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE } from '@/data/site';

export const metadata: Metadata = seo({ title: 'Legal Notices & Privacy Policy', description: 'Privacy policy and terms for Rush No More RV Resort.', path: '/legal' });

export default function LegalPage() {
  const sections = [
    { title: 'Privacy Policy', text: 'Rush No More RV Resort respects your privacy. We collect personal information only when voluntarily submitted. We do not sell or share your personal information.' },
    { title: 'Terms of Use', text: 'By accessing this website, you agree to comply with these terms. All content is protected by copyright laws.' },
    { title: 'Cookie Policy', text: 'We use cookies and Google Analytics to enhance your experience and understand website usage.' },
    { title: 'Contact', text: `For legal inquiries: ${SITE.email} or ${SITE.phone}. Address: ${SITE.address}` },
  ];
  return (
    <>
      <Breadcrumbs items={[{ label: 'Legal Notices' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="mb-4">Legal Notices</h1>
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
