'use client';

import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { FadeIn, ParallaxHero } from '@/components/motion';
import {
  Accessibility, CheckCircle, Eye, Keyboard, Smartphone, Monitor,
  Volume2, MousePointer, Phone, Mail, MapPin, Heart, Shield, Globe
} from 'lucide-react';

const FEATURES = [
  { icon: Keyboard, title: 'Keyboard Navigation', desc: 'Full keyboard accessibility throughout the site. Navigate menus, forms, and content without a mouse.' },
  { icon: Eye, title: 'Screen Reader Support', desc: 'Semantic HTML and ARIA labels for screen readers like JAWS, NVDA, and VoiceOver.' },
  { icon: Monitor, title: 'High Contrast', desc: 'Carefully designed color contrast ratios meeting WCAG 2.1 AA standards for readability.' },
  { icon: Smartphone, title: 'Mobile Accessible', desc: 'Fully responsive design with touch-friendly targets and mobile assistive technology support.' },
  { icon: Volume2, title: 'Alt Text for Media', desc: 'All images include descriptive alt text. Videos have captions where available.' },
  { icon: MousePointer, title: 'Focus Indicators', desc: 'Visible focus states on all interactive elements so you always know where you are.' },
];

const PROPERTY_FEATURES = [
  'ADA-compliant restrooms and shower facilities',
  'Accessible pathways to major amenities',
  'Designated accessible RV and camping sites',
  'Assistance available at check-in for mobility needs',
  'Service animals welcome throughout the property',
  'Level concrete pads at VIP and Presidential sites',
];

export default function ADAPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/Aereal-2_1400.png')" }} />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <motion.div
            className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Accessibility className="w-10 h-10 text-brand-gold" />
          </motion.div>
          <motion.span
            className="badge-gold mb-4 inline-block !bg-brand-gold/20 !text-brand-gold-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Committed to Everyone
          </motion.span>
          <motion.h1
            className="mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            ADA Compliance & Accessibility
          </motion.h1>
          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Rush No More is committed to making our resort and website accessible to all guests, regardless of ability.
          </motion.p>
        </div>
      </section>

      {/* ═══ COMMITMENT STATEMENT ═══ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <span className="badge-gold mb-4 inline-block">Our Promise</span>
            <h2 className="mb-4">Accessibility for Everyone</h2>
            <p className="text-brand-stone text-lg max-w-3xl mx-auto leading-relaxed">
              We believe everyone deserves an exceptional camping experience. Our team continuously works to improve accessibility across our property and digital platforms, striving for WCAG 2.1 Level AA compliance.
            </p>
            <div className="divider-gold-wide mt-5 mx-auto" />
          </FadeIn>

          {/* Website Features Grid */}
          <FadeIn>
            <h3 className="text-xl font-display text-center mb-8 flex items-center justify-center gap-2">
              <Globe className="w-5 h-5 text-brand-gold" /> Website Accessibility Features
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="card-premium p-6 h-full group">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 group-hover:scale-110 transition-all">
                      <Icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h4 className="font-bold text-base mb-2">{f.title}</h4>
                    <p className="text-sm text-brand-stone leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROPERTY FEATURES ═══ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/rv-camper-van.png')" }} />
          <div className="absolute inset-0 bg-brand-navy/85" />
          <div className="absolute inset-0 animate-shimmer" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="badge-gold !bg-brand-gold/20 !text-brand-gold-light mb-4 inline-block">On-Site</span>
              <h2 className="text-white mb-4">Property Accessibility</h2>
              <p className="text-white/60 text-lg mb-8">
                Our physical property includes several accommodations designed to welcome guests of all abilities.
              </p>
              <div className="space-y-3">
                {PROPERTY_FEATURES.map((feat, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <CheckCircle className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/80">{feat}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass rounded-2xl p-8 text-center">
                <Heart className="w-12 h-12 text-brand-gold mx-auto mb-4" />
                <h3 className="text-white text-xl mb-3">Need Assistance?</h3>
                <p className="text-white/60 text-sm mb-6">
                  Our team is here to help you plan your visit. Contact us to discuss any accessibility needs.
                </p>
                <div className="space-y-3">
                  <a href={`tel:${SITE.phoneTel}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-gold text-white font-bold text-sm hover:brightness-110 transition-all">
                    <Phone className="w-4 h-4" /> Call {SITE.phone}
                  </a>
                  <a href={`mailto:${SITE.email}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all">
                    <Mail className="w-4 h-4" /> {SITE.email}
                  </a>
                </div>
                <div className="mt-4 flex items-start gap-2 text-xs text-white/40">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>{SITE.address}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ FEEDBACK ═══ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Shield className="w-10 h-10 text-brand-gold mx-auto mb-4" />
            <h2 className="mb-4">Accessibility Feedback</h2>
            <p className="text-brand-stone text-lg mb-6 leading-relaxed">
              We welcome your feedback on the accessibility of our website and property. If you encounter any barriers or have suggestions, please contact us. We take all accessibility concerns seriously and strive to respond promptly.
            </p>
            <div className="inline-flex items-center gap-3 bg-brand-gold/5 border border-brand-gold/15 rounded-full px-6 py-3">
              <Mail className="w-5 h-5 text-brand-gold" />
              <span className="text-sm font-bold text-brand-navy">{SITE.email}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
