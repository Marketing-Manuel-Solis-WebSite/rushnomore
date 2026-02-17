'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, ExternalLink, Lightbulb, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Attraction } from '@/data/site';
import { SITE } from '@/data/site';

interface Props {
  attraction: Attraction | null;
  onClose: () => void;
}

export function AttractionModal({ attraction, onClose }: Props) {
  if (!attraction) return null;

  return (
    <AnimatePresence>
      {attraction && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-8 lg:inset-y-12 lg:inset-x-[10%] z-50 bg-white rounded-2xl overflow-hidden shadow-lodge-xl flex flex-col"
            layoutId={`card-${attraction.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header image */}
            <div className="relative h-48 md:h-64 flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${attraction.heroImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/30 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="badge-gold !bg-brand-gold/20 !text-brand-gold-light mb-3 inline-block">
                  {attraction.category.charAt(0).toUpperCase() + attraction.category.slice(1)}
                </span>
                <h2 className="text-white text-2xl md:text-3xl">{attraction.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-white/70 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{attraction.distance}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{attraction.driveTime}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-brand-navy/80 mb-8 leading-relaxed">
                  {attraction.longDescription}
                </p>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-brand-gold" /> Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {attraction.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                        <div className="w-8 h-8 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">{i + 1}</span>
                        </div>
                        <span className="text-sm text-brand-navy/80">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tips */}
                <div className="mb-8">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-brand-gold" /> Pro Tips
                  </h3>
                  <div className="bg-brand-gold/5 border border-brand-gold/15 rounded-xl p-5 space-y-3">
                    {attraction.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-brand-navy/70">
                        <span className="text-brand-gold mt-0.5">&#8226;</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={SITE.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold flex-1 text-center"
                  >
                    Book Your Stay <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                  {attraction.website && (
                    <a
                      href={attraction.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 text-center text-sm"
                    >
                      Official Website <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>

                {/* Quick links to stay options */}
                <div className="mt-8 pt-6 border-t border-surface-muted">
                  <p className="text-sm font-bold text-brand-stone uppercase tracking-wider mb-4">Stay With Us</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'RV Sites', price: 'From $53.99', href: '/stay/rv-sites' },
                      { label: 'Cabins', price: 'From $95', href: '/stay/cabins' },
                      { label: 'Tent', price: 'From $35', href: '/stay/tent-camping' },
                    ].map((s, i) => (
                      <Link
                        key={i}
                        href={s.href}
                        className="p-3 bg-surface-secondary rounded-lg hover:bg-brand-gold/10 transition-colors group text-center"
                      >
                        <span className="text-xs font-bold block">{s.label}</span>
                        <span className="text-brand-gold font-display text-sm">{s.price}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
