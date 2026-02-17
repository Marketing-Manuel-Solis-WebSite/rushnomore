import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs, Check } from '@/components/ui';
import { SITE } from '@/data/site';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Tent Camping Near Mount Rushmore — Black Hills Campground', description: 'Scenic tent camping under Ponderosa Pines near Mount Rushmore. Shaded sites, fire pits, clean bathhouses from $35/night.', path: '/stay/tent-camping' });

export default function TentPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Stay', href: '/stay' }, { label: 'Tent Camping' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="badge-gold mb-6 inline-block !bg-brand-gold/20 !text-brand-gold-light">Camping Near Mount Rushmore</span>
          <h1 className="mb-6">Tent Camping in the Black Hills</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">Wake up to mountain views and fresh pine air with full access to all resort amenities.</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <SectionHeader badge="Features" title="Tent Site Features" center={false} />
              <ul className="grid grid-cols-2 gap-3">
                {['Spacious level ground','Shaded tree coverage','Water hookups nearby','Access to all amenities','Clean bathhouse facilities','Convenient parking','Hiking trail access','Beautiful setting'].map((f, i) => <Check key={i}>{f}</Check>)}
              </ul>
            </div>
            <div className="aspect-[4/3] bg-surface-secondary rounded-2xl bg-cover bg-center shadow-lodge-lg" style={{ backgroundImage: "url('/images/Wooded-Tent-Area.webp')" }} />
          </div>
          <div className="max-w-2xl mx-auto">
            <SectionHeader badge="Pricing" title="Tent Site Rates" />
            <div className="card-lodge p-8">
              <div className="flex items-center justify-between mb-6">
                <div><h3 className="text-xl">Standard Tent Camping</h3><p className="text-sm text-brand-stone">Based on 2 people</p></div>
                <span className="font-display text-4xl text-brand-gold">$35<span className="text-lg">/night</span></span>
              </div>
              <div className="bg-surface-secondary rounded-lg p-4 mb-6 text-sm text-brand-navy/70 space-y-1">
                <p>Electric hookup: +$5.00/night</p>
                <p>Additional guests: $5.00/day per person</p>
                <p>Plus 6% South Dakota state tax</p>
              </div>
              <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center">
                Book Your Tent Site <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <BookingCTA title="Ready for Your Camping Adventure?" />
    </>
  );
}
