import { Metadata } from 'next';
import Link from 'next/link';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE } from '@/data/site';
import { ArrowRight, ExternalLink, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Dakota Rods & Classics Car Show — September 12, 2026', description: 'Annual Show and Shine at Rush No More. Free admission! Live music, food, beer garden & pool party.', path: '/events/car-show' });

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Car Show' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="mb-6">Dakota Rods & Classics Car Show — September 12, 2026</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">Annual Show and Shine at Rush No More. Free admission! Live music, food, beer garden & pool party.</p>
          <div className="mt-8">
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">
              Book Your Stay <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg text-brand-navy/80 mb-8">Annual Show and Shine at Rush No More. Free admission! Live music, food, beer garden & pool party.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Link href="/stay/rv-sites" className="card-lodge p-5 group">
              <h4 className="text-sm font-bold mb-1">RV Sites</h4>
              <span className="text-brand-gold font-display text-lg">From $53.99/night</span>
              <ArrowRight className="w-4 h-4 text-brand-stone mt-2 group-hover:text-brand-gold transition-colors" />
            </Link>
            <Link href="/stay/cabins" className="card-lodge p-5 group">
              <h4 className="text-sm font-bold mb-1">Cabins</h4>
              <span className="text-brand-gold font-display text-lg">From $95/night</span>
              <ArrowRight className="w-4 h-4 text-brand-stone mt-2 group-hover:text-brand-gold transition-colors" />
            </Link>
            <Link href="/stay/tent-camping" className="card-lodge p-5 group">
              <h4 className="text-sm font-bold mb-1">Tent Camping</h4>
              <span className="text-brand-gold font-display text-lg">From $35/night</span>
              <ArrowRight className="w-4 h-4 text-brand-stone mt-2 group-hover:text-brand-gold transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader badge="Related" title="Explore More" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Mount Rushmore Guide', href: '/mount-rushmore' },
              { label: 'Black Hills Guide', href: '/black-hills' },
              { label: 'Sturgis Rally', href: '/events/sturgis-rally' },
              { label: 'All Accommodations', href: '/stay' },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/10 transition-all group">
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
