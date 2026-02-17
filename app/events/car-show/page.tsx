import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE } from '@/data/site';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Dakota Rods & Classics Car Show — September 12, 2026', description: 'Annual Show and Shine at Rush No More. Free admission!', path: '/events/car-show' });

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Car Show' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="mb-6">Dakota Rods & Classics Car Show</h1>
          <p className="text-lg text-white/70">September 12, 2026 — Free admission! Live music, food, beer garden & pool party.</p>
          <div className="mt-8"><a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">Book Your Stay <ExternalLink className="w-5 h-5 ml-2" /></a></div>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg text-brand-navy/80 mb-8">Annual Show and Shine at Rush No More. Free admission! Live music, food, beer garden & pool party.</p>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
