'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvailabilityCalendar from '@/components/booking/AvailabilityCalendar';
import {
  Truck, Home, Tent, Calendar, Users, Search, ArrowRight, ArrowLeft,
  Loader2, CheckCircle, CreditCard, Shield, Clock,
  AlertCircle, Phone, Mail, User, MessageSquare, X,
  ChevronDown, ChevronUp, Zap, Bath, Check,
  Flame, TreePine, Wifi, Droplets, Eye, Info,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
type PropertyType = 'rv' | 'cabin' | 'tent';
type Step = 'search' | 'checkout';

interface AvailableProperty {
  id: string;
  name: string;
  type: string;
  category: string;
  maxGuests: number;
  amenities: string[];
  images: string[];
  description?: string;
  hasPrivateHotTub?: boolean;
  hasPrivatePatio?: boolean;
  hasBBQ?: boolean;
}

interface PriceBreakdown {
  propertyId: string;
  pricePerNight: number;
  nights: number;
  subtotal: number;
  extras: { name: string; total: number }[];
  extrasTotal: number;
  tax: number;
  total: number;
}

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */
const ease = [0.16, 1, 0.3, 1];

const TYPES = [
  { id: 'cabin' as PropertyType, label: 'Cabins', icon: Home, price: 'From $95/night', desc: '16 Presidential Cabins, 2-10 guests', img: '/images/cabin-9_800.png' },
  { id: 'rv' as PropertyType, label: 'RV Sites', icon: Truck, price: 'From $53.99/night', desc: 'Full hookups, 30/50 AMP, pull-thru', img: '/images/rv-camper-van.png' },
  { id: 'tent' as PropertyType, label: 'Tent Camping', icon: Tent, price: 'From $35/night', desc: 'Shaded sites under Ponderosa Pines', img: '/images/Wooded-Tent-Area.png' },
];

/* Amenity icon resolver */
function getAmenityIcon(amenity: string) {
  const lower = amenity.toLowerCase();
  if (lower.includes('wifi') || lower.includes('internet')) return Wifi;
  if (lower.includes('water') || lower.includes('shower') || lower.includes('bath')) return Droplets;
  if (lower.includes('fire') || lower.includes('grill') || lower.includes('bbq')) return Flame;
  if (lower.includes('tree') || lower.includes('shade') || lower.includes('pine')) return TreePine;
  if (lower.includes('electric') || lower.includes('power') || lower.includes('amp')) return Zap;
  if (lower.includes('view') || lower.includes('scenic')) return Eye;
  return Check;
}

const CATEGORY_LABELS: Record<string, string> = {
  'cabin-economy': 'Economy Cabin',
  'cabin-standard': 'Standard Cabin',
  'cabin-family': 'Family Cabin',
  'cabin-luxury': 'Luxury Cabin',
  'rv-standard-30': '30 AMP Standard',
  'rv-standard-50': '50 AMP Standard',
  'rv-vip': 'VIP Deluxe',
  'rv-presidential': 'Presidential Spa',
  'tent-basic': 'Basic Tent Site',
  'tent-electric': 'Electric Tent Site',
};

const CATEGORY_IMAGES: Record<string, string> = {
  'cabin-economy': '/images/cabin-9_800.png',
  'cabin-standard': '/images/cabin-9_800.png',
  'cabin-family': '/images/RushMore-cabins.png',
  'cabin-luxury': '/images/RushMore-cabins.png',
  'rv-standard-30': '/images/rv-camper-van.png',
  'rv-standard-50': '/images/rv-camper-van.png',
  'rv-vip': '/images/vip-site.png',
  'rv-presidential': '/images/presidential-spa.png',
  'tent-basic': '/images/Wooded-Tent-Area.png',
  'tent-electric': '/images/Wooded-Tent-Area.png',
};

const TYPE_LABELS: Record<PropertyType, string> = {
  cabin: 'cabins',
  rv: 'RV sites',
  tent: 'tent sites',
};

/* ═══════════════════════════════════════════
   STEP INDICATOR (3 steps)
   ═══════════════════════════════════════════ */
function StepIndicator({ current }: { current: number }) {
  const steps = ['Search & Choose', 'Checkout', 'Confirmation'];
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.map((label, i) => {
        const isActive = i === current;
        const isDone = i < current;
        return (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isActive ? 'bg-brand-gold text-white shadow-gold' :
              isDone ? 'bg-brand-gold/20 text-brand-gold' :
              'bg-surface-secondary text-brand-stone'
            }`}>
              {isDone ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 rounded-full transition-colors ${isDone ? 'bg-brand-gold' : 'bg-surface-muted'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SKELETON CARD
   ═══════════════════════════════════════════ */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border-2 border-surface-muted/50 overflow-hidden animate-pulse bg-white">
      {/* Match actual card image: aspect-[16/9] on mobile, aspect-[4/3] on desktop */}
      <div className="aspect-[16/9] sm:aspect-[4/3] bg-surface-secondary relative">
        <div className="absolute top-4 left-4 h-6 bg-surface-muted/60 rounded-full w-24" />
        <div className="absolute bottom-4 left-4 h-6 bg-surface-muted/60 rounded-full w-20" />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-surface-secondary rounded-lg w-2/3" />
        <div className="h-3 bg-surface-secondary rounded-lg w-1/2" />
        <div className="flex gap-2">
          <div className="h-5 bg-surface-secondary rounded-full w-16" />
          <div className="h-5 bg-surface-secondary rounded-full w-14" />
          <div className="h-5 bg-surface-secondary rounded-full w-12" />
        </div>
        <div className="flex justify-between items-end border-t border-surface-muted/50 pt-4">
          <div className="space-y-1">
            <div className="h-3 bg-surface-secondary rounded w-20" />
            <div className="h-7 bg-surface-secondary rounded w-24" />
          </div>
          <div className="h-10 bg-surface-secondary rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN BOOKING PAGE
   ═══════════════════════════════════════════ */
export default function BookingPage() {
  const topRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Step: 'search' means search+results on same page, 'checkout' is the form
  const [step, setStep] = useState<Step>('search');

  // Search form
  const [type, setType] = useState<PropertyType>('cabin');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Results
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [properties, setProperties] = useState<AvailableProperty[]>([]);
  const [prices, setPrices] = useState<PriceBreakdown[]>([]);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [totalOfType, setTotalOfType] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<AvailableProperty | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<PriceBreakdown | null>(null);

  // Expandable card details
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Checkout form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Mobile checkout summary toggle
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Sticky search bar
  const [searchSticky, setSearchSticky] = useState(false);

  // Errors
  const [error, setError] = useState('');

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const stepIndex = step === 'search' ? 0 : 1;

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToResults = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  /* ─── Sticky observer ─── */
  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSearchSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ─── Search ─── */
  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }
    if (nights < 1) {
      setError('Check-out must be after check-in');
      return;
    }

    setError('');
    setLoading(true);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({ type, checkIn, checkOut, guests: String(guests) });
      const res = await fetch(`/api/availability?${params}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setProperties(data.available || []);
        setPrices(data.priceBreakdown || []);
        setTotalAvailable(data.totalAvailable || 0);
        setTotalOfType(data.totalOfType || 0);
        scrollToResults();
      }
    } catch {
      setError('Unable to check availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ─── Select Property ─── */
  const handleSelect = (prop: AvailableProperty) => {
    const price = prices.find(p => p.propertyId === prop.id);
    setSelectedProperty(prop);
    setSelectedPrice(price || null);
    setStep('checkout');
    scrollToTop();
  };

  /* ─── Submit Reservation ─── */
  const handleSubmitReservation = async () => {
    if (!guestName.trim()) { setError('Please enter your full name'); return; }
    if (!guestEmail.trim() || !guestEmail.includes('@')) { setError('Please enter a valid email'); return; }
    if (!guestPhone.trim()) { setError('Please enter your phone number'); return; }
    if (!selectedProperty || !selectedPrice) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedProperty.id,
          checkIn,
          checkOut,
          guestName: guestName.trim(),
          guestEmail: guestEmail.trim(),
          guestPhone: guestPhone.trim(),
          guestNotes: guestNotes.trim(),
          numberOfGuests: guests,
          source: 'web',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create reservation. Please try again.');
        setSubmitting(false);
        return;
      }

      // Initiate Stripe Checkout for real payment
      try {
        const payRes = await fetch('/api/payments/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reservationId: data.reservationId }),
        });
        const payData = await payRes.json();

        if (payData.checkoutUrl) {
          window.location.href = payData.checkoutUrl;
          return;
        }
      } catch {
        setError('Payment service is temporarily unavailable. Please try again or call us at 605-423-2545.');
        setSubmitting(false);
        return;
      }

      setError('Unable to initialize payment. Please try again or call us at 605-423-2545.');
      setSubmitting(false);
      return;
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Go Back ─── */
  const goBack = () => {
    setError('');
    if (step === 'checkout') { setStep('search'); scrollToTop(); }
  };

  /* ─── Calendar handler ─── */
  const handleCalendarRange = (ci: string, co: string) => {
    setCheckIn(ci);
    setCheckOut(co);
  };

  /* ─── Availability percentage ─── */
  const availPercent = totalOfType > 0 ? Math.round((totalAvailable / totalOfType) * 100) : 0;

  return (
    <>
      {/* ═══ COMPACT HERO ═══ */}
      <div ref={topRef} />
      <section className="relative py-12 md:py-14 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="/videos/rushnomore-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 to-brand-navy" />
        </div>
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.span
            className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease }}
          >
            Instant Booking
          </motion.span>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-display mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease }}
          >
            Reserve Your <span className="text-brand-gold italic">Stay</span>
          </motion.h1>
          <motion.p
            className="text-base text-white/60 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, ease }}
          >
            Check real-time availability, choose your perfect spot, and book instantly.
          </motion.p>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="relative -mt-6 z-20 pb-20">
        <div className="max-w-6xl mx-auto px-4">

          <AnimatePresence mode="wait">
            {/* ═══════════════════════════════════════════════════
               STEP 1: SEARCH + RESULTS (SAME PAGE)
               ═══════════════════════════════════════════════════ */}
            {step === 'search' && (
              <motion.div
                key="search-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease }}
              >
                {/* Progress indicator */}
                <div className="bg-white rounded-t-3xl pt-6 px-6 shadow-lodge-xl border border-surface-muted/50 border-b-0">
                  <StepIndicator current={0} />
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="bg-red-50 border border-red-200 rounded-xl p-4 mx-6 flex items-center gap-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700 flex-1">{error}</p>
                      <button onClick={() => setError('')} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ─── SEARCH FORM (always visible) ─── */}
                <div ref={searchRef} className="bg-white shadow-lodge-xl border border-surface-muted/50 border-t-0 p-6 md:p-10">
                  {/* Type Selection */}
                  <div className="mb-8">
                    <label className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 block flex items-center gap-2">
                      <span className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-black">1</span>
                      Choose Your Accommodation
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {TYPES.map(t => {
                        const Icon = t.icon;
                        const isActive = type === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setType(t.id)}
                            className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left group ${
                              isActive
                                ? 'border-brand-gold shadow-gold'
                                : 'border-surface-muted hover:border-brand-gold/30'
                            }`}
                          >
                            <div className="h-28 relative overflow-hidden">
                              <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('${t.img}')` }}
                              />
                              <div className={`absolute inset-0 transition-colors ${isActive ? 'bg-brand-navy/50' : 'bg-brand-navy/60'}`} />
                              {isActive && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                              )}
                              <div className="absolute bottom-3 left-4">
                                <div className="flex items-center gap-2">
                                  <Icon className="w-5 h-5 text-white" />
                                  <span className="font-bold text-white text-sm">{t.label}</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-3">
                              <span className="text-brand-gold font-display text-lg font-bold block">{t.price}</span>
                              <span className="text-[10px] sm:text-xs text-brand-stone leading-tight line-clamp-2">{t.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Visual Availability Calendar */}
                  <div className="mb-8">
                    <label className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 block flex items-center gap-2">
                      <span className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-black">2</span>
                      Select Your Dates
                    </label>

                    <AvailabilityCalendar
                      propertyType={type}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onSelectRange={handleCalendarRange}
                    />

                    {/* Selected date summary bar */}
                    <AnimatePresence>
                      {checkIn && checkOut && nights > 0 && (
                        <motion.div
                          className="mt-4 flex flex-wrap items-center justify-center gap-3 py-3 px-5 rounded-2xl bg-brand-gold/5 border border-brand-gold/20"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ ease }}
                        >
                          <span className="flex items-center gap-2 text-sm font-medium text-brand-navy">
                            <Calendar className="w-4 h-4 text-brand-gold" />
                            {checkIn}
                          </span>
                          <ArrowRight className="w-4 h-4 text-brand-gold" />
                          <span className="flex items-center gap-2 text-sm font-medium text-brand-navy">
                            <Calendar className="w-4 h-4 text-brand-gold" />
                            {checkOut}
                          </span>
                          <span className="bg-brand-gold text-white text-xs font-black px-3 py-1 rounded-full">
                            {nights} night{nights !== 1 ? 's' : ''}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Guests */}
                  <div className="mb-10">
                    <label className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 block flex items-center gap-2">
                      <span className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-black">3</span>
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-12 h-12 rounded-xl border-2 border-surface-muted flex items-center justify-center hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-xl font-bold text-brand-navy"
                      >-</button>
                      <div className="text-center">
                        <span className="font-display text-4xl text-brand-gold font-bold">{guests}</span>
                        <span className="text-xs text-brand-stone block">guest{guests > 1 ? 's' : ''}</span>
                      </div>
                      <button
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        className="w-12 h-12 rounded-xl border-2 border-surface-muted flex items-center justify-center hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-xl font-bold text-brand-navy"
                      >+</button>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    disabled={!checkIn || !checkOut || loading || nights < 1}
                    className="btn-gold w-full text-lg py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Searching Availability...</>
                    ) : (
                      <><Search className="w-5 h-5 mr-2" /> Check Availability</>
                    )}
                  </button>
                </div>

                {/* ─── RESULTS SECTION (appears below search) ─── */}
                <div ref={resultsRef}>
                  <AnimatePresence mode="wait">
                    {/* Skeleton loading state */}
                    {loading && (
                      <motion.div
                        key="skeleton"
                        className="bg-white border border-surface-muted/50 border-t-0 rounded-b-3xl p-6 md:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease }}
                      >
                        <div className="h-6 bg-surface-secondary rounded-lg w-64 mb-6 animate-pulse" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SkeletonCard />
                          <SkeletonCard />
                          <SkeletonCard />
                        </div>
                      </motion.div>
                    )}

                    {/* Results loaded */}
                    {!loading && hasSearched && (
                      <motion.div
                        key="results"
                        className="bg-white border border-surface-muted/50 border-t-0 rounded-b-3xl p-6 md:p-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                      >
                        {/* Availability summary */}
                        <div className="mb-8">
                          <h2 className="text-xl md:text-2xl font-display mb-3">
                            <span className="text-brand-gold font-bold">{totalAvailable}</span> of {totalOfType} {TYPE_LABELS[type]} available
                          </h2>
                          {/* Percentage bar */}
                          <div className="w-full max-w-md h-2 bg-surface-secondary rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                availPercent > 50 ? 'bg-green-400' :
                                availPercent > 20 ? 'bg-brand-gold' :
                                'bg-red-400'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${availPercent}%` }}
                              transition={{ duration: 0.8, ease }}
                            />
                          </div>
                          {availPercent <= 20 && totalAvailable > 0 && (
                            <p className="text-xs text-red-500 font-medium mt-2 flex items-center gap-1">
                              <Zap className="w-3 h-3" /> Limited availability - book soon!
                            </p>
                          )}
                        </div>

                        {properties.length === 0 ? (
                          /* ─── Empty State ─── */
                          <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ ease }}
                          >
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-surface-secondary flex items-center justify-center">
                              <Calendar className="w-10 h-10 text-brand-stone/40" />
                            </div>
                            <p className="text-2xl font-display font-bold text-brand-navy mb-2">No availability</p>
                            <p className="text-brand-stone mb-2 max-w-sm mx-auto">
                              Unfortunately, all {TYPE_LABELS[type]} are booked for these dates.
                            </p>
                            <p className="text-sm text-brand-stone/70 mb-8">
                              Try different dates or another accommodation type above.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                              {TYPES.filter(t => t.id !== type).map(t => (
                                <button
                                  key={t.id}
                                  onClick={() => setType(t.id)}
                                  className="px-4 py-2 text-sm font-medium rounded-full border-2 border-surface-muted hover:border-brand-gold hover:text-brand-gold transition-all flex items-center gap-2"
                                >
                                  <t.icon className="w-4 h-4" />
                                  Try {t.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        ) : (
                          /* ─── Property Cards Grid ─── */
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {properties.map((prop, i) => {
                              const price = prices.find(p => p.propertyId === prop.id);
                              const catLabel = CATEGORY_LABELS[prop.category] || prop.category;
                              const catImg = prop.images?.[0] || CATEGORY_IMAGES[prop.category] || '/images/DSC05580-s.png';
                              const isExpanded = expandedCard === prop.id;

                              return (
                                <motion.div
                                  key={prop.id}
                                  className={`group rounded-2xl border-2 overflow-hidden hover:shadow-lodge-xl transition-all duration-300 bg-white ${
                                    isExpanded ? 'border-brand-gold shadow-lodge-xl' : 'border-surface-muted/50 hover:border-brand-gold/30'
                                  }`}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.06, duration: 0.5, ease }}
                                  whileHover={{ y: -4 }}
                                >
                                  {/* Image - 16:9 on mobile for better proportions, 4:3 on desktop */}
                                  <div className="aspect-[16/9] sm:aspect-[4/3] relative overflow-hidden cursor-pointer" onClick={() => setExpandedCard(isExpanded ? null : prop.id)}>
                                    <div
                                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                      style={{ backgroundImage: `url('${catImg}')` }}
                                    />
                                    {/* Gradient overlays for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />
                                    {/* Category badge - more prominent */}
                                    <div className="absolute top-4 left-4">
                                      <span className="bg-brand-gold text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                                        {catLabel}
                                      </span>
                                    </div>
                                    {/* Guest count overlay */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                      <span className="bg-white/90 backdrop-blur-sm text-xs font-bold text-brand-navy px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <Users className="w-3 h-3" /> Up to {prop.maxGuests}
                                      </span>
                                    </div>
                                    {/* View details hint */}
                                    <div className="absolute bottom-4 right-4">
                                      <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-brand-navy/70 px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <Info className="w-3 h-3" /> {isExpanded ? 'Less' : 'Details'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Details */}
                                  <div className="p-5">
                                    <div className="flex items-start justify-between gap-2">
                                      <h3 className="text-lg font-display font-bold group-hover:text-brand-gold transition-colors">
                                        {prop.name}
                                      </h3>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); setExpandedCard(isExpanded ? null : prop.id); }}
                                        className="flex-shrink-0 text-brand-stone hover:text-brand-gold transition-colors p-1"
                                        aria-label={isExpanded ? 'Collapse details' : 'View details'}
                                      >
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                      </button>
                                    </div>

                                    {/* Amenities - collapsed view: show top features */}
                                    <div className="flex flex-wrap gap-1.5 mb-4 mt-2">
                                      {prop.hasPrivateHotTub && (
                                        <span className="text-[10px] bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                          <Bath className="w-3 h-3" /> Hot Tub
                                        </span>
                                      )}
                                      {prop.hasPrivatePatio && (
                                        <span className="text-[10px] bg-surface-secondary text-brand-navy/60 px-2 py-0.5 rounded-full font-medium">Patio</span>
                                      )}
                                      {prop.hasBBQ && (
                                        <span className="text-[10px] bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                          <Flame className="w-3 h-3" /> BBQ
                                        </span>
                                      )}
                                      {!isExpanded && prop.amenities?.slice(0, 3).map((a, j) => (
                                        <span key={j} className="text-[10px] bg-surface-secondary text-brand-navy/60 px-2 py-0.5 rounded-full font-medium">{a}</span>
                                      ))}
                                      {!isExpanded && prop.amenities && prop.amenities.length > 3 && (
                                        <span className="text-[10px] text-brand-stone font-medium px-1">+{prop.amenities.length - 3} more</span>
                                      )}
                                    </div>

                                    {/* Expandable details section */}
                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.3, ease }}
                                          className="overflow-hidden"
                                        >
                                          {/* Full description */}
                                          {prop.description && (
                                            <p className="text-sm text-brand-stone leading-relaxed mb-4">
                                              {prop.description}
                                            </p>
                                          )}

                                          {/* Features with icons */}
                                          <div className="grid grid-cols-2 gap-2 mb-4">
                                            {prop.hasPrivateHotTub && (
                                              <div className="flex items-center gap-2 text-xs text-brand-navy bg-brand-gold/5 rounded-lg px-3 py-2">
                                                <Bath className="w-4 h-4 text-brand-gold flex-shrink-0" />
                                                <span className="font-medium">Private Hot Tub</span>
                                              </div>
                                            )}
                                            {prop.hasPrivatePatio && (
                                              <div className="flex items-center gap-2 text-xs text-brand-navy bg-brand-gold/5 rounded-lg px-3 py-2">
                                                <TreePine className="w-4 h-4 text-brand-gold flex-shrink-0" />
                                                <span className="font-medium">Private Patio</span>
                                              </div>
                                            )}
                                            {prop.hasBBQ && (
                                              <div className="flex items-center gap-2 text-xs text-brand-navy bg-brand-gold/5 rounded-lg px-3 py-2">
                                                <Flame className="w-4 h-4 text-brand-gold flex-shrink-0" />
                                                <span className="font-medium">BBQ Grill</span>
                                              </div>
                                            )}
                                          </div>

                                          {/* All amenities */}
                                          {prop.amenities && prop.amenities.length > 0 && (
                                            <div className="mb-4">
                                              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-2">All Amenities</p>
                                              <div className="flex flex-wrap gap-1.5">
                                                {prop.amenities.map((a, j) => {
                                                  const AmenityIcon = getAmenityIcon(a);
                                                  return (
                                                    <span key={j} className="text-[10px] bg-surface-secondary text-brand-navy/70 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                                                      <AmenityIcon className="w-3 h-3 text-brand-gold" /> {a}
                                                    </span>
                                                  );
                                                })}
                                              </div>
                                            </div>
                                          )}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>

                                    {/* Price + CTA */}
                                    {price && (
                                      <div className="flex items-end justify-between border-t border-surface-muted/50 pt-4">
                                        <div>
                                          <span className="text-xs text-brand-stone block">${price.pricePerNight.toFixed(2)}/night</span>
                                          <span className="font-display text-2xl text-brand-gold font-bold">${price.total.toFixed(0)}</span>
                                          <span className="text-[10px] text-brand-stone ml-1">total incl. tax</span>
                                        </div>
                                        <button
                                          onClick={(e) => { e.stopPropagation(); handleSelect(prop); }}
                                          className="btn-gold text-xs py-2.5 px-5 group-hover:brightness-110"
                                        >
                                          Select <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Initial state - no search yet, close the card */}
                    {!loading && !hasSearched && (
                      <div className="bg-white border border-surface-muted/50 border-t-0 rounded-b-3xl h-4" />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════════════════
               STEP 2: CHECKOUT
               ═══════════════════════════════════════════════════ */}
            {step === 'checkout' && selectedProperty && selectedPrice && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease }}
              >
                {/* Progress indicator */}
                <div className="bg-white rounded-t-3xl pt-6 px-6 shadow-lodge-xl border border-surface-muted/50 border-b-0">
                  <StepIndicator current={1} />
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="bg-red-50 border border-red-200 rounded-xl p-4 mx-6 flex items-center gap-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700 flex-1">{error}</p>
                      <button onClick={() => setError('')} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-white rounded-b-3xl shadow-lodge-xl border border-surface-muted/50 border-t-0 p-6 md:p-8 pb-24 lg:pb-8">
                  <button onClick={goBack} className="flex items-center gap-2 text-sm font-medium text-brand-stone hover:text-brand-navy transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back to results
                  </button>

                  {/* Mobile: Collapsible Price Summary */}
                  <div className="lg:hidden mb-6">
                    <button
                      onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border border-brand-gold/20 bg-brand-gold/5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url('${selectedProperty.images?.[0] || CATEGORY_IMAGES[selectedProperty.category] || '/images/DSC05580-s.png'}')` }}
                        />
                        <div className="text-left">
                          <p className="font-display font-bold text-sm truncate max-w-[180px]">{selectedProperty.name}</p>
                          <p className="text-xs text-brand-stone">{nights} night{nights !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xl text-brand-gold font-bold">${selectedPrice.total.toFixed(0)}</span>
                        {mobileSummaryOpen ? <ChevronUp className="w-4 h-4 text-brand-stone" /> : <ChevronDown className="w-4 h-4 text-brand-stone" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {mobileSummaryOpen && (
                        <motion.div
                          className="border border-surface-muted/50 border-t-0 rounded-b-2xl p-4 bg-surface-secondary/30 space-y-2 text-sm"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ ease }}
                        >
                          <div className="flex justify-between">
                            <span className="text-brand-stone">${selectedPrice.pricePerNight.toFixed(2)} x {nights} nights</span>
                            <span className="font-medium">${selectedPrice.subtotal.toFixed(2)}</span>
                          </div>
                          {selectedPrice.extras.map((extra, i) => (
                            <div key={i} className="flex justify-between">
                              <span className="text-brand-stone">{extra.name}</span>
                              <span className="font-medium">${extra.total.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <span className="text-brand-stone">Tax (6% SD)</span>
                            <span className="font-medium">${selectedPrice.tax.toFixed(2)}</span>
                          </div>
                          <div className="border-t border-brand-gold/30 pt-2 flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-display text-lg font-bold text-brand-gold">${selectedPrice.total.toFixed(2)}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left - Guest Form */}
                    <div className="lg:col-span-3 space-y-6">
                      {/* Selected Property Summary (desktop) */}
                      <div className="hidden lg:flex rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-4 items-center gap-4">
                        <div
                          className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url('${selectedProperty.images?.[0] || CATEGORY_IMAGES[selectedProperty.category] || '/images/DSC05580-s.png'}')` }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-lg truncate">{selectedProperty.name}</h3>
                          <p className="text-xs text-brand-stone">{CATEGORY_LABELS[selectedProperty.category]} | Up to {selectedProperty.maxGuests} guests</p>
                          <p className="text-xs text-brand-gold font-bold mt-1">{checkIn} - {checkOut} ({nights} nights)</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-display text-2xl text-brand-gold font-bold">${selectedPrice.total.toFixed(0)}</span>
                          <span className="text-[10px] text-brand-stone block">total</span>
                        </div>
                      </div>

                      {/* Guest Information Form */}
                      <div>
                        <h2 className="text-xl font-display font-bold text-brand-navy mb-5 flex items-center gap-2">
                          <User className="w-5 h-5 text-brand-gold" /> Guest Information
                        </h2>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-bold text-brand-navy mb-1.5 block">Full Name *</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone" />
                              <input
                                type="text" value={guestName} onChange={e => setGuestName(e.target.value)}
                                placeholder="John Smith"
                                className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-bold text-brand-navy mb-1.5 block">Email *</label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone" />
                                <input
                                  type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)}
                                  placeholder="john@email.com"
                                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-bold text-brand-navy mb-1.5 block">Phone *</label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone" />
                                <input
                                  type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)}
                                  placeholder="(605) 555-1234"
                                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-bold text-brand-navy mb-1.5 block">Special Requests</label>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-brand-stone" />
                              <textarea
                                value={guestNotes} onChange={e => setGuestNotes(e.target.value)}
                                placeholder="Late arrival, pets, accessibility needs..."
                                rows={3}
                                className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Security badges */}
                      <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2 text-xs text-brand-stone">
                          <Shield className="w-4 h-4 text-green-500" /> SSL Secured
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-stone">
                          <CreditCard className="w-4 h-4 text-blue-500" /> Secure Payment
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-stone">
                          <CheckCircle className="w-4 h-4 text-brand-gold" /> Instant Confirmation
                        </div>
                      </div>

                      {/* Desktop submit button (below form) */}
                      <button
                        onClick={handleSubmitReservation}
                        disabled={submitting}
                        className="hidden lg:flex w-full mt-4 py-4 bg-brand-gold text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 items-center justify-center gap-2 shadow-gold"
                      >
                        {submitting ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                        ) : (
                          <><CreditCard className="w-5 h-5" /> Confirm & Pay ${selectedPrice.total.toFixed(2)}</>
                        )}
                      </button>
                    </div>

                    {/* Right - Order Summary (desktop only) */}
                    <div className="hidden lg:block lg:col-span-2">
                      <div className="bg-surface-secondary/50 rounded-2xl p-6 sticky top-24 border border-surface-muted/50">
                        <h3 className="font-bold text-brand-navy mb-4 text-sm uppercase tracking-wider">Booking Summary</h3>

                        <div className="space-y-3 text-sm mb-4">
                          <div className="flex items-center gap-2 text-brand-stone">
                            <Calendar className="w-4 h-4 text-brand-gold" />
                            <span>{checkIn} - {checkOut}</span>
                          </div>
                          <div className="flex items-center gap-2 text-brand-stone">
                            <Clock className="w-4 h-4 text-brand-gold" />
                            <span>{nights} night{nights > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center gap-2 text-brand-stone">
                            <Users className="w-4 h-4 text-brand-gold" />
                            <span>{guests} guest{guests > 1 ? 's' : ''}</span>
                          </div>
                        </div>

                        <div className="border-t border-surface-muted pt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-brand-stone">${selectedPrice.pricePerNight.toFixed(2)} x {nights} nights</span>
                            <span className="font-medium">${selectedPrice.subtotal.toFixed(2)}</span>
                          </div>
                          {selectedPrice.extras.map((extra, i) => (
                            <div key={i} className="flex justify-between">
                              <span className="text-brand-stone">{extra.name}</span>
                              <span className="font-medium">${extra.total.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <span className="text-brand-stone">Tax (6% SD)</span>
                            <span className="font-medium">${selectedPrice.tax.toFixed(2)}</span>
                          </div>
                          <div className="border-t border-brand-gold/30 pt-3 flex justify-between items-center">
                            <span className="font-bold text-brand-navy">Total</span>
                            <span className="font-display text-2xl font-bold text-brand-gold">${selectedPrice.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-brand-stone text-center mt-4 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" /> Your spot is held for 30 minutes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile: Sticky bottom CTA */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-surface-muted p-4 shadow-lodge-xl">
                  <div className="max-w-6xl mx-auto flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-brand-stone truncate">{selectedProperty.name}</p>
                      <p className="font-display text-lg font-bold text-brand-gold">${selectedPrice.total.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={handleSubmitReservation}
                      disabled={submitting}
                      className="btn-gold py-3 px-6 text-sm flex-shrink-0 disabled:opacity-50"
                    >
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-1" /> Processing</>
                      ) : (
                        <><CreditCard className="w-4 h-4 mr-1" /> Pay Now</>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
