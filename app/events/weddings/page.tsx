import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE } from '@/data/site';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Weddings, Reunions & Group Events', description: 'Beautiful outdoor pavilion for weddings, parties & corporate retreats.', path: '/events/weddings' });

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Events' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="mb-6">Weddings, Reunions & Group Events</h1>
          <p className="text-lg text-white/70">Beautiful outdoor pavilion with kitchen, events center for weddings, parties & corporate retreats.</p>
          <div className="mt-8"><a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">Book Your Stay <ExternalLink className="w-5 h-5 ml-2" /></a></div>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg text-brand-navy/80 mb-8">Beautiful outdoor pavilion with kitchen, events center for weddings, parties & corporate retreats.</p>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
