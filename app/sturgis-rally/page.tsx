import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { eventSchema, faqSchema } from '@/lib/seo';
import {
  Bike, MapPin, Calendar, Music, Clock, Users, Trophy, Flag,
  ArrowRight, ExternalLink, Phone, CheckCircle, Star, Camera,
  Wind, Mountain, Beer, Shield,
} from 'lucide-react';

const RALLY_GALLERY = [
  { src: '/images/BikeRally/IMG_9865.JPG', alt: 'Motorcycles parked at Rush No More during the Sturgis Motorcycle Rally' },
  { src: '/images/BikeRally/IMG_9866.JPG', alt: 'Sturgis Rally riders gathered at Rush No More base camp' },
  { src: '/images/BikeRally/IMG_9867.JPG', alt: 'Custom Harley-Davidson at Sturgis Rally near Rush No More' },
  { src: '/images/BikeRally/IMG_9868.JPG', alt: 'Sturgis Rally bikes lined up on a Black Hills morning' },
  { src: '/images/BikeRally/IMG_9869.JPG', alt: 'Riders relaxing at Rush No More during the Sturgis Motorcycle Rally' },
];

const RALLY_FACTS = [
  { icon: Calendar, label: 'Official 2026 Dates', value: 'August 2 – 18, 2026' },
  { icon: Trophy, label: 'Edition', value: '86th Annual Rally' },
  { icon: Users, label: 'Attendance', value: '500,000+ riders' },
  { icon: Flag, label: 'Founded', value: '1938' },
  { icon: MapPin, label: 'From Rush No More', value: '5 mi to Main Street' },
  { icon: Clock, label: 'Ride Time to Sturgis', value: '~7 minutes' },
];

const RALLY_DAYS = [
  {
    day: 'Sun – Mon · Aug 2–3',
    title: 'Pre-Rally Arrival',
    items: [
      'Early arrivals roll in & set up camp',
      'Bike wash & rig hook-up at Rush No More',
      'Quiet rides through the Black Hills before crowds',
    ],
  },
  {
    day: 'Tue – Thu · Aug 4–6',
    title: 'Lead-In & Warm-Up Rides',
    items: [
      'Vendors begin setup on Main Street',
      'Spearfish Canyon scenic loop (peaceful pre-rally)',
      'Beer Garden opens nightly at Rush No More',
    ],
  },
  {
    day: 'Fri – Sat · Aug 7–8',
    title: 'Official Opening Weekend',
    items: [
      'Main Street comes alive — vendor booths, demos & live music',
      'Mayor\'s Ride kicks things off',
      'Buffalo Chip & The Iron Horse Saloon ramp up',
    ],
  },
  {
    day: 'Sun – Wed · Aug 9–12',
    title: 'Peak Rally Days',
    items: [
      'Headliner concerts at the Buffalo Chip & Full Throttle',
      'Devils Tower rides & poker runs',
      'Custom bike shows & burnout pits',
    ],
  },
  {
    day: 'Thu – Sat · Aug 13–15',
    title: 'Closing Stretch',
    items: [
      'Needles Highway + Iron Mountain Road loops',
      'Hill climbs & flat-track racing',
      'Final-night live music on Main Street',
    ],
  },
  {
    day: 'Sun – Tue · Aug 16–18',
    title: 'Wind-Down',
    items: [
      'Quiet morning rides as crowds thin',
      'Late checkout availability for relaxed departures',
      'Last calls in the Beer Garden',
    ],
  },
];

const THINGS_TO_DO = [
  { icon: Music, title: 'Buffalo Chip Concerts', desc: 'The "Largest Music Festival in Motorcycling" hosts headline concerts across multiple stages every night of rally.' },
  { icon: Bike, title: 'Main Street Sturgis', desc: 'Mile-long stretch of vendor booths, custom bike displays, demo rides, food stalls and bars — heart of the rally.' },
  { icon: Mountain, title: 'Devils Tower Day Ride', desc: 'Iconic 110-mile round trip to America\'s first national monument — a rally bucket-list ride.' },
  { icon: Wind, title: 'Iron Mountain & Needles', desc: 'Sweepers, pigtail bridges, narrow tunnels and granite spires — two of America\'s top rider roads.' },
  { icon: Trophy, title: 'Custom Bike Shows', desc: 'See world-class builds at Michael Lichter\'s show, Indian Motorcycle showcase and the Sturgis Rally builder competitions.' },
  { icon: Camera, title: 'Photo Ops Everywhere', desc: 'From Mount Rushmore selfies to Bear Butte sunsets — every ride doubles as a photo expedition.' },
];

