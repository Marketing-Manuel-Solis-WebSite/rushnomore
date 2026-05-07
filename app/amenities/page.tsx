'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE, AMENITIES, REVIEWS } from '@/data/site';
import { BookingCTA, SectionHeader } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, videoSchema } from '@/lib/seo';
import {
  ExternalLink, Star, ArrowRight,
  Beer, Waves, ShowerHead, WashingMachine, Wifi, PawPrint, Bike, Fuel,
  Flame, Gamepad2, BookOpen, TreePine, Store, Utensils, Cable, ShieldCheck,
  Users, Tent, Home, Truck, CheckCircle, Sparkles, Sun, Moon,
  Music, Camera, Mountain, Quote, ChevronDown,
  Clock, Coffee
} from 'lucide-react';

/* ─── Icon Map ─── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Beer, Waves, ShowerHead, WashingMachine, Wifi, PawPrint, Bike, Fuel,
  Flame, Gamepad2, BookOpen, TreePine, Store, Utensils, Cable, ShieldCheck, Coffee,
};

/* ─── Featured Amenities with extended info ─── */
const FEATURED_AMENITIES = [
  {
    icon: Waves,
    title: 'Pool & Hot Tubs',
    tagline: 'Cool off or soak under the stars',
    description: 'Our heated swimming pool is the centerpiece of summer fun at Rush No More. Surrounded by comfortable lounge chairs and shaded areas, it\'s the perfect spot to cool off after a day exploring the Black Hills. When evening comes, slip into one of our hot tubs and watch the stars emerge over the Ponderosa pines.',
    features: ['Heated swimming pool', 'Multiple hot tub spas', 'Poolside lounge chairs', 'Shaded seating areas', 'Open daily in season'],
    hours: 'Pool: 9 AM – 9 PM · Hot Tubs: 9 AM – 10 PM',
    image: '/images/Pool/PoolWithPeople.jpeg',
  },
  {
    icon: Beer,
    title: 'Beer Garden & Bar',
    tagline: 'Where stories are told and friendships are made',
    description: 'Rush No More\'s famous Beer Garden is where campground life truly comes alive. Enjoy ice-cold craft beers, refreshing cocktails, and non-alcoholic beverages in our open-air gathering spot. With live music during rally season and special events, it\'s the social heart of the resort — and over 34,000 drinks served proves it.',
    features: ['Craft beer selection', 'Full bar cocktails', 'Non-alcoholic options', 'Live music events', 'Rally headquarters'],
    hours: 'Open 11 AM – 10 PM (extended during Rally)',
    image: '/images/BeerGarden/IMG_7326.jpeg',
  },
  {
    icon: Utensils,
    title: 'Cafe',
    tagline: 'Fresh food on weekends & Rally',
    description: 'Our on-site Cafe serves up fresh food and drinks every weekend and throughout the full 10 days of Rally. A perfect spot to grab breakfast before heading out to explore the Black Hills, or a quick lunch between adventures. Enjoy indoor or outdoor seating with views of the resort grounds.',
    features: ['Open weekends year-round', 'Open all 10 days of Rally', 'Breakfast & lunch options', 'Indoor & outdoor seating', 'Fresh coffee & drinks'],
    hours: 'Weekends & Rally: 7 AM – 2 PM',
    image: '/images/Cafe&SnackBar/IMG_7627.jpeg',
  },
  {
    icon: Gamepad2,
    title: 'Game Room & Recreation',
    tagline: 'Fun for every age, rain or shine',
    description: 'Our game room is a hit with families and groups alike. Packed with arcade games, pool tables, and board games, it\'s the go-to spot when you need a break from the sun or want some indoor fun. Kids love it, teenagers actually put down their phones, and adults rediscover their competitive side.',
    features: ['Arcade games', 'Pool tables', 'Board games', 'Indoor activities', 'Family-friendly fun'],
    hours: 'Open 8 AM – 10 PM daily',
    image: '/images/RecRoom/GamesRoom.jpeg',
  },
];

