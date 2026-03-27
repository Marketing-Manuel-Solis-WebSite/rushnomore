'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SITE, RV_TIERS, CABINS } from '@/data/site';
import { Breadcrumbs } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import {
  Truck, Home, Tent, Calendar, Users, Search, ArrowRight, ArrowLeft,
  Loader2, CheckCircle, CreditCard, Shield, Clock, MapPin, Star,
  AlertCircle, Phone, Mail, User, MessageSquare, Sparkles, X,
  ChevronDown, Zap, Wifi, Flame, PawPrint, Bath, Check, Copy
} from 'lucide-react';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
type PropertyType = 'rv' | 'cabin' | 'tent';
type Step = 'search' | 'results' | 'checkout' | 'confirmation';

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
const TYPES = [
  { id: 'cabin' as PropertyType, label: 'Cabins', icon: Home, price: 'From $95/night', desc: '16 Presidential Cabins, 2-10 guests', img: '/images/cabin-9_800.png' },
  { id: 'rv' as PropertyType, label: 'RV Sites', icon: Truck, price: 'From $53.99/night', desc: 'Full hookups, 30/50 AMP, pull-thru', img: '/images/rv-camper-van.png' },
  { id: 'tent' as PropertyType, label: 'Tent Camping', icon: Tent, price: 'From $35/night', desc: 'Shaded sites under Ponderosa Pines', img: '/images/Wooded-Tent-Area.png' },
];

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

/* ═══════════════════════════════════════════
   STEP INDICATOR
   ═══════════════════════════════════════════ */
