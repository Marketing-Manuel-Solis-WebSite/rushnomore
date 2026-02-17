'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ATTRACTIONS, SITE, type Attraction } from '@/data/site';
import { Breadcrumbs, BookingCTA, SectionHeader } from '@/components/ui';
import { AttractionCard } from '@/components/cards';
import { AttractionModal } from '@/components/cards/AttractionModal';
import { FadeIn } from '@/components/motion';
import { ExternalLink, Search, Compass, MapPin, TreePine, Route, Calendar } from 'lucide-react';

const CATEGORIES = [
  { key: 'all', label: 'All', icon: Compass },
  { key: 'history', label: 'History', icon: MapPin },
  { key: 'nature', label: 'Nature', icon: TreePine },
  { key: 'routes', label: 'Routes', icon: Route },
  { key: 'events', label: 'Events', icon: Calendar },
] as const;

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttractions = useMemo(() => {
    let result = ATTRACTIONS;
    if (activeCategory !== 'all') {
      result = result.filter(a => a.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.shortTitle.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Explore' }]} />

      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/DSC05580-s.webp')" }} />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <motion.span className="badge-gold mb-6 inline-block !bg-brand-gold/20 !text-brand-gold-light" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Gateway to Adventure
          </motion.span>
          <motion.h1 className="mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Explore the Black Hills
          </motion.h1>
          <motion.p className="text-lg text-white/70 max-w-3xl mx-auto mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            From Mount Rushmore to Deadwood, from Custer State Park to the Sturgis Rally — discover everything the Black Hills has to offer with Rush No More as your home base.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">
              Book Your Stay <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-surface-muted shadow-lodge">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-1 bg-surface-secondary rounded-xl p-1 flex-shrink-0 overflow-x-auto">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive ? 'text-white' : 'text-brand-navy/60 hover:text-brand-navy'}`}
                  >
                    {isActive && (
                      <motion.div layoutId="activeTab" className="absolute inset-0 bg-brand-navy rounded-lg" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className="w-4 h-4" />
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone" />
              <input
                type="text"
                placeholder="Search attractions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all"
              />
            </div>
            <span className="text-sm text-brand-stone flex-shrink-0">
              {filteredAttractions.length} result{filteredAttractions.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredAttractions.map((attraction, i) => (
                <AttractionCard key={attraction.id} attraction={attraction} onClick={() => setSelectedAttraction(attraction)} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
          {filteredAttractions.length === 0 && (
            <FadeIn className="text-center py-16">
              <p className="text-2xl font-display text-brand-navy/40 mb-2">No attractions found</p>
              <p className="text-brand-stone">Try a different category or search term.</p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Stay CTA */}
      <section className="section-pad bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeader badge="Stay With Us" title="Your Home Base for Adventure" subtitle="All attractions are an easy drive from Rush No More." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'RV Sites', price: 'From $53.99/night', href: '/stay/rv-sites' },
              { label: 'Cabins', price: 'From $95/night', href: '/stay/cabins' },
              { label: 'Tent Camping', price: 'From $35/night', href: '/stay/tent-camping' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <a href={s.href} className="glass rounded-xl p-6 block hover:bg-white/10 transition-all group">
                  <h3 className="text-xl font-display mb-1">{s.label}</h3>
                  <span className="text-brand-gold font-display text-lg">{s.price}</span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
      <AttractionModal attraction={selectedAttraction} onClose={() => setSelectedAttraction(null)} />
    </>
  );
}