/* ─── Amenity Grid Data (the full 16) ─── */
const AMENITY_GRID = [
  { icon: Waves, title: 'Pool & Hot Tubs', desc: 'Heated pool and spa tubs for ultimate relaxation', tag: 'Most Popular' },
  { icon: Beer, title: 'Beer Garden', desc: 'On-site bar with craft beers, cocktails & live music', tag: 'Fan Favorite' },
  { icon: ShowerHead, title: 'Modern Bathhouses', desc: 'Spotless, fully-equipped shower and restroom facilities', tag: '' },
  { icon: WashingMachine, title: 'Laundromats', desc: 'Coin-operated washers and dryers throughout the park', tag: '' },
  { icon: Wifi, title: 'Free Wi-Fi', desc: 'High-speed internet access across the entire resort', tag: '' },
  { icon: PawPrint, title: 'Pet Friendly', desc: 'Bring your furry family members — dog run included', tag: 'Paws Welcome' },
  { icon: Bike, title: 'Bike Wash Station', desc: 'Professional-grade wash station for motorcycles & bikes', tag: 'Riders Love' },
  { icon: Fuel, title: 'Propane Sales', desc: 'Convenient on-site propane refill and exchange', tag: '' },
  { icon: Utensils, title: 'Cafe', desc: 'Open weekends & all 10 days of Rally', tag: '' },
  { icon: Gamepad2, title: 'Game Room', desc: 'Arcade games, pool tables, and board games', tag: '' },
  { icon: BookOpen, title: 'Camp Library', desc: 'Take a book, leave a book — quiet reading corner', tag: '' },
  { icon: TreePine, title: 'Nature Trails', desc: 'Miles of walking and hiking trails through pine forest', tag: '' },
  { icon: Store, title: 'Camp Store', desc: 'Essentials, snacks, souvenirs, and local goods', tag: '' },
  { icon: Utensils, title: 'Picnic Pavilions', desc: 'Covered and open-air picnic areas with BBQ grills', tag: '' },
  { icon: Cable, title: 'Full Hookups', desc: 'Water, electric (30/50 AMP), and sewer at every RV site', tag: '' },
  { icon: ShieldCheck, title: '24/7 Security', desc: 'Gated entry, patrol, and emergency assistance', tag: 'Peace of Mind' },
];

/* ─── "Day at Rush No More" Timeline ─── */
const TIMELINE = [
  { time: '7:00 AM', icon: Sun, title: 'Wake Up to Pine Air', desc: 'Step outside to fresh mountain air, birdsong, and coffee on the patio.' },
  { time: '9:00 AM', icon: Waves, title: 'Morning Swim', desc: 'Start the day with a refreshing dip in the heated pool before the crowds.' },
  { time: '10:00 AM', icon: Mountain, title: 'Explore the Black Hills', desc: 'Head out to Mount Rushmore, Deadwood, or Custer State Park — all an easy drive.' },
  { time: '2:00 PM', icon: TreePine, title: 'Trail Time', desc: 'Hike our nature trails through Ponderosa pines and discover hidden views.' },
  { time: '4:00 PM', icon: Beer, title: 'Beer Garden O\'Clock', desc: 'Kick back with a cold craft beer and swap stories with fellow campers.' },
  { time: '6:00 PM', icon: Utensils, title: 'Cookout Time', desc: 'Grill with propane or charcoal at your site, or use our picnic pavilions for a family cookout.' },
  { time: '8:00 PM', icon: Gamepad2, title: 'Game Room Fun', desc: 'Challenge the family to arcade games and pool while the kids go wild.' },
  { time: '9:30 PM', icon: Moon, title: 'Stargazing Soak', desc: 'Slip into the hot tub and watch a million stars appear over the Black Hills.' },
];

