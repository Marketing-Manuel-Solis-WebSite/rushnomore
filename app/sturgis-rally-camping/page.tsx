import Link from 'next/link';
import { SITE, RALLY_RV } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { eventSchema, faqSchema } from '@/lib/seo';
import {
  Bike, MapPin, Beer, Shield, Music, Truck, Home, Tent,
  ArrowRight, ExternalLink, Phone, CheckCircle, Clock,
} from 'lucide-react';

const RALLY_FAQ = [
  { q: 'When is the 2026 Sturgis Motorcycle Rally?', a: 'The 2026 Sturgis Rally runs August 2–18, 2026 (officially August 8–17, with pre-rally activity starting earlier). Rush No More accepts rally bookings across the full window.' },
  { q: 'How far is Rush No More from Main Street Sturgis?', a: 'Rush No More sits 5 miles (about 7 minutes) from Main Street Sturgis — close enough to ride in at any hour, far enough that the campground stays quiet at night.' },
  { q: 'When should I book for Sturgis Rally?', a: 'Book 6–12 months in advance. We sell out every year, and most rally-ready sites go by early spring for the following August.' },
  { q: 'Is there a minimum-night requirement during rally?', a: 'Yes — rally packages are sold as multi-night bundles (typically 10 nights). See current rally rates on our Rally Rates page for exact pricing.' },
  { q: 'Can I tent camp during the rally?', a: 'Yes. We hold dedicated tent sites under Ponderosa pines with full bathhouse access and pool privileges.' },
  { q: 'Is there food and drink on site during rally?', a: 'Our beer garden runs extended hours through rally with live music, and the cafe opens for all 10 days of rally (weekends only off-season).' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={eventSchema({
        name: 'Sturgis Motorcycle Rally 2026 — Rush No More Base Camp',
        description: 'Rush No More is your Sturgis Rally base camp — 5 miles from Main Street Sturgis with RV sites, cabins, tent camping, beer garden, pool and hot tubs.',
        startDate: '2026-08-02',
        endDate: '2026-08-18',
        image: '/images/BikeRally/IMG_9865.JPG',
        price: '899',
        url: `https://www.rushnomore.com/sturgis-rally-camping`,
      })} />
      <JsonLd data={faqSchema(RALLY_FAQ)} />

      <Breadcrumbs items={[{ name: 'Sturgis Rally Camping', url: '/sturgis-rally-camping' }]} />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/BikeRally/IMG_9865.JPG')" }}
          role="img"
          aria-label="Motorcycles at Rush No More during the Sturgis Motorcycle Rally"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
            ★ Official Rally HQ Since 2014 ★
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-5 leading-tight">
            Sturgis Rally Camping <span className="text-brand-gold italic">2026</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
            Your Black Hills base camp for the 86th Sturgis Motorcycle Rally — <strong>5 miles from Main Street</strong>,
            full amenities, and over a decade of hosting the world&apos;s largest rally. RV sites, presidential cabins,
            and tent camping — all with pool, hot tubs and beer garden.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold hover:brightness-110 transition-all uppercase tracking-wider"
            >
              Book My Rally Spot <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white rounded-xl hover:bg-white hover:text-brand-navy transition-all"
            >
              <Phone className="w-5 h-5" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Why Rush No More for rally */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Why Riders Choose Rush No More for Rally
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: MapPin, t: '5 Miles to Main Street', d: 'Ride into Sturgis in under 10 minutes — sleep somewhere peaceful.' },
              { icon: Beer, t: 'On-Site Beer Garden', d: 'Cold drinks, live music and rally camaraderie steps from your site.' },
              { icon: Shield, t: 'Friendly On-Site Staff', d: 'On-site staff during business hours with after-hours on-call assistance.' },
              { icon: Bike, t: 'Rides in Every Direction', d: 'Needles Highway, Spearfish Canyon, Iron Mountain Road — all in reach.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-white rounded-2xl p-6 shadow-lodge border border-brand-gold/10">
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

      {/* Rally site types */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Rally Site Types & Rates
          </h2>
          <p className="text-brand-navy/70 text-center max-w-2xl mx-auto mb-12">
            Full 10-day rally bundles. Pre-rally stays are available at reduced rates to ease your arrival.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {RALLY_RV.map((r) => (
              <div
                key={r.name}
                className={`rounded-2xl p-6 border-2 ${r.popular ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/15 bg-surface-primary'}`}
              >
                {r.popular && (
                  <span className="inline-block px-3 py-1 bg-brand-gold text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display font-bold text-lg mb-2">{r.name}</h3>
                <div className="mb-4">
                  <span className="block text-3xl font-display font-bold text-brand-gold">{r.rally}</span>
                  <span className="block text-xs text-brand-stone font-semibold uppercase tracking-wider">Rally 10 nights</span>
                  <span className="block text-sm text-brand-navy/60 mt-1">Pre-rally: {r.pre}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-brand-navy/80">
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/rally-rates"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition-all uppercase tracking-wider text-sm"
            >
              See All Rally Rates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Accommodation cross-links */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Choose Your Rally Stay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, t: 'RV Sites for Rally', d: 'Full-hookup pull-throughs, 30/50 AMP, luxury and spa sites available.', href: '/stay/rv-sites' },
              { icon: Home, t: 'Presidential Cabins', d: '20 cabins (19 named after US Presidents plus the JFK House) — sleep 2 to 10 guests.', href: '/stay/cabins' },
              { icon: Tent, t: 'Rally Tent Camping', d: 'Shaded tent sites under Ponderosa pines. Bathhouse + pool access.', href: '/stay/tent-camping' },
            ].map(({ icon: Icon, t, d, href }) => (
              <Link key={href} href={href} className="group block bg-white rounded-2xl p-8 shadow-lodge hover:shadow-gold-lg transition-all border border-brand-gold/10">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-brand-gold transition-colors">
                  <Icon className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{t}</h3>
                <p className="text-brand-navy/70 leading-relaxed mb-5">{d}</p>
                <span className="inline-flex items-center gap-1.5 text-brand-gold font-bold text-sm uppercase tracking-wider">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Sturgis Rally Camping FAQ
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-10" />
          <div className="space-y-4">
            {RALLY_FAQ.map((f) => (
              <details key={f.q} className="group bg-surface-primary rounded-xl p-5 border border-brand-gold/10">
                <summary className="font-bold text-brand-navy cursor-pointer flex items-center justify-between">
                  {f.q}
                  <span className="text-brand-gold group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-brand-navy/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Rally rides */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Clock className="w-10 h-10 text-brand-gold mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Rides From Camp</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Every legendary Black Hills ride starts at your door. From Rush No More you can hit Deadwood in 15 minutes,
            Spearfish Canyon in 30, and loop Needles Highway + Iron Mountain Road in an afternoon.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/sturgis-rally" className="px-5 py-3 bg-brand-gold text-white font-bold rounded-xl uppercase tracking-wider text-sm">
              Full 2026 Rally Guide
            </Link>
            <Link href="/best-motorcycle-rides-near-sturgis" className="px-5 py-3 border border-white/30 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/10">
              Top Rides Near Sturgis
            </Link>
            <Link href="/deadwood-day-trip" className="px-5 py-3 border border-white/30 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/10">
              Deadwood Day Trip
            </Link>
            <Link href="/needles-highway-guide" className="px-5 py-3 border border-white/30 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/10">
              Needles Highway Guide
            </Link>
            <Link href="/iron-mountain-road-guide" className="px-5 py-3 border border-white/30 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/10">
              Iron Mountain Road Guide
            </Link>
          </div>
        </div>
      </section>

      <BookingCTA
        title="Book Your Sturgis Rally Spot"
        subtitle="We sell out every year. Lock in your 2026 rally stay today."
      />
    </>
  );
}