function StepIndicator({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
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
   MAIN BOOKING PAGE
   ═══════════════════════════════════════════ */
export default function BookingPage() {
  // Step state
  const [step, setStep] = useState<Step>('search');
  const topRef = useRef<HTMLDivElement>(null);

  // Search form
  const [type, setType] = useState<PropertyType>('cabin');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Results
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<AvailableProperty[]>([]);
  const [prices, setPrices] = useState<PriceBreakdown[]>([]);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [totalOfType, setTotalOfType] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<AvailableProperty | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<PriceBreakdown | null>(null);

  // Checkout form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Confirmation
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [reservationId, setReservationId] = useState('');

  // Errors
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const stepIndex = step === 'search' ? 0 : step === 'results' ? 1 : step === 'checkout' ? 2 : 3;

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
        setStep('results');
        scrollToTop();
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

      // Simulate payment success (mark as confirmed)
      setConfirmationNumber(data.confirmationNumber || `RNM-${Date.now()}`);
      setReservationId(data.reservationId || '');
      setStep('confirmation');
      scrollToTop();
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Go Back ─── */
  const goBack = () => {
    setError('');
    if (step === 'results') { setStep('search'); scrollToTop(); }
    if (step === 'checkout') { setStep('results'); scrollToTop(); }
  };

  /* ─── Reset ─── */
  const resetBooking = () => {
    setStep('search');
    setSelectedProperty(null);
    setSelectedPrice(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setGuestNotes('');
    setConfirmationNumber('');
    setError('');
    scrollToTop();
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Booking' }]} />

      {/* ═══ HERO ═══ */}
      <div ref={topRef} />
      <section className="relative py-16 md:py-20 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="/videos/rushnomore-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 to-brand-navy" />
        </div>
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.span
            className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Instant Booking
          </motion.span>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-display mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Reserve Your <span className="text-brand-gold italic">Stay</span>
          </motion.h1>
          <motion.p
            className="text-base text-white/60 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Check real-time availability, choose your perfect spot, and book instantly.
          </motion.p>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="relative -mt-6 z-20 pb-20">
        <div className="max-w-5xl mx-auto px-4">

          {/* Step Indicator */}
          {step !== 'confirmation' && (
            <div className="bg-white rounded-t-3xl pt-6 px-6 shadow-lodge-xl border border-surface-muted/50 border-b-0">
              <StepIndicator current={stepIndex} steps={['Search', 'Select', 'Book']} />
            </div>
          )}

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 rounded-xl p-4 mx-6 mb-0 flex items-center gap-3"
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

          <AnimatePresence mode="wait">
            {/* ═══════════════════════════════════════
               STEP 1: SEARCH
               ═══════════════════════════════════════ */}
            {step === 'search' && (
              <motion.div
                key="search"
                className="bg-white rounded-b-3xl shadow-lodge-xl border border-surface-muted/50 border-t-0 p-6 md:p-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
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
                          {/* Background image */}
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
                            <span className="text-xs text-brand-stone">{t.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dates */}
                <div className="mb-8">
                  <label className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 block flex items-center gap-2">
                    <span className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-black">2</span>
                    Select Your Dates
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-brand-stone mb-1.5 block font-medium">Check-in</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold" />
                        <input
                          type="date"
                          min={today}
                          value={checkIn}
                          onChange={e => {
                            setCheckIn(e.target.value);
                            if (checkOut && e.target.value >= checkOut) setCheckOut('');
                          }}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-brand-stone mb-1.5 block font-medium">Check-out</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold" />
                        <input
                          type="date"
                          min={checkIn || today}
                          value={checkOut}
                          onChange={e => setCheckOut(e.target.value)}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-brand-stone mb-1.5 block font-medium">Nights</label>
                      <div className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted bg-surface-secondary/50 text-sm font-medium text-center">
                        <span className="font-display text-2xl text-brand-gold">{nights || '—'}</span>
                        <span className="text-brand-stone ml-1 text-xs">night{nights !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
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
              </motion.div>
            )}

            {/* ═══════════════════════════════════════
               STEP 2: RESULTS
               ═══════════════════════════════════════ */}
            {step === 'results' && (
              <motion.div
                key="results"
                className="bg-white rounded-b-3xl shadow-lodge-xl border border-surface-muted/50 border-t-0 p-6 md:p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back + Summary */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <button onClick={goBack} className="flex items-center gap-2 text-sm font-medium text-brand-stone hover:text-brand-navy transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Modify Search
                  </button>
                  <div className="flex items-center gap-4 text-xs font-bold text-brand-stone">
                    <span className="flex items-center gap-1.5 bg-surface-secondary px-3 py-1.5 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      {checkIn} <ArrowRight className="w-3 h-3" /> {checkOut}
                      <span className="text-brand-gold">({nights}N)</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-surface-secondary px-3 py-1.5 rounded-full">
                      <Users className="w-3.5 h-3.5 text-brand-gold" /> {guests}
                    </span>
                  </div>
                </div>

                {/* Available count */}
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-display">
                    <span className="text-brand-gold font-bold">{totalAvailable}</span> of {totalOfType} {type === 'cabin' ? 'cabins' : type === 'rv' ? 'RV sites' : 'tent sites'} available
                  </h2>
                </div>

                {properties.length === 0 ? (
                  <div className="text-center py-16">
                    <AlertCircle className="w-12 h-12 text-brand-stone/30 mx-auto mb-4" />
                    <p className="text-xl font-bold text-brand-navy mb-2">No availability for these dates</p>
                    <p className="text-brand-stone mb-6">Try different dates or another accommodation type.</p>
                    <button onClick={goBack} className="btn-gold">Search Again</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {properties.map((prop, i) => {
                      const price = prices.find(p => p.propertyId === prop.id);
                      const catLabel = CATEGORY_LABELS[prop.category] || prop.category;
                      const catImg = prop.images?.[0] || CATEGORY_IMAGES[prop.category] || '/images/DSC05580-s.png';

                      return (
                        <motion.div
                          key={prop.id}
                          className="rounded-2xl border border-surface-muted/50 overflow-hidden hover:shadow-gold-lg hover:border-brand-gold/20 transition-all duration-300 group cursor-pointer"
                          onClick={() => handleSelect(prop)}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.4 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                            {/* Image */}
                            <div className="md:col-span-3 h-40 md:h-full relative overflow-hidden">
                              <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${catImg}')` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-navy/10" />
                              <div className="absolute top-3 left-3">
                                <span className="bg-white/90 backdrop-blur-sm text-xs font-bold text-brand-navy px-2.5 py-1 rounded-full">
                                  {catLabel}
                                </span>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="md:col-span-6 p-5">
                              <h3 className="text-lg font-display font-bold mb-1.5 group-hover:text-brand-gold transition-colors">{prop.name}</h3>
                              <div className="flex items-center gap-3 mb-3 text-xs text-brand-stone">
                                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Up to {prop.maxGuests}</span>
                                {prop.description && <span className="line-clamp-1">{prop.description}</span>}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {prop.hasPrivateHotTub && (
                                  <span className="text-[10px] bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                    <Bath className="w-3 h-3" /> Hot Tub
                                  </span>
                                )}
                                {prop.hasPrivatePatio && (
                                  <span className="text-[10px] bg-surface-secondary text-brand-navy/60 px-2 py-0.5 rounded-full font-medium">Patio</span>
                                )}
                                {prop.hasBBQ && (
                                  <span className="text-[10px] bg-surface-secondary text-brand-navy/60 px-2 py-0.5 rounded-full font-medium">BBQ</span>
                                )}
                                {prop.amenities?.slice(0, 3).map((a, j) => (
                                  <span key={j} className="text-[10px] bg-surface-secondary text-brand-navy/60 px-2 py-0.5 rounded-full font-medium">{a}</span>
                                ))}
                              </div>
                            </div>

                            {/* Price + CTA */}
                            <div className="md:col-span-3 p-5 bg-surface-secondary/30 flex flex-col justify-center items-center text-center border-t md:border-t-0 md:border-l border-surface-muted/30">
                              {price && (
                                <>
                                  <span className="text-xs text-brand-stone">${price.pricePerNight.toFixed(2)}/night</span>
                                  <span className="font-display text-3xl text-brand-gold font-bold">${price.total.toFixed(0)}</span>
                                  <span className="text-[10px] text-brand-stone mb-3">total incl. tax ({nights}N)</span>
                                  <span className="btn-gold text-xs w-full py-2.5 group-hover:brightness-110">
                                    Select <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══════════════════════════════════════
               STEP 3: CHECKOUT
               ═══════════════════════════════════════ */}
            {step === 'checkout' && selectedProperty && selectedPrice && (
              <motion.div
                key="checkout"
                className="bg-white rounded-b-3xl shadow-lodge-xl border border-surface-muted/50 border-t-0 p-6 md:p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button onClick={goBack} className="flex items-center gap-2 text-sm font-medium text-brand-stone hover:text-brand-navy transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" /> Back to results
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Left - Guest Form */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Selected Property Summary */}
                    <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-4 flex items-center gap-4">
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

                    {/* Security */}
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
                  </div>

                  {/* Right - Order Summary */}
                  <div className="lg:col-span-2">
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

                      <button
                        onClick={handleSubmitReservation}
                        disabled={submitting}
                        className="w-full mt-6 py-4 bg-brand-gold text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-gold"
                      >
                        {submitting ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                        ) : (
                          <><CreditCard className="w-5 h-5" /> Confirm & Pay ${selectedPrice.total.toFixed(2)}</>
                        )}
                      </button>

                      <p className="text-[10px] text-brand-stone text-center mt-3 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" /> Your spot is held for 30 minutes
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════
               STEP 4: CONFIRMATION
               ═══════════════════════════════════════ */}
            {step === 'confirmation' && (
              <motion.div
                key="confirmation"
                className="bg-white rounded-3xl shadow-lodge-xl border border-surface-muted/50 p-8 md:p-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>

                <motion.h2
                  className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Booking Confirmed!
                </motion.h2>

                <motion.p
                  className="text-brand-stone text-lg mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Your reservation has been successfully created.
                </motion.p>

                {/* Confirmation Card */}
                <motion.div
                  className="max-w-lg mx-auto bg-surface-secondary/50 rounded-2xl p-6 mb-8 border border-surface-muted text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <span className="text-xs font-bold text-brand-stone uppercase tracking-wider">Confirmation Number</span>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="font-display text-2xl text-brand-gold font-bold">{confirmationNumber}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-stone">Guest</span>
                      <span className="font-medium">{guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-stone">Property</span>
                      <span className="font-medium">{selectedProperty?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-stone">Dates</span>
                      <span className="font-medium">{checkIn} - {checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-stone">Nights</span>
                      <span className="font-medium">{nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-stone">Guests</span>
                      <span className="font-medium">{guests}</span>
                    </div>
                    <div className="border-t border-surface-muted pt-3 flex justify-between">
                      <span className="font-bold">Total Paid</span>
                      <span className="font-display text-xl font-bold text-brand-gold">${selectedPrice?.total.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button onClick={resetBooking} className="btn-gold">
                    <Sparkles className="w-4 h-4 mr-2" /> Book Another Stay
                  </button>
                  <Link href="/" className="btn-outline">
                    Return Home
                  </Link>
                </motion.div>

                <motion.p
                  className="text-xs text-brand-stone mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  A confirmation email will be sent to <strong>{guestEmail}</strong>.
                  <br />Questions? Call us at <a href={`tel:${SITE.phoneTel}`} className="text-brand-gold font-bold hover:underline">{SITE.phone}</a>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
