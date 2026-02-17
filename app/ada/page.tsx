import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs, Check } from '@/components/ui';
import { SITE } from '@/data/site';
import { Accessibility, CheckCircle } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'ADA Compliance & Accessibility', description: 'ADA accessibility statement for Rush No More RV Resort.', path: '/ada' });

export default function ADAPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'ADA Compliance' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center"><h1 className="mb-4">ADA Compliance & Accessibility</h1></div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="mb-6">Our Accessibility Commitment</h2>
          <p className="text-lg text-brand-navy/80 mb-8">Rush No More RV Resort is committed to providing accessible accommodations and services to all guests.</p>
          <div className="card-lodge p-6 mb-6">
            <div className="flex items-center gap-3 mb-4"><Accessibility className="w-6 h-6 text-brand-gold" /><h3 className="text-lg">Website Accessibility</h3></div>
            <p className="text-brand-navy/70 mb-4">We strive for WCAG 2.1 Level AA compliance.</p>
            <ul className="space-y-2">
              {['Keyboard navigation support','Alt text for all images','Readable fonts and color contrast','Mobile accessibility','Accessible forms','Screen reader compatibility'].map((item, i) => <Check key={i}>{item}</Check>)}
            </ul>
          </div>
          <div className="card-lodge p-6">
            <h3 className="text-lg mb-3">Contact</h3>
            <p className="text-brand-navy/70 text-sm"><strong>Email:</strong> {SITE.email} | <strong>Phone:</strong> {SITE.phone}</p>
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
