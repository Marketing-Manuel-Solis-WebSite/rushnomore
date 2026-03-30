'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE, REVIEWS, STATS } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import {
  ExternalLink, Star, ArrowRight, Phone,
  Heart, Award, ThumbsUp, ShieldCheck, Sparkles,
  Quote, ChevronDown, HelpCircle, Users, TreePine, MapPin,
} from 'lucide-react';

const VALUES = [
  { icon: Heart, title: 'Family First', desc: "We're not a chain — we're a family. Every guest gets a personal welcome, a friendly escort to their site, and genuine Black Hills hospitality." },
  { icon: Award, title: 'Excellence Always', desc: "Spotless bathhouses, manicured grounds, and 4.8 stars don't happen by accident. We sweat the small stuff so you don't have to." },
  { icon: ShieldCheck, title: 'Peace of Mind', desc: "Gated entry, 24/7 security, and well-lit grounds mean you can truly relax — whether you're here for a weekend or the whole rally." },
  { icon: Users, title: 'Community Spirit', desc: 'From our beer garden gatherings to campfire conversations, Rush No More is where strangers become friends and friends become family.' },
  { icon: TreePine, title: 'Nature First', desc: 'Nestled among Ponderosa pines with trails, wildlife, and mountain views — we preserve the natural beauty that makes this place special.' },
  { icon: Sparkles, title: 'Always Improving', desc: 'New spa sites, upgraded Wi-Fi, refreshed cabins — we reinvest every year because you deserve better than "good enough."' },
];

const TEAM_HIGHLIGHTS = [
  'Our staff personally escorts every guest to their site',
  'On-site team available daily 8 AM – 5 PM',
  'Dedicated rally coordinators during Sturgis',
  'Bilingual staff members available',
  'Event planning assistance for groups & weddings',
  'Local knowledge — we know the best hidden gems',
];

