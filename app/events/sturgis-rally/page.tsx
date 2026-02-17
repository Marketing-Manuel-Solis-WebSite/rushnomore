import { Metadata } from 'next';
import Link from 'next/link';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE } from '@/data/site';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Sturgis Motorcycle Rally — Your Perfect Base Camp', description: 'Rush No More: rally HQ for 10+ years. 5 miles from Main St Sturgis.', path: '/events/sturgis-rally' });

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Sturgis Rally' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="mb-6">Sturgis Motorcycle Rally — Your Perfect Base Camp</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">Rush No More: rally HQ for 10+ years. 5 miles from Main St Sturgis. RV, tent & cabin options.</p>
          <div className="mt-8"><a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">Book Your Stay <ExternalLink className="w-5 h-5 ml-2" /></a></div>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg text-brand-navy/80 mb-8">Rush No More: rally HQ for 10+ years. 5 miles from Main St Sturgis. RV, tent & cabin options.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[{ label: 'RV Sites', price: 'From $53.99/night', href: '/stay/rv-sites' },{ label: 'Cabins', price: 'From $95/night', href: '/stay/cabins' },{ label: 'Tent Camping', price: 'From $35/night', href: '/stay/tent-camping' }].map((s, i) => (
              <Link key={i} href={s.href} className="card-lodge p-5 group"><h4 className="text-sm font-bold mb-1">{s.label}</h4><span className="text-brand-gold font-display text-lg">{s.price}</span><ArrowRight className="w-4 h-4 text-brand-stone mt-2 group-hover:text-brand-gold transition-colors" /></Link>
            ))}
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
