import Link from 'next/link';
import { SITE, RV_TIERS } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, campgroundSchema } from '@/lib/seo';
import {
  MapPin, CheckCircle, Truck, Zap, Wifi, Shield, Phone, ArrowRight,
  ExternalLink, Waves, Beer, Snowflake, Sun, Mountain, Bike,
} from 'lucide-react';

const FAQ = [
  {
    q: 'How far is this RV park from Mount Rushmore?',
    a: 'Rush No More sits 55 miles (about 1 hour) from Mount Rushmore National Memorial. Base camp here and reach the monument, Crazy Horse, Custer State Park and Needles Highway all on day trips.',
  },
  {
    q: 'Do you have full hookup RV sites?',
    a: 'Yes — we have 200+ RV sites with full hookups (water, electric and sewer), 30 and 50 AMP service, pull-throughs up to 100 ft long, plus luxury sites with cement slabs, gas BBQ and private hot tubs.',
  },
  {
    q: 'What are your RV site prices?',
    a: 'Water/Electric back-in sites start at $41.22/night, Full Hookup back-in at $51.76, Full Hookup pull-through and Luxury sites at $62.36, and Luxury Spa sites with a private hot tub at $72.93. Rally and monthly rates differ — call for current pricing.',
  },
  {
    q: 'Do you offer monthly RV rates?',
    a: 'Yes — monthly RV rates are available in shoulder and off-season windows (rally week is excluded). Electric is typically metered separately for monthly guests. Call for current monthly availability and pricing.',
  },
  {
    q: 'Are cheap RV sites with hookups available?',
    a: 'Our Water/Electric back-in sites are our most affordable hookup option at $41.22/night and include 30 AMP service and water. Nightly, weekly and monthly rates are all available outside rally week.',
  },
  {
    q: 'What amenities are included?',
    a: 'Heated pool, multiple hot tubs, beer garden with live music, game room, free Wi-Fi, modern bathhouses, laundromat, bike wash, camp store, nature trails, picnic pavilions, pet-friendly sites and 24/7 gated security.',
  },
  {
    q: 'Is the RV park open year-round?',
    a: 'RV sites are open year-round. Pool, hot tubs and some luxury amenities are seasonal (May–October). Freeze-season water management is handled on site for winter guests.',
  },
  {
    q: 'How close is the park to Sturgis and Deadwood?',
    a: 'We are 5 miles from Main Street Sturgis (~7 minutes) and 12 miles from historic Deadwood (~15 minutes). I-90 Exit 37 puts you right on our road.',
  },
];

