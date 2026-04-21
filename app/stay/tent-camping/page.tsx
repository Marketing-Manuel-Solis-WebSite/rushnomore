'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema, speakableSchema } from '@/lib/seo';
import {
  ExternalLink, ArrowRight, Tent, CheckCircle,
  TreePine, Zap, Waves, ShowerHead, Cable, ShieldCheck,
  MapPin, Phone, Beer, Wifi, Star,
} from 'lucide-react';

const TENT_FEATURES = [
  { icon: TreePine, title: 'Shaded Ponderosa Pine Forest', desc: 'Spacious, level sites nestled under towering Ponderosa pines for natural shade and beauty.' },
  { icon: Zap, title: '15 Sites with Electricity', desc: '15 of our 20+ tent sites include 20 AMP electric hookups — charge devices, run fans, stay comfortable.' },
  { icon: Waves, title: 'Heated Pool & Hot Tubs', desc: 'Cool off in the heated pool or unwind in the hot tub spas — all free with your tent site.' },
  { icon: ShowerHead, title: 'Modern Bathhouses', desc: 'Clean, well-maintained shower and restroom facilities located near the tent camping area.' },
  { icon: Cable, title: 'Propane Campfire Rentals', desc: 'Rent a propane campfire for your site and enjoy the ambiance. No wood fires allowed in the park.' },
  { icon: ShieldCheck, title: '24/7 Gated Security', desc: 'Gated entry with round-the-clock security patrol for a safe, peaceful camping experience.' },
];

const FAQS = [
  { q: 'How much does tent camping cost?', a: 'Tent camping at Rush No More starts at $35/night for a standard site (based on 2 people). Electric hookup adds $5/night, and additional guests are $5/day per person. South Dakota state tax of 6% applies.' },
  { q: 'Do tent sites have electricity?', a: 'Yes — 15 of our 20+ tent sites include 20 AMP electric hookups for an additional $5/night.' },
  { q: 'Are there showers and restrooms near the tent sites?', a: 'Absolutely. Modern, clean bathhouses with hot showers and restrooms are located a short walk from all tent sites.' },
  { q: 'How far is Rush No More from Mount Rushmore?', a: 'We are approximately 55 miles from Mount Rushmore (about 1 hour drive), making it an easy and scenic day trip.' },
  { q: 'Can I have a campfire at my tent site?', a: 'Wood fires are not permitted. However, you can rent a propane campfire unit for your site — all the ambiance with none of the risk.' },
  { q: 'What amenities do tent campers have access to?', a: 'All 16 resort amenities are included free: heated pool, hot tub spas, beer garden & bar, game room, nature trails, modern bathhouses, free Wi-Fi, camp store, and 24/7 gated security.' },
  { q: 'Is tent camping available during the Sturgis Rally?', a: 'Yes, tent camping is available during Rally week. Rally rates apply — book early as sites fill up fast.' },
];

