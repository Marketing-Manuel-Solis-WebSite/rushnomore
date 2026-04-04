'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE, RV_TIERS } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema } from '@/lib/seo';
import {
  ExternalLink, ArrowRight, Truck, CheckCircle, Star, Users,
  Waves, Beer, ShieldCheck, Wifi, Zap, TreePine, ShowerHead,
  MapPin, Phone, Navigation,
} from 'lucide-react';

const WHY_CHOOSE = [
  { icon: Zap, title: '30 & 50 AMP Service', desc: 'Every site includes your choice of 30 or 50 AMP electrical hookups.' },
  { icon: Navigation, title: 'Pull-Throughs up to 100ft', desc: 'Big rigs welcome — our longest pull-through sites accommodate up to 100 feet.' },
  { icon: Waves, title: 'Pool & Hot Tubs Included', desc: 'Heated pool and multiple hot tub spas are free with every RV site.' },
  { icon: Beer, title: 'On-Site Beer Garden', desc: 'Craft brews, cocktails, and a social atmosphere steps from your site.' },
  { icon: ShieldCheck, title: '24/7 Gated Security', desc: 'Gated entry with round-the-clock security patrol for your peace of mind.' },
  { icon: Wifi, title: 'Free Wi-Fi', desc: 'Stay connected throughout the resort with complimentary Wi-Fi.' },
];

const FAQS = [
  { q: 'What hookups do RV sites include?', a: 'All RV sites at Rush No More include full hookups: water, electric (30 or 50 AMP), and sewer connections. Luxury and Luxury Spa sites add cement slabs and gas BBQ grills.' },
  { q: 'How long can my RV be?', a: 'We accommodate RVs up to 100 feet with both pull-through and back-in options available.' },
  { q: 'How far is Rush No More from Mount Rushmore?', a: 'Rush No More is approximately 55 miles from Mount Rushmore National Memorial, about a 1-hour scenic drive through the Black Hills.' },
  { q: 'What is the difference between Luxury and Luxury Spa sites?', a: 'Both include cement slabs and gas BBQ grills. Luxury Spa sites add a private hot tub spa right at your site — the ultimate RV glamping experience.' },
  { q: 'Are RV sites open year-round?', a: 'Standard RV sites are open year-round. Luxury and Luxury Spa sites are seasonal (May 1 through October 1).' },
  { q: 'Is there a dump station?', a: 'Every site has its own sewer hookup, so there is no need for a separate dump station.' },
  { q: 'Are pets allowed at the RV park?', a: 'Yes! Rush No More is pet-friendly. Dogs and other pets are welcome on leash throughout the resort.' },
];

export default function RVSitesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Stay', url: '/stay' }, { name: 'RV Sites', url: '/stay/rv-sites' }])} />
      <JsonLd data={faqSchema(FAQS)} />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/RushMore-rv-camper-van.png')" }} />
        <div className="absolute inset-0 bg-brand-navy/60" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white py-32">
          <span className="inline-block px-5 py-2 bg-brand-gold/30 text-brand-gold-light text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
            #1 RV Park Near Mount Rushmore
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]">
            Full-Hookup <span className="text-brand-gold italic">RV Sites</span> in the Black Hills
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            200+ premium RV sites with 30/50 AMP, pull-throughs up to 100ft, heated pool, beer garden & 16 free amenities — just 55 miles from Mount Rushmore in Sturgis, South Dakota.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
            {[
              { val: '200+', label: 'RV Sites' },
              { val: '100ft', label: 'Max Length' },
              { val: '$41.22', label: 'Starting At' },
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
              Book Your RV Site <ExternalLink className="w-4 h-4 ml-2" />
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 px-6 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors font-bold text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ THREE TIERS ═══ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              Five Options — One Great Resort
            </span>
            <h2 className="text-3xl md:text-4xl mb-3">
              Choose Your <span className="text-brand-gold italic">RV Experience</span>
            </h2>
            <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
              From water/electric sites to private hot tub spa sites — every option includes free access to all 16 resort amenities. Prices vary by weekday, weekend, Rally &amp; holidays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {RV_TIERS.map((tier, i) => (
              <motion.div
                key={i}
                className="relative bg-white rounded-3xl shadow-lodge border-2 border-surface-muted/50 overflow-hidden hover:shadow-gold-lg hover:-translate-y-2 hover:border-brand-gold/30 transition-all duration-700 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {tier.badge && (
                  <div className="absolute top-4 right-4 z-10 bg-brand-gold text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-gold">
                    {tier.badge}
                  </div>
                )}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110" style={{ backgroundImage: `url('${tier.img}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-white/70 text-sm block">{tier.note}</span>
                    <span className="font-display text-3xl text-white font-bold">{tier.price}</span>
                    <span className="text-white/70 text-sm block">per night</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-4">{tier.name}</h3>
                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-brand-navy/80">
                        <CheckCircle className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center text-sm">
                    Reserve Now <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl mb-3">
              Why Campers Choose <span className="text-brand-gold italic">Rush No More</span>
            </h2>
            <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto font-medium">
              More than just an RV park — we are a full-service resort with everything you need for the perfect Black Hills vacation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, i) => {
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

      {/* ═══ LOCATION CONTEXT ═══ */}
      <section className="py-16 md:py-20 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Your <span className="text-brand-gold italic">Base Camp</span> for the Black Hills
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-10 font-medium">
            Rush No More is perfectly located in Sturgis, South Dakota — your gateway to Mount Rushmore, Deadwood, Crazy Horse, Custer State Park, Spearfish Canyon, and Needles Highway. All within easy day-trip distance.
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
              RV Park <span className="text-brand-gold italic">FAQ</span>
            </h2>
            <p className="text-brand-navy/60 font-medium">Everything you need to know about our RV sites near Mount Rushmore.</p>
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
            Ready to <span className="text-brand-gold italic">Book?</span>
          </h2>
          <p className="text-brand-navy/60 text-lg mb-8 font-medium">
            Secure your RV site at the Black Hills&apos; top-rated resort. Prices vary by weekday, weekend, Rally &amp; holidays. Water/Electric from $41.22/night, FHU from $51.72, Luxury from $62.36.
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
