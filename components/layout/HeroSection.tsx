'use client';

import Image from 'next/image';
import { SITE } from '@/data/site';
import { MapPin, Mountain, TreePine, Phone } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-brand-navy">
      {/* LCP element: aerial Mount Rushmore shot. The previous hero video
          showed an RV entering under an archway that resembled the
          neighbor's driveway — risk of guests turning into the wrong
          driveway, so we fall back to the static image. */}
      <Image
        src="/images/Aereal-2_1400.png"
        alt="Aerial view of Rush No More RV Resort and campground in the Black Hills, Sturgis SD"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="object-cover"
      />

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
          200+ RV sites, 20 presidential cabins & shaded tent camping in Sturgis, SD — just 55 miles from Mount Rushmore. Heated pool, hot tubs, beer garden & free resort amenities.
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