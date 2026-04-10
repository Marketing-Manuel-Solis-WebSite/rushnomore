'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE, RV_TIERS, CABINS, REVIEWS } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema } from '@/lib/seo';
import {
  ExternalLink, Star, ArrowRight, ArrowDown, Phone,
  Truck, Home, Tent, Users, Waves, Beer, ShieldCheck, Wifi, PawPrint,
  CheckCircle, Sparkles, Flame, TreePine, ShowerHead, Cable,
  Mountain, MapPin, Zap, Navigation, Quote, Clock,
  ChevronDown, HelpCircle, X, ChevronLeft, ChevronRight, Camera,
  Thermometer,
} from 'lucide-react';

type CabinItem = { name: string; num: string; sleeps: number; img?: string; price?: string; images?: string[] };

/* ═══════════════════════════════════════════════════════════════
   TAB DATA
═══════════════════════════════════════════════════════════════ */
const TABS = [
  { id: 'rv-sites', label: 'RV Sites', icon: Truck, price: 'From $41.22' },
  { id: 'cabins', label: 'Cabins', icon: Home, price: 'From $51.76' },
  { id: 'tent-camping', label: 'Tent Camping', icon: Tent, price: 'From $35' },
] as const;

/* ═══════════════════════════════════════════════════════════════
   RV SITE FAQS
═══════════════════════════════════════════════════════════════ */
const RV_FAQS = [
  { q: 'What hookups do RV sites include?', a: 'All sites include water, electric (30/50 AMP), and sewer. Luxury and Luxury Spa sites add cement slabs and gas BBQ grills.' },
  { q: 'How long can my RV be?', a: 'We accommodate RVs up to 100 feet with pull-through and back-in options.' },
  { q: 'What is the difference between Luxury and Luxury Spa?', a: 'Both have cement slabs + BBQ. Luxury Spa adds a private hot tub spa — the ultimate RV glamping experience.' },
  { q: 'Are you open year-round?', a: 'Standard sites are open year-round. Luxury & Luxury Spa sites are seasonal (May 1 – October 1).' },
];

/* ═══════════════════════════════════════════════════════════════
   CABIN DATA (expanded for the showcase)
═══════════════════════════════════════════════════════════════ */
const CABIN_HIGHLIGHTS = [
  { val: '16', label: 'Unique Cabins', sub: 'Named after Presidents' },
  { val: '2–10', label: 'Guests Per Cabin', sub: 'Economy to luxury suites' },
  { val: '$51.76', label: 'Starting From', sub: 'per night' },
  { val: '100%', label: 'Amenity Access', sub: 'Pool, hot tubs & more' },
];

const CABIN_FEATURES = [
  'Each cabin named after a US President',
  'Sleeps 2 to 10 guests',
  'Full kitchens in select cabins',
  'A/C and heating in every cabin',
  'Private bathrooms',
  'Pet-friendly options',
  'Open year-round',
  'Propane campfire rentals available',
];