const FAQS = [
  { q: 'How long has Rush No More been open?', a: 'Rush No More has been welcoming campers for over a decade, hosting 84+ Sturgis Rallies and serving thousands of guests from across the country.' },
  { q: 'Is Rush No More family-friendly?', a: 'Absolutely! We welcome families of all sizes. Our pool, game room, nature trails, and spacious grounds are perfect for kids. Many families make it an annual tradition.' },
  { q: 'What makes you different from other campgrounds?', a: 'Personal service (we escort you to your site), 16 free amenities, a prime location (5 mi to Sturgis, easy I-90 access), and unique offerings like Presidential Cabins and private hot tub spa sites.' },
  { q: 'Do you host events and weddings?', a: 'Yes! Our large outdoor pavilion with full kitchen is perfect for weddings, reunions, corporate retreats, and gatherings of 20-200 guests.' },
  { q: "What's the best time to visit?", a: "Summer (June-August) is peak season with all amenities open. The Rally is in August. Fall offers fewer crowds and stunning foliage. Standard RV sites are open year-round." },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/Aereal-2_1400.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/10" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 pb-14 md:pb-20 text-white">
          <motion.span
            className="badge-gold mb-5 inline-block !bg-brand-gold/20 !text-brand-gold-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Est. in the Black Hills
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-4 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Story Behind <span className="text-brand-gold italic">Rush No More</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A family-owned campground that became the Black Hills&apos; most-loved resort. Here&apos;s how — and why.
          </motion.p>
        </div>
      </section>

      {/* INTRO — Who We Are */}
      <section className="py-20 md:py-28 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <span className="badge-gold mb-5 inline-block">Get to know us</span>
              <h2 className="mb-6 text-3xl md:text-4xl">We Started With a Simple Idea</h2>

              <div className="space-y-5 text-brand-navy/75 text-[17px] leading-relaxed font-medium">
                <p>
                  What if a campground could feel like coming home? Not a parking lot with hookups, but a real <em>place</em> — with character, with warmth, with people who actually care whether you had a good day?
                </p>
                <p>
                  That&apos;s the idea behind Rush No More. We&apos;re a family-owned resort in Sturgis, South Dakota, set among the Ponderosa pines at the edge of the Black Hills. We named our cabins after presidents, built a beer garden where strangers become friends, and made sure every single guest gets walked to their site with a handshake and a smile.
                </p>
                <p>
                  Over the years, what started small has grown into something we&apos;re genuinely proud of: 16 resort amenities, a 4.8-star rating, thousands of returning guests, and a reputation as <em>the</em> place to stay during the Sturgis Rally. But we&apos;ve never lost the thing that matters most — we still know our regulars by name, and we still treat first-timers like old friends.
                </p>
                <p>
                  Whether you&apos;re rolling in on a Harley, pulling a 40-foot fifth wheel, pitching a tent with the kids, or booking a cabin for a quiet couples&apos; retreat — you&apos;ll feel it the moment you arrive. This place is different.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STATS.map((s, i) => (
                  <div key={i} className="text-center p-4 bg-white rounded-xl shadow-lodge border border-surface-muted/50">
                    <span className="font-display text-2xl md:text-3xl text-brand-gold font-bold block">{s.value}</span>
                    <span className="text-[9px] text-brand-stone uppercase tracking-widest font-bold">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/DSC05580-s.png')" }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-xl overflow-hidden shadow-lodge group border-2 border-white">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/RushMore-cabins.png')" }} />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-lodge group border-2 border-white">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/RushMore-camping.png')" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY — 4 horizontal cards */}
      <section className="py-20 md:py-28 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.06]" style={{ backgroundImage: "url('/images/Aereal-2_1400.png')" }} />
        <div className="absolute inset-0 animate-shimmer" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="badge-gold mb-5 inline-block !bg-brand-gold/20 !text-brand-gold-light">Our Journey</span>
            <h2 className="mb-3 text-white">How We Got Here</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto font-medium">From a small campground to the Black Hills&apos; premier resort.</p>
            <div className="w-24 h-1 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', title: 'The Dream', desc: 'Founded with one goal — a campground where every guest feels at home in the Black Hills. A handful of RV sites and a lot of heart.' },
              { num: '02', title: 'Presidential Cabins', desc: '16 cabins, each named after a U.S. President. From economy to luxury suites sleeping 10 — an instant guest favorite.' },
              { num: '03', title: 'Rally Headquarters', desc: 'Word spread among riders — 5 miles from Sturgis with a legendary beer garden. Decade after decade, the go-to base camp.' },
              { num: '04', title: 'Top Rated', desc: "4.8 stars, 84 rallies hosted, 4,200+ campers, 16 amenities. The Black Hills' most-loved resort — still growing every season." },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="font-display text-5xl text-brand-gold/20 font-bold block mb-3 group-hover:text-brand-gold/40 transition-colors">{step.num}</span>
                <h3 className="text-lg font-display font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-20 md:py-28 bg-surface-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white lg:sticky lg:top-28">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/RushMore-rv-camper-van.png')" }} />
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <span className="badge-gold mb-5 inline-block">Why Rush No More</span>
              <h2 className="mb-3 text-3xl md:text-4xl">What Makes Us <span className="text-brand-gold italic">Different</span></h2>
              <p className="text-brand-navy/60 text-lg mb-10 font-medium">It&apos;s not one thing — it&apos;s everything together.</p>

              <div className="space-y-5">
                {VALUES.map((val, i) => {
                  const Icon = val.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex gap-5 p-5 bg-white rounded-2xl shadow-lodge border border-surface-muted/50 hover:shadow-gold hover:-translate-y-0.5 hover:border-brand-gold/20 transition-all duration-300 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/15">
                        <Icon className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg mb-1">{val.title}</h4>
                        <p className="text-brand-navy/60 text-sm leading-relaxed font-medium">{val.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F5F0E8 0%, #FDFBF7 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-gold mb-5 inline-block">Our Team</span>
              <h2 className="mb-6 text-3xl md:text-4xl">
                The People Who Make It <span className="text-brand-gold italic">Special</span>
              </h2>
              <p className="text-brand-navy/75 text-lg leading-relaxed font-medium mb-6">
                Behind every great stay is a team that genuinely cares. Our crew isn&apos;t just staff — they&apos;re Black Hills locals who love this land, love meeting new people, and take real pride in making your trip unforgettable.
              </p>
              <p className="text-brand-navy/60 leading-relaxed font-medium mb-8">
                From the moment you pull in to the moment you wave goodbye, you&apos;ll notice the difference. It&apos;s in the small things — the warm greeting, the tip about a hidden waterfall, the fresh coffee in the office, the &ldquo;see you next year&rdquo; that actually means it.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TEAM_HIGHLIGHTS.map((item, i) => (
                  <span key={i} className="flex items-center gap-2.5 text-sm text-brand-navy/80 bg-white/80 px-3 py-2.5 rounded-lg font-medium border border-surface-muted/30 shadow-sm">
                    <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/presidential-spa.png')" }} />
              </div>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/vip-site.png')" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 md:py-28 bg-surface-primary relative overflow-hidden">
        <div className="absolute top-10 left-10 text-brand-gold/[0.04]"><Quote className="w-40 h-40" /></div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="badge-gold mb-5 inline-block">Guest Reviews</span>
            <h2 className="mb-3">What Our Campers <span className="text-brand-gold italic">Say</span></h2>
            <div className="w-24 h-1 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-lodge-lg border border-brand-gold/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[80px]" />
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-5">
                {[1,2,3,4,5].map(j => <Star key={j} className="w-6 h-6 text-brand-gold fill-brand-gold" />)}
              </div>
              <p className="text-lg md:text-2xl text-brand-navy italic leading-relaxed mb-6 font-display font-bold">
                &ldquo;{REVIEWS[0].text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">{REVIEWS[0].title.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="font-display text-brand-navy font-bold text-sm">{REVIEWS[0].title}</p>
                  {REVIEWS[0].source && <span className="text-[10px] font-bold uppercase tracking-wider text-brand-stone">{REVIEWS[0].source}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.slice(1, 4).map((r, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lodge border border-surface-muted/50 hover:shadow-gold hover:-translate-y-1 hover:border-brand-gold/20 transition-all duration-500"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, j) => <Star key={j} className={`w-4 h-4 ${j < r.rating ? 'text-brand-gold fill-brand-gold' : 'text-surface-muted'}`} />)}</div>
                  {r.source && <span className="text-[9px] font-black uppercase tracking-wider text-brand-stone">{r.source}</span>}
                </div>
                <p className="text-brand-navy/70 italic mb-4 text-sm leading-relaxed font-medium">&ldquo;{r.text}&rdquo;</p>
                <p className="font-display text-brand-navy font-bold text-sm">{r.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href={SITE.tripadvisor} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-brand-gold-dark transition-colors">
              Read more reviews on TripAdvisor <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge-gold mb-5 inline-block">FAQ</span>
            <h2 className="mb-3">Common <span className="text-brand-gold italic">Questions</span></h2>
            <div className="w-24 h-1 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-brand-gold/30 shadow-gold' : 'border-surface-muted/50 shadow-lodge hover:border-brand-gold/20'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex items-center justify-between w-full p-5 text-left"
                  >
                    <div className="flex items-center gap-3 flex-1 pr-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isOpen ? 'bg-brand-gold' : 'bg-brand-gold/10'
                      }`}>
                        <HelpCircle className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-brand-gold'}`} />
                      </div>
                      <span className="font-bold text-brand-navy text-sm">{faq.q}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-brand-gold transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-5 pl-16">
                      <p className="text-brand-navy/60 text-sm leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}