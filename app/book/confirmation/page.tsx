'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import {
  CheckCircle, Calendar, MapPin, Phone, Mail,
  Printer, Home, Loader2, Clock, Users, Sparkles,
  Navigation, Star, ArrowRight, ExternalLink, Search
} from 'lucide-react';

interface ReservationData {
  id: string;
  confirmationNumber: string;
  propertyName: string;
  propertyType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestName: string;
  guestEmail: string;
  numberOfGuests: number;
  totalAmount: number;
  pricePerNight: number;
  status: string;
  paymentStatus: string;
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-brand-navy">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
        <p className="text-white/60 text-sm">Loading your confirmation...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reservationId = searchParams.get('id') || '';
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reservationId) { setLoading(false); return; }

    async function loadReservation() {
      try {
        const res = await fetch(`/api/reservations/${reservationId}`);
        const data = await res.json();
        if (data.reservation) setReservation(data.reservation);
      } catch (e) {
        console.error('Error loading reservation:', e);
      } finally {
        setLoading(false);
      }
    }

    // Allow a brief moment for webhook to process the payment
    loadReservation();
  }, [reservationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-brand-navy">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-12 h-12 text-brand-gold" />
        </motion.div>
        <p className="text-white/60 text-sm">Confirming your reservation...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-surface-primary">
        <div className="w-20 h-20 bg-surface-secondary rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-10 h-10 text-brand-stone" />
        </div>
        <p className="text-2xl font-display font-bold text-brand-navy">Reservation Not Found</p>
        <p className="text-brand-stone text-center max-w-md">We couldn&apos;t locate your reservation. It may still be processing or the link may be incorrect.</p>
        <Link href="/book" className="btn-gold mt-4">
          <ArrowRight className="w-4 h-4 mr-2" /> Book Again
        </Link>
      </div>
    );
  }

  const formatDate = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      {/* ═══ SUCCESS HERO ═══ */}
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-10">
            <source src="/videos/rushnomore-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 to-brand-navy" />
        </div>
        <div className="absolute inset-0 animate-shimmer" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <CheckCircle className="w-12 h-12 text-green-400" />
          </motion.div>

          <motion.span
            className="badge-gold mb-4 inline-block !bg-brand-gold/20 !text-brand-gold-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Payment Successful
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Booking Confirmed!
          </motion.h1>

          <motion.p
            className="text-white/60 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A confirmation email has been sent to <strong className="text-white">{reservation.guestEmail}</strong>
          </motion.p>
        </div>
      </section>

      {/* ═══ RESERVATION CARD ═══ */}
      <section className="relative -mt-10 z-10 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            className="bg-white rounded-3xl shadow-lodge-xl border border-surface-muted/50 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Gold Header */}
            <div className="bg-brand-gold px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Confirmation Number</p>
                <p className="text-2xl font-display font-bold tracking-wider text-white">
                  {reservation.confirmationNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white/80">Total Paid</p>
                <p className="text-2xl font-display font-bold text-white">
                  ${reservation.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 space-y-6">
              <div>
                <p className="text-[10px] text-brand-stone uppercase tracking-[0.15em] font-bold mb-1">Property</p>
                <p className="text-xl font-display font-bold text-brand-navy">{reservation.propertyName}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
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
                  <Star className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                  <p className="font-display text-xl font-bold text-green-500">Paid</p>
                  <p className="text-[10px] text-brand-stone uppercase font-bold">Status</p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="border-t border-surface-muted p-8 bg-surface-secondary/20">
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

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button onClick={() => window.print()} className="btn-outline px-6">
              <Printer className="w-4 h-4 mr-2" /> Print Confirmation
            </button>
            <Link href="/my-reservation" className="btn-outline px-6">
              <Search className="w-4 h-4 mr-2" /> Check Reservation Status
            </Link>
            <Link href="/explore" className="btn-navy px-6">
              <Sparkles className="w-4 h-4 mr-2" /> Explore the Black Hills
            </Link>
            <Link href="/" className="btn-gold px-6">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Link>
          </motion.div>

          <motion.p
            className="text-center text-brand-stone text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            You can always check your reservation status at{' '}
            <Link href="/my-reservation" className="text-brand-gold font-bold hover:underline">
              rushnomore.com/my-reservation
            </Link>
          </motion.p>
        </div>
      </section>
    </>
  );
}