/* ═══════════════════════════════════════════════════════════════
   TENT DATA
═══════════════════════════════════════════════════════════════ */
const TENT_FEATURES = [
  { icon: TreePine, title: 'Shaded Pine Forest', desc: 'Spacious, level sites nestled under towering Ponderosa pines.' },
  { icon: Zap, title: '15 Sites with Electricity', desc: '15 of our 20 tent sites include 20 AMP electric hookups.' },
  { icon: Waves, title: 'Full Amenity Access', desc: 'Pool, hot tubs, beer garden, game room — all included with tent sites.' },
  { icon: ShowerHead, title: 'Clean Bathhouses', desc: 'Modern, spotless shower and restroom facilities nearby.' },
  { icon: Cable, title: 'Propane Campfire Rentals', desc: 'Rent a propane campfire for your site. No wood fires allowed.' },
  { icon: ShieldCheck, title: '24/7 Security', desc: 'Gated entry, patrol, and well-lit grounds for your peace of mind.' },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function StayPage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const rvVideoRef = useRef<HTMLVideoElement>(null);
  const cabinsVideoRef = useRef<HTMLVideoElement>(null);
  const tentVideoRef = useRef<HTMLVideoElement>(null);

  const [activeTab, setActiveTab] = useState('rv-sites');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCabin, setSelectedCabin] = useState<CabinItem | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const openCabin = (cabin: CabinItem) => {
    setSelectedCabin(cabin);
    setImgIdx(0);
  };
  const cabinImages = selectedCabin?.images ?? [];

  useEffect(() => {
    heroVideoRef.current?.play().catch(() => {});
    rvVideoRef.current?.play().catch(() => {});
    cabinsVideoRef.current?.play().catch(() => {});
    tentVideoRef.current?.play().catch(() => {});
  }, []);

  // Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['rv-sites', 'cabins', 'tent-camping'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveTab(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <JsonLd data={faqSchema(RV_FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Stay', url: '/stay' }])} />

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Video Background
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/RNM-stay.mp4"
          autoPlay muted loop playsInline
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
            Top-Rated RV Resort
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Choose Your{' '}
            <span className="text-brand-gold italic">Black Hills</span> Stay
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium RV sites, cozy presidential cabins & scenic tent camping — each with full access to all 16 resort amenities, pool, hot tubs, beer garden & more.
          </motion.p>

          {/* 3 Quick Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300 text-left"
                >
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/20">
                    <Icon className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">{tab.label}</span>
                    <span className="text-brand-gold font-display text-lg font-bold">{tab.price}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.a
            href="#rv-sites"
            onClick={(e) => { e.preventDefault(); scrollToSection('rv-sites'); }}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ChevronDown className="w-5 h-5 animate-bounce" /> Explore All Options
          </motion.a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STICKY TAB BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-surface-muted shadow-lodge">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-1 bg-surface-secondary rounded-xl p-1 overflow-x-auto">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`relative flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-brand-navy/60 hover:text-brand-navy'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="stayTab"
                        className="absolute inset-0 bg-brand-navy rounded-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold' : ''}`} />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className={`hidden md:inline text-xs font-normal ${isActive ? 'text-white/60' : 'text-brand-stone'}`}>{tab.price}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs px-4 py-2 hidden sm:inline-flex">
              Book Now <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ★★★ SECTION 1: RV SITES ★★★
      ═══════════════════════════════════════════════════════════════ */}
      <section id="rv-sites">

        {/* RV Hero — Video BG */}
        <div className="relative py-24 md:py-32 overflow-hidden">
          <video
            ref={rvVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/RNM-stay.mp4"
            autoPlay muted loop playsInline preload="auto"
            poster="/images/RushMore-rv-camper-van.png"
          />
          <div className="absolute inset-0 bg-brand-navy/80" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ RV Park Near Mount Rushmore ★
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
              Premium <span className="text-brand-gold italic">RV Sites</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
              Full hookup, 30/50 AMP, pull-throughs up to 100ft. Three tiers to match your style — from standard full hookup to Presidential Spa with private hot tub.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {[
                { val: '200+', label: 'RV Sites' },
                { val: '100ft', label: 'Max Length' },
                { val: '30/50', label: 'AMP Service' },
                { val: '365', label: 'Days Open' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <span className="font-display text-3xl text-brand-gold font-bold block">{s.val}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RV Tier Cards */}
        <div className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
                ★ Three Tiers ★
              </span>
              <h3 className="text-3xl md:text-4xl mb-3">
                Choose Your <span className="text-brand-gold italic">RV Experience</span>
              </h3>
              <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
                From standard full hookups to private hot tub spa sites — all include 16 free amenities.
              </p>
              <div className="w-24 h-1 bg-gold-gradient rounded-full mt-5 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {RV_TIERS.map((tier, i) => (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-3xl shadow-lodge border-2 border-surface-muted/50 overflow-hidden hover:shadow-gold-lg hover:-translate-y-2 hover:border-brand-gold/30 transition-all duration-700 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  {tier.badge && (
                    <div className="absolute top-4 right-4 z-10 bg-brand-gold text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-gold">
                      {tier.badge}
                    </div>
                  )}

                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url('${tier.img}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="font-display text-3xl text-white font-bold">{tier.price}</span>
                      <span className="text-white/70 text-sm block">{tier.note}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-display font-bold mb-4">{tier.name}</h4>
                    <ul className="space-y-2.5 mb-6">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-brand-navy/80">
                          <CheckCircle className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">
                      Reserve Now <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-4 mt-8 text-center text-sm text-brand-navy/80 font-medium">
              <strong>Seasonal Notice:</strong> Luxury & Luxury Spa sites are seasonal — May 1 through October 1. Standard RV sites are open year-round.
            </div>
          </div>
        </div>

        {/* RV — What's Included */}
        <div className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="badge-gold mb-5 inline-block">Every RV Site Includes</span>
                <h3 className="text-3xl md:text-4xl mb-6">
                  Everything You Need, <span className="text-brand-gold italic">Nothing Extra</span>
                </h3>
                <p className="text-brand-navy/70 text-lg leading-relaxed font-medium mb-8">
                  Every RV site at Rush No More comes with full hookups and free access to all 16 resort amenities. No hidden fees, no resort charges, no surprises.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    'Water, Electric & Sewer', '30 or 50 AMP Service',
                    'Pull-Through Available', 'Up to 100ft Long',
                    'Pool & Hot Tub Access', 'Beer Garden & Bar',
                    'Free Wi-Fi', '24/7 Security',
                    'Pet Friendly', 'Clean Bathhouses',
                    'Game Room & Trails', 'Propane Available',
                  ].map((f, i) => (
                    <span key={i} className="flex items-center gap-2 text-sm text-brand-navy/80 font-medium">
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{f}
                    </span>
                  ))}
                </div>

                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Book Your RV Site <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/GeneralImagesPark/IMG_7386.jpeg')" }} />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/Pool/PoolGeneral.jpeg')" }} />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lodge-lg border-2 border-white relative">
                    <Image
                      src="/images/Jacuzzi/IMG_7205.jpeg"
                      alt="Private hot tub spa at Presidential RV site"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lodge-lg border-2 border-white relative">
                    <Image
                      src="/images/GeneralImagesPark/IMG_7380.jpeg"
                      alt="Rush No More RV resort grounds and landscape"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RV FAQ */}
        <div className="py-16 md:py-20 bg-surface-primary">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="badge-gold mb-4 inline-block">RV FAQ</span>
              <h3 className="text-2xl md:text-3xl">Common <span className="text-brand-gold italic">Questions</span></h3>
              <div className="w-16 h-1 bg-gold-gradient rounded-full mt-4 mx-auto" />
            </div>
            <div className="space-y-3">
              {RV_FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                      isOpen ? 'border-brand-gold/30 shadow-gold' : 'border-surface-muted/50 shadow-lodge hover:border-brand-gold/20'
                    }`}
                  >
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex items-center justify-between w-full p-5 text-left">
                      <div className="flex items-center gap-3 flex-1 pr-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isOpen ? 'bg-brand-gold' : 'bg-brand-gold/10'}`}>
                          <HelpCircle className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-brand-gold'}`} />
                        </div>
                        <span className="font-bold text-brand-navy text-sm">{faq.q}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-brand-gold transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-5 pb-5 pl-16">
                        <p className="text-brand-navy/60 text-sm leading-relaxed font-medium">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ★★★ SECTION 2: CABINS ★★★
      ═══════════════════════════════════════════════════════════════ */}
      <section id="cabins">

        {/* Cabins Hero — Video BG */}
        <div className="relative py-24 md:py-32 overflow-hidden">
          <video
            ref={cabinsVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/RNM-stay.mp4"
            autoPlay muted loop playsInline preload="auto"
            poster="/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg"
          />
          <div className="absolute inset-0 bg-brand-navy/80" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Cabins Near Mount Rushmore ★
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
              Presidential <span className="text-brand-gold italic">Cabin Collection</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
              Each cabin named after a US President — from cozy economy units for couples to full luxury suites sleeping up to 10 guests.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {CABIN_HIGHLIGHTS.map((s, i) => (
                <div key={i} className="text-center">
                  <span className="font-display text-3xl text-brand-gold font-bold block">{s.val}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold block">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cabin Categories */}
        <div className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
                ★ 16 Unique Cabins ★
              </span>
              <h3 className="text-3xl md:text-4xl mb-3">
                Find Your Perfect <span className="text-brand-gold italic">Cabin</span>
              </h3>
              <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
                Organized by capacity — from intimate getaways to group retreats.
              </p>
              <div className="w-24 h-1 bg-gold-gradient rounded-full mt-5 mx-auto" />
            </div>

            {CABINS.map((cat, ci) => (
              <div key={ci} className="mb-12 last:mb-0">
                <h4 className="text-xl font-display font-bold mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center border border-brand-gold/15">
                    <Users className="w-5 h-5 text-brand-gold" />
                  </div>
                  {cat.cat}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.items.map((c, i) => (
                    <motion.div
                      key={i}
                      className="bg-white rounded-2xl shadow-lodge border-2 border-surface-muted/50 overflow-hidden hover:shadow-gold-lg hover:-translate-y-1 hover:border-brand-gold/20 transition-all duration-500 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <div className="aspect-[16/10] bg-surface-secondary relative overflow-hidden">
                        {c.img && <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${c.img}')` }} />}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            Cabin {c.num}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            <Users className="w-3 h-3 text-brand-gold" /> Sleeps {c.sleeps}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h5 className="text-lg font-display font-bold mb-3">{c.name}</h5>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-xs text-brand-stone block">starts at</span>
                            <span className="font-display text-xl text-brand-gold">{c.price || '$51.76'}</span>
                            <span className="text-xs text-brand-stone block">per night</span>
                          </div>
                        </div>
                        <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">
                          Reserve <ExternalLink className="w-3.5 h-3.5 ml-1" />
                        </a>
                        {c.images && c.images.length > 0 && (
                          <button
                            onClick={() => openCabin(c)}
                            className="w-full flex items-center justify-center gap-1.5 text-sm mt-2 px-4 py-2.5 border-2 border-brand-gold/20 text-brand-gold rounded-xl hover:bg-brand-gold/5 hover:border-brand-gold/40 transition-all font-bold"
                          >
                            <Camera className="w-3.5 h-3.5" /> View Details
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cabin Features */}
        <div className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/PhotoMainTheThomasJefferson.jpeg')" }} />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="badge-gold mb-5 inline-block">Cabin Features</span>
                <h3 className="text-3xl md:text-4xl mb-6">
                  Comfort Meets <span className="text-brand-gold italic">Adventure</span>
                </h3>
                <p className="text-brand-navy/70 text-lg leading-relaxed font-medium mb-8">
                  Our Presidential Cabins offer the comforts of home surrounded by the beauty of the Black Hills. Perfect for families, reunions, and anyone who wants a roof over their head without sacrificing the outdoors.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {CABIN_FEATURES.map((f, i) => (
                    <span key={i} className="flex items-center gap-2.5 text-sm text-brand-navy/80 bg-surface-secondary/80 px-3 py-2.5 rounded-lg font-medium border border-surface-muted/30">
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{f}
                    </span>
                  ))}
                </div>
                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Book a Cabin <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ★★★ SECTION 3: TENT CAMPING ★★★
      ═══════════════════════════════════════════════════════════════ */}
      <section id="tent-camping">

        {/* Tent Hero — Video BG */}
        <div className="relative py-24 md:py-32 overflow-hidden">
          <video
            ref={tentVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/RNM-stay.mp4"
            autoPlay muted loop playsInline preload="auto"
            poster="/images/Wooded-Tent-Area.png"
          />
          <div className="absolute inset-0 bg-brand-navy/80" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Camping Near Mount Rushmore ★
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
              Tent Camping <span className="text-brand-gold italic">Under the Pines</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
              Wake up to fresh mountain air under towering Ponderosa pines. The best value in the Black Hills with full access to every resort amenity.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {[
                { val: '$35', label: 'Per Night' },
                { val: '+$5', label: 'Electric Option' },
                { val: '16', label: 'Free Amenities' },
                { val: '4.8★', label: 'Guest Rating' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <span className="font-display text-3xl text-brand-gold font-bold block">{s.val}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold block">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tent Features Grid */}
        <div className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
                ★ Tent Site Features ★
              </span>
              <h3 className="text-3xl md:text-4xl mb-3">
                More Than Just a <span className="text-brand-gold italic">Tent Site</span>
              </h3>
              <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
                Our tent camping comes with resort-level amenities that most campgrounds can&apos;t match.
              </p>
              <div className="w-24 h-1 bg-gold-gradient rounded-full mt-5 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {TENT_FEATURES.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={i}
                    className="bg-white rounded-2xl shadow-lodge border-2 border-surface-muted/50 p-6 group hover:shadow-gold-lg hover:-translate-y-2 hover:border-brand-gold/20 transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/15">
                      <Icon className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h4 className="font-display font-bold text-lg mb-2">{feat.title}</h4>
                    <p className="text-sm text-brand-navy/60 leading-relaxed font-medium">{feat.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Tent Pricing Card */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lodge-lg border-2 border-brand-gold/20 p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[80px]" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-display font-bold">Standard Tent Camping</h4>
                      <p className="text-sm text-brand-stone mt-1">Based on 2 people per site</p>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-4xl text-brand-gold font-bold">$35</span>
                      <span className="text-sm text-brand-stone block">/night</span>
                    </div>
                  </div>

                  <div className="bg-surface-secondary rounded-xl p-5 mb-6 space-y-2.5 text-sm text-brand-navy/70 font-medium">
                    <div className="flex items-center justify-between">
                      <span>Electric hookup</span>
                      <span className="font-bold text-brand-navy">+$5.00/night</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Additional guests</span>
                      <span className="font-bold text-brand-navy">$5.00/day per person</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-surface-muted">
                      <span>South Dakota state tax</span>
                      <span className="font-bold text-brand-navy">6%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6 p-3 bg-brand-gold/5 rounded-xl border border-brand-gold/15">
                    <Sparkles className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <span className="text-sm text-brand-navy/80 font-medium">All 16 amenities included — pool, hot tubs, beer garden, game room & more</span>
                  </div>

                  <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-base py-4">
                    Book Your Tent Site <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tent — Image + Description */}
        <div className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge-gold mb-5 inline-block">The Experience</span>
                <h3 className="text-3xl md:text-4xl mb-6">
                  Camping the Way It <span className="text-brand-gold italic">Should Be</span>
                </h3>
                <p className="text-brand-navy/70 text-lg leading-relaxed font-medium mb-4">
                  Our tent sites are nestled in a shaded Ponderosa pine forest with spacious, level ground and the kind of natural beauty that makes the Black Hills unforgettable.
                </p>
                <p className="text-brand-navy/60 leading-relaxed font-medium mb-8">
                  But unlike most campgrounds, you&apos;re not roughing it. Step out of your tent and you have access to a heated pool, hot tubs, a beer garden with craft brews, modern bathhouses, a game room, nature trails, and 24/7 security. It&apos;s the best of both worlds — nature and comfort.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: TreePine, text: 'Shaded pine forest' },
                    { icon: Zap, text: '15 sites with electric' },
                    { icon: Waves, text: 'Pool & hot tubs' },
                    { icon: Beer, text: 'Beer garden' },
                    { icon: ShowerHead, text: 'Modern bathhouses' },
                    { icon: ShieldCheck, text: '24/7 security' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-surface-secondary/80 rounded-xl border border-surface-muted/30">
                      <item.icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
                      <span className="text-sm text-brand-navy/80 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Book Your Tent Site <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
              <div className="space-y-4">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/CommonAreas/IMG_7030.jpeg')" }} />
                </div>
                <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/CommonAreas/IMG_8211.jpeg')" }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lodge-lg border-2 border-white relative">
                    <Image
                      src="/images/GeneralImagesPark/IMG_7381.jpeg"
                      alt="Scenic park grounds at Rush No More resort"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lodge-lg border-2 border-white relative">
                    <Image
                      src="/images/Pool/PoolSide.jpeg"
                      alt="Resort pool area with lounge chairs"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          REVIEWS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F5F0E8 0%, #FDFBF7 50%, #F5F0E8 100%)' }}>
        <div className="absolute top-10 left-10 text-brand-gold/[0.04]"><Quote className="w-48 h-48" /></div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Guest Reviews ★
            </span>
            <h2 className="mb-3">What Our <span className="text-brand-gold italic">Campers</span> Say</h2>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          {/* Featured review */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-14 mb-8 relative overflow-hidden shadow-lodge-lg border border-brand-gold/15">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-bl-[120px]" />
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1.5 mb-6">
                {[1,2,3,4,5].map(j => <Star key={j} className="w-7 h-7 text-brand-gold fill-brand-gold" />)}
              </div>
              <p className="text-xl md:text-3xl text-brand-navy italic leading-relaxed mb-8 font-display font-bold">
                &ldquo;{REVIEWS[0].text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-brand-gold/15 shadow-lodge">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">{REVIEWS[0].title.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="font-display text-brand-navy font-bold text-sm">{REVIEWS[0].title}</p>
                  {REVIEWS[0].source && <span className="text-[10px] font-bold uppercase tracking-wider text-brand-stone">{REVIEWS[0].source}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(1, 4).map((r, i) => (
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
                  {r.source && <span className="text-[10px] font-black uppercase tracking-wider text-brand-stone bg-white/60 px-3 py-1 rounded-full border border-surface-muted/30">{r.source}</span>}
                </div>
                <p className="text-brand-navy/80 italic mb-5 text-sm leading-relaxed font-medium">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-4 border-t border-brand-gold/10">
                  <div className="w-8 h-8 bg-brand-gold/10 rounded-full flex items-center justify-center border border-brand-gold/15">
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
          QUICK COMPARE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
            ★ Compare ★
          </span>
          <h2 className="mb-3 text-white">Every Stay Includes <span className="text-brand-gold italic">All 16</span> Amenities</h2>
          <p className="text-white/50 text-lg mb-10 font-medium">No hidden fees, no resort charges.</p>

          {/* Resort grounds preview */}
          <div className="grid grid-cols-3 gap-3 mb-10 max-w-3xl mx-auto">
            <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-white/10">
              <Image
                src="/images/GeneralImagesPark/IMG_7386.jpeg"
                alt="Rush No More resort grounds with mountain views"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-white/10">
              <Image
                src="/images/CommonAreas/IMG_7435.jpeg"
                alt="Common areas and gathering spaces at the resort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-white/10">
              <Image
                src="/images/GeneralImagesPark/IMG_7380.jpeg"
                alt="Park scenery and grounds at Rush No More"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TABS.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className="group text-left p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-brand-gold/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/20">
                    <Icon className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">{tab.label}</h3>
                  <span className="text-brand-gold font-display text-2xl font-bold block mb-3">{tab.price}</span>
                  <div className="flex items-center gap-1 text-sm text-brand-gold font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> All 16 amenities included
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <BookingCTA title="Ready to Book Your Black Hills Stay?" subtitle="RV starts at $41.22 | Cabins starts at $51.76 | Tent from $35/night — all amenities included. Prices vary by weekday, weekend, Rally & holidays." />

      {/* ═══ CABIN DETAIL MODAL ═══ */}
      <AnimatePresence>
        {selectedCabin && cabinImages.length > 0 && (
          <motion.div
            key="cabin-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCabin(null)}
          >
            <motion.div
              key="cabin-modal"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full md:w-auto md:min-w-[500px] md:max-w-2xl bg-white rounded-t-2xl md:rounded-2xl max-h-[88vh] md:max-h-[85vh] overflow-hidden shadow-2xl flex flex-col md:mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile drag handle */}
              <div className="flex justify-center pt-2 pb-1 md:hidden shrink-0">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 overscroll-contain">
                {/* Close button */}
                <button
                  onClick={() => setSelectedCabin(null)}
                  className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors md:top-4 md:right-4"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image viewer */}
                <div className="relative aspect-[16/10] bg-surface-secondary overflow-hidden md:rounded-t-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                    style={{ backgroundImage: `url('${cabinImages[imgIdx]}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Navigation arrows */}
                  {cabinImages.length > 1 && (
                    <>
                      {imgIdx > 0 && (
                        <button
                          onClick={() => setImgIdx(imgIdx - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}
                      {imgIdx < cabinImages.length - 1 && (
                        <button
                          onClick={() => setImgIdx(imgIdx + 1)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </>
                  )}

                  {/* Image counter */}
                  <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {imgIdx + 1} / {cabinImages.length}
                  </span>
                </div>

                {/* Thumbnails */}
                {cabinImages.length > 1 && (
                  <div className="flex gap-2 px-4 py-2.5 overflow-x-auto bg-surface-primary/50">
                    {cabinImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          i === imgIdx ? 'border-brand-gold shadow-gold' : 'border-transparent opacity-50 hover:opacity-90'
                        }`}
                      >
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Cabin info */}
                <div className="px-5 pb-5 pt-3">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest">Cabin {selectedCabin.num}</span>
                      <h3 className="text-xl font-display font-bold text-brand-navy leading-tight">{selectedCabin.name}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-display text-xl text-brand-gold font-bold">{selectedCabin.price || '$51.76'}</span>
                      <span className="text-[11px] text-brand-stone block">per night</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-sm text-brand-navy/60 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-gold" /> Sleeps {selectedCabin.sleeps}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-brand-gold" /> Private Bath
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-brand-gold" /> A/C & Heat
                    </span>
                  </div>

                  <a
                    href={SITE.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full text-center text-sm py-3"
                  >
                    Reserve This Cabin <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}