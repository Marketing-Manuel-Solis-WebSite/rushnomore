'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '@/data/site';
import {
  Search, CheckCircle, Calendar, Users, Clock, MapPin,
  Phone, Mail, Printer, Home, AlertCircle, Shield,
  CreditCard, ArrowLeft, Navigation, ExternalLink, Loader2,
  Timer, Sparkles, Star, Tent, Truck,
} from 'lucide-react';

interface GuestReservation {
  confirmationNumber: string;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'expired';
  paymentStatus: string;
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
  reservationId?: string;
  expiresAt?: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  confirmed:     { label: 'Confirmed',      color: 'text-green-700',  bg: 'bg-green-50 border-green-200' },
  pending:       { label: 'Pending Payment', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  cancelled:     { label: 'Cancelled',      color: 'text-red-700',    bg: 'bg-red-50 border-red-200' },
  'checked-in':  { label: 'Checked In',     color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200' },
  'checked-out': { label: 'Checked Out',    color: 'text-gray-600',   bg: 'bg-gray-50 border-gray-200' },
  expired:       { label: 'Expired',        color: 'text-gray-600',   bg: 'bg-gray-50 border-gray-200' },
};

const PROPERTY_IMAGES: Record<string, string> = {
  cabin: '/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg',
  rv: '/images/rv-camper-van.png',
  tent: '/images/Wooded-Tent-Area.png',
};

const CANCELLATION_LABELS: Record<string, string> = {
  'standard-rv-tent': '14+ days: full refund ($25 fee) · 7-14 days: 50% · <7 days: no refund',
  'luxury-cabin': '30+ days: full refund ($25 fee) · 14-30: 75% · 7-14: 50% · <7: no refund',
  'non-refundable': 'Non-refundable (Rally / Holiday period)',
};

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
}
function formatShort(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function daysUntil(s: string) {
  return Math.ceil((new Date(s + 'T12:00:00').getTime() - Date.now()) / 86400000);
}

function useCountdown(expiresAt: string | undefined) {
  const [timeLeft, setTimeLeft] = useState('');
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) { setExpired(true); setTimeLeft('0:00'); return; }
      setTimeLeft(`${Math.floor(diff / 60000)}:${String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);
  return { timeLeft, expired };
}

export default function MyReservationPage() {
  const [cn, setCn] = useState('');
  const [email, setEmail] = useState('');
  const [res, setRes] = useState<GuestReservation | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault(); setError(''); setRes(null); setLoading(true);
    try {
      const r = await fetch('/api/reservations/lookup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ confirmationNumber: cn, email }) });
      const d = await r.json();
      if (!r.ok) { setError(d.error || 'Not found.'); return; }
      setRes(d.reservation);
    } catch { setError('Connection error.'); } finally { setLoading(false); }
  }

  const { timeLeft, expired: holdExpired } = useCountdown(res?.status === 'pending' ? res.expiresAt : undefined);

  const handlePay = useCallback(async () => {
    if (!res?.reservationId) return; setPaying(true);
    try {
      const r = await fetch('/api/payments/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reservationId: res.reservationId }) });
      const d = await r.json();
      if (d.checkoutUrl) window.location.href = d.checkoutUrl;
      else { setError('Payment unavailable. Try booking again.'); setPaying(false); }
    } catch { setError('Connection error.'); setPaying(false); }
  }, [res?.reservationId]);

  const img = res ? (PROPERTY_IMAGES[res.propertyType] || '/images/DSC05580-s.png') : '';
  const dti = res ? daysUntil(res.checkIn) : 0;
  const sc = res ? STATUS_CONFIG[res.status] : null;

  return (
    <div className="min-h-screen bg-surface-primary">
      <AnimatePresence mode="wait">
        {!res ? (
          /* ═══════════ LOOKUP FORM ═══════════ */
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Warm hero — not navy */}
            <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
              <div className="absolute inset-0">
                <Image src="/images/DSC05580-s.png" alt="Rush No More RV Resort aerial view" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-surface-primary" />
              </div>

              <div className="relative z-10 max-w-md mx-auto px-4 pt-8">
                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">My Reservation</h1>
                  <p className="text-white/60 text-sm">Look up your booking details</p>
                </div>

                <form onSubmit={handleLookup} className="bg-white rounded-2xl shadow-lodge-xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">Confirmation Number</label>
                    <input type="text" value={cn} onChange={e => setCn(e.target.value.toUpperCase())} placeholder="RNM-2026-XXXXXX" required
                      className="w-full border-2 border-surface-muted rounded-xl px-4 py-3 font-mono text-lg tracking-wider uppercase focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
                      className="w-full border-2 border-surface-muted rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all" />
                  </div>
                  {error && (
                    <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}
                  <button type="submit" disabled={loading} className="w-full btn-gold py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Searching...</> : <><Search className="w-5 h-5" /> Find Reservation</>}
                  </button>
                </form>

                <p className="text-center text-white/40 text-xs mt-4">
                  Need help? <a href={`tel:${SITE.phoneTel}`} className="text-brand-gold hover:underline">{SITE.phone}</a>
                </p>
              </div>
            </section>
          </motion.div>
        ) : (
          /* ═══════════ RESERVATION FOUND ═══════════ */
          <motion.div key="found" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Property hero image */}
            <section className="relative h-56 md:h-72 overflow-hidden">
              <Image src={img} alt={res.propertyName} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-surface-primary" />
              <div className="absolute top-4 left-4 z-10">
                <button onClick={() => { setRes(null); setError(''); setCn(''); setEmail(''); }} className="bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1.5 hover:bg-white transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>
              <div className="absolute bottom-4 left-4 z-10">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${sc?.bg} ${sc?.color}`}>
                  {res.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                  {res.status === 'pending' && <Clock className="w-3 h-3" />}
                  {sc?.label}
                </span>
              </div>
            </section>

            {/* Content */}
            <section className="max-w-2xl mx-auto px-4 -mt-6 pb-12 relative z-10 space-y-5">

              {/* Pending payment */}
              {res.status === 'pending' && !holdExpired && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                  <Timer className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-amber-800 mb-1">Complete payment in <span className="font-mono text-lg">{timeLeft}</span></p>
                    <button onClick={handlePay} disabled={paying} className="btn-gold py-2.5 px-5 text-sm rounded-xl flex items-center gap-2 mt-2 disabled:opacity-50">
                      {paying ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />} Pay ${res.totalAmount.toFixed(2)}
                    </button>
                  </div>
                </motion.div>
              )}
              {res.status === 'pending' && holdExpired && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-800 mb-1">Hold Expired</p>
                    <p className="text-sm text-red-700 mb-2">Dates released. Please book again.</p>
                    <Link href="/booking" className="btn-gold py-2 px-4 text-sm rounded-xl inline-flex items-center gap-2">Book Again</Link>
                  </div>
                </div>
              )}

