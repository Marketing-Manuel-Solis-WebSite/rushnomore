'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SITE } from '@/data/site';
import { Phone, CalendarDays } from 'lucide-react';

export function BookingBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-md border-t border-white/10 py-3 px-4"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden sm:block">
              <p className="text-white font-display text-lg">Your Black Hills adventure starts here</p>
              <p className="text-white/50 text-xs uppercase tracking-wider">From $35/night &middot; RV &middot; Cabins &middot; Tent</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link href={SITE.booking} className="btn-gold flex-1 sm:flex-initial text-center text-sm">
                Check Availability <CalendarDays className="w-3.5 h-3.5 ml-1.5 inline" />
              </Link>
              <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 px-4 py-3 text-white/80 hover:text-white border border-white/20 rounded-lg transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">{SITE.phone}</span>
                <span className="md:hidden">Call</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
