'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { InteractiveMapWrapper } from './InteractiveMapWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, localBusinessSchema, placeSchema, speakableSchema, reservationActionSchema } from '@/lib/seo';
import {
  MapPin, Phone, Mail, Navigation, ExternalLink, ArrowRight,
  Truck, Home, Tent, Waves, Beer, ShieldCheck, TreePine,
  Star, CheckCircle, Mountain, Zap, ChevronDown,
} from 'lucide-react';

/* ─── Quick Stats ─── */
const MAP_STATS = [
  { val: '200+', label: 'RV Sites' },
  { val: '16', label: 'Cabins' },
  { val: '20+', label: 'Tent Sites' },
  { val: '16', label: 'Amenities' },
];

/* ─── Area highlights — brand colors only ─── */
const AREAS = [
  {
    icon: Truck,
    title: 'RV Sites',
    desc: 'Full hookup sites with 30/50 AMP, pull-throughs up to 100 ft. Standard, Luxury with cement slab & BBQ, and Luxury Spa with private hot tub.',
    price: 'Starts at $41.22',
    href: '/stay/rv-sites',
    features: ['Full Hook-ups (W/E/S)', '30 & 50 AMP Service', 'Pull-Through up to 100ft', 'Private Hot Tub (Spa)'],
  },
  {
    icon: Home,
    title: 'Presidential Cabins',
    desc: '16 unique cabins each named after a US President. From economy units for couples to luxury suites sleeping up to 10 guests.',
    price: 'Starts at $51.76',
    href: '/stay/cabins',
    features: ['Sleeps 2-10 Guests', 'Full Kitchens Available', 'A/C & Heating', 'Private Bathrooms'],
  },
  {
    icon: Tent,
    title: 'Tent Camping',
    desc: 'Shaded sites under Ponderosa pines with water hookups nearby, and full access to all resort amenities including pool & hot tubs. 15 of 20 sites have electricity.',
    price: 'From $35',
    href: '/stay/tent-camping',
    features: ['Shaded Pine Forest', '15 Sites with Electric', 'Water Hookups Nearby', 'Bathhouse Access'],
  },
  {
    icon: Beer,
    title: 'Amenities & Recreation',
    desc: 'Pool, hot tubs, beer garden, game room, playground, bathhouses, laundry, camp store, nature trails, and 24/7 security — all included free.',
    price: 'All Included',
    href: '/amenities',
    features: ['Pool & Hot Tubs', 'Beer Garden & Bar', 'Game Room & Trails', '24/7 Security'],
  },
];

