import { Metadata } from 'next';
import { seo, faqSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { SectionHeader, BookingCTA, Breadcrumbs, Check } from '@/components/ui';
import { SITE, RV_TIERS } from '@/data/site';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'RV Sites Near Mount Rushmore — Standard, VIP & Presidential Spa', description: 'Full hookup RV sites near Mount Rushmore. 30/50 AMP, pull-throughs up to 100ft, private hot tubs. From $53.99/night.', path: '/stay/rv-sites' });

const faqs = [
  { q: 'What hookups do RV sites include?', a: 'All sites include water, electric (30/50 AMP), and sewer. VIP and Presidential add private patios and gas BBQ.' },
  { q: 'How long can my RV be?', a: 'We accommodate RVs up to 100 feet with pull-through and back-in options.' },
  { q: 'What is the difference between VIP and Presidential?', a: 'Both have patios + BBQ. Presidential adds a private hot tub spa.' },
  { q: 'Are you open year-round?', a: 'Standard sites are open year-round. Luxury/Spa sites close Oct 1 to May 1.' },
  { q: 'How far to Mount Rushmore?', a: 'About 55 miles, roughly a scenic 1-hour drive.' },
];

export default function RVSitesPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={[{ label: 'Stay', href: '/stay' }, { label: 'RV Sites' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="badge-gold mb-6 inline-block !bg-brand-gold/20 !text-brand-gold-light">RV Park Near Mount Rushmore</span>
          <h1 className="mb-6">Premium RV Sites in the Black Hills</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">Full hookup, 30/50 AMP, pull-throughs up to 100ft. Choose Standard, VIP Deluxe, or Presidential Spa with private hot tub.</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RV_TIERS.map((t, i) => (
              <div key={i} className="card-lodge relative">
                {t.badge && <div className="absolute top-4 right-4 z-10 bg-brand-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-gold">{t.badge}</div>}
                <div className="aspect-[4/3] bg-surface-secondary bg-cover bg-center" style={{ backgroundImage: `url('${t.img}')` }} />
                <div className="p-6">
                  <h3 className="text-xl mb-4">{t.name}</h3>
                  <ul className="space-y-2 mb-6">{t.features.map((f, j) => <Check key={j}>{f}</Check>)}</ul>
                  <div className="pt-6 border-t border-surface-muted">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-display text-3xl text-brand-gold">{t.price}</span>
                        <span className="text-sm text-brand-stone block">{t.note}</span>
                      </div>
                    </div>
                    <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center">Book Now <ExternalLink className="w-4 h-4 ml-1.5" /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-4 mt-8 text-center text-sm text-brand-navy/80">
            <strong>Seasonal Notice:</strong> VIP Luxury & Presidential Spa sites are closed October 1 through May 1.
          </div>
        </div>
      </section>
      <section className="section-pad bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader badge="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-surface-secondary rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold hover:bg-surface-muted transition-colors">
                  {f.q}
                  <span className="text-brand-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-brand-navy/70 text-sm">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <BookingCTA title="Ready to Park Your RV in Paradise?" />
    </>
  );
}
