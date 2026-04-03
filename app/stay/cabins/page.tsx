'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE, CABINS } from '@/data/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema } from '@/lib/seo';
import {
  ExternalLink, ArrowRight, Home, CheckCircle, Users,
  MapPin, Phone, TreePine, Waves, Beer, ShieldCheck,
  Thermometer, UtensilsCrossed, PawPrint, Flame,
} from 'lucide-react';

const CABIN_FEATURES = [
  { icon: Thermometer, title: 'A/C & Heating', desc: 'Every cabin has climate control for year-round comfort.' },
  { icon: UtensilsCrossed, title: 'Full Kitchens Available', desc: 'Select cabins include full kitchens so you can cook your own meals.' },
  { icon: PawPrint, title: 'Pet-Friendly Options', desc: 'Bring your furry friends — several cabins welcome pets.' },
  { icon: Waves, title: 'Pool & Hot Tubs', desc: 'All cabin guests enjoy free access to the heated pool and hot tub spas.' },
  { icon: Beer, title: 'Beer Garden & Bar', desc: 'Craft brews and cocktails at our on-site beer garden, steps away.' },
  { icon: ShieldCheck, title: '24/7 Security', desc: 'Gated entry with round-the-clock patrol for peace of mind.' },
];

const FAQS = [
  { q: 'How many cabins does Rush No More have?', a: 'We have 16 unique cabins, each named after a US President. They range from cozy 2-person economy units to spacious suites sleeping up to 10 guests.' },
  { q: 'Do cabins have bathrooms?', a: 'Yes, every cabin at Rush No More has its own private bathroom.' },
  { q: 'Are there cabins with kitchens?', a: 'Select larger cabins include full kitchens with refrigerator, stove, and cookware. Smaller economy cabins do not have kitchen facilities.' },
  { q: 'How far are the cabins from Mount Rushmore?', a: 'Rush No More is approximately 55 miles (about 1 hour) from Mount Rushmore National Memorial, making it an easy day trip.' },
  { q: 'Can I bring my dog to a cabin?', a: 'Yes! Several of our cabins are pet-friendly. Please let us know at booking so we can assign a pet-friendly unit.' },
  { q: 'Are cabins available during the Sturgis Rally?', a: 'Yes, cabins are available during the Sturgis Motorcycle Rally (August). Rally rates apply — book 6-12 months in advance as they sell out quickly.' },
];

export default function CabinsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Stay', url: '/stay' }, { name: 'Cabins', url: '/stay/cabins' }])} />
      <JsonLd data={faqSchema(FAQS)} />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png')" }} />
        <div className="absolute inset-0 bg-brand-navy/60" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white py-32">
          <span className="inline-block px-5 py-2 bg-brand-gold/30 text-brand-gold-light text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Cabins Near Mount Rushmore
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]">
            Presidential <span className="text-brand-gold italic">Cabin Collection</span>
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            16 unique cabins in Sturgis, South Dakota — each named after a US President. From cozy couples&apos; retreats to spacious family suites sleeping 10, with full access to all resort amenities. Just 55 miles from Mount Rushmore.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
            {[
              { val: '16', label: 'Unique Cabins' },
              { val: '2–10', label: 'Guests Per Cabin' },
              { val: '$95', label: 'Starting At' },
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
              Book a Cabin <ExternalLink className="w-4 h-4 ml-2" />
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 px-6 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors font-bold text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CABIN CATEGORIES ═══ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              16 Presidential Cabins
            </span>
            <h2 className="text-3xl md:text-4xl mb-3">
              Find Your Perfect <span className="text-brand-gold italic">Cabin</span>
            </h2>
            <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
              Organized by capacity — from intimate getaways to group retreats in the Black Hills.
            </p>
          </div>

          {CABINS.map((cat, ci) => (
            <div key={ci} className="mb-12 last:mb-0">
              <h3 className="text-xl font-display font-bold mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center border border-brand-gold/15">
                  <Users className="w-5 h-5 text-brand-gold" />
                </div>
                {cat.cat}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.items.map((c, i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-2xl shadow-lodge border-2 border-surface-muted/50 overflow-hidden hover:shadow-gold-lg hover:-translate-y-1 hover:border-brand-gold/20 transition-all duration-500 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <div className="aspect-[16/10] bg-surface-secondary relative overflow-hidden">
                      {c.img && <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${c.img}')` }} />}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          Cabin {c.num}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          <Users className="w-3 h-3 text-brand-gold" /> Sleeps {c.sleeps}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-display font-bold mb-3">{c.name}</h4>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="font-display text-xl text-brand-gold">$95 – $335</span>
                          <span className="text-xs text-brand-stone block">per night</span>
                        </div>
                      </div>
                      <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">
                        Reserve <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl mb-3">
              Cabin <span className="text-brand-gold italic">Features & Amenities</span>
            </h2>
            <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
              Every cabin comes with full access to all 16 resort amenities at no extra charge.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CABIN_FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-surface-primary rounded-2xl p-6 border-2 border-surface-muted/50 hover:border-brand-gold/20 hover:shadow-gold-lg transition-all duration-500 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold transition-colors duration-500 border border-brand-gold/15">
                    <Icon className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-navy/60 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 md:py-28 bg-surface-primary">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3">
              Cabin <span className="text-brand-gold italic">FAQ</span>
            </h2>
            <p className="text-brand-navy/60 font-medium">Common questions about our presidential cabins near Mount Rushmore.</p>
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
            Book Your <span className="text-brand-gold italic">Presidential Cabin</span>
          </h2>
          <p className="text-brand-navy/60 text-lg mb-8 font-medium">
            16 unique cabins from $95/night in Sturgis, South Dakota — your gateway to Mount Rushmore and the Black Hills.
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