const NEARBY = [
  { name: 'Mount Rushmore National Memorial', dist: '55 mi', time: '~1 hr' },
  { name: 'Main Street Sturgis', dist: '5 mi', time: '~7 min' },
  { name: 'Historic Deadwood', dist: '12 mi', time: '~15 min' },
  { name: 'Spearfish Canyon', dist: '25 mi', time: '~30 min' },
  { name: 'Rapid City', dist: '30 mi', time: '~35 min' },
  { name: 'Crazy Horse Memorial', dist: '60 mi', time: '~1 hr' },
  { name: 'Needles Highway', dist: '65 mi', time: '~1.5 hr' },
  { name: 'Custer State Park', dist: '70 mi', time: '~1.5 hr' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={campgroundSchema()} />
      <JsonLd data={faqSchema(FAQ)} />

      <Breadcrumbs items={[{ name: 'RV Park Near Mount Rushmore', url: '/rv-park-near-mount-rushmore' }]} />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/Aereal-2_1400.png')" }}
          role="img"
          aria-label="Aerial view of Rush No More RV Park in the Black Hills near Mount Rushmore"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
            ★ RV Park Near Mount Rushmore — Open Year-Round ★
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-5 leading-tight">
            RV Park Near <span className="text-brand-gold italic">Mount Rushmore</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
            Rush No More RV Resort in Sturgis, SD — your Black Hills base camp for Mount Rushmore, Deadwood,
            Crazy Horse and Sturgis Rally. <strong>200+ full-hookup RV sites</strong>, pull-throughs up to 100 ft,
            heated pool, hot tubs and beer garden. Nightly, weekly and monthly rates — book online or call today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold hover:brightness-110 transition-all uppercase tracking-wider"
            >
              Book My RV Site <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white rounded-xl hover:bg-white hover:text-brand-navy transition-all"
            >
              <Phone className="w-5 h-5" /> {SITE.phone}
            </a>
          </div>
          <p className="mt-6 text-white/70 text-sm">
            <MapPin className="inline w-4 h-4 mr-1 -mt-1" />
            {SITE.address} · I-90 Exit 37
          </p>
        </div>
      </section>

      {/* Why choose / Quick facts */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Why Travelers Choose Rush No More Near Mount Rushmore
          </h2>
          <p className="text-brand-navy/70 text-center max-w-2xl mx-auto mb-12">
            Looking for an RV park near me, cheap RV sites with hookups, or a quiet RV park in South Dakota?
            You&apos;re in the right place — here&apos;s what sets us apart.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Mountain, t: '55 mi to Mount Rushmore', d: 'Centrally located for Mount Rushmore, Crazy Horse, Deadwood and the Black Hills.' },
              { icon: Truck, t: '200+ Full Hookup Sites', d: 'Water, electric, sewer. 30/50 AMP. Pull-throughs up to 100 ft for big rigs.' },
              { icon: Waves, t: 'Pool, Hot Tubs, Beer Garden', d: 'Heated pool, multiple hot tubs, live music, game room — 16+ free amenities.' },
              { icon: Shield, t: '24/7 Gated Security', d: 'Rest easy knowing your rig, tow vehicle and gear stay safe at every stay.' },
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

      {/* RV site types & prices */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            RV Sites &amp; Nightly Rates
          </h2>
          <p className="text-brand-navy/70 text-center max-w-2xl mx-auto mb-12">
            From affordable water/electric back-ins to luxury spa sites with a private hot tub — every site includes
            Wi-Fi, bathhouse access and all 16 park amenities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RV_TIERS.map((r) => (
              <div
                key={r.name}
                className={`rounded-2xl p-6 border-2 ${r.badge ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/15 bg-surface-primary'}`}
              >
                {r.badge && (
                  <span className="inline-block px-3 py-1 bg-brand-gold text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                    {r.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-lg mb-2">{r.name}</h3>
                <div className="mb-4">
                  <span className="block text-3xl font-display font-bold text-brand-gold">{r.price}</span>
                  <span className="block text-xs text-brand-stone font-semibold uppercase tracking-wider">{r.note} / night</span>
                </div>
                <ul className="space-y-2">
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
              href="/stay/rv-sites"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition-all uppercase tracking-wider text-sm"
            >
              See All RV Site Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Long-term / monthly */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-xs font-black uppercase tracking-widest rounded-full mb-4">
                Monthly &amp; Long-Term Stays
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Monthly RV Rates in the Black Hills
              </h2>
              <p className="text-brand-navy/75 leading-relaxed mb-6">
                Snowbirds, workampers and seasonal residents — we offer monthly RV rates in shoulder and off-season
                windows with full hookups, 30/50 AMP, Wi-Fi and 24/7 gated security. Rally week (early August) is
                excluded. Call for current monthly availability and rates.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/monthly-rv-sites"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-white font-bold rounded-xl uppercase tracking-wider text-sm"
                >
                  Monthly RV Sites <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy font-bold rounded-xl uppercase tracking-wider text-sm hover:bg-brand-navy hover:text-white transition-all"
                >
                  <Phone className="w-4 h-4" /> Call for Rates
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Snowflake, t: 'Year-Round RV Sites' },
                { icon: Sun, t: 'Seasonal Pool & Hot Tubs' },
                { icon: Zap, t: '30 / 50 AMP Service' },
                { icon: Wifi, t: 'Free Park-Wide Wi-Fi' },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="bg-white rounded-xl p-5 border border-brand-gold/15">
                  <Icon className="w-6 h-6 text-brand-gold mb-2" />
                  <p className="font-bold text-sm text-brand-navy">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's nearby — distance table */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            What&apos;s Near the Park
          </h2>
          <p className="text-brand-navy/70 text-center max-w-2xl mx-auto mb-10">
            A central base for every Black Hills attraction — drive times from Rush No More.
          </p>
          <div className="bg-surface-primary rounded-2xl border border-brand-gold/15 overflow-hidden">
            <table className="w-full">
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-bold">Destination</th>
                  <th className="text-right px-5 py-3 font-bold">Distance</th>
                  <th className="text-right px-5 py-3 font-bold">Drive Time</th>
                </tr>
              </thead>
              <tbody>
                {NEARBY.map((n, i) => (
                  <tr key={n.name} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-primary'}>
                    <td className="px-5 py-3 font-semibold text-brand-navy">{n.name}</td>
                    <td className="px-5 py-3 text-right text-brand-navy/80">{n.dist}</td>
                    <td className="px-5 py-3 text-right text-brand-navy/80">{n.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Amenities strip */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Full Hookups &amp; 16+ Free Amenities
          </h2>
          <p className="text-brand-navy/70 text-center max-w-2xl mx-auto mb-12">
            Everything you need for a comfortable stay — included at every RV site.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, t: 'Full Hookups' },
              { icon: Zap, t: '30 / 50 AMP' },
              { icon: Waves, t: 'Heated Pool' },
              { icon: Beer, t: 'Beer Garden' },
              { icon: Wifi, t: 'Free Wi-Fi' },
              { icon: Shield, t: 'Gated Security' },
              { icon: Bike, t: 'Bike Wash' },
              { icon: Mountain, t: 'Nature Trails' },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="bg-white rounded-xl p-5 border border-brand-gold/15 text-center">
                <Icon className="w-6 h-6 text-brand-gold mx-auto mb-2" />
                <p className="font-bold text-sm text-brand-navy">{t}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition-all uppercase tracking-wider text-sm"
            >
              See All Amenities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Plan Your Black Hills Trip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'Sturgis Rally Camping', d: 'RV sites, cabins & tent packages for the Sturgis Motorcycle Rally — 5 miles from Main Street.', href: '/sturgis-rally-camping' },
              { t: 'Black Hills Itinerary', d: 'A 6-day Black Hills itinerary from your base at Rush No More — Mount Rushmore, Deadwood & more.', href: '/black-hills-itinerary' },
              { t: 'Cabins & Tent Camping', d: '16 Presidential cabins and 20+ shaded tent sites under Ponderosa pines for non-RV travelers.', href: '/stay' },
            ].map(({ t, d, href }) => (
              <Link
                key={href}
                href={href}
                className="group block bg-surface-primary rounded-2xl p-7 shadow-lodge hover:shadow-gold-lg transition-all border border-brand-gold/10"
              >
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
      <section className="py-20 bg-surface-primary">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            RV Park Near Mount Rushmore — FAQ
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-10" />
          <div className="space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-white rounded-xl p-5 border border-brand-gold/10">
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

      <BookingCTA
        title="Book Your RV Site Near Mount Rushmore"
        subtitle="Full hookups, quiet Black Hills setting, 5 miles from Sturgis. Nightly, weekly & monthly rates available."
      />
    </>
  );
}
