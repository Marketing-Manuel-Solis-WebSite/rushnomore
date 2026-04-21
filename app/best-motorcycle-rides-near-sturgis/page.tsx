import Link from 'next/link';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema, speakableSchema } from '@/lib/seo';
import { Bike, Clock, MapPin, ArrowRight, Mountain } from 'lucide-react';

const RIDES = [
  {
    slug: 'needles-highway-guide',
    name: 'Needles Highway (SD-87)',
    distance: '~14 miles',
    loop: 'Half-day loop',
    highlight: 'Granite spires, the Needles Eye, narrow one-lane tunnels',
    body: 'The signature Black Hills ride. Tight tunnels carved through solid granite, hairpin curves, and the iconic Needles Eye — a narrow slit in a towering spire. Pair with Iron Mountain Road for a legendary full-day loop. Not suitable for large rigs; bikes thrive here.',
  },
  {
    slug: 'iron-mountain-road-guide',
    name: 'Iron Mountain Road (US-16A)',
    distance: '~17 miles',
    loop: 'Half-day',
    highlight: 'Pigtail bridges and framed Mount Rushmore views',
    body: 'Engineering as art. Iron Mountain Road stitches three pigtail bridges and three tunnels framing Mount Rushmore straight through the rock. Every turn sets up the next view — a ride to remember for the rest of your riding life.',
  },
  {
    slug: 'spearfish-canyon-guide',
    name: 'Spearfish Canyon Byway',
    distance: '~20 miles',
    loop: 'Half-day',
    highlight: 'Limestone cliffs, waterfalls, fall-foliage corridor',
    body: 'A canyon byway that feels like a different state. Smooth, flowing curves, limestone walls on both sides, and Bridal Veil Falls and Roughlock Falls within a quick hike off the road. Best in September and October.',
  },
  {
    slug: 'deadwood-day-trip',
    name: 'Deadwood via Boulder Canyon (US-14A)',
    distance: '~12 miles one way',
    loop: 'Hour plus',
    highlight: 'Quick Wild West run from camp',
    body: 'Twelve miles of sweeping curves through Boulder Canyon into historic Deadwood. Park on Main Street, walk the casinos, grab lunch, ride back. Easiest rally-day loop when you want a break from the Main Street Sturgis crowds.',
  },
  {
    slug: null,
    name: 'Vanocker Canyon Road',
    distance: '~14 miles',
    loop: 'Quick',
    highlight: 'Locals&apos; favorite back-way to Nemo',
    body: 'A lesser-known beauty. Vanocker Canyon climbs out of the Sturgis basin into Nemo through tight forest corridors. Low traffic outside rally — a go-to when you want twisty pavement without the tour-bus parade.',
  },
  {
    slug: null,
    name: 'Badlands Loop (SD-240)',
    distance: '~75 miles from camp',
    loop: 'Full day',
    highlight: 'Otherworldly badlands moonscape',
    body: 'Worth the morning to get there. The Badlands Loop through Badlands National Park is a planet-change from the Black Hills — carved spires, mixed-grass prairie and bison. Go early, ride the loop, return via I-90 for the shortest round trip.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Explore', url: '/explore' },
        { name: 'Best Motorcycle Rides Near Sturgis', url: '/best-motorcycle-rides-near-sturgis' },
      ])} />
      <JsonLd data={articleSchema({
        headline: 'Best Motorcycle Rides Near Sturgis — Scenic Black Hills Routes',
        description: 'The classic Black Hills motorcycle rides from Sturgis — Needles Highway, Iron Mountain Road, Spearfish Canyon, Boulder Canyon and Vanocker Canyon. Route notes and tips from your Sturgis Rally basecamp.',
        image: '/images/BikeRally/IMG_9865.JPG',
        url: '/best-motorcycle-rides-near-sturgis',
        datePublished: '2025-01-15',
        dateModified: '2026-04-01',
        wordCount: 1000,
        keywords: ['best motorcycle rides sturgis', 'needles highway motorcycle', 'iron mountain road ride', 'spearfish canyon motorcycle', 'black hills motorcycle routes', 'sturgis rally rides', 'vanocker canyon', 'boulder canyon ride'],
      })} />
      <JsonLd data={speakableSchema('/best-motorcycle-rides-near-sturgis', ['h1', 'h2'])} />
      <Breadcrumbs items={[{ name: 'Best Rides Near Sturgis', url: '/best-motorcycle-rides-near-sturgis' }]} />

      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/BikeRally/IMG_9865.JPG')" }}
          role="img"
          aria-label="Motorcycles lined up at Rush No More during the Sturgis Motorcycle Rally"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Bike className="w-12 h-12 text-brand-gold mx-auto mb-5" />
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-5">
            Best <span className="text-brand-gold italic">Motorcycle Rides</span> Near Sturgis
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            The rides that earn the Black Hills its rally reputation — each one starts within easy reach of Rush No More.
            Route notes, standout moments and a quick honest take on each.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          {RIDES.map((r) => (
            <article key={r.name} className="bg-surface-primary rounded-2xl p-6 md:p-8 border border-brand-gold/15 shadow-lodge">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <h2 className="font-display font-bold text-2xl text-brand-navy">{r.name}</h2>
                <div className="flex gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full font-bold text-brand-gold border border-brand-gold/20">
                    <MapPin className="w-3.5 h-3.5" /> {r.distance}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full font-bold text-brand-navy border border-brand-navy/20">
                    <Clock className="w-3.5 h-3.5" /> {r.loop}
                  </span>
                </div>
              </div>
              <p className="text-sm font-bold text-brand-gold uppercase tracking-widest mb-3">
                Highlight — {r.highlight}
              </p>
              <p className="text-brand-navy/80 leading-relaxed mb-4">{r.body}</p>
              {r.slug && (
                <Link href={`/${r.slug}`} className="inline-flex items-center gap-1.5 text-brand-gold font-bold text-sm uppercase tracking-wider">
                  Full Guide <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 bg-brand-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Mountain className="w-10 h-10 text-brand-gold mx-auto mb-5" />
          <h2 className="text-3xl font-display font-bold mb-4">Your Basecamp for Every Ride</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Rush No More is 5 miles from Main Street Sturgis and centrally placed for every ride on this page.
            Return to a gated campground with bike wash, beer garden and hot tubs — every night of rally.
          </p>
          <Link href="/sturgis-rally-camping" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold uppercase tracking-wider">
            Book Rally Camping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <BookingCTA title="Ride More. Rush Less." subtitle="Book your site and start riding." />
    </>
  );
}
