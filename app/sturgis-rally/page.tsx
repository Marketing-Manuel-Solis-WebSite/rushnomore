import Link from 'next/link';
import Image from 'next/image';
import { SITE, RALLY_RV } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { eventSchema, faqSchema } from '@/lib/seo';
import {
  Bike, MapPin, Calendar, Users, Trophy, Flag,
  ArrowRight, ExternalLink, Phone, CheckCircle, Star,
  Beer, Shield, Wind, Heart,
} from 'lucide-react';

const RALLY_GALLERY = [
  { src: '/images/BikeRally/IMG_9865.JPG', alt: 'Motorcycles parked at Rush No More during the Sturgis Motorcycle Rally' },
  { src: '/images/BikeRally/IMG_9866.JPG', alt: 'Sturgis Rally riders gathered at Rush No More base camp' },
  { src: '/images/BikeRally/IMG_9867.JPG', alt: 'Custom motorcycle at Sturgis Rally near Rush No More' },
  { src: '/images/BikeRally/IMG_9868.JPG', alt: 'Sturgis Rally bikes lined up on a Black Hills morning' },
  { src: '/images/BikeRally/IMG_9869.JPG', alt: 'Riders relaxing at Rush No More during the Sturgis Motorcycle Rally' },
];

const RALLY_FACTS = [
  { icon: Calendar, label: 'Official 2026 Dates', value: 'August 2 – 18, 2026' },
  { icon: Trophy, label: 'Edition', value: '86th Annual Rally' },
  { icon: Users, label: 'Attendance', value: '500,000+ riders' },
  { icon: Flag, label: 'Founded', value: '1938' },
  { icon: MapPin, label: 'From Rush No More', value: '5 mi to Main Street' },
  { icon: Bike, label: 'Ride Time to Sturgis', value: '~7 minutes' },
];

const RALLY_AMENITIES = [
  { icon: Beer, t: 'On-Site Beer Garden', d: 'Cold drinks and rally atmosphere on the property — open extended hours during rally.' },
  { icon: Shield, t: 'Friendly On-Site Staff', d: 'On-site staff during business hours with after-hours on-call assistance.' },
  { icon: MapPin, t: '5 Miles to Main Street', d: 'Roll into Sturgis in about 7 minutes — close to the action, peaceful at night.' },
  { icon: Star, t: '10+ Years Hosting Rally', d: 'Rally-savvy staff and a proven base camp with a strong repeat-rider community.' },
  { icon: CheckCircle, t: 'All Resort Amenities Included', d: 'Heated pool, hot tubs, game room, laundry, Wi-Fi, propane sales, camp store and more.' },
];

const RALLY_RIDES = [
  { name: 'Spearfish Canyon Byway', miles: '~50 mi loop', notes: 'Waterfalls, limestone cliffs and the twisty US-14A scenic byway.', href: '/spearfish-canyon-guide' },
  { name: 'Iron Mountain Road', miles: '17 mi', notes: 'Pigtail bridges and three tunnels framing Mount Rushmore.', href: '/iron-mountain-road-guide' },
  { name: 'Needles Highway', miles: '14 mi', notes: 'Granite spires, narrow tunnels and tight curves on SD-87.', href: '/needles-highway-guide' },
  { name: 'Deadwood Day Trip', miles: '12 mi', notes: 'Historic Wild West gold rush town just 15 minutes from camp.', href: '/deadwood-day-trip' },
];

