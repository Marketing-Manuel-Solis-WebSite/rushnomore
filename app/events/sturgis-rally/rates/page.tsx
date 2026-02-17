import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE, RALLY_RV } from '@/data/site';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Sturgis Rally Rates 2026', description: 'Rally rates Aug 2-18, 2026. Full hook-up from $1,450.', path: '/events/sturgis-rally/rates' });

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Rally Rates 2026' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="mb-6">Sturgis Rally Rates 2026</h1>
          <p className="text-lg text-white/70">Rally rates Aug 2-18, 2026. Full hook-up from $1,450.</p>
          <div className="mt-8"><a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">Book Your Stay <ExternalLink className="w-5 h-5 ml-2" /></a></div>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader badge="Rally 2026" title="RV Site Rally Pricing" subtitle="10-day minimum. August 2-18, 2026." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RALLY_RV.map((r, i) => (
              <div key={i} className={`card-premium p-6 ${r.popular ? 'ring-2 ring-brand-gold' : ''}`}>
                {r.popular && <span className="badge-gold mb-3 inline-block">Most Popular</span>}
                <h3 className="text-xl mb-2">{r.name}</h3>
                <div className="mb-4">
                  <span className="font-display text-3xl text-brand-gold">{r.rally}</span>
                  <span className="text-sm text-brand-stone block">10-day rally package</span>
                </div>
                <div className="bg-surface-secondary rounded-lg p-3 mb-4 text-sm text-brand-navy/70">
                  Pre/Post Rally: {r.pre}/week
                </div>
                <ul className="space-y-2 mb-6">
                  {r.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-brand-navy/80">
                      <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">Reserve Now <ExternalLink className="w-3.5 h-3.5 ml-1" /></a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