export default function TentCampingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Stay', url: '/stay' }, { name: 'Tent Camping', url: '/stay/tent-camping' }])} />
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={serviceSchema({
        name: 'Tent Camping at Rush No More',
        description: '20+ shaded tent sites under Ponderosa pines near Mount Rushmore. 15 with 20 AMP electric. Bathhouse access, pool, hot tubs included.',
        url: '/stay/tent-camping',
        image: '/images/tent_camping_RNM.png',
        priceMin: '35.00',
        priceMax: '40.00',
        serviceType: 'Tent Campsite Rental',
      })} />
      <JsonLd data={speakableSchema('/stay/tent-camping', ['h1', 'h2'])} />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/tent_camping_RNM.png')" }} />
        <div className="absolute inset-0 bg-brand-navy/60" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white py-32">
          <span className="inline-block px-5 py-2 bg-brand-gold/30 text-brand-gold-light text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Tent Camping in the Black Hills
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]">
            Camp Under the <span className="text-brand-gold italic">Ponderosa Pines</span>
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            The best-value camping near Mount Rushmore — shaded tent sites from $35/night with heated pool, hot tubs, beer garden & 16 free resort amenities in Sturgis, South Dakota.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
            {[
              { val: '$35', label: 'Per Night' },
              { val: '20+', label: 'Tent Sites' },
              { val: '16', label: 'Free Amenities' },
              { val: '55 mi', label: 'To Mt. Rushmore' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <span className="font-display text-3xl text-brand-gold font-bold block">{s.val}</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-base px-8 py-4">
              Book a Tent Site <ExternalLink className="w-4 h-4 ml-2" />
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 px-6 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors font-bold text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES GRID ═══ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              More Than Just a Tent Site
            </span>
            <h2 className="text-3xl md:text-4xl mb-3">
              Resort-Level <span className="text-brand-gold italic">Tent Camping</span>
            </h2>
            <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
              Our Black Hills tent camping comes with amenities that most campgrounds can&apos;t match.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {TENT_FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl shadow-lodge border-2 border-surface-muted/50 p-6 group hover:shadow-gold-lg hover:-translate-y-2 hover:border-brand-gold/20 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/15">
                    <Icon className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{feat.title}</h3>
                  <p className="text-sm text-brand-navy/60 leading-relaxed font-medium">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Pricing Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lodge-lg border-2 border-brand-gold/20 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[80px]" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold">Tent Camping Pricing</h3>
                    <p className="text-sm text-brand-stone mt-1">Based on 2 people per site</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-4xl text-brand-gold font-bold">$35</span>
                    <span className="text-sm text-brand-stone block">/night</span>
                  </div>
                </div>
                <div className="bg-surface-secondary rounded-xl p-5 mb-6 space-y-2.5 text-sm text-brand-navy/70 font-medium">
                  <div className="flex items-center justify-between">
                    <span>Electric hookup (20 AMP)</span>
                    <span className="font-bold text-brand-navy">+$5.00/night</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Additional guests</span>
                    <span className="font-bold text-brand-navy">$5.00/day per person</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-muted">
                    <span>South Dakota state tax</span>
                    <span className="font-bold text-brand-navy">6%</span>
                  </div>
                </div>
                <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-base py-4">
                  Book Your Tent Site <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOCATION ═══ */}
      <section className="py-16 md:py-20 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Camp in the <span className="text-brand-gold italic">Heart of the Black Hills</span>
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-10 font-medium">
            Rush No More is perfectly located in Sturgis, South Dakota. Explore Mount Rushmore, Deadwood, Crazy Horse, and Custer State Park — all easy day trips from your tent site.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { place: 'Mount Rushmore', dist: '55 mi · ~1 hr' },
              { place: 'Deadwood', dist: '12 mi · ~15 min' },
              { place: 'Sturgis Main St', dist: '5 mi · ~7 min' },
              { place: 'Custer State Park', dist: '70 mi · ~1.5 hr' },
            ].map((d, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <MapPin className="w-5 h-5 text-brand-gold mx-auto mb-2" />
                <span className="font-bold text-sm block">{d.place}</span>
                <span className="text-white/50 text-xs">{d.dist}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 md:py-28 bg-surface-primary">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3">
              Tent Camping <span className="text-brand-gold italic">FAQ</span>
            </h2>
            <p className="text-brand-navy/60 font-medium">Everything you need to know about tent camping at Rush No More.</p>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl border-2 border-surface-muted/50 overflow-hidden group open:border-brand-gold/30 open:shadow-gold transition-all">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-brand-navy text-sm list-none">
                  {faq.q}
                  <ArrowRight className="w-4 h-4 text-brand-gold transition-transform group-open:rotate-90 flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-brand-navy/60 text-sm leading-relaxed font-medium">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to <span className="text-brand-gold italic">Camp?</span>
          </h2>
          <p className="text-brand-navy/60 text-lg mb-8 font-medium">
            The Black Hills&apos; best-value tent camping from $35/night — pool, hot tubs, beer garden & 16 amenities included.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-base px-8 py-4">
              Check Availability <ExternalLink className="w-4 h-4 ml-2" />
            </a>
            <Link href="/stay" className="inline-flex items-center gap-2 px-6 py-4 border-2 border-brand-navy/20 text-brand-navy rounded-xl hover:bg-brand-navy hover:text-white transition-colors font-bold text-sm">
              View All Accommodations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
