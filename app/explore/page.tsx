'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ATTRACTIONS, ITINERARY, SITE, REVIEWS, type Attraction } from '@/data/site';
import { BookingCTA, SectionHeader } from '@/components/ui';
import { FadeIn, ParallaxHero, StaggerChildren, StaggerItem } from '@/components/motion';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';
import {
  ExternalLink, MapPin, Clock, Star, Lightbulb, ArrowRight, ArrowDown,
  Mountain, TreePine, Route, Calendar, Compass, ChevronRight, Play, Pause,
  Navigation, Camera, Binoculars, Tent, Home, Sparkles, Quote
} from 'lucide-react';

/* ─── Section navigation items ─── */
const SECTIONS = [
  { id: 'hero', label: 'Top', icon: Compass },
  { id: 'mount-rushmore', label: 'Mt. Rushmore', icon: Mountain },
  { id: 'crazy-horse', label: 'Crazy Horse', icon: Mountain },
  { id: 'deadwood', label: 'Deadwood', icon: Navigation },
  { id: 'spearfish-canyon', label: 'Spearfish', icon: TreePine },
  { id: 'custer-state-park', label: 'Custer Park', icon: Binoculars },
  { id: 'needles-highway', label: 'Needles Hwy', icon: Route },
  { id: 'itinerary', label: '6-Day Guide', icon: Calendar },
  { id: 'events', label: 'Events', icon: Sparkles },
] as const;

/* ─── Distance data for visual comparison ─── */
const DISTANCES = [
  { name: 'Sturgis', miles: 5, time: '7 min', color: 'bg-emerald-500' },
  { name: 'Deadwood', miles: 12, time: '15 min', color: 'bg-amber-500' },
  { name: 'Spearfish Canyon', miles: 25, time: '30 min', color: 'bg-sky-500' },
  { name: 'Mount Rushmore', miles: 55, time: '1 hour', color: 'bg-rose-500' },
  { name: 'Crazy Horse', miles: 60, time: '1 hour', color: 'bg-violet-500' },
  { name: 'Needles Highway', miles: 65, time: '1.5 hours', color: 'bg-teal-500' },
  { name: 'Custer State Park', miles: 70, time: '1.5 hours', color: 'bg-orange-500' },
];

/* ─── Helper: get attraction by id ─── */
function getAttraction(id: string): Attraction {
  return ATTRACTIONS.find(a => a.id === id)!;
}

/* ─── Animated Counter Component ─── */
function AnimatedStat({ value, label, suffix = '' }: { value: string; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <p className="font-display text-4xl md:text-5xl text-brand-gold mb-1">{value}{suffix}</p>
      <p className="text-xs uppercase tracking-widest text-white/60 font-bold">{label}</p>
    </motion.div>
  );
}

/* ─── Highlight Item Component ─── */
function HighlightItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-brand-gold/30 transition-all group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <div className="w-8 h-8 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/30 transition-colors">
        <span className="text-brand-gold font-bold text-sm">{index + 1}</span>
      </div>
      <span className="text-sm text-white/80">{text}</span>
    </motion.div>
  );
}

function HighlightItemLight({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg border border-surface-muted hover:border-brand-gold/30 transition-all group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <div className="w-8 h-8 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
        <span className="text-brand-gold font-bold text-sm">{index + 1}</span>
      </div>
      <span className="text-sm text-brand-navy/80">{text}</span>
    </motion.div>
  );
}

/* ─── Pro Tip Component ─── */
function ProTip({ tip }: { tip: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Lightbulb className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
      <span className="text-white/70">{tip}</span>
    </div>
  );
}

