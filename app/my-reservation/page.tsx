'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '@/data/site';
import {
  Search, CheckCircle, Calendar, Users, Clock, MapPin,
  Phone, Mail, Printer, Home, AlertCircle, Shield,
  CreditCard, ArrowLeft, Navigation, ExternalLink, Loader2,
} from 'lucide-react';

interface GuestReservation {
  confirmationNumber: string;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'expired';
  paymentStatus: 'unpaid' | 'paid' | 'refunded' | 'partial-refund';
  propertyName: string;
  propertyType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  numberOfGuests: number;
  guestName: string;
  pricePerNight: number;
  subtotal: number;
  tax: number;
  totalAmount: number;
  paidAt?: string;
  cancellationPolicy: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  confirmed:    { label: 'Confirmed',   color: 'text-green-700',  bg: 'bg-green-100' },
  pending:      { label: 'Pending',     color: 'text-amber-700',  bg: 'bg-amber-100' },
  cancelled:    { label: 'Cancelled',   color: 'text-red-700',    bg: 'bg-red-100' },
  'checked-in': { label: 'Checked In',  color: 'text-blue-700',   bg: 'bg-blue-100' },
  'checked-out':{ label: 'Checked Out', color: 'text-gray-700',   bg: 'bg-gray-100' },
  expired:      { label: 'Expired',     color: 'text-gray-700',   bg: 'bg-gray-100' },
};

