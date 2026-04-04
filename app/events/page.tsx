'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE, RALLY_RV, REVIEWS } from '@/data/site';
import { BookingCTA, SectionHeader } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { JsonLd } from '@/components/seo/JsonLd';
import { eventSchema, breadcrumbSchema } from '@/lib/seo';
import {
  ExternalLink, Star, ArrowRight, ChevronDown,
  MapPin, Users, Music, Beer, Car, Calendar,
  Bike, Tent, Home, Truck, CheckCircle, Sparkles,
  Camera, Utensils, Heart, Clock, Quote, Shield,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   RALLY HIGHLIGHTS
═══════════════════════════════════════════════════════════════ */
const RALLY_HIGHLIGHTS = [
  { icon: MapPin, title: '5 Miles from Main St', desc: 'Close enough for the action, far enough for peace and quiet at night.' },
  { icon: Beer, title: 'On-Site Beer Garden', desc: 'Our famous beer garden becomes rally central — craft beers, cocktails & live music.' },
  { icon: Shield, title: '10+ Years as Rally HQ', desc: 'Riders have trusted Rush No More as their home base for over a decade.' },
  { icon: Bike, title: 'Legendary Rides Nearby', desc: 'Needles Highway, Spearfish Canyon, and Deadwood are all easy rides from camp.' },
];

/* ═══════════════════════════════════════════════════════════════
   CAR SHOW FEATURES
═══════════════════════════════════════════════════════════════ */
const CAR_SHOW_FEATURES = [
  { icon: Car, title: 'Classic Cars & Hot Rods', desc: 'Show and Shine with dozens of stunning classic vehicles and custom builds.' },
  { icon: Music, title: 'Live Music All Day', desc: 'Enjoy live performances from local bands while you browse the show.' },
  { icon: Beer, title: 'Beer Garden & Food', desc: 'Our famous beer garden with special event hours, plus food vendors on site.' },
  { icon: Users, title: 'Free Admission', desc: 'Bring the whole family — admission is completely free for everyone.' },
];

/* ═══════════════════════════════════════════════════════════════
   WEDDING / GROUP FEATURES
═══════════════════════════════════════════════════════════════ */
const WEDDING_FEATURES = [
  { icon: Users, title: 'Groups of 20–200', desc: 'Our pavilion flexes from intimate gatherings to large celebrations.' },
  { icon: Utensils, title: 'Full Kitchen Included', desc: 'Commercial kitchen facilities for your caterer or DIY events.' },
  { icon: Camera, title: 'Stunning Photo Spots', desc: 'Black Hills backdrop, Ponderosa pines, and golden-hour magic.' },
  { icon: Home, title: 'On-Site Lodging', desc: 'Cabins, RV sites & tent camping so all your guests can stay together.' },
  { icon: Music, title: 'Live Music Friendly', desc: 'Our pavilion is set up for bands, DJs, and sound systems.' },
  { icon: Beer, title: 'Beer Garden Access', desc: 'Your guests can enjoy our on-site bar and beer garden.' },
];

export default function EventsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <>
      {/* Schema */}
      <JsonLd data={eventSchema({
        name: 'Sturgis Motorcycle Rally 2026 at Rush No More',
        description: 'Rush No More RV Resort is your perfect Sturgis Rally base camp — RV sites, cabins & tent camping just 5 miles from Main Street Sturgis. Beer garden, pool, hot tubs & 16 amenities.',
        startDate: '2026-08-02', endDate: '2026-08-18',
        image: '/images/BikeRally/IMG_9865.JPG',
      })} />
      <JsonLd data={eventSchema({
        name: 'Dakota Rods & Classics Car Show 2026',
        description: 'Annual Show and Shine at Rush No More RV Resort in Sturgis, SD. Free admission with classic cars, hot rods, live music, food vendors & beer garden.',
        startDate: '2026-09-12', endDate: '2026-09-12',
        image: '/images/car_show_RNM.png',
      })} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Events', url: '/events' }])} />

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Full-screen video background
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/RNM-events.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/DSC05580-s.png"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-20 max-w-5xl mx-auto px-8 text-center text-white">
          <motion.span
            className="badge-gold mb-8 inline-block !bg-brand-gold/30 !text-brand-gold-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Events & Gatherings
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Where <span className="text-brand-gold italic">Memories</span> Are Made
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From the world-famous Sturgis Motorcycle Rally to our annual car show, weddings and group gatherings — there&apos;s always something happening at Rush No More.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">
              Book Your Stay <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <a href="#sturgis-rally" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium">
              <ChevronDown className="w-5 h-5 animate-bounce" /> Explore Events
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { val: '84+', label: 'Rallies Hosted' },
              { val: '500k+', label: 'Riders Annually' },
              { val: '10+', label: 'Years as Rally HQ' },
              { val: '4.8★', label: 'Guest Rating' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <span className="font-display text-3xl md:text-4xl text-brand-gold font-bold block">{s.val}</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          QUICK NAV BANNER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-brand-gold text-white py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {[
            { icon: Bike, label: 'Sturgis Rally', href: '#sturgis-rally' },
            { icon: Calendar, label: 'Rally Rates 2026', href: '#rally-rates' },
            { icon: Car, label: 'Car Show', href: '#car-show' },
            { icon: Heart, label: 'Weddings & Groups', href: '#weddings' },
          ].map((item, i) => (
            <a key={i} href={item.href} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-white/80 transition-colors">
              <item.icon className="w-4 h-4" /> {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STURGIS MOTORCYCLE RALLY — Deep Dive
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sturgis-rally" className="relative py-16 md:py-24 overflow-hidden scroll-mt-24" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ August 2–18, 2026 ★
            </span>
            <h2 className="mb-5 text-4xl md:text-5xl leading-tight">
              Sturgis Motorcycle <span className="text-brand-gold italic">Rally</span>
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-3xl mx-auto font-medium">
              The world&apos;s largest motorcycle event — 500,000+ riders every August. Rush No More has been the premier rally base camp for over a decade, just 5 miles from Main Street Sturgis.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-6 mx-auto" />
          </div>

          {/* Image + content side by side */}
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
              {/* Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-lodge-xl group border-2 border-white aspect-[4/3]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    style={{ backgroundImage: "url('/images/BikeRally/IMG_9865.JPG')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-white rounded-full text-xs font-black uppercase tracking-wider shadow-gold">
                      <Bike className="w-4 h-4" /> Rally HQ Since 2014
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lodge">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                        <span className="font-medium text-brand-navy">5 miles from Main St Sturgis — 7 min drive</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-gold/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-gold/5 rounded-full -z-10" />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-brand-gold/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-brand-gold/20 shadow-gold">
                    <Bike className="w-7 h-7 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight">Your Perfect Base Camp</h3>
                    <p className="text-brand-gold text-sm font-bold uppercase tracking-wider mt-0.5">Rally headquarters for 10+ years</p>
                  </div>
                </div>

                <p className="text-brand-navy/80 text-lg leading-relaxed mb-6 font-medium">
                  Rush No More offers the perfect balance of proximity to the rally action and a peaceful retreat to recharge. Our beer garden becomes rally central with live music and cold drinks, while our clean facilities, hot tubs, and friendly staff make every rider feel at home.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {['500,000+ riders annually', 'Live music & entertainment', 'On-site beer garden', 'Bike wash station', 'Scenic rides nearby', '24/7 security'].map((f, i) => (
                    <span key={i} className="flex items-center gap-2.5 text-sm text-brand-navy/80 bg-white/80 backdrop-blur-sm px-3 py-2.5 rounded-lg font-medium border border-surface-muted/30 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{f}
                    </span>
                  ))}
                </div>

                <a
                  href={SITE.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gold text-white font-bold text-sm rounded-xl shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all duration-500 uppercase tracking-wider"
                >
                  Book Rally Stay <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Rally Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {RALLY_HIGHLIGHTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-2xl shadow-lodge border-2 border-surface-muted/50 p-6 text-center group transition-all duration-500 hover:shadow-gold-lg hover:-translate-y-3 hover:border-brand-gold/30 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="w-16 h-16 bg-brand-gold/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/15">
                    <Icon className="w-8 h-8 text-brand-gold group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h4 className="font-bold text-base mb-2">{item.title}</h4>
                  <p className="text-sm text-brand-stone leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Rally Photo Strip */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="h-px flex-1 max-w-[60px] bg-brand-gold/30" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">Rally Moments</span>
              <div className="h-px flex-1 max-w-[60px] bg-brand-gold/30" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: '/images/BikeRally/IMG_9865.JPG', alt: 'Sturgis Rally bikes at Rush No More' },
                { src: '/images/BikeRally/IMG_9866.JPG', alt: 'Motorcycle lineup during Sturgis Rally' },
                { src: '/images/BikeRally/IMG_9867.JPG', alt: 'Rally riders gathering at the resort' },
                { src: '/images/BikeRally/IMG_9868.JPG', alt: 'Sturgis Rally atmosphere at Rush No More' },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-lodge group border-2 border-white aspect-[4/3] relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Accommodations for Rally */}
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">Rally Accommodations</h3>
            <p className="text-brand-navy/70 text-lg font-medium">RV, cabins & tent camping — something for every rider.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'RV Sites', price: 'Starts at $41.22', sub: 'per night · Full hookups', img: '/images/GeneralImagesPark/IMG_7382.jpeg', href: '/stay', features: ['30/50 AMP Service', 'Pull-Through up to 100ft', 'Cement Slabs (Luxury)', 'Hot Tub (Luxury Spa)'] },
              { icon: Home, title: 'Presidential Cabins', price: 'Starts at $51.76', sub: 'per night · 16 unique cabins', img: '/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg', href: '/stay', features: ['Sleeps 2-10 Guests', 'Full Kitchens', 'A/C & Heating', 'Private Bathrooms'] },
              { icon: Tent, title: 'Tent Camping', price: 'From $35', sub: 'per night · Best value', img: '/images/Wooded-Tent-Area.png', href: '/stay', features: ['Shaded Pine Forest', '15 Sites with Electric', 'Water Hookups', 'Bathhouse Access'] },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <Link href={item.href} className="group block rounded-3xl overflow-hidden shadow-lodge-lg hover:shadow-gold-lg transition-all duration-700 border-2 border-transparent hover:border-brand-gold/30">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110" style={{ backgroundImage: `url('${item.img}')` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                          <Icon className="w-4 h-4 text-brand-gold" /> {item.title}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="font-display text-3xl text-white font-bold">{item.price}</span>
                        <span className="text-white/70 text-sm block">{item.sub}</span>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {item.features.map((f, j) => (
                          <span key={j} className="flex items-center gap-2 text-sm text-brand-navy/80 font-medium">
                            <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{f}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-surface-muted">
                        <span className="flex items-center gap-1 text-xs text-brand-stone font-bold uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> All amenities included
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-gold text-white text-xs font-bold rounded-full group-hover:shadow-gold transition-all uppercase tracking-wider">
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          RALLY RATES — Pricing Cards
      ═══════════════════════════════════════════════════════════════ */}
      <section id="rally-rates" className="py-24 md:py-28 bg-white relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Rally 2026 ★
            </span>
            <h2 className="mb-5 text-4xl md:text-5xl">
              RV Site <span className="text-brand-gold italic">Rally Pricing</span>
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              10-day minimum. August 2–18, 2026. Secure your spot early — rally sites sell out months in advance.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {RALLY_RV.map((r, i) => (
              <motion.div
                key={i}
                className={`relative bg-white rounded-3xl shadow-lodge-lg border-2 p-8 text-center transition-all duration-500 hover:shadow-gold-lg hover:-translate-y-2 overflow-hidden ${r.popular ? 'border-brand-gold ring-2 ring-brand-gold/20' : 'border-surface-muted/50 hover:border-brand-gold/30'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {r.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-brand-gold text-white text-xs font-black uppercase tracking-[0.15em] py-2 text-center">
                      ★ Most Popular ★
                    </div>
                  </div>
                )}

                <div className={r.popular ? 'pt-6' : ''}>
                  <h3 className="text-xl font-display font-bold mb-4">{r.name}</h3>

                  <div className="mb-4">
                    <span className="font-display text-5xl text-brand-gold font-bold">{r.rally}</span>
                    <span className="text-sm text-brand-stone block mt-1">10-day rally package</span>
                  </div>

                  <div className="bg-surface-secondary rounded-xl p-4 mb-6 text-sm text-brand-navy/70 font-medium">
                    <Clock className="w-4 h-4 text-brand-gold inline mr-2" />
                    Pre/Post Rally: {r.pre}/week
                  </div>

                  <ul className="space-y-3 mb-8 text-left">
                    {r.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-brand-navy/80 font-medium">
                        <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                    <li className="flex items-center gap-3 text-sm text-brand-navy/80 font-medium">
                      <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                      All 16 amenities included
                    </li>
                  </ul>

                  <a
                    href={SITE.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full py-4 font-bold text-sm rounded-xl uppercase tracking-wider transition-all duration-500 ${r.popular ? 'bg-brand-gold text-white shadow-gold hover:shadow-gold-lg hover:brightness-110' : 'bg-brand-gold/10 text-brand-gold border-2 border-brand-gold/20 hover:bg-brand-gold hover:text-white hover:shadow-gold'}`}
                  >
                    Reserve Now <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          RALLY REVIEW
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F5F0E8 0%, #FDFBF7 100%)' }}>
        <div className="absolute top-10 left-10 text-brand-gold/[0.04]"><Quote className="w-48 h-48" /></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-lodge-lg border border-brand-gold/15">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-bl-[120px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-tr-[80px]" />
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1.5 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-7 h-7 text-brand-gold fill-brand-gold" />)}
              </div>
              <p className="text-xl md:text-3xl text-brand-navy italic leading-relaxed mb-8 font-display font-bold">
                &ldquo;{REVIEWS[3].text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-brand-gold/15 shadow-lodge">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">{REVIEWS[3].title.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="font-display text-brand-navy font-bold text-sm">{REVIEWS[3].title}</p>
                  {REVIEWS[3].source && <span className="text-[10px] font-bold uppercase tracking-wider text-brand-stone">{REVIEWS[3].source}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DAKOTA RODS & CLASSICS CAR SHOW
      ═══════════════════════════════════════════════════════════════ */}
      <section id="car-show" className="relative py-16 md:py-24 overflow-hidden bg-brand-navy text-white scroll-mt-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/Aereal-2_1400.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
                ★ September 12, 2026 ★
              </span>
              <h2 className="mb-5 text-white text-4xl md:text-5xl leading-tight">
                Dakota Rods & Classics <span className="text-brand-gold italic">Car Show</span>
              </h2>
              <div className="w-24 h-1.5 bg-gold-gradient rounded-full mb-6" />
              <p className="text-white/80 text-lg leading-relaxed mb-6 font-medium">
                Our annual on-site Show and Shine featuring classic cars, hot rods, and custom vehicles. This is one of the Black Hills&apos; most fun free events — live music all day, our famous beer garden in full swing, food vendors, and a pool party for the whole family.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {CAR_SHOW_FEATURES.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <item.icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <span className="text-sm text-white/80 font-medium">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gold text-white font-bold text-sm rounded-xl shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all duration-500 uppercase tracking-wider"
                >
                  Book Car Show Weekend <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Image collage — Beer Garden & Car Show atmosphere */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lodge-lg group border border-white/10 relative">
                  <Image
                    src="/images/BeerGarden/IMG_7359.jpg"
                    alt="Beer garden atmosphere during the car show"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lodge-lg group border border-white/10 relative">
                  <Image
                    src="/images/BeerGarden/IMG_7365.jpg"
                    alt="Guests enjoying the beer garden"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-3 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lodge-lg group border border-white/10 relative">
                  <Image
                    src="/images/EventCenter/IMG_7773.jpeg"
                    alt="Event area at Rush No More car show"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lodge-lg group border border-white/10 relative">
                  <Image
                    src="/images/BeerGarden/IMG_7327.jpg"
                    alt="Beer garden bar area at Rush No More"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WEDDINGS, REUNIONS & GROUP EVENTS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="weddings" className="relative py-16 md:py-24 overflow-hidden scroll-mt-24" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Private Events ★
            </span>
            <h2 className="mb-5 text-4xl md:text-5xl leading-tight">
              Weddings, Reunions & <span className="text-brand-gold italic">Group Events</span>
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-3xl mx-auto font-medium">
              Our beautiful outdoor pavilion with full kitchen is the perfect venue for weddings, family reunions, corporate retreats, and group gatherings of 20–200 guests — surrounded by Black Hills scenery.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-6 mx-auto" />
          </div>

          {/* Event Center photo showcase */}
          <FadeIn>
            <div className="mb-16">
              {/* Main large image */}
              <div className="relative rounded-3xl overflow-hidden shadow-lodge-xl border-2 border-white aspect-[21/9] mb-4 group">
                <Image
                  src="/images/EventCenter/IMG_7513.jpeg"
                  alt="Rush No More event center pavilion setup for a celebration"
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/70 via-brand-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 md:right-auto p-8 md:p-12 z-10 max-w-xl">
                  <h3 className="text-white text-3xl md:text-4xl font-display font-bold mb-3">Your Dream Venue Awaits</h3>
                  <p className="text-white/80 text-sm md:text-base font-medium">Covered pavilion, full kitchen, stunning Black Hills backdrop — all with on-site lodging for every guest.</p>
                </div>
              </div>
              {/* Supporting venue images */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { src: '/images/EventCenter/IMG_7514.jpeg', alt: 'Event center interior with seating arrangement' },
                  { src: '/images/EventCenter/IMG_7644.jpeg', alt: 'Pavilion setup for a private event' },
                  { src: '/images/EventCenter/IMG_7773.jpeg', alt: 'Outdoor event space at Rush No More' },
                  { src: '/images/EventCenter/IMG_7775.jpeg', alt: 'Event center venue with Black Hills backdrop' },
                ].map((photo, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl overflow-hidden shadow-lodge group border-2 border-white aspect-[4/3] relative"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {WEDDING_FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-2xl shadow-lodge border-2 border-surface-muted/50 p-6 group transition-all duration-500 hover:shadow-gold-lg hover:-translate-y-2 hover:border-brand-gold/30 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/15">
                      <Icon className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-brand-stone leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-brand-navy/70 text-lg font-medium mb-6">
              Ready to start planning? Our team will help you create the perfect event.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold text-sm rounded-xl shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all duration-500 uppercase tracking-wider"
              >
                Contact Us to Plan Your Event <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-gold/30 text-brand-navy font-semibold rounded-xl hover:bg-brand-gold hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          IMAGE GALLERY MOSAIC
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Gallery ★
            </span>
            <h2 className="mb-5 text-4xl md:text-5xl">
              See It for <span className="text-brand-gold italic">Yourself</span>
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              A glimpse into events and life at Rush No More — from rally season to peaceful mountain mornings.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { img: '/images/GeneralImagesPark/IMG_7379.jpeg', label: 'Resort Overview', span: 'col-span-2 row-span-2', aspect: 'aspect-square' },
              { img: '/images/EventCenter/IMG_7644.jpeg', label: 'Event Pavilion', span: '', aspect: 'aspect-[4/3]' },
              { img: '/images/EventCenter/IMG_7514.jpeg', label: 'Event Space', span: '', aspect: 'aspect-[4/3]' },
              { img: '/images/BeerGarden/IMG_7364.jpeg', label: 'Beer Garden', span: '', aspect: 'aspect-[4/3]' },
              { img: '/images/PeoplePlaying/IMG_7608.jpeg', label: 'Fun & Community', span: '', aspect: 'aspect-[4/3]' },
              { img: '/images/Pool/PoolWithPeople.jpeg', label: 'Pool & Hot Tubs', span: 'col-span-2', aspect: 'aspect-[21/9]' },
              { img: '/images/CommonAreas/IMG_7029.jpeg', label: 'Resort Grounds', span: 'col-span-2', aspect: 'aspect-[21/9]' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl overflow-hidden group border-2 border-white shadow-lodge ${item.span} ${item.aspect}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1s] group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-white text-sm font-bold uppercase tracking-wider">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          YOUTUBE VIDEO EMBED
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F5F0E8 0%, #FDFBF7 100%)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">Experience Rush No More</h3>
            <p className="text-brand-navy/70 font-medium">Take a virtual tour of everything waiting for you.</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lodge-xl border-2 border-white">
            <div className="aspect-video bg-surface-secondary">
              <iframe
                src={SITE.youtube}
                title="Rush No More RV Resort Virtual Tour"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <BookingCTA title="Ready to Join the Fun?" subtitle="Book your stay for the Sturgis Rally, Car Show weekend, or your next special event — we can't wait to welcome you." />
    </>
  );
}