              {/* Main card */}
              <motion.div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                {/* Header bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-surface-muted/50 bg-surface-secondary/30">
                  <div>
                    <p className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Confirmation</p>
                    <p className="font-mono font-bold text-brand-gold text-lg tracking-wider">{res.confirmationNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Total</p>
                    <p className="font-display font-bold text-brand-navy text-xl">${res.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Property name */}
                  <div>
                    <p className="text-xl font-display font-bold text-brand-navy">{res.propertyName}</p>
                    <p className="text-sm text-brand-stone capitalize">{res.propertyType} · {res.guestName}</p>
                  </div>

                  {/* Dates grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface-primary rounded-xl p-4 border border-surface-muted/50">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        <span className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Check-in</span>
                      </div>
                      <p className="font-bold text-brand-navy text-sm">{formatDate(res.checkIn)}</p>
                      <p className="text-xs text-brand-stone">After 3:00 PM</p>
                    </div>
                    <div className="bg-surface-primary rounded-xl p-4 border border-surface-muted/50">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        <span className="text-[10px] text-brand-stone uppercase tracking-wider font-bold">Check-out</span>
                      </div>
                      <p className="font-bold text-brand-navy text-sm">{formatDate(res.checkOut)}</p>
                      <p className="text-xs text-brand-stone">Before 11:00 AM</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-3">
                    {[
                      { icon: Clock, val: res.nights, label: `Night${res.nights !== 1 ? 's' : ''}` },
                      { icon: Users, val: res.numberOfGuests, label: `Guest${res.numberOfGuests !== 1 ? 's' : ''}` },
                    ].map((s, i) => (
                      <div key={i} className="flex-1 text-center p-3 bg-surface-primary rounded-xl border border-surface-muted/50">
                        <s.icon className="w-4 h-4 text-brand-gold mx-auto mb-1" />
                        <p className="font-display text-lg font-bold text-brand-navy">{s.val}</p>
                        <p className="text-[10px] text-brand-stone uppercase font-bold">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div className="border-t border-surface-muted pt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between text-brand-stone">
                      <span>${res.pricePerNight.toFixed(2)} x {res.nights} nights</span>
                      <span>${res.subtotal.toFixed(2)}</span>
                    </div>
                    {res.tax > 0 && <div className="flex justify-between text-brand-stone"><span>Tax (6%)</span><span>${res.tax.toFixed(2)}</span></div>}
                    <div className="flex justify-between font-bold text-brand-navy pt-2 border-t border-surface-muted">
                      <span>Total</span>
                      <span className="text-brand-gold">${res.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Policy */}
                  <div className="flex items-start gap-2.5 bg-surface-primary rounded-xl p-3.5 border border-surface-muted/50">
                    <Shield className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-brand-navy mb-0.5">Cancellation</p>
                      <p className="text-xs text-brand-stone">{CANCELLATION_LABELS[res.cancellationPolicy] || res.cancellationPolicy}</p>
                    </div>
                  </div>