const RALLY_RIDES = [
  { name: 'Spearfish Canyon Loop', miles: '50 mi', time: '2–3 hrs', notes: 'Waterfalls, limestone cliffs, twisty US-14A.' },
  { name: 'Iron Mountain Road', miles: '17 mi', time: '1 hr', notes: 'Pigtail bridges & three Mt. Rushmore tunnel views.' },
  { name: 'Needles Highway', miles: '14 mi', time: '1.5 hrs', notes: 'Granite spires, narrow tunnels, sharp turns.' },
  { name: 'Devils Tower (WY)', miles: '110 mi RT', time: 'Half-day', notes: 'America\'s first national monument.' },
  { name: 'Custer Wildlife Loop', miles: '18 mi', time: '1.5 hrs', notes: 'Buffalo herds, pronghorn & wild burros.' },
  { name: 'Mt. Rushmore Run', miles: '110 mi RT', time: 'Half-day', notes: 'Iconic memorial via scenic backroads.' },
];

const RALLY_FAQ = [
  { q: 'When is the 2026 Sturgis Motorcycle Rally?', a: 'The 86th Annual Sturgis Motorcycle Rally runs August 2–18, 2026, with the official rally week typically August 8–17. Pre-rally activity starts the prior weekend, and Rush No More accepts bookings across the full window.' },
  { q: 'How many people attend the Sturgis Rally?', a: 'The Sturgis Motorcycle Rally consistently draws 500,000+ riders and visitors each year, making it the world\'s largest motorcycle gathering. Anniversary years (75th, 80th) have crossed 700,000.' },
  { q: 'When did the Sturgis Rally start?', a: 'The first rally was held in 1938 by the Jackpine Gypsies Motorcycle Club with just 9 riders. It has grown every year since (with brief pandemic adjustments) into the international event it is today.' },
  { q: 'How far is Rush No More from Main Street Sturgis?', a: 'Rush No More sits exactly 5 miles from Main Street Sturgis — about a 7-minute ride. Close enough to roll in any time of day, far enough that the campground stays peaceful at night.' },
  { q: 'What are the best rides during Sturgis Rally?', a: 'Top rally rides include Iron Mountain Road, Needles Highway, Spearfish Canyon, the Custer State Park Wildlife Loop, Devils Tower (WY), and the Mount Rushmore run. All start within minutes of Rush No More.' },
  { q: 'Is the Sturgis Rally free?', a: 'Walking Main Street, browsing vendors, and riding the Black Hills are free. Concerts at the Buffalo Chip, Full Throttle, and other venues are ticketed. Some rides and events have small entry fees.' },
  { q: 'Where should I stay for Sturgis Rally?', a: 'Rush No More has been a premier rally HQ for over a decade — RV sites, presidential cabins, tent camping, an on-site beer garden, pool, hot tubs, bike wash and 24/7 gated security. See our Sturgis Rally Camping page to book.' },
  { q: 'When should I book for the rally?', a: 'Book 6–12 months in advance. Rush No More sells out every year, and most rally-ready sites go by early spring for the following August.' },
  { q: 'What should first-timers know?', a: 'Hydrate constantly (Black Hills heat is dry), wear earplugs at concerts, plan one ride per day rather than rushing, watch for buffalo on Custer State Park roads, and book lodging early. Rush No More\'s staff will brief you at check-in.' },
  { q: 'Are non-riders welcome at the rally?', a: 'Absolutely. Sturgis Rally is family-friendly during the day — Main Street, vendor expos, food trucks, live music and Black Hills sightseeing make it a great trip for spouses, friends and kids.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={eventSchema({
        name: '86th Annual Sturgis Motorcycle Rally 2026',
        description: 'The 86th Sturgis Motorcycle Rally runs August 2–18, 2026 in Sturgis, South Dakota. The world\'s largest motorcycle gathering with 500,000+ riders, headline concerts, custom bike shows and legendary Black Hills rides.',
        startDate: '2026-08-02',
        endDate: '2026-08-18',
        image: '/images/BikeRally/IMG_9865.JPG',
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
            Your complete guide to the world&apos;s largest motorcycle gathering — dates, schedule,
            things to do, the best rides, and why <strong>Rush No More</strong> has been the ultimate
            Sturgis Rally base camp for over a decade.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sturgis-rally-camping"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold hover:brightness-110 transition-all uppercase tracking-wider"
            >
              Book Rally Camping <ArrowRight className="w-5 h-5" />
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

      {/* History / What is the rally */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            What Is the Sturgis Motorcycle Rally?
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-10" />
          <div className="space-y-5 text-brand-navy/80 leading-relaxed">
            <p>
              The <strong>Sturgis Motorcycle Rally</strong> is the largest gathering of riders on the planet —
              an annual ten-day pilgrimage to the Black Hills of South Dakota that has shaped American
              motorcycle culture since <strong>1938</strong>. What began with nine riders organized by the Jackpine
              Gypsies Motorcycle Club has grown into a global event drawing <strong>500,000+ attendees</strong>
              every August.
            </p>
            <p>
              The rally takes over the small town of <strong>Sturgis, South Dakota</strong> (population ~7,000) and
              spreads across the Black Hills — Main Street fills with vendor booths and custom bikes, the
              Buffalo Chip and Full Throttle host headline concerts, and legendary roads like Iron Mountain,
              Needles Highway and Spearfish Canyon become rolling tributes to motorcycling.
            </p>
            <p>
              Rush No More has been a <strong>premier rally headquarters</strong> for more than a decade. Just
              5 miles from Main Street, our 200+ RV sites, 16 presidential cabins, shaded tent camping, on-site
              beer garden, pool, hot tubs and bike wash give riders the perfect mix of proximity and peace.
            </p>
          </div>
        </div>
      </section>

      {/* Photo gallery — all BikeRally images */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Sturgis Rally at Rush No More
          </h2>
          <p className="text-center text-brand-navy/70 max-w-2xl mx-auto mb-12">
            Real photos from rally days at the campground — bikes, riders and Black Hills mornings.
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

      {/* 2026 Schedule */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            2026 Rally Schedule — Day by Day
          </h2>
          <p className="text-center text-brand-navy/70 max-w-2xl mx-auto mb-12">
            A rider-friendly breakdown of how the 86th Sturgis Rally unfolds, from quiet pre-rally
            arrivals to peak-week chaos and the final wind-down.
          </p>
          <div className="space-y-4">
            {RALLY_DAYS.map((d) => (
              <div key={d.day} className="bg-surface-primary rounded-2xl p-6 border border-brand-gold/10 grid md:grid-cols-[200px_1fr] gap-4 md:gap-6 items-start">
                <div className="md:border-r md:border-brand-gold/20 md:pr-6">
                  <div className="inline-flex items-center gap-2 text-brand-gold font-black text-xs uppercase tracking-wider mb-1">
                    <Calendar className="w-4 h-4" /> {d.day}
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-navy">{d.title}</h3>
                </div>
                <ul className="space-y-2">
                  {d.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-brand-navy/80">
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-1" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-brand-stone mt-8 italic">
            Schedule based on official Sturgis Rally weekend pattern. Specific concert lineups, demo rides
            and vendor events are announced through the official rally site closer to August.
          </p>
        </div>
      </section>

      {/* Things to do */}
      <section className="py-20 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Things to Do at Sturgis Rally
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {THINGS_TO_DO.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-lodge border border-brand-gold/10 hover:shadow-gold-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{title}</h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Rides */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Bike className="w-10 h-10 text-brand-gold mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Best Rides From Rush No More
            </h2>
            <p className="text-brand-navy/70 max-w-2xl mx-auto">
              Every legendary Black Hills ride starts at your campsite. Roll out of camp, point the bars
              any direction, and you&apos;re on a top-ten road.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {RALLY_RIDES.map((r) => (
              <div key={r.name} className="rounded-2xl p-5 border border-brand-gold/15 bg-surface-primary flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <Wind className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-brand-navy">{r.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-stone uppercase font-semibold tracking-wider mt-1 mb-2">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{r.miles}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}</span>
                  </div>
                  <p className="text-sm text-brand-navy/70 leading-relaxed">{r.notes}</p>
                </div>
              </div>
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

      {/* Why Rush No More for the Rally */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Why Riders Make Rush No More Their Rally HQ
          </h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: MapPin, t: '5 Miles to Main Street', d: 'Roll into Sturgis in 7 minutes — sleep where it stays quiet.' },
              { icon: Beer, t: 'On-Site Beer Garden', d: 'Cold drinks, live music, and rally camaraderie steps from your bike.' },
              { icon: Shield, t: '24/7 Gated Security', d: 'Rig and bike stay safe while you ride the Hills.' },
              { icon: Star, t: '10+ Years Hosting Rally', d: 'Rally-savvy staff, dedicated coordinators, repeat-rider community.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-10">
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
