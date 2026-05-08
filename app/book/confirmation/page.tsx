'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import {
  CheckCircle, Calendar, MapPin, Phone, Mail,
  Printer, Home, Loader2, Clock, Users, Sparkles,
  Navigation, Star, ExternalLink, Search, Shield,
} from 'lucide-react';

interface ReservationData {
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

const PROPERTY_IMAGES: Record<string, string> = {
  cabin: '/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg',
  rv: '/images/rv-camper-van.png',
  tent: '/images/Wooded-Tent-Area.png',
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface-primary">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
        <p className="text-brand-stone text-sm">Loading your confirmation...</p>
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
    async function load() {
      try {
        const res = await fetch(`/api/reservations/${reservationId}`);
        const data = await res.json();
        if (data.reservation) setReservation(data.reservation);
      } catch { /* handled below */ }
      finally { setLoading(false); }
    }
    load();
  }, [reservationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface-primary">
        <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
        <p className="text-brand-stone text-sm">Confirming your reservation...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-surface-primary">
        <div className="w-16 h-16 bg-surface-secondary rounded-2xl flex items-center justify-center mb-2">
          <Calendar className="w-8 h-8 text-brand-stone" />
        </div>
        <p className="text-2xl font-display font-bold text-brand-navy">Not Found</p>
        <p className="text-brand-stone text-center max-w-md text-sm">We couldn&apos;t locate your reservation. It may still be processing.</p>
        <div className="flex gap-3 mt-4">
          <Link href="/my-reservation" className="btn-outline px-5 py-2.5 text-sm"><Search className="w-4 h-4 mr-1.5" />Look Up</Link>
          <Link href="/booking" className="btn-gold px-5 py-2.5 text-sm">Book Again</Link>
        </div>
      </div>
    );
  }

  const fmt = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
  const fmtShort = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const img = PROPERTY_IMAGES[reservation.propertyType] || '/images/DSC05580-s.png';

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Hero with property image */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image src={img} alt={reservation.propertyName} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-surface-primary" />

        {/* Success badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 bg-green-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-green-400/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>
            <motion.h1
              className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Booking Confirmed!
            </motion.h1>
            <motion.p
              className="text-white/80 text-sm mt-1 drop-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Confirmation sent to {reservation.guestEmail}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-4 -mt-8 relative z-10 pb-12 space-y-5">

        {/* Main card */}
        <motion.div
          className="bg-white rounded-2xl shadow-lodge-xl border border-surface-muted/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Confirmation bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gold/10 bg-brand-gold/5">
            <div>
              <p className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Confirmation</p>
              <p className="font-mono font-bold text-brand-gold text-xl tracking-wider">{reservation.confirmationNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Total Paid</p>
              <p className="font-display font-bold text-brand-navy text-xl">${reservation.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Property */}
            <div>
              <p className="text-xl font-display font-bold text-brand-navy">{reservation.propertyName}</p>
              <p className="text-sm text-brand-stone capitalize">{reservation.propertyType} · {reservation.guestName}</p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-primary rounded-xl p-4 border border-surface-muted/50">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Check-in</span>
                </div>
                <p className="font-bold text-brand-navy text-sm">{fmt(reservation.checkIn)}</p>
                <p className="text-xs text-brand-stone">After 3:00 PM</p>
              </div>
              <div className="bg-surface-primary rounded-xl p-4 border border-surface-muted/50">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Check-out</span>
                </div>
                <p className="font-bold text-brand-navy text-sm">{fmt(reservation.checkOut)}</p>
                <p className="text-xs text-brand-stone">Before 11:00 AM</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3">
              {[
                { icon: Clock, val: reservation.nights, label: `Night${reservation.nights !== 1 ? 's' : ''}` },
                { icon: Users, val: reservation.numberOfGuests, label: `Guest${reservation.numberOfGuests !== 1 ? 's' : ''}` },
                { icon: CheckCircle, val: 'Paid', label: 'Status', valClass: 'text-green-600' },
              ].map((s, i) => (
                <div key={i} className="flex-1 text-center p-3 bg-surface-primary rounded-xl border border-surface-muted/50">
                  <s.icon className="w-4 h-4 text-brand-gold mx-auto mb-1" />
                  <p className={`font-display text-lg font-bold ${(s as {valClass?: string}).valClass || 'text-brand-navy'}`}>{s.val}</p>
                  <p className="text-[10px] text-brand-stone uppercase font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="aspect-[2.5/1] relative">
            <iframe src={SITE.mapsEmbed} className="absolute inset-0 w-full h-full border-0" loading="lazy" title="Location" />
          </div>
          <div className="p-5">
            <h3 className="text-sm font-bold text-brand-navy mb-2 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-brand-gold" /> Getting Here
            </h3>
            <p className="text-sm font-bold text-brand-navy/80 mb-1">{SITE.address}</p>
            <p className="text-xs text-brand-stone mb-3">I-90 Exit 37 &rarr; Right on Brimstone Place &rarr; 2 min from interstate</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-1.5 text-brand-gold font-bold hover:underline"><Phone className="w-3.5 h-3.5" />{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 text-brand-gold font-bold hover:underline"><Mail className="w-3.5 h-3.5" />{SITE.email}</a>
              <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-brand-gold font-bold hover:underline"><MapPin className="w-3.5 h-3.5" />Directions <ExternalLink className="w-3 h-3" /></a>
            </div>
          </div>
        </motion.div>

        {/* What to expect */}
        <motion.div
          className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-sm font-bold text-brand-navy mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-gold" />What to Expect</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { icon: Star, text: 'Free resort amenities: Pool, Hot Tub, Beer Garden & more' },
              { icon: MapPin, text: '5 mi from Sturgis · 55 mi from Mount Rushmore' },
              { icon: Shield, text: 'Friendly on-site staff · After-hours on-call' },
              { icon: Phone, text: 'Office open daily 8 AM – 8 PM Mountain Time' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-brand-navy/70">
                <item.icon className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button onClick={() => window.print()} className="btn-outline px-4 py-2.5 text-sm"><Printer className="w-4 h-4 mr-1.5" />Print</button>
          <Link href="/my-reservation" className="btn-outline px-4 py-2.5 text-sm"><Search className="w-4 h-4 mr-1.5" />My Reservation</Link>
          <Link href="/explore" className="btn-outline px-4 py-2.5 text-sm"><Sparkles className="w-4 h-4 mr-1.5" />Explore</Link>
          <Link href="/" className="btn-gold px-4 py-2.5 text-sm"><Home className="w-4 h-4 mr-1.5" />Home</Link>
        </motion.div>

        <p className="text-center text-brand-stone text-xs pb-4">
          Check your reservation anytime at <Link href="/my-reservation" className="text-brand-gold font-bold hover:underline">rushnomore.com/my-reservation</Link>
        </p>
      </section>
    </div>
  );
}
