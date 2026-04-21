'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { SITE } from '@/data/site';
import { MapPin, Mountain, TreePine, Phone } from 'lucide-react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Defer video load until after first paint + respect reduced motion / save-data.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Respect user preferences for reduced motion + data saver
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    type NavConnection = { saveData?: boolean };
    const saveData = (navigator as Navigator & { connection?: NavConnection }).connection?.saveData;
    if (prefersReducedMotion || saveData) return;

    // Defer until the browser is idle so we don't block LCP
    const start = () => setShowVideo(true);
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (typeof ric === 'function') {
      ric(start);
    } else {
      setTimeout(start, 600);
    }
  }, []);

  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      // If autoplay fails, the poster shows as fallback
    });
  }, [showVideo]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-brand-navy">
      {/* LCP element: optimized image served as AVIF/WebP via next/image, with
          priority + fetchPriority=high so the browser fetches it before
          anything else. */}
      <Image
        src="/images/DSC05580-s.png"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="object-cover"
        aria-hidden="true"
      />
      {/* Video background — lazy-loaded after first paint */}
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/rushnomore-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/DSC05580-s.png"
          aria-hidden="true"
        />
      )}

      {/* Overlay negro más fuerte para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-8 text-center text-white">
        <span className="badge-gold mb-8 inline-block !bg-brand-gold/30 !text-brand-gold-light animate-fade-in-up">
          Top-Rated RV Resort in the Black Hills
        </span>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-6 leading-[1.1] animate-fade-in-up delay-100">
          RV Park & Camping Near{' '}
          <span className="text-brand-gold">Mount Rushmore</span>{' '}
          in the Black Hills
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
          200+ RV sites, 16 presidential cabins & shaded tent camping in Sturgis, SD — just 55 miles from Mount Rushmore. Heated pool, hot tubs, beer garden & 16 free amenities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">
            Check Availability
          </a>
          <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium">
            <Phone className="w-5 h-5" />{SITE.phone}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/85 animate-fade-in-up delay-400 font-medium">
          <span className="flex items-center gap-2"><Mountain className="w-4 h-4 text-brand-gold" /> 55 mi to Mt. Rushmore</span>
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-gold" /> 5 mi to Sturgis</span>
          <span className="flex items-center gap-2"><TreePine className="w-4 h-4 text-brand-gold" /> Adjacent to National Forest</span>
        </div>
      </div>
    </section>
  );
}