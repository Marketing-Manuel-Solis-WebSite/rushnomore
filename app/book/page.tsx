// app/book/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import {
  Truck, Home, Tent, Calendar, Users, Search,
  ArrowRight, Loader2, ExternalLink
} from 'lucide-react';

type PropertyType = 'rv' | 'cabin' | 'tent';

const TYPES = [
  { id: 'rv' as PropertyType, label: 'RV Sites', icon: Truck, price: 'Starts at $41.22/night', desc: 'Full hookups, 30/50 AMP' },
  { id: 'cabin' as PropertyType, label: 'Cabins', icon: Home, price: 'Starts at $51.76/night', desc: '16 Presidential Cabins' },
  { id: 'tent' as PropertyType, label: 'Tent Camping', icon: Tent, price: 'From $35/night', desc: 'Shaded pine forest' },
];

export default function BookPage() {
  const router = useRouter();
  const [type, setType] = useState<PropertyType>('rv');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = async () => {
    if (!checkIn || !checkOut) return;
    setLoading(true);

    const params = new URLSearchParams({
      type, checkIn, checkOut, guests: String(guests),
    });

    router.push(`/book/results?${params.toString()}`);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-6">
            ★ Book Direct & Save ★
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">
            Reserve Your <span className="text-brand-gold italic">Stay</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Check real-time availability and book instantly. All 16 amenities included.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="relative -mt-10 z-20 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-lodge-xl border border-surface-muted/50 p-8 md:p-10">

            {/* Step 1: Type */}
            <div className="mb-8">
              <label className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 block">
                1. Choose Accommodation Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TYPES.map(t => {
                  const Icon = t.icon;
                  const isActive = type === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-brand-gold bg-brand-gold/10 shadow-gold'
                          : 'border-surface-muted hover:border-brand-gold/30'
                      }`}
                    >
                      <Icon className={`w-8 h-8 ${isActive ? 'text-brand-gold' : 'text-brand-stone'}`} />
                      <span className="font-bold text-sm text-brand-navy">{t.label}</span>
                      <span className="text-xs text-brand-stone">{t.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dates */}
            <div className="mb-8">
              <label className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 block">
                2. Select Your Dates
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-brand-stone mb-1 block">Check-in</label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={e => {
                      setCheckIn(e.target.value);
                      if (checkOut && e.target.value >= checkOut) setCheckOut('');
                    }}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs text-brand-stone mb-1 block">Check-out</label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Guests */}
            <div className="mb-8">
              <label className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 block">
                3. Number of Guests
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 rounded-full border-2 border-surface-muted flex items-center justify-center hover:border-brand-gold transition-colors text-lg font-bold"
                >−</button>
                <span className="font-display text-3xl text-brand-gold font-bold w-12 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="w-10 h-10 rounded-full border-2 border-surface-muted flex items-center justify-center hover:border-brand-gold transition-colors text-lg font-bold"
                >+</button>
                <span className="text-sm text-brand-stone ml-2">guests</span>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!checkIn || !checkOut || loading}
              className="btn-gold w-full text-lg py-4 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Searching...</>
              ) : (
                <><Search className="w-5 h-5 mr-2" /> Check Availability</>
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
