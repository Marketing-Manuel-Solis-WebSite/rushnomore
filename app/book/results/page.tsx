// app/book/results/page.tsx
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Loader2, CheckCircle, Users, ArrowRight, AlertCircle,
  Calendar, MapPin
} from 'lucide-react';

interface AvailableProperty {
  id: string;
  name: string;
  type: string;
  category: string;
  maxGuests: number;
  amenities: string[];
  images: string[];
  hasPrivateHotTub?: boolean;
  hasPrivatePatio?: boolean;
  hasBBQ?: boolean;
  publicNotes?: string;
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

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<AvailableProperty[]>([]);
  const [prices, setPrices] = useState<PriceBreakdown[]>([]);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [totalOfType, setTotalOfType] = useState(0);
  const [error, setError] = useState('');

  const type = searchParams.get('type') || 'rv';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '2');

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const params = new URLSearchParams({ type, checkIn, checkOut, guests: String(guests) });
        const res = await fetch(`/api/availability?${params}`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setProperties(data.available);
          setPrices(data.priceBreakdown);
          setTotalAvailable(data.totalAvailable);
          setTotalOfType(data.totalOfType);
        }
      } catch {
        setError('Failed to check availability. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    if (type && checkIn && checkOut) {
      fetchAvailability();
    }
  }, [type, checkIn, checkOut, guests]);

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleSelect = (propertyId: string) => {
    const params = new URLSearchParams({
      propertyId, checkIn, checkOut, guests: String(guests),
    });
    router.push(`/book/checkout?${params}`);
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-surface-primary min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search summary */}
          <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 mb-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span className="font-bold">{checkIn}</span>
              <ArrowRight className="w-3 h-3 text-brand-stone" />
              <span className="font-bold">{checkOut}</span>
              <span className="text-brand-stone">({nights} nights)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-brand-gold" />
              <span className="font-bold">{guests} guests</span>
            </div>
            <button
              onClick={() => router.push('/book')}
              className="ml-auto text-sm font-bold text-brand-gold hover:underline"
            >
              Modify Search
            </button>
          </div>

          {loading && (
            <div className="text-center py-20">
              <Loader2 className="w-10 h-10 text-brand-gold animate-spin mx-auto mb-4" />
              <p className="text-brand-stone">Checking availability...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-bold">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl mb-2">
                  <span className="text-brand-gold font-bold">{totalAvailable}</span> of {totalOfType} available
                </h2>
                <p className="text-brand-stone">Select a property to continue booking.</p>
              </div>

              {properties.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lodge">
                  <p className="text-xl font-bold text-brand-navy mb-2">No availability for these dates</p>
                  <p className="text-brand-stone mb-6">Try different dates or another accommodation type.</p>
                  <button onClick={() => router.push('/book')} className="btn-gold">
                    Search Again
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {properties.map((prop, i) => {
                    const price = prices.find(p => p.propertyId === prop.id);
                    return (
                      <motion.div
                        key={prop.id}
                        className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-hidden hover:shadow-gold-lg hover:border-brand-gold/20 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                          {/* Image */}
                          <div className="md:col-span-1 aspect-[16/10] md:aspect-auto md:h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${prop.images?.[0] || '/images/DSC05580-s.png'}')` }} />

                          {/* Details */}
                          <div className="md:col-span-2 p-6">
                            <h3 className="text-xl font-display font-bold mb-2">{prop.name}</h3>
                            <div className="flex items-center gap-3 mb-3 text-sm text-brand-stone">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" /> Up to {prop.maxGuests}
                              </span>
                              <span className="capitalize bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full text-xs font-bold">
                                {prop.category.replace(/-/g, ' ')}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {prop.hasPrivateHotTub && (
                                <span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-1 rounded-full font-bold">
                                  🛁 Private Hot Tub
                                </span>
                              )}
                              {prop.hasPrivatePatio && (
                                <span className="text-xs bg-surface-secondary text-brand-navy/60 px-2 py-1 rounded-full font-medium">
                                  Private Patio
                                </span>
                              )}
                              {prop.hasBBQ && (
                                <span className="text-xs bg-surface-secondary text-brand-navy/60 px-2 py-1 rounded-full font-medium">
                                  Gas BBQ
                                </span>
                              )}
                            </div>
                            {prop.publicNotes && (
                              <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                                <p className="text-xs text-blue-800 leading-relaxed">
                                  <MapPin className="w-3 h-3 inline mr-1 text-blue-500" />
                                  {prop.publicNotes}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Price & CTA */}
                          <div className="md:col-span-1 p-6 bg-surface-secondary/50 flex flex-col justify-center items-center text-center border-l border-surface-muted/30">
                            {price && (
                              <>
                                <span className="text-sm text-brand-stone">${price.pricePerNight}/night</span>
                                <span className="font-display text-3xl text-brand-gold font-bold">
                                  ${price.total.toFixed(0)}
                                </span>
                                <span className="text-xs text-brand-stone mb-4">total incl. tax</span>
                                <button
                                  onClick={() => handleSelect(prop.id)}
                                  className="btn-gold text-sm w-full"
                                >
                                  Select <ArrowRight className="w-4 h-4 ml-1" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
