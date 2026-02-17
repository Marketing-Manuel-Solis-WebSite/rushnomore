import { Metadata } from 'next';
import { seo, faqSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { SectionHeader, BookingCTA, Breadcrumbs } from '@/components/ui';
import { RVTierCard } from '@/components/cards';
import { SITE, RV_TIERS } from '@/data/site';

export const metadata: Metadata = seo({ title: 'RV Sites Near Mount Rushmore — Standard, VIP & Presidential Spa', description: 'Full hookup RV sites near Mount Rushmore. 30/50 AMP, pull-throughs up to 100ft. From $53.99/night.', path: '/stay/rv-sites' });

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
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/rv-camper-van.jpg')" }} />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <span className="badge-gold mb-6 inline-block !bg-brand-gold/20 !text-brand-gold-light">RV Park Near Mount Rushmore</span>
          <h1 className="mb-6">Premium RV Sites in the Black Hills</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">Full hookup, 30/50 AMP, pull-throughs up to 100ft.</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RV_TIERS.map((t, i) => <RVTierCard key={i} tier={t} index={i} />)}
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
