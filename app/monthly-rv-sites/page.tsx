import Link from 'next/link';
import { SITE } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema, articleSchema, serviceSchema, speakableSchema } from '@/lib/seo';
import { Phone, ArrowRight, Truck, Zap, Wifi, Shield, Snowflake, Sun } from 'lucide-react';

const FAQ = [
  { q: 'Are monthly rates available year-round?', a: 'The RV park is open year-round. Monthly rates are available in shoulder and off-season windows; rally-week dates (early August) are excluded. Call for current monthly availability.' },
  { q: 'What&apos;s included with a monthly RV site?', a: 'Full hookups (water/electric/sewer), 30/50 AMP service, complimentary Wi-Fi, bathhouse access, laundromat, pool when seasonal, beer garden access and friendly on-site staff.' },
  { q: 'Can I stay through the winter?', a: 'Yes — the park operates year-round for RV guests. Pool and some luxury amenities are seasonal (May–October). Freeze-season water management is handled on site.' },
  { q: 'Is there a minimum stay for monthly rates?', a: 'Monthly rates require a 28-night commitment. For shorter extended stays, weekly rates may apply.' },
  { q: 'Do monthly rates include electric?', a: 'Electric is typically metered and billed separately from the site rate for monthly guests. Call for current billing structure.' },
  { q: 'Is mail delivery available?', a: 'Package receiving is available at the office. Confirm delivery arrangements with the front desk on arrival.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Stay', url: '/stay' },
        { name: 'Monthly RV Sites', url: '/monthly-rv-sites' },
      ])} />
      <JsonLd data={articleSchema({
        headline: 'Monthly RV Sites in Sturgis, SD — Long-Term RV Living in the Black Hills',
        description:
          'Long-term, full-hookup RV sites at Rush No More in Sturgis, SD. Year-round operation, 30/50 AMP, friendly on-site staff, snowbird and workamper-friendly — 12 miles to Deadwood, 55 to Mount Rushmore.',
        image: '/images/rv-camper-van.png',
        url: '/monthly-rv-sites',
        datePublished: '2025-08-01',
        dateModified: '2026-04-22',
        wordCount: 600,
        keywords: [
          'monthly rv sites sturgis',
          'long term rv sites south dakota',
          'snowbird rv park black hills',
          'workamper rv site sturgis',
          'extended stay rv sites',
          'monthly rv rates sturgis sd',
          'year round rv park black hills',
          'monthly campground sturgis',
        ],
      })} />
      <JsonLd data={serviceSchema({
        name: 'Monthly RV Sites — Long-Term Stays at Rush No More',
        description:
          'Full-hookup monthly RV sites at Rush No More in Sturgis, SD. Year-round operation with 30/50 AMP service, complimentary Wi-Fi, friendly on-site staff and access to free resort amenities.',
        url: '/monthly-rv-sites',
        image: '/images/rv-camper-van.png',
        priceMin: '600',
        priceMax: '1200',
        serviceType: 'Long-term RV Site Rental',
      })} />
      <JsonLd data={speakableSchema('/monthly-rv-sites', ['h1', 'h2'])} />
      <Breadcrumbs items={[{ name: 'Monthly RV Sites', url: '/monthly-rv-sites' }]} />

      <section className="bg-brand-navy text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-5">
            ★ Long-Term RV Living ★
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Monthly RV Sites in <span className="text-brand-gold italic">Sturgis, SD</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Full-hookup sites for extended stays in the Black Hills. Quiet, gated, 5 miles from Sturgis,
            12 miles from Deadwood, 55 from Mount Rushmore. Snowbirds, workampers, seasonal residents — welcome.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-10">What Monthly Guests Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Truck, t: 'Full Hookups', d: 'Water, electric and sewer on full-hookup monthly sites.' },
              { icon: Zap, t: '30 / 50 AMP', d: 'Both amperages available — big rigs welcome.' },
              { icon: Wifi, t: 'Complimentary Wi-Fi', d: 'Stay connected throughout the resort.' },
              { icon: Shield, t: 'Friendly On-Site Staff', d: 'On-site staff during business hours with after-hours on-call assistance.' },
              { icon: Sun, t: 'Seasonal Amenities', d: 'Pool, hot tubs and beer garden May–October.' },
              { icon: Snowflake, t: 'Year-Round Operation', d: 'RV sites open through winter with cold-weather protocols.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-surface-primary rounded-2xl p-6 border border-brand-gold/15">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t}</h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Who This Is For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { t: 'Snowbirds', d: 'Escape cold-weather states with a quiet, safe basecamp in the Black Hills.' },
              { t: 'Workampers', d: 'Extended stays for workamping assignments in the region.' },
              { t: 'Seasonal Residents', d: 'Summer or off-season residents who want the same site for months at a time.' },
            ].map((x) => (
              <div key={x.t} className="bg-white rounded-xl p-6 shadow-lodge border border-brand-gold/10">
                <h3 className="font-display font-bold text-xl mb-2">{x.t}</h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Monthly Rate FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-surface-primary rounded-xl p-5 border border-brand-gold/10">
                <summary className="font-bold cursor-pointer flex justify-between">
                  {f.q}
                  <span className="text-brand-gold group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-brand-navy/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-4">Call for Monthly Availability</h2>
          <p className="text-white/70 mb-8">
            Monthly rates and availability change by season. Call us directly for current rates,
            pad availability and move-in dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold uppercase tracking-wider">
              <Phone className="w-5 h-5" /> Call {SITE.phone}
            </a>
            <Link href="/stay/rv-sites" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-xl hover:bg-white hover:text-brand-navy transition-all font-bold uppercase tracking-wider text-sm">
              See RV Site Types <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-brand-gold/10">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          <Link href="/stay/rv-sites" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">RV Site Types</Link>
          <Link href="/stay/cabins" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Presidential Cabins</Link>
          <Link href="/sturgis-rally-camping" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Rally Camping</Link>
          <Link href="/rally-rates" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Rally Rates 2026</Link>
          <Link href="/amenities" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">All Amenities</Link>
          <Link href="/policies" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Policies</Link>
        </div>
      </section>

      <BookingCTA title="Looking for a Long-Term Site?" subtitle="Monthly rates available — call for current availability." />
    </>
  );
}