function ProTipLight({ tip }: { tip: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Lightbulb className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
      <span className="text-brand-navy/70">{tip}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPLORE PAGE
   ═══════════════════════════════════════════════════ */
export default function ExplorePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  /* Scroll spy for section navigation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const mt = getAttraction('mount-rushmore');
  const ch = getAttraction('crazy-horse');
  const dw = getAttraction('deadwood');
  const sc = getAttraction('spearfish-canyon');
  const cs = getAttraction('custer-state-park');
  const nh = getAttraction('needles-highway');
  const sr = getAttraction('sturgis-rally');
  const carShow = getAttraction('car-show');

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Explore the Black Hills', url: '/explore' }])} />
      <JsonLd data={faqSchema([
        { q: 'How far is Rush No More from Mount Rushmore?', a: 'Rush No More is approximately 55 miles (about 1 hour drive) from Mount Rushmore National Memorial, making it a perfect base camp for day trips.' },
        { q: 'What is the closest attraction to Rush No More?', a: 'Sturgis Main Street is just 5 miles away (7 minutes). Historic Deadwood is only 12 miles (15 minutes) from our campground.' },
        { q: 'Can I visit all Black Hills attractions in one trip?', a: 'We recommend 4-6 days to see the major attractions. Our 6-day itinerary covers Mount Rushmore, Crazy Horse, Deadwood, Spearfish Canyon, Custer State Park, and more.' },
        { q: 'Is Rush No More a good base for exploring the Black Hills?', a: 'Yes! Our location in Sturgis gives you easy I-90 access and central positioning for all major Black Hills attractions — from Deadwood (12 mi) to Mount Rushmore (55 mi) to Custer State Park (70 mi).' },
        { q: 'What scenic drives are near Rush No More?', a: 'Spearfish Canyon (25 mi), Needles Highway (65 mi), Iron Mountain Road, and the Wildlife Loop in Custer State Park are all accessible day trips from our campground.' },
      ])} />

      {/* ═══════════════════════════════════════════════
          SECTION 1: CINEMATIC VIDEO HERO
          ═══════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/RNM-explore.mp4"
          poster="/images/DSC05580-s.png"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Video control */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          aria-label={videoPlaying ? 'Pause video' : 'Play video'}
        >
          {videoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-8 text-center text-white">
          <motion.span
            className="badge-gold mb-8 inline-block !bg-brand-gold/30 !text-brand-gold-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Gateway to Adventure
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Explore the <span className="text-brand-gold italic">Black Hills</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From the faces of Mount Rushmore to the Wild West streets of Deadwood, from buffalo herds in Custer State Park to waterfalls in Spearfish Canyon — discover everything the Black Hills has to offer.
          </motion.p>

          {/* Quick distance facts */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {[
              { value: '55 mi', label: 'to Mt. Rushmore' },
              { value: '5 mi', label: 'to Sturgis' },
              { value: '12 mi', label: 'to Deadwood' },
              { value: '9', label: 'Attractions' },
            ].map((fact, i) => (
              <div key={i} className="glass rounded-xl p-3">
                <p className="font-display text-2xl text-brand-gold">{fact.value}</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">{fact.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="#mount-rushmore" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
              <span className="text-sm">Start Exploring</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          STICKY SECTION NAVIGATION
          ═══════════════════════════════════════════════ */}
      <nav className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-surface-muted shadow-lodge">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all duration-300 ${
                  activeSection === id
                    ? 'text-white'
                    : 'text-brand-navy/50 hover:text-brand-navy'
                }`}
              >
                {activeSection === id && (
                  <motion.div
                    layoutId="activeExploreTab"
                    className="absolute inset-0 bg-brand-navy rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════
          SECTION 2: MOUNT RUSHMORE — FULL WIDTH CINEMATIC
          ═══════════════════════════════════════════════ */}
      <section id="mount-rushmore" className="relative overflow-hidden">
        {/* Split layout: Image left, Content right */}
        <div className="grid lg:grid-cols-2 min-h-[90vh]">
          {/* Image Side */}
          <div className="relative h-[50vh] lg:h-auto overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${mt.heroImage}')` }}
              whileInView={{ scale: 1.05 }}
              initial={{ scale: 1.15 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-navy/30 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent lg:hidden" />

            {/* Floating badge */}
            <motion.div
              className="absolute top-6 left-6 glass-dark rounded-xl px-4 py-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-brand-gold font-bold text-sm">America&apos;s Shrine of Democracy</span>
            </motion.div>

            {/* Distance badge */}
            <motion.div
              className="absolute bottom-6 left-6 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span className="text-white text-sm font-bold">{mt.distance}</span>
              </div>
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span className="text-white text-sm font-bold">{mt.driveTime}</span>
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="bg-brand-navy text-white py-16 lg:py-24 px-8 lg:px-16 flex flex-col justify-center">
            <FadeIn>
              <span className="badge-gold !bg-brand-gold/20 !text-brand-gold-light mb-4 inline-block">History</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">{mt.title}</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">{mt.longDescription}</p>

              {/* Highlights */}
              <div className="mb-8">
                <h4 className="text-lg mb-4 flex items-center gap-2 font-display">
                  <Star className="w-5 h-5 text-brand-gold" /> Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mt.highlights.map((h, i) => (
                    <HighlightItem key={i} text={h} index={i} />
                  ))}
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Pro Tips
                </h4>
                {mt.tips.map((tip, i) => (
                  <ProTip key={i} tip={tip} />
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Book Your Stay <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                {mt.website && (
                  <a href={mt.website} target="_blank" rel="noopener noreferrer" className="btn-outline-light text-sm">
                    Official Website <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: CRAZY HORSE — REVERSED LAYOUT
          ═══════════════════════════════════════════════ */}
      <section id="crazy-horse" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[85vh]">
          {/* Content Side (left on desktop) */}
          <div className="bg-surface-primary py-16 lg:py-24 px-8 lg:px-16 flex flex-col justify-center order-2 lg:order-1">
            <FadeIn>
              <span className="badge-gold mb-4 inline-block">History</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">{ch.title}</h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-8">{ch.longDescription}</p>

              <div className="mb-8">
                <h4 className="text-lg mb-4 flex items-center gap-2 font-display">
                  <Star className="w-5 h-5 text-brand-gold" /> Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ch.highlights.map((h, i) => (
                    <HighlightItemLight key={i} text={h} index={i} />
                  ))}
                </div>
              </div>

              <div className="bg-brand-gold/5 border border-brand-gold/15 rounded-xl p-5 space-y-3 mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Pro Tips
                </h4>
                {ch.tips.map((tip, i) => (
                  <ProTipLight key={i} tip={tip} />
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Book Your Stay <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Image Side (right on desktop) */}
          <div className="relative h-[50vh] lg:h-auto overflow-hidden order-1 lg:order-2">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${ch.heroImage}')` }}
              whileInView={{ scale: 1.05 }}
              initial={{ scale: 1.15 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-surface-primary/30 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/60 via-transparent to-transparent lg:hidden" />

            <motion.div
              className="absolute top-6 right-6 glass-dark rounded-xl px-4 py-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-brand-gold font-bold text-sm">World&apos;s Largest Mountain Carving</span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-6 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span className="text-white text-sm font-bold">{ch.distance}</span>
              </div>
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span className="text-white text-sm font-bold">{ch.driveTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: DEADWOOD — FULL WIDTH IMMERSIVE
          ═══════════════════════════════════════════════ */}
      <section id="deadwood" className="relative min-h-[90vh] overflow-hidden">
        {/* Full Background Image */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${dw.heroImage}')` }}
            whileInView={{ scale: 1.03 }}
            initial={{ scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-brand-navy/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Content - spans 3 cols */}
            <div className="lg:col-span-3">
              <FadeIn>
                <span className="badge-gold !bg-brand-gold/20 !text-brand-gold-light mb-4 inline-block">History</span>
                <h2 className="text-4xl md:text-5xl text-white mb-6">{dw.title}</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8">{dw.longDescription}</p>

                <div className="mb-8">
                  <h4 className="text-lg text-white mb-4 flex items-center gap-2 font-display">
                    <Star className="w-5 h-5 text-brand-gold" /> Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dw.highlights.map((h, i) => (
                      <HighlightItem key={i} text={h} index={i} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Tips & CTA - spans 2 cols */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.2}>
                <div className="glass rounded-2xl p-6 mb-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Pro Tips
                  </h4>
                  <div className="space-y-3">
                    {dw.tips.map((tip, i) => (
                      <ProTip key={i} tip={tip} />
                    ))}
                  </div>
                </div>

                {/* Quick Info */}
                <div className="glass rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <MapPin className="w-6 h-6 text-brand-gold mx-auto mb-2" />
                      <p className="text-white font-bold text-lg">{dw.distance}</p>
                      <p className="text-white/50 text-xs uppercase">Distance</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-6 h-6 text-brand-gold mx-auto mb-2" />
                      <p className="text-white font-bold text-lg">{dw.driveTime}</p>
                      <p className="text-white/50 text-xs uppercase">Drive Time</p>
                    </div>
                  </div>
                </div>

                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center">
                  Book Your Stay <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5: SPEARFISH CANYON — SPLIT WITH VIDEO
          ═══════════════════════════════════════════════ */}
      <section id="spearfish-canyon" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[85vh]">
          {/* Image Side */}
          <div className="relative h-[50vh] lg:h-auto overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${sc.heroImage}')` }}
              whileInView={{ scale: 1.05 }}
              initial={{ scale: 1.15 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-forest/20 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent lg:hidden" />

            <motion.div
              className="absolute top-6 left-6 bg-emerald-900/80 backdrop-blur-md rounded-xl px-4 py-2 border border-emerald-700/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-emerald-300 font-bold text-sm">One of America&apos;s Most Beautiful Drives</span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-6 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-sm font-bold">{sc.distance}</span>
              </div>
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-sm font-bold">{sc.driveTime}</span>
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="bg-brand-forest text-white py-16 lg:py-24 px-8 lg:px-16 flex flex-col justify-center">
            <FadeIn>
              <span className="inline-block mb-4 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-emerald-500/20 text-emerald-300" style={{ fontFamily: 'var(--font-josefin), sans-serif' }}>Nature</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">{sc.title}</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">{sc.longDescription}</p>

              <div className="mb-8">
                <h4 className="text-lg mb-4 flex items-center gap-2 font-display">
                  <Star className="w-5 h-5 text-emerald-400" /> Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sc.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-emerald-500/30 transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                    >
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-400 font-bold text-sm">{i + 1}</span>
                      </div>
                      <span className="text-sm text-white/80">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Pro Tips
                </h4>
                {sc.tips.map((tip, i) => (
                  <ProTip key={i} tip={tip} />
                ))}
              </div>

              <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Book Your Stay <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6: CUSTER STATE PARK — PANORAMIC
          ═══════════════════════════════════════════════ */}
      <section id="custer-state-park" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[85vh]">
          {/* Content Side */}
          <div className="bg-surface-primary py-16 lg:py-24 px-8 lg:px-16 flex flex-col justify-center order-2 lg:order-1">
            <FadeIn>
              <span className="badge-gold mb-4 inline-block">Nature</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">{cs.title}</h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-8">{cs.longDescription}</p>

              <div className="mb-8">
                <h4 className="text-lg mb-4 flex items-center gap-2 font-display">
                  <Star className="w-5 h-5 text-brand-gold" /> Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cs.highlights.map((h, i) => (
                    <HighlightItemLight key={i} text={h} index={i} />
                  ))}
                </div>
              </div>

              <div className="bg-brand-gold/5 border border-brand-gold/15 rounded-xl p-5 space-y-3 mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Pro Tips
                </h4>
                {cs.tips.map((tip, i) => (
                  <ProTipLight key={i} tip={tip} />
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Book Your Stay <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                {cs.website && (
                  <a href={cs.website} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                    Official Website <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Image Side */}
          <div className="relative h-[50vh] lg:h-auto overflow-hidden order-1 lg:order-2">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${cs.heroImage}')` }}
              whileInView={{ scale: 1.05 }}
              initial={{ scale: 1.15 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-primary/30 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/60 via-transparent to-transparent lg:hidden" />

            <motion.div
              className="absolute top-6 right-6 glass-dark rounded-xl px-4 py-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-brand-gold font-bold text-sm">71,000 Acres of Wonder</span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-6 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span className="text-white text-sm font-bold">{cs.distance}</span>
              </div>
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span className="text-white text-sm font-bold">{cs.driveTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7: NEEDLES HIGHWAY — FULL WIDTH DARK
          ═══════════════════════════════════════════════ */}
      <section id="needles-highway" className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${nh.heroImage}')` }}
            whileInView={{ scale: 1.03 }}
            initial={{ scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-brand-navy/85" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Tips & Quick Info */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <FadeIn delay={0.2}>
                <div className="glass rounded-2xl p-6 mb-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Pro Tips
                  </h4>
                  <div className="space-y-3">
                    {nh.tips.map((tip, i) => (
                      <ProTip key={i} tip={tip} />
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <MapPin className="w-6 h-6 text-brand-gold mx-auto mb-2" />
                      <p className="text-white font-bold text-lg">{nh.distance}</p>
                      <p className="text-white/50 text-xs uppercase">Distance</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-6 h-6 text-brand-gold mx-auto mb-2" />
                      <p className="text-white font-bold text-lg">{nh.driveTime}</p>
                      <p className="text-white/50 text-xs uppercase">Drive Time</p>
                    </div>
                  </div>
                </div>

                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center">
                  Book Your Stay <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </FadeIn>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <FadeIn>
                <span className="badge-gold !bg-brand-gold/20 !text-brand-gold-light mb-4 inline-block">Scenic Route</span>
                <h2 className="text-4xl md:text-5xl text-white mb-6">{nh.title}</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8">{nh.longDescription}</p>

                <div className="mb-8">
                  <h4 className="text-lg text-white mb-4 flex items-center gap-2 font-display">
                    <Star className="w-5 h-5 text-brand-gold" /> Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {nh.highlights.map((h, i) => (
                      <HighlightItem key={i} text={h} index={i} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 8: 6-DAY ITINERARY TIMELINE
          ═══════════════════════════════════════════════ */}
      <section id="itinerary" className="section-pad bg-surface-primary relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/Aereal-2_1400.png')" }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="badge-gold mb-4 inline-block">Complete Guide</span>
              <h2 className="mb-4">Your 6-Day Black Hills Itinerary</h2>
              <p className="text-brand-stone text-lg max-w-2xl mx-auto">
                The ultimate day-by-day plan for exploring everything the Black Hills has to offer, with Rush No More as your home base.
              </p>
              <div className="divider-gold-wide mt-5 mx-auto" />
            </FadeIn>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-gold/50 to-brand-gold hidden md:block" />
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-gold/50 to-brand-gold md:hidden" />

            {ITINERARY.map((day, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={day.day}
                  className={`relative mb-12 last:mb-0 ${isEven ? 'md:pr-[52%]' : 'md:pl-[52%]'}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Day number circle */}
                  <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center z-10 shadow-gold`}>
                    <span className="text-white font-bold text-sm">{day.day}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-14 md:ml-0 card-premium p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-1 rounded">
                        Day {day.day}
                      </span>
                      <span className="text-xs text-brand-stone">{day.sub}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl mb-4">{day.title}</h3>
                    <ul className="space-y-2">
                      {day.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-brand-navy/70">
                          <ChevronRight className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 9: EVENTS — STURGIS RALLY + CAR SHOW
          ═══════════════════════════════════════════════ */}
      <section id="events" className="relative overflow-hidden bg-brand-navy text-white">

        <div className="relative z-10 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <FadeIn>
                <span className="badge-gold !bg-brand-gold/20 !text-brand-gold-light mb-4 inline-block">Events & Rallies</span>
                <h2 className="mb-4 text-white">Unforgettable Events</h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                  From the world&apos;s largest motorcycle rally to our signature car show, Rush No More is where the action happens.
                </p>
                <div className="divider-gold-wide mt-5 mx-auto" />
              </FadeIn>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Sturgis Rally */}
              <FadeIn>
                <div className="glass rounded-2xl overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${sr.heroImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-rose-500/80 backdrop-blur-sm text-white text-xs font-bold uppercase px-3 py-1 rounded-full">Events</span>
                      <span className="glass-dark text-white text-xs font-bold px-3 py-1 rounded-full">{sr.distance} away</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl text-white">{sr.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{sr.longDescription}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {sr.highlights.slice(0, 4).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                          <Star className="w-3 h-3 text-brand-gold flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 space-y-2 mb-4">
                      {sr.tips.slice(0, 2).map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-white/60">
                          <Lightbulb className="w-3 h-3 text-brand-gold mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                    <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">
                      Book Rally Dates <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Car Show */}
              <FadeIn delay={0.15}>
                <div className="glass rounded-2xl overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${carShow.heroImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-rose-500/80 backdrop-blur-sm text-white text-xs font-bold uppercase px-3 py-1 rounded-full">Events</span>
                      <span className="glass-dark text-white text-xs font-bold px-3 py-1 rounded-full">{carShow.distance}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl text-white">{carShow.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{carShow.longDescription}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {carShow.highlights.slice(0, 4).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                          <Star className="w-3 h-3 text-brand-gold flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 space-y-2 mb-4">
                      {carShow.tips.slice(0, 2).map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-white/60">
                          <Lightbulb className="w-3 h-3 text-brand-gold mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                    <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">
                      Reserve for Car Show <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 10: DISTANCE COMPARISON — VISUAL
          ═══════════════════════════════════════════════ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="badge-gold mb-4 inline-block">Centrally Located</span>
              <h2 className="mb-4">Everything Within Reach</h2>
              <p className="text-brand-stone text-lg max-w-2xl mx-auto">
                Rush No More is perfectly positioned in the heart of the Black Hills. Every major attraction is an easy day trip.
              </p>
              <div className="divider-gold-wide mt-5 mx-auto" />
            </FadeIn>
          </div>

          {/* Distance bars */}
          <div className="space-y-4">
            {DISTANCES.map((d, i) => (
              <motion.div
                key={d.name}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="w-40 md:w-48 flex-shrink-0 text-right">
                  <span className="text-sm font-bold text-brand-navy">{d.name}</span>
                </div>
                <div className="flex-1 bg-surface-secondary rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${d.color} relative`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((d.miles / 75) * 100, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold whitespace-nowrap">
                      {d.miles} mi
                    </span>
                  </motion.div>
                </div>
                <div className="w-20 flex-shrink-0">
                  <span className="text-xs text-brand-stone">{d.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Home base indicator */}
          <FadeIn className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-brand-navy/5 rounded-full px-6 py-3 border border-brand-navy/10">
              <Home className="w-5 h-5 text-brand-gold" />
              <span className="text-sm font-bold text-brand-navy">Rush No More RV Resort — Your Home Base</span>
              <span className="text-xs text-brand-stone">|</span>
              <span className="text-xs text-brand-stone">21137 Brimstone Place, Sturgis, SD</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 11: TESTIMONIALS
          ═══════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/rush-no-more-perfect-day.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-navy/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <span className="badge-gold !bg-brand-gold/20 !text-brand-gold-light mb-4 inline-block">Guest Reviews</span>
              <h2 className="mb-4 text-white">What Explorers Say</h2>
              <div className="divider-gold-wide mt-5 mx-auto" />
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 6).map((review, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'text-brand-gold fill-brand-gold' : 'text-white/20'}`} />
                      ))}
                    </div>
                    {review.source && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 bg-white/5 px-2 py-1 rounded">
                        {review.source}
                      </span>
                    )}
                  </div>
                  <Quote className="w-8 h-8 text-brand-gold/30 mb-2" />
                  <p className="text-white/70 italic text-sm leading-relaxed flex-1">{review.text}</p>
                  <p className="font-display text-white font-bold mt-4 pt-4 border-t border-white/10">{review.title}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 12: STAY OPTIONS CTA
          ═══════════════════════════════════════════════ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="badge-gold mb-4 inline-block">Stay With Us</span>
              <h2 className="mb-4">Your Home Base for Adventure</h2>
              <p className="text-brand-stone text-lg max-w-2xl mx-auto">
                Choose from premium RV sites, cozy cabins, or shaded tent camping — all just minutes from every attraction.
              </p>
              <div className="divider-gold-wide mt-5 mx-auto" />
              <div className="mt-8 max-w-xl mx-auto rounded-xl overflow-hidden shadow-lodge-lg border-2 border-white relative aspect-[16/9]">
                <Image
                  src="/images/GeneralImagesPark/IMG_7383.jpeg"
                  alt="Rush No More resort - your home base for Black Hills adventures"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'RV Sites', price: 'Starts at $41.22/night', desc: 'Full hookups with 30/50 AMP. Pull-through and back-in options for rigs up to 100ft.', href: '/stay', img: '/images/GeneralImagesPark/IMG_7382.jpeg' },
              { label: 'Cabins', price: 'Starts at $51.76/night', desc: '21 presidential-themed cabins sleeping 2-10 guests. Fully furnished and ready for your arrival.', href: '/stay', img: '/images/GeneralImagesPark/IMG_7316.jpeg' },
              { label: 'Tent Camping', price: 'From $35/night', desc: 'Shaded sites under towering Ponderosa Pines with access to all resort amenities.', href: '/stay', img: '/images/CommonAreas/IMG_7435.jpeg' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <Link href={s.href} className="card-premium group block h-full">
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${s.img}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="text-brand-gold font-display text-2xl">{s.price}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-2">{s.label}</h3>
                    <p className="text-sm text-brand-stone mb-4">{s.desc}</p>
                    <span className="flex items-center gap-1 text-sm text-brand-gold font-semibold group-hover:gap-2 transition-all">
                      View Options <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════ */}
      <BookingCTA
        title="Ready to Explore the Black Hills?"
        subtitle="Book your stay at Rush No More and discover everything South Dakota has to offer."
      />
    </>
  );
}
