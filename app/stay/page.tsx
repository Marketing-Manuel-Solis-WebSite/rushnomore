import { Metadata } from 'next';
import Link from 'next/link';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs, Check } from '@/components/ui';
import { SITE, RV_TIERS } from '@/data/site';
import { ExternalLink, ArrowRight } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Accommodations — RV Sites, Cabins & Tent Camping', description: 'Choose from premium RV sites, presidential cabins, and shaded tent camping near Mount Rushmore.', path: '/stay' });

export default function StayPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Accommodations' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="badge-gold mb-6 inline-block !bg-brand-gold/20 !text-brand-gold-light">Top-Rated RV Resort</span>
          <h1 className="mb-6">Fabulous Lodging at a Great Location</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">There is nothing quite like spending time at one of America&apos;s top-rated campgrounds. Whether you seek a scenic RV site, a cozy cabin, or tent camping &mdash; we have the perfect spot.</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="RV Life" title="RV Site Selection" subtitle="Full hookups, big-rig friendly, sites up to 100ft." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {RV_TIERS.map((t, i) => (
              <div key={i} className="card-lodge relative">
                {t.badge && <div className="absolute top-4 right-4 z-10 bg-brand-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{t.badge}</div>}
                <div className="aspect-[4/3] bg-surface-secondary bg-cover bg-center" style={{ backgroundImage: `url('${t.img}')` }} />
                <div className="p-6">
                  <h3 className="text-xl mb-3">{t.name}</h3>
                  <ul className="space-y-2 mb-6">{t.features.map((f, j) => <Check key={j}>{f}</Check>)}</ul>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-display text-2xl text-brand-gold">{t.price}</span>
                      <span className="text-xs text-brand-stone block">{t.note}</span>
                    </div>
                  </div>
                  <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">
                    Book Now <ExternalLink className="w-4 h-4 ml-1.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/stay/rv-sites" className="btn-outline mr-3">RV Site Details <ArrowRight className="w-4 h-4 ml-2" /></Link>
            <Link href="/stay/cabins" className="btn-outline mr-3">View Cabins <ArrowRight className="w-4 h-4 ml-2" /></Link>
            <Link href="/stay/tent-camping" className="btn-outline">Tent Camping <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