                  {res.status === 'confirmed' && dti > 7 && (
                    <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-3.5">
                      <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700">Need changes? Call <a href={`tel:${SITE.phoneTel}`} className="font-bold underline">{SITE.phone}</a> ({dti} days until check-in)</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Map + Directions */}
              <motion.div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="aspect-[2.5/1] relative">
                  <iframe src={SITE.mapsEmbed} className="absolute inset-0 w-full h-full border-0" loading="lazy" title="Location" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-brand-navy mb-1">{SITE.address}</p>
                  <p className="text-xs text-brand-stone mb-3">I-90 Exit 37 &rarr; Right on Brimstone Place &rarr; 2 min from interstate</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-1.5 text-brand-gold font-bold hover:underline"><Phone className="w-3.5 h-3.5" />{SITE.phone}</a>
                    <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-brand-gold font-bold hover:underline"><MapPin className="w-3.5 h-3.5" />Directions</a>
                  </div>
                </div>
              </motion.div>

              {/* What to expect */}
              {res.status === 'confirmed' && (
                <motion.div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h3 className="text-sm font-bold text-brand-navy mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-gold" />What to Expect</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { icon: Star, text: 'Free resort amenities: Pool, Hot Tub, Beer Garden' },
                      { icon: MapPin, text: '5 mi from Sturgis · 55 mi from Mt. Rushmore' },
                      { icon: Shield, text: 'Friendly on-site staff · After-hours on-call' },
                      { icon: Phone, text: 'Office: 8 AM - 8 PM Mountain Time' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-brand-navy/70">
                        <item.icon className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-3 pt-2 pb-4">
                <button onClick={() => window.print()} className="btn-outline px-4 py-2.5 text-sm"><Printer className="w-4 h-4 mr-1.5" />Print</button>
                <button onClick={() => { setRes(null); setError(''); setCn(''); setEmail(''); }} className="btn-outline px-4 py-2.5 text-sm"><Search className="w-4 h-4 mr-1.5" />Look Up Another</button>
                <Link href="/" className="btn-gold px-4 py-2.5 text-sm"><Home className="w-4 h-4 mr-1.5" />Home</Link>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