export default function MapPage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const findVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    heroVideoRef.current?.play().catch(() => {});
    findVideoRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Map & Directions', url: '/map' }])} />
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={placeSchema()} />
      <JsonLd data={reservationActionSchema()} />
      <JsonLd data={speakableSchema('/map', ['h1', 'h2', '[data-speakable="address"]'])} />

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Video background
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/RNM-map.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/Aereal-2_1400.png"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-20 max-w-5xl mx-auto px-8 text-center text-white">
          <motion.span
            className="badge-gold mb-8 inline-block !bg-brand-gold/30 !text-brand-gold-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Interactive Map
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore Our <span className="text-brand-gold italic">Resort</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Navigate our campground map to find RV sites, cabins, tent areas, the pool, beer garden, and all 16 amenities.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {MAP_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <span className="font-display text-3xl md:text-4xl text-brand-gold font-bold block">{s.val}</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold block">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INTERACTIVE MAP
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Campground Map ★
            </span>
            <h2 className="mb-3 text-3xl md:text-4xl">
              Find Your Perfect <span className="text-brand-gold italic">Spot</span>
            </h2>
            <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
              Drag to pan around the map and use the zoom buttons to see details of every area.
            </p>
            <div className="w-24 h-1 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <InteractiveMapWrapper />

          {/* Park entrance and grounds photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="aspect-[16/9] rounded-xl overflow-hidden relative shadow-lodge-lg border-2 border-white">
              <Image
                src="/images/UTV/ParkingFrontPoll_RNM.jpeg"
                alt="Rush No More resort entrance and front parking area"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <span className="text-white text-sm font-bold">Resort Entrance</span>
              </div>
            </div>
            <div className="aspect-[16/9] rounded-xl overflow-hidden relative shadow-lodge-lg border-2 border-white">
              <Image
                src="/images/GeneralImagesPark/IMG_7316.jpeg"
                alt="Rush No More park grounds and resort overview"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <span className="text-white text-sm font-bold">Resort Grounds</span>
              </div>
            </div>
          </div>

          {/* Quick Booking Bar */}
          <div className="mt-8 bg-brand-navy/95 backdrop-blur-xl rounded-2xl shadow-lodge-xl p-6 md:p-8 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="text-white">
                <h4 className="font-display text-xl font-bold mb-1">Found Your Spot?</h4>
                <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Book now to secure your site</p>
              </div>
              {[
                { type: 'RV Sites', price: 'Starts at $41.22', icon: Truck, href: '/stay/rv-sites' },
                { type: 'Cabins', price: 'Starts at $51.76', icon: Home, href: '/stay/cabins' },
                { type: 'Tent', price: 'From $35', icon: Tent, href: '/stay/tent-camping' },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-brand-gold/30 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-300 border border-white/10">
                    <item.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-white block">{item.type}</span>
                    <span className="text-brand-gold font-display text-lg font-bold">{item.price}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-brand-gold transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHAT YOU'LL FIND — Video background
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Video background */}
        <video
          ref={findVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/RNM-map.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/DSC05580-s.png"
        />
        <div className="absolute inset-0 bg-brand-navy/85" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Resort Areas ★
            </span>
            <h2 className="mb-3 text-white text-4xl md:text-5xl">
              What You&apos;ll <span className="text-brand-gold italic">Find</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium">
              Our resort is thoughtfully laid out with everything you need for a perfect Black Hills stay.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    href={area.href}
                    className="group block bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-500 p-6 md:p-8 relative overflow-hidden"
                  >
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-14 h-14 bg-brand-gold/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-brand-gold/20 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                        <Icon className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-display font-bold text-white">{area.title}</h3>
                          <span className="font-display text-lg text-brand-gold font-bold">{area.price}</span>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed font-medium">{area.desc}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {area.features.map((f, j) => (
                        <span key={j} className="flex items-center gap-2 text-xs text-white/70 font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />{f}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-end">
                      <span className="inline-flex items-center gap-1.5 text-sm text-brand-gold font-bold group-hover:gap-2.5 transition-all">
                        View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          GETTING HERE — Directions
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
                ★ Getting Here ★
              </span>
              <h2 className="mb-3 text-3xl md:text-4xl">
                Easy to <span className="text-brand-gold italic">Find</span>
              </h2>
              <div className="w-24 h-1 bg-gold-gradient rounded-full mb-6" />

              <p className="text-brand-navy/70 text-lg leading-relaxed font-medium mb-8">
                Conveniently located just minutes from I-90, Sturgis, and Deadwood. We&apos;re your perfect home base for exploring the entire Black Hills region.
              </p>

              {/* Step-by-step directions */}
              <div className="space-y-3 mb-8">
                {[
                  { step: '1', text: 'From I-90, take Exit 37 toward Sturgis' },
                  { step: '2', text: 'Turn right onto Brimstone Place' },
                  { step: '3', text: 'Rush No More is on your right — less than 2 minutes from the interstate' },
                ].map((d, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-brand-gold/10 shadow-sm">
                    <span className="w-8 h-8 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-gold text-sm font-black">{d.step}</span>
                    </span>
                    <span className="text-brand-navy/80 font-medium text-sm pt-1">{d.text}</span>
                  </div>
                ))}
              </div>

              {/* Distance cards */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { val: '5 mi', label: 'to Sturgis', icon: MapPin },
                  { val: '12 mi', label: 'to Deadwood', icon: Navigation },
                  { val: '55 mi', label: 'to Mt. Rushmore', icon: Mountain },
                  { val: '<2 min', label: 'from I-90', icon: Zap },
                ].map((d, i) => (
                  <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-brand-gold/10 shadow-sm hover:shadow-gold hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-300 border border-brand-gold/15">
                      <d.icon className="w-5 h-5 text-brand-gold group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-display text-2xl text-brand-gold font-bold block">{d.val}</span>
                    <span className="text-xs text-brand-stone font-medium">{d.label}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center border border-brand-gold/15">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-navy">21137 Brimstone Place</p>
                    <p className="text-xs text-brand-stone">Sturgis, SD 57785</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center border border-brand-gold/15">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <a href={`tel:${SITE.phoneTel}`} className="text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors">{SITE.phone}</a>
                    <p className="text-xs text-brand-stone">Daily 8 AM – 8 PM MT</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center border border-brand-gold/15">
                    <Mail className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <a href={`mailto:${SITE.email}`} className="text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors">{SITE.email}</a>
                    <p className="text-xs text-brand-stone">We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
                  <MapPin className="w-4 h-4 mr-2" /> Open in Google Maps
                </a>
                <a href={`tel:${SITE.phoneTel}`} className="btn-outline text-sm">
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lodge-lg border-2 border-white h-[400px] lg:h-[480px]">
                <iframe
                  src={SITE.mapsEmbed}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Rush No More location on Google Maps"
                />
              </div>
              <p className="text-center text-xs text-brand-stone">
                GPS: 44.3986° N, 103.4683° W
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingCTA title="Ready to Book Your Spot?" subtitle="RV starts at $41.22 | Cabins starts at $51.76 | Tent from $35/night — all amenities included." />
    </>
  );
}