export default function AmenitiesPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Amenities', url: '/amenities' }])} />
      <JsonLd data={videoSchema({ name: 'Rush No More Amenities Tour — Pool, Hot Tubs, Beer Garden & More', description: '16 free resort amenities at Rush No More campground near Mount Rushmore — heated pool, hot tub spas, beer garden, game room, nature trails, modern bathhouses & more. No resort fees.', thumbnailUrl: '/images/Pool/PoolWithPeople.jpeg', contentUrl: '/videos/rushnomore-amenities.mp4', uploadDate: '2025-01-01' })} />
      <JsonLd data={faqSchema([
        { q: 'Are amenities free at Rush No More?', a: 'Yes! All 16 amenities are included free with every reservation — RV, cabin, or tent. This includes the heated pool, hot tubs, beer garden, game room, nature trails, bathhouses, Wi-Fi, and more.' },
        { q: 'Does Rush No More have a swimming pool?', a: 'Yes! We have a heated swimming pool open seasonally (May through September) that is free for all registered guests.' },
        { q: 'Is Rush No More pet friendly?', a: 'Absolutely! We welcome well-behaved pets. We have designated pet-friendly areas and ask that all pets be kept on leashes in common areas.' },
        { q: 'Does Rush No More have a beer garden?', a: 'Yes! Our on-site beer garden serves craft beers, cocktails, and beverages. It is open weekends during regular season and all 10 days during the Sturgis Rally.' },
        { q: 'Is there Wi-Fi at Rush No More?', a: 'Yes, free Wi-Fi is available throughout the campground for all registered guests.' },
        { q: 'Are campfires allowed at Rush No More?', a: 'Wood fires are NOT allowed as we back up to Forest Service land. However, propane campfire rentals and charcoal grills are available and permitted.' },
      ])} />

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Full-screen video background
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/rushnomore-amenities.mp4"
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
            16 Resort Amenities
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything for the{' '}
            <span className="text-brand-gold italic">Perfect</span> Stay
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Pool, hot tubs, beer garden, game room, nature trails, Wi-Fi, pet-friendly grounds & so much more — all included with every stay. No hidden fees, no surprises.
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
            <a href="#amenities-grid" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium">
              <ChevronDown className="w-5 h-5 animate-bounce" /> Explore All Amenities
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
              { val: '16', label: 'Amenities' },
              { val: '100%', label: 'Included Free' },
              { val: '4.8★', label: 'Guest Rating' },
              { val: '24/7', label: 'Security' },
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
          "ALL INCLUDED" BANNER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-brand-gold text-white py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <span className="text-sm font-bold uppercase tracking-wider">All Amenities Included With Every Stay</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <span className="flex items-center gap-2"><Waves className="w-4 h-4" /> Pool & Hot Tubs</span>
            <span className="flex items-center gap-2"><Beer className="w-4 h-4" /> Beer Garden</span>
            <span className="flex items-center gap-2"><Wifi className="w-4 h-4" /> Free Wi-Fi</span>
            <span className="flex items-center gap-2"><PawPrint className="w-4 h-4" /> Pet Friendly</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED AMENITIES — Deep Dive Showcase
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Featured ★
            </span>
            <h2 className="mb-5 text-4xl md:text-5xl leading-tight">
              Our <span className="text-brand-gold italic">Top</span> Amenities
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              Guests love these the most — and they&apos;re all included with your stay.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-6 mx-auto" />
          </div>

          {/* Featured amenity cards — alternating layout */}
          <div className="space-y-16">
            {FEATURED_AMENITIES.map((amenity, idx) => {
              const Icon = amenity.icon;
              const isReversed = idx % 2 === 1;

              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? '' : ''}`}>
                    {/* Image */}
                    <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
                      <div className="relative rounded-3xl overflow-hidden shadow-lodge-xl group border-2 border-white aspect-[4/3]">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                          style={{ backgroundImage: `url('${amenity.image}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

                        {/* Floating tag */}
                        <div className="absolute top-5 left-5 z-10">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-white rounded-full text-xs font-black uppercase tracking-wider shadow-gold">
                            <Icon className="w-4 h-4" /> {amenity.title}
                          </span>
                        </div>

                        {/* Hours badge */}
                        <div className="absolute bottom-5 left-5 right-5 z-10">
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lodge">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                              <span className="font-medium text-brand-navy">{amenity.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative element */}
                      <div className={`absolute -bottom-4 ${isReversed ? '-left-4' : '-right-4'} w-24 h-24 bg-brand-gold/10 rounded-2xl -z-10`} />
                      <div className={`absolute -top-4 ${isReversed ? '-right-4' : '-left-4'} w-16 h-16 bg-brand-gold/5 rounded-full -z-10`} />
                    </div>

                    {/* Content */}
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 bg-brand-gold/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-brand-gold/20 shadow-gold">
                          <Icon className="w-7 h-7 text-brand-gold" />
                        </div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight">{amenity.title}</h3>
                          <p className="text-brand-gold text-sm font-bold uppercase tracking-wider mt-0.5">{amenity.tagline}</p>
                        </div>
                      </div>

                      <p className="text-brand-navy/80 text-lg leading-relaxed mb-6 font-medium">
                        {amenity.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {amenity.features.map((f, i) => (
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
                        Book & Enjoy <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FULL AMENITIES GRID — All 16
      ═══════════════════════════════════════════════════════════════ */}
      <section id="amenities-grid" className="py-24 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Complete List ★
            </span>
            <h2 className="mb-5 text-4xl md:text-5xl">
              All <span className="text-brand-gold italic">16</span> Amenities
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              Every single amenity is included free with your stay. No hidden fees, no resort charges, no surprises.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {AMENITY_GRID.map((amenity, i) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-2xl shadow-lodge border-2 border-surface-muted/50 p-6 text-center group transition-all duration-500 hover:shadow-gold-lg hover:-translate-y-3 hover:border-brand-gold/30 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  {amenity.tag && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-[9px] font-black uppercase tracking-wider bg-brand-gold/10 text-brand-gold rounded-full border border-brand-gold/20">
                        {amenity.tag}
                      </span>
                    </div>
                  )}
                  <div className="w-16 h-16 bg-brand-gold/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/15">
                    <Icon className="w-8 h-8 text-brand-gold group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h4 className="font-bold text-base mb-2">{amenity.title}</h4>
                  <p className="text-sm text-brand-stone leading-relaxed">{amenity.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          "A DAY AT RUSH NO MORE" — Timeline Section with Video BG
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 text-white relative overflow-hidden">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/rush-no-more-perfect-day.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/DSC05580-s.png"
        />
        <div className="absolute inset-0 bg-brand-navy/85" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Imagine Your Day ★
            </span>
            <h2 className="mb-5 text-white text-4xl md:text-5xl">
              A Perfect Day at <span className="text-brand-gold italic">Rush No More</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium">
              From sunrise coffee to stargazing soaks — here&apos;s how our guests spend a day in paradise.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold/60 via-brand-gold/30 to-brand-gold/60 md:-translate-x-0.5" />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={i}
                    className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    {/* Dot on timeline */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-brand-gold rounded-full -translate-x-1/2 mt-6 z-10 ring-4 ring-brand-navy shadow-gold" />

                    {/* Content */}
                    <div className={`flex-1 pl-12 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300 group`}>
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <div className="w-10 h-10 bg-brand-gold/20 rounded-xl flex items-center justify-center group-hover:bg-brand-gold/30 transition-colors">
                            <Icon className="w-5 h-5 text-brand-gold" />
                          </div>
                          <div>
                            <span className="text-brand-gold font-display text-lg font-bold">{item.time}</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-display font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          IMAGE GALLERY MOSAIC
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F5F0E8 0%, #FDFBF7 50%, #F5F0E8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Gallery ★
            </span>
            <h2 className="mb-5 text-4xl md:text-5xl">
              See It for <span className="text-brand-gold italic">Yourself</span>
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              A glimpse into the Rush No More experience — from poolside relaxation to mountain evenings.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          {/* Mosaic grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { img: '/images/Pool/PoolSunDay.jpeg', label: 'Sunny Pool Days', span: 'col-span-2 row-span-2', aspect: 'aspect-square' },
              { img: '/images/BeerGarden/IMG_7358.jpg', label: 'Beer Garden', span: '', aspect: 'aspect-[4/3]' },
              { img: '/images/Jacuzzi/JacuzziRNM.jpeg', label: 'Hot Tub Spa', span: '', aspect: 'aspect-[4/3]' },
              { img: '/images/CommonAreas/basketball.jpeg', label: 'Basketball Court', span: '', aspect: 'aspect-[4/3]' },
              { img: '/images/Store/FrontStore.jpeg', label: 'Camp Store', span: '', aspect: 'aspect-[4/3]' },
              { img: '/images/CommonAreas/IMG_0355.jpeg', label: 'Resort Common Areas', span: 'col-span-2', aspect: 'aspect-[21/9]' },
              { img: '/images/GeneralImagesPark/IMG_7379.jpeg', label: 'Park Grounds', span: 'col-span-2', aspect: 'aspect-[21/9]' },
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
          EVENT SPACE / PAVILION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/Aereal-2_1400.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
                ★ Event Space ★
              </span>
              <h2 className="mb-5 text-white text-4xl md:text-5xl leading-tight">
                Large Outdoor <span className="text-brand-gold italic">Pavilion</span>
              </h2>
              <div className="w-24 h-1.5 bg-gold-gradient rounded-full mb-6" />
              <p className="text-white/80 text-lg leading-relaxed mb-6 font-medium">
                Our beautiful outdoor pavilion with full kitchen is the perfect venue for weddings, family reunions, corporate retreats, and group gatherings. Surrounded by Black Hills scenery with on-site lodging for all your guests.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Users, text: 'Groups of 20-200' },
                  { icon: Utensils, text: 'Full Kitchen Included' },
                  { icon: Music, text: 'Live Music Friendly' },
                  { icon: Camera, text: 'Stunning Photo Spots' },
                  { icon: Home, text: 'On-Site Lodging' },
                  { icon: Beer, text: 'Beer Garden Access' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <item.icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <span className="text-sm text-white/80 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/events#weddings" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gold text-white font-bold text-sm rounded-xl shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all duration-500 uppercase tracking-wider">
                  Events & Weddings <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white hover:text-brand-navy transition-all duration-300 text-sm uppercase tracking-wider">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Image collage */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lodge-lg group border border-white/10">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/Pool/PoolSide.jpeg')" }} />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lodge-lg group border border-white/10">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/BeerGarden/IMG_7364.jpeg')" }} />
                </div>
              </div>
              <div className="space-y-3 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lodge-lg group border border-white/10">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/GamesKids/ToboganKids.jpeg')" }} />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lodge-lg group border border-white/10">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/Cafe&SnackBar/IMG_7627.jpeg')" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          REVIEWS — What guests say about amenities
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 50%, #FDFBF7 100%)' }}>
        <div className="absolute top-10 left-10 text-brand-gold/[0.04]"><Quote className="w-48 h-48" /></div>
        <div className="absolute bottom-10 right-10 text-brand-gold/[0.04] rotate-180"><Quote className="w-48 h-48" /></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Guest Reviews ★
            </span>
            <h2 className="mb-3">What Campers Say About <span className="text-brand-gold italic">Our Amenities</span></h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">Real reviews from real guests who loved the Rush No More experience.</p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          {/* Featured review */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-14 mb-8 relative overflow-hidden shadow-lodge-lg border border-brand-gold/15">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-bl-[120px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-tr-[80px]" />
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1.5 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-7 h-7 text-brand-gold fill-brand-gold" />)}
              </div>
              <p className="text-xl md:text-3xl text-brand-navy italic leading-relaxed mb-8 font-display font-bold">
                &ldquo;{REVIEWS[2].text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-brand-gold/15 shadow-lodge">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">{REVIEWS[2].title.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="font-display text-brand-navy font-bold text-sm">{REVIEWS[2].title}</p>
                  {REVIEWS[2].source && <span className="text-[10px] font-bold uppercase tracking-wider text-brand-stone">{REVIEWS[2].source}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(3, 6).map((r, i) => (
              <motion.div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 shadow-lodge border border-white/50 hover:shadow-gold-lg hover:-translate-y-1 hover:border-brand-gold/20 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">{Array.from({ length: 5 }, (_, j) => <Star key={j} className={`w-5 h-5 ${j < r.rating ? 'text-brand-gold fill-brand-gold' : 'text-surface-muted'}`} />)}</div>
                  {r.source && <span className="text-[10px] font-black uppercase tracking-wider text-brand-stone bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-surface-muted/30">{r.source}</span>}
                </div>
                <p className="text-brand-navy/80 italic mb-5 text-sm leading-relaxed font-medium">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-4 border-t border-brand-gold/10">
                  <div className="w-8 h-8 bg-brand-gold/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-brand-gold/15">
                    <span className="text-brand-gold text-xs font-black">{r.title.charAt(0)}</span>
                  </div>
                  <p className="font-display text-brand-navy font-bold text-sm">{r.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ACCOMMODATION QUICK COMPARE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Stay With Us ★
            </span>
            <h2 className="mb-3">Every Stay Includes <span className="text-brand-gold italic">All 16</span> Amenities</h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">Choose your accommodation — amenities are always on the house.</p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'RV Sites', price: 'Starts at $41.22', sub: 'per night · Full hookups', img: '/images/GeneralImagesPark/IMG_7381.jpeg', href: '/stay/rv-sites', features: ['30/50 AMP Service', 'Pull-Through up to 100ft', 'Cement Slabs (Luxury)', 'Hot Tub (Luxury Spa)'] },
              { icon: Home, title: 'Presidential Cabins', price: 'Starts at $51.76', sub: 'per night · 16 unique cabins', img: '/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg', href: '/stay/cabins', features: ['Sleeps 2-10 Guests', 'Full Kitchens', 'A/C & Heating', 'Private Bathrooms'] },
              { icon: Tent, title: 'Tent Camping', price: 'From $35', sub: 'per night · Best value', img: '/images/Wooded-Tent-Area.png', href: '/stay/tent-camping', features: ['Shaded Pine Forest', '15 Sites with Electric', 'Water Hookups', 'Bathhouse Access'] },
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
                          <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> All 16 amenities included
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

      {/* ═══ MAP ═══ */}
      <section className="h-[400px] relative">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-surface-primary to-transparent z-10" />
        <iframe src={SITE.mapsEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title="Rush No More location" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SEE OUR AMENITIES — Real Photo Gallery
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Real Photos ★
            </span>
            <h2 className="mb-5 text-4xl md:text-5xl">
              See Our <span className="text-brand-gold italic">Amenities</span>
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              Real photos from Rush No More
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          {/* Photo gallery categories */}
          <div className="space-y-16">
            {[
              {
                category: 'Pool & Hot Tubs',
                photos: [
                  { src: '/images/Pool/PoolGeneral.jpeg', alt: 'Heated swimming pool at Rush No More RV Resort in Sturgis, SD' },
                  { src: '/images/Pool/PoolSunDay.jpeg', alt: 'Sunny day poolside at Rush No More campground near Mount Rushmore' },
                  { src: '/images/Pool/PoolWithPeople.jpeg', alt: 'Guests enjoying the heated pool at Rush No More in the Black Hills' },
                  { src: '/images/Jacuzzi/JacuzziRNM.jpeg', alt: 'Outdoor hot tub spa at Rush No More RV Resort, Sturgis South Dakota' },
                  { src: '/images/Jacuzzi/IMG_7205.jpeg', alt: 'Private hot tub spa at Luxury Spa RV site, Rush No More' },
                ],
              },
              {
                category: 'Beer Garden',
                photos: [
                  { src: '/images/BeerGarden/IMG_7326.jpeg', alt: 'Rush No More Beer Garden outdoor seating' },
                  { src: '/images/BeerGarden/IMG_7358.jpg', alt: 'Beer Garden bar and gathering area' },
                  { src: '/images/BeerGarden/IMG_7422.jpg', alt: 'Beer Garden evening atmosphere' },
                ],
              },
              {
                category: 'Fun & Recreation',
                photos: [
                  { src: '/images/CommonAreas/basketball.jpeg', alt: 'Outdoor basketball court at Rush No More RV Resort, Sturgis SD' },
                  { src: '/images/GamesKids/ToboganKids.jpeg', alt: 'Kids playground slide and play area at Rush No More campground' },
                  { src: '/images/RecRoom/GamesRoom.jpeg', alt: 'Indoor game room with arcade games and pool tables at Rush No More' },
                ],
              },
              {
                category: 'Camp Store & Cafe',
                photos: [
                  { src: '/images/Store/FrontStore.jpeg', alt: 'Rush No More camp store exterior' },
                  { src: '/images/Cafe&SnackBar/IMG_7627.jpeg', alt: 'Cafe and snack bar at Rush No More' },
                ],
              },
              {
                category: 'Our Grounds',
                photos: [
                  { src: '/images/CommonAreas/IMG_0355.jpeg', alt: 'Rush No More RV Resort common gathering area in Sturgis, South Dakota' },
                  { src: '/images/CommonAreas/IMG_7029.jpeg', alt: 'Resort common areas and seating at Rush No More near Mount Rushmore' },
                  { src: '/images/CommonAreas/IMG_7435.jpeg', alt: 'Scenic grounds and landscaping at Rush No More in the Black Hills' },
                  { src: '/images/GeneralImagesPark/IMG_7379.jpeg', alt: 'Panoramic view of Rush No More RV park and campground grounds' },
                ],
              },
            ].map((group, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  <span className="text-brand-gold">/</span> {group.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.photos.map((photo, pi) => (
                    <div
                      key={pi}
                      className="rounded-2xl overflow-hidden relative aspect-[4/3] group"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA title="Ready to Enjoy All 16 Amenities?" subtitle="RV starts at $41.22 | Cabins starts at $51.76 | Tent from $35/night — all amenities included free." />
    </>
  );
}