const RALLY_FAQ = [
  { q: 'When is the 2026 Sturgis Motorcycle Rally?', a: 'The 86th Annual Sturgis Motorcycle Rally runs August 2–18, 2026. Rush No More accepts rally bookings across the full window.' },
  { q: 'How many people attend the Sturgis Rally?', a: 'The Sturgis Motorcycle Rally consistently draws around 500,000 riders and visitors, making it the world\'s largest motorcycle gathering.' },
  { q: 'When did the Sturgis Rally start?', a: 'The first rally was held in 1938 by the Jackpine Gypsies Motorcycle Club. It has been held annually ever since and grown into the international event it is today.' },
  { q: 'How far is Rush No More from Main Street Sturgis?', a: 'Rush No More sits 5 miles from Main Street Sturgis — about a 7-minute ride. Close enough to roll in any time, far enough that the campground stays peaceful at night.' },
  { q: 'What rides start from Rush No More?', a: 'From camp you can reach Iron Mountain Road, Needles Highway, Spearfish Canyon and Deadwood within minutes. Mount Rushmore and Custer State Park are also short rides away.' },
  { q: 'Where should I stay for Sturgis Rally?', a: 'Rush No More has been a premier rally base camp for over a decade — RV sites, presidential cabins, tent camping, an on-site beer garden, pool, hot tubs and friendly on-site staff. See our Rally Camping page to book.' },
  { q: 'When should I book for the rally?', a: 'Book 6–12 months in advance. Rush No More sells out every year, and rally-ready sites go quickly for the following August.' },
  { q: 'Are non-riders welcome at the rally?', a: 'Yes. Sturgis Rally is family-friendly during the day — Main Street, vendor expos, food trucks, live music and Black Hills sightseeing make it a great trip for spouses, friends and kids.' },
  { q: 'Is there an on-site rally event at Rush No More?', a: 'Yes — Rush No More hosts an annual Charity Auction Night during rally to benefit the Combat Veterans Motorcycle Association SD 30-1, with silent auction, live auction and raffles. See the event details on this page.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={eventSchema({
        name: '86th Annual Sturgis Motorcycle Rally 2026',
        description: 'The 86th Sturgis Motorcycle Rally runs August 2–18, 2026 in Sturgis, South Dakota — the world\'s largest motorcycle gathering. Rush No More is your base camp 5 miles from Main Street.',
        startDate: '2026-08-02',
        endDate: '2026-08-18',
        image: '/images/BikeRally/IMG_9865.JPG',
        url: 'https://www.rushnomore.com/sturgis-rally',
      })} />
      <JsonLd data={eventSchema({
        name: '86th Sturgis Bike Rally — Charity Auction Night at Rush No More',
        description: 'Charity Auction Night during the Sturgis Motorcycle Rally — silent auction, live auction and raffles benefiting the Combat Veterans Motorcycle Association SD 30-1. Hosted at Rush No More RV Resort, 21137 Brimstone Pl, Sturgis, SD. Bar / Beer Garden available.',
        startDate: '2026-08-11T19:00:00-06:00',
        endDate: '2026-08-11T23:00:00-06:00',
        image: '/images/posts/auctionnight.png',
        url: 'https://www.rushnomore.com/sturgis-rally',
      })} />
      <JsonLd data={faqSchema(RALLY_FAQ)} />

      <Breadcrumbs items={[{ name: 'Sturgis Motorcycle Rally 2026', url: '/sturgis-rally' }]} />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/BikeRally/IMG_9865.JPG')" }}
          role="img"
          aria-label="Motorcycles at Rush No More during the Sturgis Motorcycle Rally"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 to-brand-navy/30" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
            ★ 86th Annual · August 2–18, 2026 ★
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.05]">
            Sturgis Motorcycle Rally <span className="text-brand-gold italic">2026</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
            The world&apos;s largest motorcycle gathering — and Rush No More is your Black Hills base camp,
            <strong> 5 miles from Main Street Sturgis</strong>. Over a decade as a rally HQ, beer garden on
            site, and every legendary ride within minutes of your tent, cabin or RV.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sturgis-rally-camping"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold hover:brightness-110 transition-all uppercase tracking-wider"
            >
              Book Rally Camping <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/rally-rates"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white rounded-xl hover:bg-white hover:text-brand-navy transition-all"
            >
              See Rally Rates
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white rounded-xl hover:bg-white hover:text-brand-navy transition-all"
            >
              <Phone className="w-5 h-5" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Sturgis Rally 2026 at a Glance
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {RALLY_FACTS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-5 shadow-lodge border border-brand-gold/10 text-center">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="text-xs uppercase tracking-wider text-brand-stone font-semibold mb-1">{label}</p>
                <p className="font-display font-bold text-brand-navy text-base md:text-lg leading-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is the rally */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            What Is the Sturgis Motorcycle Rally?
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-10" />
          <div className="space-y-5 text-brand-navy/80 leading-relaxed text-lg">
            <p>
              The <strong>Sturgis Motorcycle Rally</strong> is the largest gathering of riders on the
              planet — an annual pilgrimage to the Black Hills of South Dakota that has shaped American
              motorcycle culture since <strong>1938</strong>. What began with nine riders organized by
              the Jackpine Gypsies Motorcycle Club has grown into a global event drawing hundreds of
              thousands of attendees every August.
            </p>
            <p>
              The rally takes over the small town of <strong>Sturgis, South Dakota</strong> and spreads
              across the Black Hills — Main Street fills with vendor booths and custom bikes, and
              legendary roads like Iron Mountain, Needles Highway and Spearfish Canyon become rolling
              tributes to motorcycling.
            </p>
            <p>
              Rush No More has been a <strong>premier rally headquarters for more than a decade</strong>.
              Just 5 miles from Main Street, our 156 RV sites, 20 presidential cabins, shaded tent
              camping, on-site beer garden, pool and hot tubs give riders the perfect mix of
              proximity and peace.
            </p>
          </div>
        </div>
      </section>

      {/* Charity Auction Night — REAL on-site event */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-4">
              ★ On-Site Rally Event ★
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Charity Auction Night at Rush No More
            </h2>
            <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-lodge-xl border-2 border-white aspect-[9/16] max-w-sm mx-auto lg:mx-0">
              <Image
                src="/images/posts/auctionnight.png"
                alt="86th Sturgis Bike Rally Charity Auction Night flyer at Rush No More RV Resort"
                fill
                sizes="(max-width: 1024px) 90vw, 400px"
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <Heart className="w-8 h-8 text-brand-gold" />
                <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                  Veterans Charity Auction
                </h3>
              </div>

              <div className="space-y-4 text-brand-navy/80 leading-relaxed mb-6">
                <p>
                  Each year during the Sturgis Bike Rally, Rush No More hosts a <strong>Charity
                  Auction Night</strong> on the property — silent auction, live auction and raffles
                  with our Bar and Beer Garden open to attendees.
                </p>
                <p>
                  All proceeds benefit the <strong>Combat Veterans Motorcycle Association® SD 30-1</strong>,
                  supporting local veterans (active &amp; retired), the South Dakota State Veterans Home in
                  Hot Springs, SD Service Dogs, Disabled American Veterans, active duty members during
                  deployments, and the National Cemetery in Sturgis (wreaths &amp; flags for veterans).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white rounded-xl p-4 border border-brand-gold/15">
                  <div className="text-xs uppercase font-bold tracking-wider text-brand-stone mb-1">When</div>
                  <div className="font-display font-bold text-brand-navy">Tuesday, August 11</div>
                  <div className="text-sm text-brand-navy/70">7:00 PM</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-brand-gold/15">
                  <div className="text-xs uppercase font-bold tracking-wider text-brand-stone mb-1">Where</div>
                  <div className="font-display font-bold text-brand-navy">Rush No More RV Resort</div>
                  <div className="text-sm text-brand-navy/70">21137 Brimstone Pl, Sturgis SD</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Silent Auction', 'Live Auction', 'Raffles', 'Bar / Beer Garden'].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-gold/30 rounded-full text-xs font-bold text-brand-navy uppercase tracking-wider">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Sturgis Rally at Rush No More
          </h2>
          <p className="text-center text-brand-navy/70 max-w-2xl mx-auto mb-12">
            Real photos from rally days at the campground.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RALLY_GALLERY.map((img, i) => (
              <div
                key={img.src}
                className={`relative rounded-2xl overflow-hidden shadow-lodge border border-brand-gold/10 ${i === 0 ? 'lg:col-span-2 lg:row-span-2 aspect-[4/3]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rush No More for the Rally */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Why Riders Make Rush No More Their Rally HQ
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RALLY_AMENITIES.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            <Link href="/sturgis-rally-camping" className="px-6 py-3 bg-brand-gold text-white font-bold rounded-xl uppercase tracking-wider text-sm">
              Sturgis Rally Camping
            </Link>
            <Link href="/rally-rates" className="px-6 py-3 border border-white/30 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/10">
              Rally Rates
            </Link>
            <Link href="/stay" className="px-6 py-3 border border-white/30 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/10">
              All Accommodations
            </Link>
          </div>
        </div>
      </section>

      {/* Rally Rates teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Rally Site Pricing
          </h2>
          <p className="text-center text-brand-navy/70 max-w-2xl mx-auto mb-10">
            10-night rally bundles with full amenity access. Pre-rally per-night pricing also available.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
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
                <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{r.name}</h3>
                <div className="mb-4">
                  <span className="block text-3xl font-display font-bold text-brand-gold">{r.rally}</span>
                  <span className="block text-xs text-brand-stone font-semibold uppercase tracking-wider">Rally · 10 nights</span>
                  <span className="block text-sm text-brand-navy/60 mt-1">Pre-rally: {r.pre}</span>
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
          <div className="text-center">
            <Link
              href="/rally-rates"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition-all uppercase tracking-wider text-sm"
            >
              See Full Rate Table <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Rides */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Bike className="w-10 h-10 text-brand-gold mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Best Rides From Rush No More
            </h2>
            <p className="text-brand-navy/70 max-w-2xl mx-auto">
              Every legendary Black Hills ride starts at your campsite.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {RALLY_RIDES.map((r) => (
              <Link
                key={r.name}
                href={r.href}
                className="group rounded-2xl p-5 border border-brand-gold/15 bg-white flex items-start gap-4 hover:shadow-gold-lg hover:border-brand-gold transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <Wind className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-brand-navy">{r.name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-stone uppercase font-semibold tracking-wider mt-1 mb-2">
                    <MapPin className="w-3 h-3" />{r.miles}
                  </span>
                  <p className="text-sm text-brand-navy/70 leading-relaxed">{r.notes}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-gold group-hover:translate-x-1 transition-transform self-center" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/best-motorcycle-rides-near-sturgis"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition-all uppercase tracking-wider text-sm"
            >
              Full Ride Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Sturgis Rally 2026 — FAQ
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-10" />
          <div className="space-y-4">
            {RALLY_FAQ.map((f) => (
              <details key={f.q} className="group bg-surface-primary rounded-xl p-5 border border-brand-gold/10">
                <summary className="font-bold text-brand-navy cursor-pointer flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="text-brand-gold group-open:rotate-45 transition-transform text-xl leading-none flex-shrink-0">+</span>
                </summary>
                <p className="mt-3 text-brand-navy/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="py-16 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
            Plan Your Rally Ride
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/best-motorcycle-rides-near-sturgis', label: 'Top Rides Near Sturgis' },
              { href: '/needles-highway-guide', label: 'Needles Highway Guide' },
              { href: '/iron-mountain-road-guide', label: 'Iron Mountain Road Guide' },
              { href: '/spearfish-canyon-guide', label: 'Spearfish Canyon Guide' },
              { href: '/deadwood-day-trip', label: 'Deadwood Day Trip' },
              { href: '/black-hills-itinerary', label: '6-Day Black Hills Itinerary' },
              { href: '/rally-rates', label: 'Rally Rates' },
              { href: '/sturgis-rally-camping', label: 'Sturgis Rally Camping' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white rounded-xl p-5 border border-brand-gold/10 hover:border-brand-gold hover:shadow-gold-lg transition-all flex items-center justify-between gap-2"
              >
                <span className="font-bold text-brand-navy text-sm">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA
        title="Book Your 2026 Sturgis Rally Stay"
        subtitle="Rally bookings sell out every year. Lock in your spot at Rush No More — 5 miles from Main Street."
      />
    </>
  );
}
