import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE, CABINS } from '@/data/site';
import { ExternalLink, Users } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Cabins Near Mount Rushmore — Presidential Cabin Rentals', description: 'Presidential cabins near Mount Rushmore sleeping 2-10 guests. Economy to luxury from $95/night.', path: '/stay/cabins' });

export default function CabinsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Stay', href: '/stay' }, { label: 'Cabins' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="badge-gold mb-6 inline-block !bg-brand-gold/20 !text-brand-gold-light">Cabins Near Mount Rushmore</span>
          <h1 className="mb-6">Presidential Cabin Collection</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">Each cabin named after a US President &mdash; from economy to luxury suites with full kitchens, king beds, and private decks.</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          {CABINS.map((cat, ci) => (
            <div key={ci} className="mb-16 last:mb-0">
              <SectionHeader title={cat.cat} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((c, i) => (
                  <div key={i} className="card-lodge">
                    <div className="aspect-[4/3] bg-surface-secondary relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent z-10" />
                      <div className="absolute bottom-3 left-3 z-20">
                        <span className="bg-white/90 text-brand-navy text-xs font-bold px-2 py-1 rounded">Cabin {c.num}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg mb-2">{c.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-brand-gold" />
                        <span className="text-sm text-brand-navy/70">Sleeps {c.sleeps}</span>
                      </div>
                      <div className="mb-4">
                        <span className="font-display text-xl text-brand-gold">$95 - $335/night</span>
                        <span className="text-xs text-brand-stone block">Rally: from $2,200 (10-day min)</span>
                      </div>
                      <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">
                        Reserve <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mt-8">
            <h4 className="text-red-800 font-bold mb-2">IMPORTANT: NO OPEN FIRES</h4>
            <p className="text-red-700 text-sm">Open campfires are prohibited by law. NO fire pits, ground, or wood fires allowed. Charcoal grills and propane campfires are OK (unless burn ban is in effect). Propane campfires available for rent at our camp store.</p>
          </div>
        </div>
      </section>
      <BookingCTA title="Find Your Perfect Cabin" />
    </>
  );
}
