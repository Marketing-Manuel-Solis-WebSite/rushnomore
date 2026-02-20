// app/book/confirmation/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle, Calendar, MapPin, Phone, Mail,
  Printer, Download, Home, Loader2
} from 'lucide-react';

interface ReservationData {
  id: string;
  confirmationNumber: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestName: string;
  guestEmail: string;
  numberOfGuests: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const reservationId = searchParams.get('id') || '';
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reservationId) return;

    async function loadReservation() {
      try {
        const res = await fetch(`/api/reservations/${reservationId}`);
        const data = await res.json();
        if (data.reservation) {
          setReservation(data.reservation);
        }
      } catch (e) {
        console.error('Error loading reservation:', e);
      } finally {
        setLoading(false);
      }
    }

    // Dar tiempo para que el webhook procese
    setTimeout(loadReservation, 1500);
  }, [reservationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
        <p className="text-brand-stone">Confirming your reservation...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-xl font-bold text-brand-navy">Reservation not found</p>
        <Link href="/book" className="btn-gold">Book Again</Link>
      </div>
    );
  }

  const formatDate = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <section className="py-16 md:py-24 bg-surface-primary min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-brand-stone text-lg">
            A confirmation email has been sent to <strong>{reservation.guestEmail}</strong>
          </p>
        </div>

        {/* Reservation Card */}
        <div className="bg-white rounded-3xl shadow-lodge-xl border border-surface-muted/50 overflow-hidden">
          {/* Gold header */}
          <div className="bg-brand-gold px-8 py-5 text-white flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Confirmation Number</p>
              <p className="text-2xl font-display font-bold tracking-wider">
                {reservation.confirmationNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white/80">Total Paid</p>
              <p className="text-2xl font-display font-bold">
                ${reservation.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 space-y-6">
            <div>
              <p className="text-sm text-brand-stone uppercase tracking-wider font-bold mb-1">Property</p>
              <p className="text-xl font-display font-bold text-brand-navy">{reservation.propertyName}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-brand-stone uppercase tracking-wider font-bold mb-1">Check-in</p>
                <p className="font-bold text-brand-navy">{formatDate(reservation.checkIn)}</p>
                <p className="text-sm text-brand-stone">After 3:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-brand-stone uppercase tracking-wider font-bold mb-1">Check-out</p>
                <p className="font-bold text-brand-navy">{formatDate(reservation.checkOut)}</p>
                <p className="text-sm text-brand-stone">Before 11:00 AM</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-brand-stone uppercase tracking-wider font-bold mb-1">Guest</p>
                <p className="font-bold text-brand-navy">{reservation.guestName}</p>
              </div>
              <div>
                <p className="text-sm text-brand-stone uppercase tracking-wider font-bold mb-1">Guests</p>
                <p className="font-bold text-brand-navy">{reservation.numberOfGuests}</p>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="border-t border-surface-muted p-8 bg-surface-secondary/30">
            <h3 className="font-bold text-brand-navy mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-gold" /> Getting Here
            </h3>
            <p className="text-sm text-brand-stone mb-2">
              <strong>21137 Brimstone Place, Sturgis, SD 57785</strong>
            </p>
            <p className="text-sm text-brand-stone">
              From I-90, take Exit 37 → Turn right onto Brimstone Place → Rush No More is on your right.
            </p>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <a href="tel:605-423-2545" className="flex items-center gap-2 text-brand-gold font-bold hover:underline">
                <Phone className="w-4 h-4" /> 605-423-2545
              </a>
              <a href="mailto:info@rushnomore.com" className="flex items-center gap-2 text-brand-gold font-bold hover:underline">
                <Mail className="w-4 h-4" /> info@rushnomore.com
              </a>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-surface-muted text-sm font-bold text-brand-navy hover:border-brand-gold transition-colors">
            <Printer className="w-4 h-4" /> Print
          </button>
          <Link href="/" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white text-sm font-bold hover:bg-brand-navy/90 transition-colors">
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
