import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs, Check } from '@/components/ui';
import { SITE } from '@/data/site';
import { Accessibility, CheckCircle, Info } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'ADA Compliance & Accessibility', description: 'ADA accessibility statement for Rush No More RV Resort. WCAG 2.1 Level AA compliant.', path: '/ada' });

export default function ADAPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'ADA Compliance' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="mb-4">ADA Compliance & Accessibility</h1>
          <p className="text-lg text-white/70">Committed to Inclusive Access</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="mb-6">Our Accessibility Commitment</h2>
          <p className="text-lg text-brand-navy/80 mb-8">Rush No More RV Resort is committed to providing accessible accommodations and services to all guests with disabilities in compliance with the Americans with Disabilities Act (ADA).</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-10 flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 text-sm"><strong>Please Note:</strong> For information about physical campground accessibility, contact us at {SITE.phone}.</p>
          </div>
          <div className="card-lodge p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Accessibility className="w-6 h-6 text-brand-gold" />
              <h3 className="text-lg">Website Accessibility Statement</h3>
            </div>
            <p className="text-brand-navy/70 mb-4">We strive to ensure our website is accessible to all visitors. We are committed to WCAG 2.1 Level AA compliance.</p>
            <h4 className="font-bold mb-3">Our commitment includes:</h4>
            <ul className="space-y-2">
              {['Keyboard navigation support','Alt text for all images','Readable fonts and sufficient color contrast','Mobile device accessibility','Accessible forms and interactive elements','Screen reader compatibility'].map((item, i) => <Check key={i}>{item}</Check>)}
            </ul>
          </div>
          <div className="card-lodge p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-brand-gold" />
              <h3 className="text-lg">WCAG Conformance</h3>
            </div>
            <p className="text-brand-navy/70">We aim to conform with WCAG 2.1 Level AA. If you encounter barriers, please contact us so we can address them.</p>
          </div>
          <div className="card-lodge p-6">
            <h3 className="text-lg mb-3">Feedback & Contact</h3>
            <p className="text-brand-navy/70 mb-4">We welcome feedback on accessibility. Contact us:</p>
            <div className="text-sm text-brand-navy/70 space-y-1">
              <p><strong>Email:</strong> {SITE.email}</p>
              <p><strong>Phone:</strong> {SITE.phone}</p>
              <p><strong>Address:</strong> {SITE.address}</p>
            </div>
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
