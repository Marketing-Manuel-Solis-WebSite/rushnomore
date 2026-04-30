import Link from 'next/link';
import { SITE, RALLY_RV } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema, articleSchema, eventSchema, speakableSchema } from '@/lib/seo';
import { CheckCircle, ExternalLink, Phone, ArrowRight, Info } from 'lucide-react';

const RATES_FAQ = [
  { q: 'Are rally rates per night or a package?', a: 'Rally rates are 10-night packages covering the full rally week. Pre-rally rates are sold per night for arrivals before the rally window begins.' },
  { q: 'Do rates include all amenities?', a: 'Yes. Every stay includes heated pool, hot tub spas, beer garden access, bathhouses, Wi-Fi, bike wash, game room, nature trails and 24/7 gated security.' },
  { q: 'What is the deposit and cancellation policy for rally?', a: 'Rally reservations require a larger deposit than standard stays and follow a rally-specific cancellation schedule. See our Policies page for full terms or call 605-423-2545.' },
  { q: 'Can I add extra nights before or after rally?', a: 'Yes — add pre-rally nights at the pre-rally rate. Post-rally availability is limited; book ahead.' },
  { q: 'Do you offer monthly RV rates outside rally?', a: 'Yes. Monthly and extended-stay options are available outside rally. See our Monthly RV Sites page.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(RATES_FAQ)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Sturgis Rally Camping', url: '/sturgis-rally-camping' },
        { name: 'Rally Rates 2026', url: '/rally-rates' },
      ])} />
      <JsonLd data={articleSchema({
        headline: 'Sturgis Motorcycle Rally Rates 2026 — RV, Cabin & Tent Pricing',
        description:
          'Complete 2026 Sturgis Motorcycle Rally rate table at Rush No More — 10-night rally packages, pre-rally per-night pricing, full hookups, luxury and luxury-spa sites, presidential cabins and tent sites. 5 miles from Main Street Sturgis.',
        image: '/images/BikeRally/IMG_9865.JPG',
        url: '/rally-rates',
        datePublished: '2025-09-01',
        dateModified: '2026-04-22',
        wordCount: 600,
        keywords: [
          'sturgis rally rates 2026',
          'sturgis motorcycle rally pricing',
          'rally camping rates sturgis',
          'rv sites rally rates',
          'sturgis rally cabin rates',
          '10 night rally package',
          'pre-rally rates sturgis',
          'sturgis 2026 reservations',
        ],
      })} />
      <JsonLd data={eventSchema({
        name: '85th Sturgis Motorcycle Rally — Camping at Rush No More',
        description:
          'Camp at Rush No More — 5 miles from Main Street Sturgis — for the 2026 Sturgis Motorcycle Rally. RV, presidential cabin and tent options. Full hookups, luxury sites, on-site beer garden and bike wash.',
        startDate: '2026-08-02',
        endDate: '2026-08-18',
        image: '/images/BikeRally/IMG_9865.JPG',
        price: '650',
        url: 'https://www.rushnomore.com/rally-rates',
      })} />
      <JsonLd data={speakableSchema('/rally-rates', ['h1', 'h2'])} />

      <Breadcrumbs
        items={[
          { name: 'Sturgis Rally Camping', url: '/sturgis-rally-camping' },
          { name: 'Rally Rates', url: '/rally-rates' },
        ]}
      />

      <section className="bg-brand-navy text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-5">
            ★ 2026 Rally Pricing ★
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Sturgis Rally Rates <span className="text-brand-gold italic">2026</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Transparent pricing for every site type. Rally packages are sold as 10-night bundles.
            Pre-rally nights priced separately so you can arrive early and settle in.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="overflow-x-auto rounded-2xl border-2 border-brand-gold/15 shadow-lodge">
            <table className="w-full">
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest font-bold">Site Type</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-widest font-bold">Rally (10 nights)</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-widest font-bold">Pre-Rally (per night)</th>
                </tr>
              </thead>
              <tbody>
                {RALLY_RV.map((r, i) => (
                  <tr
                    key={r.name}
                    className={`${i % 2 === 0 ? 'bg-surface-primary' : 'bg-white'} ${r.popular ? 'ring-2 ring-inset ring-brand-gold/40' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <span className="block font-bold text-brand-navy">{r.name}</span>
                      {r.popular && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-brand-gold text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                          Most Popular
                        </span>
                      )}
                      <ul className="mt-2 space-y-0.5">
                        {r.features.map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-xs text-brand-navy/60">
                            <CheckCircle className="w-3 h-3 text-brand-gold" /> {f}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-display text-2xl font-bold text-brand-gold">{r.rally}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-display text-xl font-bold text-brand-navy">{r.pre}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-6 flex gap-4">
            <Info className="w-6 h-6 text-brand-gold flex-shrink-0" />
            <div className="text-sm text-brand-navy/80 leading-relaxed">
              <strong className="text-brand-navy">All rates include full amenity access</strong> — heated pool, hot tub spas, beer garden,
              bike wash, bathhouses, Wi-Fi, game room and 24/7 gated security. Cabin rally rates and tent rally rates available on request —
              call <a href={`tel:${SITE.phoneTel}`} className="text-brand-gold font-bold hover:underline">{SITE.phone}</a> or book online.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold hover:brightness-110 transition-all uppercase tracking-wider"
            >
              Book Rally Site <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy rounded-xl hover:bg-brand-navy hover:text-white transition-all"
            >
              <Phone className="w-5 h-5" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-primary">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Rate FAQ</h2>
          <div className="space-y-3">
            {RATES_FAQ.map((f) => (
              <details key={f.q} className="group bg-white rounded-xl p-5 border border-brand-gold/10">
                <summary className="font-bold cursor-pointer flex justify-between">
                  {f.q}
                  <span className="text-brand-gold group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-brand-navy/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-brand-gold/10">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          <Link href="/sturgis-rally-camping" className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all">
            Rally Camping Overview <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/stay/rv-sites" className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all">
            RV Sites <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/stay/cabins" className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all">
            Cabins <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/monthly-rv-sites" className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all">
            Monthly RV Rates <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/policies" className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all">
            Cancellation Policy <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <BookingCTA title="Ready to Lock In Rally 2026?" subtitle="Rally sites sell out every year. Reserve today." />
    </>
  );
}
