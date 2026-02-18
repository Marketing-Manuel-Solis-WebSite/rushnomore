'use client';

import { motion } from 'framer-motion';
import { Star, ArrowRight, MapPin, Clock, ExternalLink, Users, Beer, Waves, ShowerHead, WashingMachine, Wifi, PawPrint, Bike, Fuel, Flame, Gamepad2, BookOpen, TreePine, Store, Utensils, Cable, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import type { Attraction, Review, Amenity, RVTier } from '@/data/site';
import { SITE } from '@/data/site';

/* ─── Amenity Icon Map (resolved inside client component) ─── */
const amenityIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Beer, Waves, ShowerHead, WashingMachine, Wifi, PawPrint, Bike, Fuel, Flame, Gamepad2, BookOpen, TreePine, Store, Utensils, Cable, ShieldCheck,
};

/* ─── Attraction Card ─── */
export function AttractionCard({
  attraction,
  onClick,
  index = 0,
}: {
  attraction: Attraction;
  onClick: () => void;
  index?: number;
}) {
  const categoryColors: Record<string, string> = {
    history: 'bg-amber-100 text-amber-700',
    nature: 'bg-emerald-100 text-emerald-700',
    routes: 'bg-sky-100 text-sky-700',
    events: 'bg-rose-100 text-rose-700',
  };

  return (
    <motion.div
      layoutId={`card-${attraction.id}`}
      className="group cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-hidden transition-all duration-500 group-hover:shadow-gold-lg group-hover:border-brand-gold/20">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${attraction.heroImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${categoryColors[attraction.category]}`}>
              {attraction.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <MapPin className="w-3 h-3 text-brand-gold" />
            <span className="text-xs font-bold text-brand-navy">{attraction.distance}</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-lg font-display leading-snug">{attraction.shortTitle}</h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-brand-navy/70 mb-4 line-clamp-2">{attraction.description}</p>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-brand-stone">
              <Clock className="w-3.5 h-3.5" /> {attraction.driveTime}
            </span>
            <span className="flex items-center gap-1 text-sm text-brand-gold font-semibold group-hover:gap-2 transition-all">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Review Card ─── */
export function ReviewCard({
  review,
  index = 0,
}: {
  review: Review;
  index?: number;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 transition-all duration-500 hover:shadow-lodge-lg hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'text-brand-gold fill-brand-gold' : 'text-surface-muted'}`}
            />
          ))}
        </div>
        {review.source && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-stone bg-surface-secondary px-2 py-1 rounded">
            {review.source}
          </span>
        )}
      </div>
      <p className="text-brand-navy/70 italic mb-4 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
      <p className="font-display text-brand-navy font-bold">{review.title}</p>
    </motion.div>
  );
}

/* ─── Amenity Card ─── */
export function AmenityCard({
  amenity,
  icon: IconProp,
  index = 0,
}: {
  amenity: Amenity;
  icon?: React.ComponentType<{ className?: string }>;
  index?: number;
}) {
  const Icon = IconProp || amenityIconMap[amenity.icon];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 text-center group transition-all duration-500 hover:shadow-gold hover:-translate-y-2 hover:border-brand-gold/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold/20 group-hover:scale-110 transition-all duration-300">
        {Icon ? <Icon className="w-7 h-7 text-brand-gold" /> : <span className="text-brand-gold text-2xl">&#9733;</span>}
      </div>
      <h4 className="font-bold text-base mb-2">{amenity.title}</h4>
      <p className="text-sm text-brand-stone">{amenity.desc}</p>
    </motion.div>
  );
}

/* ─── Accommodation Card (for home page) ─── */
export function AccommodationCard({
  href,
  icon: Icon,
  title,
  desc,
  price,
  img,
  index = 0,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  price: string;
  img: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={href} className="card-premium group block">
        <div className="aspect-[4/3] relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/10 transition-colors z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${img}')` }}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-brand-gold" />
            <h3 className="text-xl">{title}</h3>
          </div>
          <p className="text-brand-stone text-sm mb-4">{desc}</p>
          <div className="flex items-center justify-between">
            <span className="text-brand-gold font-display text-lg">{price}</span>
            <ArrowRight className="w-5 h-5 text-brand-stone group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── RV Tier Card ─── */
export function RVTierCard({
  tier,
  index = 0,
}: {
  tier: RVTier;
  index?: number;
}) {
  return (
    <motion.div
      className="card-premium relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {tier.badge && (
        <div className="absolute top-4 right-4 z-10 bg-brand-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-gold">
          {tier.badge}
        </div>
      )}
      <div className="aspect-[4/3] bg-surface-secondary bg-cover bg-center" style={{ backgroundImage: `url('${tier.img}')` }} />
      <div className="p-6">
        <h3 className="text-xl mb-4">{tier.name}</h3>
        <ul className="space-y-2 mb-6">
          {tier.features.map((f, j) => (
            <li key={j} className="flex items-start gap-2.5 text-sm text-brand-navy/80">
              <svg className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="pt-6 border-t border-surface-muted">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-display text-3xl text-brand-gold">{tier.price}</span>
              <span className="text-sm text-brand-stone block">{tier.note}</span>
            </div>
          </div>
          <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center">
            Book Now <ExternalLink className="w-4 h-4 ml-1.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}