const CANCELLATION_LABELS: Record<string, string> = {
  'standard-rv-tent': 'Standard cancellation policy (RV / Tent)',
  'luxury-cabin':     'Luxury cabin cancellation policy',
  'non-refundable':   'Non-refundable reservation',
};

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T12:00:00');
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function MyReservationPage() {
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [reservation, setReservation] = useState<GuestReservation | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setReservation(null);
    setLoading(true);

    try {
      const res = await fetch('/api/reservations/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmationNumber, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setReservation(data.reservation);
    } catch {
      setError('Unable to connect. Please check your internet and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setReservation(null);
    setError('');
    setConfirmationNumber('');
    setEmail('');
  }

  return (
    <>
      {/* Hero / Form Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-brand-navy text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-10">
            <source src="/videos/rushnomore-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 to-brand-navy" />
        </div>
        <div className="absolute inset-0 animate-shimmer" />

        <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-20">
          <AnimatePresence mode="wait">
            {!reservation ? (
              /* ═══ LOOKUP FORM ═══ */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-8">
                  <motion.div
                    className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  >
                    <Search className="w-8 h-8 text-brand-gold" />
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
                    My Reservation
                  </h1>
                  <p className="text-white/60 text-sm md:text-base">
                    Enter your confirmation number and email to view your booking details.
                  </p>
                </div>

                <form onSubmit={handleLookup} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-lodge-xl space-y-5">
                  <div>
                    <label htmlFor="confirmationNumber" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Confirmation Number
                    </label>
                    <input
                      id="confirmationNumber"
                      type="text"
                      value={confirmationNumber}
                      onChange={(e) => setConfirmationNumber(e.target.value.toUpperCase())}
                      placeholder="RNM-2026-XXXX"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 font-mono text-lg tracking-wider uppercase transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all"
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-gold py-3.5 text-base font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Find My Reservation
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-white/40 text-xs mt-6 leading-relaxed">
                  Don&apos;t have your confirmation number? Check your email or call{' '}
                  <a href={`tel:${SITE.phoneTel}`} className="text-brand-gold hover:underline font-bold">
                    {SITE.phone}
                  </a>
                </p>
              </motion.div>
            ) : (
              /* ═══ SUCCESS HEADER ═══ */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  Reservation Found
                </h1>
                <p className="text-white/60">
                  Here are your booking details, <strong className="text-white">{reservation.guestName}</strong>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ RESERVATION DETAILS ═══ */}
      <AnimatePresence>
        {reservation && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative -mt-10 z-10 pb-16"
          >
            <div className="max-w-2xl mx-auto px-4">
              <motion.div
                className="bg-white rounded-3xl shadow-lodge-xl border border-surface-muted/50 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* Status + Confirmation Header */}
                <div className="bg-brand-gold px-6 md:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/80">Confirmation Number</p>
                    <p className="text-2xl font-display font-bold tracking-wider text-white">
                      {reservation.confirmationNumber}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${STATUS_CONFIG[reservation.status]?.bg || 'bg-gray-100'} ${STATUS_CONFIG[reservation.status]?.color || 'text-gray-700'}`}>
                      {STATUS_CONFIG[reservation.status]?.label || reservation.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  {/* Property */}
                  <div>
                    <p className="text-[10px] text-brand-stone uppercase tracking-[0.15em] font-bold mb-1">Property</p>
                    <p className="text-xl font-display font-bold text-brand-navy">{reservation.propertyName}</p>
                    <p className="text-sm text-brand-stone capitalize">{reservation.propertyType} accommodation</p>
                  </div>

                  {/* Check-in / Check-out */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface-secondary/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-brand-gold" />
                        <p className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Check-in</p>
                      </div>
                      <p className="font-bold text-brand-navy text-sm">{formatDate(reservation.checkIn)}</p>
                      <p className="text-xs text-brand-stone mt-0.5">After 3:00 PM</p>
                    </div>
                    <div className="bg-surface-secondary/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-brand-gold" />
                        <p className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Check-out</p>
                      </div>
                      <p className="font-bold text-brand-navy text-sm">{formatDate(reservation.checkOut)}</p>
                      <p className="text-xs text-brand-stone mt-0.5">Before 11:00 AM</p>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-surface-secondary/50 rounded-xl">
                      <Clock className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                      <p className="font-display text-xl font-bold text-brand-gold">{reservation.nights}</p>
                      <p className="text-[10px] text-brand-stone uppercase font-bold">Nights</p>
                    </div>
                    <div className="text-center p-3 bg-surface-secondary/50 rounded-xl">
                      <Users className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                      <p className="font-display text-xl font-bold text-brand-gold">{reservation.numberOfGuests}</p>
                      <p className="text-[10px] text-brand-stone uppercase font-bold">Guests</p>
                    </div>
                    <div className="text-center p-3 bg-surface-secondary/50 rounded-xl">
                      <CreditCard className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                      <p className="font-display text-xl font-bold text-green-500 capitalize">{reservation.paymentStatus}</p>
                      <p className="text-[10px] text-brand-stone uppercase font-bold">Payment</p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-surface-muted pt-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-stone mb-3">Price Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-brand-navy/70">
                        <span>${reservation.pricePerNight.toFixed(2)} x {reservation.nights} night{reservation.nights !== 1 ? 's' : ''}</span>
                        <span>${reservation.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-brand-navy/70">
                        <span>Tax</span>
                        <span>${reservation.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-brand-navy pt-2 border-t border-surface-muted text-base">
                        <span>Total</span>
                        <span>${reservation.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="flex items-start gap-3 bg-surface-secondary/50 rounded-xl p-4">
                    <Shield className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-stone mb-1">Cancellation Policy</p>
                      <p className="text-sm text-brand-navy/70">
                        {CANCELLATION_LABELS[reservation.cancellationPolicy] || reservation.cancellationPolicy}
                      </p>
                    </div>
                  </div>

                  {/* Cancellation note for confirmed reservations more than 7 days away */}
                  {reservation.status === 'confirmed' && daysUntil(reservation.checkIn) > 7 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4"
                    >
                      <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        Your check-in is more than 7 days away. If you need to cancel or modify your reservation, please contact us at{' '}
                        <a href={`tel:${SITE.phoneTel}`} className="font-bold underline">{SITE.phone}</a> or{' '}
                        <a href={`mailto:${SITE.email}`} className="font-bold underline">{SITE.email}</a>.
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Getting Here */}
                <div className="border-t border-surface-muted p-6 md:p-8 bg-surface-secondary/20">
                  <h3 className="font-bold text-brand-navy mb-3 flex items-center gap-2 text-sm">
                    <Navigation className="w-4 h-4 text-brand-gold" /> Getting Here
                  </h3>
                  <p className="text-sm text-brand-navy/70 font-bold mb-1">{SITE.address}</p>
                  <p className="text-xs text-brand-stone mb-4">
                    From I-90, take Exit 37 &rarr; Turn right onto Brimstone Place &rarr; Rush No More is on your right.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 text-brand-gold font-bold hover:underline">
                      <Phone className="w-4 h-4" /> {SITE.phone}
                    </a>
                    <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-brand-gold font-bold hover:underline">
                      <Mail className="w-4 h-4" /> {SITE.email}
                    </a>
                    <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-gold font-bold hover:underline">
                      <MapPin className="w-4 h-4" /> Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button onClick={() => window.print()} className="btn-outline px-6">
                  <Printer className="w-4 h-4 mr-2" /> Print
                </button>
                <Link href="/contact" className="btn-outline px-6">
                  <Mail className="w-4 h-4 mr-2" /> Contact Us
                </Link>
                <button onClick={handleReset} className="btn-outline px-6">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Look Up Another
                </button>
                <Link href="/" className="btn-gold px-6">
                  <Home className="w-4 h-4 mr-2" /> Back to Home
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Spacer when no reservation shown */}
      {!reservation && <div className="h-4" />}
    </>
  );
}
