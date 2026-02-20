// app/book/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Loader2, CreditCard, AlertCircle, ArrowLeft,
  Calendar, Users, MapPin, Clock, Shield, CheckCircle
} from 'lucide-react';

interface PropertyData {
  id: string;
  name: string;
  type: string;
  category: string;
  images: string[];
}

interface PriceData {
  propertyId: string;
  pricePerNight: number;
  nights: number;
  subtotal: number;
  extras: { name: string; total: number }[];
  extrasTotal: number;
  tax: number;
  total: number;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const propertyId = searchParams.get('propertyId') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '2');
  const cancelled = searchParams.get('cancelled') === 'true';

  const [property, setProperty] = useState<PropertyData | null>(null);
  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Guest form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const params = new URLSearchParams({
          type: 'rv', // Will be filtered by propertyId
          checkIn, checkOut, guests: String(guests),
        });
        const res = await fetch(`/api/availability?${params}`);
        const data = await res.json();

        if (data.available) {
          const prop = data.available.find((p: any) => p.id === propertyId);
          const prc = data.priceBreakdown.find((p: any) => p.propertyId === propertyId);
          if (prop) setProperty(prop);
          if (prc) setPrice(prc);
        }
      } catch {
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    }

    if (propertyId && checkIn && checkOut) loadData();
  }, [propertyId, checkIn, checkOut, guests]);

  const handleSubmit = async () => {
    // Validaciones
    if (!guestName.trim()) return setError('Please enter your full name');
    if (!guestEmail.trim() || !guestEmail.includes('@')) return setError('Please enter a valid email');
    if (!guestPhone.trim()) return setError('Please enter your phone number');

    setSubmitting(true);
    setError('');

    try {
      // 1. Crear reserva (con doble verificación de disponibilidad)
      const resCreate = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId, checkIn, checkOut,
          guestName: guestName.trim(),
          guestEmail: guestEmail.trim(),
          guestPhone: guestPhone.trim(),
          guestNotes: guestNotes.trim(),
          numberOfGuests: guests,
          source: 'web',
        }),
      });
      const resData = await resCreate.json();

      if (!resCreate.ok) {
        setError(resData.error || 'Failed to create reservation');
        setSubmitting(false);
        return;
      }

      // 2. Crear sesión de pago en Stripe
      const payRes = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId: resData.reservationId }),
      });
      const payData = await payRes.json();

      if (payData.checkoutUrl) {
        // 3. Redirigir a Stripe Checkout
        window.location.href = payData.checkoutUrl;
      } else {
        setError('Failed to initialize payment. Please try again.');
        setSubmitting(false);
      }
    } catch {
      setError('Connection error. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
      </div>
    );
  }

  const nights = price?.nights || 0;

  return (
    <section className="py-12 md:py-16 bg-surface-primary min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-brand-stone hover:text-brand-navy mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to results
        </button>

        {cancelled && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              Payment was cancelled. You can try again below. Your spot is still reserved for 30 minutes.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Guest Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-8">
              <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">
                Guest Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-bold text-brand-navy mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-brand-navy mb-2 block">Email *</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={e => setGuestEmail(e.target.value)}
                      placeholder="john@email.com"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-brand-navy mb-2 block">Phone *</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={e => setGuestPhone(e.target.value)}
                      placeholder="(605) 555-1234"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-brand-navy mb-2 block">Special Requests</label>
                  <textarea
                    value={guestNotes}
                    onChange={e => setGuestNotes(e.target.value)}
                    placeholder="Late arrival, traveling with pets, special needs..."
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Security badges */}
            <div className="flex items-center gap-6 px-2">
              <div className="flex items-center gap-2 text-sm text-brand-stone">
                <Shield className="w-5 h-5 text-green-500" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-stone">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <span>Powered by Stripe</span>
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 sticky top-8">
              <h3 className="font-bold text-brand-navy mb-4">Booking Summary</h3>

              {property && (
                <>
                  {/* Property image */}
                  {property.images?.[0] && (
                    <div
                      className="w-full aspect-video rounded-xl bg-cover bg-center mb-4"
                      style={{ backgroundImage: `url('${property.images[0]}')` }}
                    />
                  )}

                  <h4 className="font-display font-bold text-lg mb-3">{property.name}</h4>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-brand-stone">
                      <Calendar className="w-4 h-4" />
                      <span>{checkIn} → {checkOut}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-stone">
                      <Clock className="w-4 h-4" />
                      <span>{nights} night{nights > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-stone">
                      <Users className="w-4 h-4" />
                      <span>{guests} guest{guests > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </>
              )}

              {price && (
                <div className="border-t border-surface-muted pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-brand-stone">
                      ${price.pricePerNight}/night × {price.nights}
                    </span>
                    <span className="font-medium">${price.subtotal.toFixed(2)}</span>
                  </div>

                  {price.extras.map((extra, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-brand-stone">{extra.name}</span>
                      <span className="font-medium">${extra.total.toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <span className="text-brand-stone">Tax (6% SD)</span>
                    <span className="font-medium">${price.tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-brand-gold pt-3 flex justify-between items-center">
                    <span className="font-bold text-brand-navy text-lg">Total</span>
                    <span className="font-display text-2xl font-bold text-brand-gold">
                      ${price.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-6 py-4 bg-brand-gold text-white rounded-xl font-bold text-sm hover:bg-brand-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : (
                  <><CreditCard className="w-5 h-5" /> Confirm & Pay ${price?.total.toFixed(2)}</>
                )}
              </button>

              <div className="mt-3 flex items-start gap-2 text-xs text-brand-stone">
                <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>Your spot is reserved for 30 minutes while you complete payment.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
