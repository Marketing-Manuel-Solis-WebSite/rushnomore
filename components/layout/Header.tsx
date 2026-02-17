'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV, SITE } from '@/data/site';
import { WeatherWidget } from '@/components/weather';
import { Phone, Menu, X, ChevronDown, MapPin, CalendarDays } from 'lucide-react';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Animación para el menú móvil
  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3, staggerChildren: 0.1 } }
  };

  return (
    <>
      {/* Top Bar - High Contrast & Visibility */}
      <div className="bg-stone-900 text-white text-xs md:text-sm py-2 hidden md:block border-b border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 font-bold tracking-wide">
            <span className="flex items-center gap-2 transition-colors cursor-default">
              <MapPin className="w-4 h-4 text-yellow-500" />
              {SITE.address}
            </span>
            <a 
              href={`tel:${SITE.phoneTel}`} 
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-yellow-500" />
              {SITE.phone}
            </a>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <div className="bg-white/10 px-3 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
               <WeatherWidget />
            </div>
            <span className="text-yellow-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Open {SITE.hours}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header - Slimmer & Cleaner */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 border-b border-gray-100
          ${scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-1' 
            : 'bg-white py-2 shadow-sm'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          
          {/* Logo Section - Más a la izquierda */}
          <Link href="/" className="relative z-10 flex-shrink-0 flex items-center -ml-2" aria-label="Rush No More Home">
            <motion.div
              layout
              className="relative"
            >
              <img 
                src="/images/RushNoMore-logo.png" 
                alt="Rush No More RV Resort & Campground" 
                className={`object-contain transition-all duration-300 ease-in-out
                  ${scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'}
                `}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centrado */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
            {NAV.map((item) => (
              <div 
                key={item.href} 
                className="relative group"
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Link 
                  href={item.href} 
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors
                    text-brand-navy hover:text-brand-gold
                  `}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${hoveredNav === item.label ? 'rotate-180 text-brand-gold' : 'text-gray-400'}`} />
                  )}
                </Link>
                
                {/* Animated Underline - Thinner */}
                <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && hoveredNav === item.label && (
                    <motion.div 
                      className="absolute top-full left-0 pt-2 w-56"
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                        <div className="h-0.5 w-full bg-brand-gold" />
                        <div className="py-1">
                          {item.children.map((c) => (
                            <Link 
                              key={c.href} 
                              href={c.href} 
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:text-brand-navy hover:bg-gray-50 transition-colors font-medium border-l-2 border-transparent hover:border-brand-gold"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA & Mobile Toggle - A la derecha */}
          <div className="flex items-center gap-3">
            <motion.a 
              href={SITE.booking} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:flex items-center gap-2 bg-brand-gold hover:bg-yellow-500 text-white text-xs md:text-sm font-bold py-2.5 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </motion.a>

            <button 
              onClick={() => setOpen(!open)} 
              className="lg:hidden p-2 rounded-md text-brand-navy hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div 
              className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-xl overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="flex flex-col p-4 space-y-1 h-[calc(100vh-64px)] overflow-y-auto bg-gray-50/50">
                {NAV.map((item, idx) => (
                  <motion.div 
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      href={item.href} 
                      onClick={() => setOpen(false)} 
                      className="block px-4 py-3 text-base font-bold text-brand-navy bg-white rounded-lg shadow-sm mb-2"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-4 pr-2 space-y-1 mb-3 grid grid-cols-1 gap-1">
                        {item.children.map((c) => (
                          <Link 
                            key={c.href} 
                            href={c.href} 
                            onClick={() => setOpen(false)} 
                            className="block px-4 py-2 text-sm font-medium text-gray-600 bg-white/50 rounded-md hover:bg-white hover:text-brand-gold transition-colors"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                
                <div className="pt-4 mt-2">
                  <a 
                    href={SITE.booking} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex w-full items-center justify-center gap-2 bg-brand-gold text-white font-bold py-3 rounded-lg shadow-md"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Book Your Stay
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}