'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import {
  CheckCircle, ArrowRight, Phone, Mail, MapPin,
  Home, Calendar, Sparkles, ExternalLink
} from 'lucide-react';

export default function ThanksPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/rushnomore-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/DSC05580-s.png"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-20 max-w-2xl mx-auto px-8 text-center text-white">
          {/* Animated checkmark */}
          <motion.div
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CheckCircle className="w-12 h-12 text-green-400" />
            </motion.div>
          </motion.div>

          <motion.span
            className="badge-gold mb-4 inline-block !bg-brand-gold/20 !text-brand-gold-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Message Received
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Thank You!
          </motion.h1>

          <motion.p
            className="text-lg text-white/60 mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Your message has been received successfully. Our team typically responds within 24 hours during business hours.
          </motion.p>

          {/* Quick Actions */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/" className="btn-gold px-8 py-3.5">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-outline-light px-8 py-3.5">
              <Calendar className="w-4 h-4 mr-2" /> Book Your Stay
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHAT'S NEXT ═══ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-gold mb-4 inline-block">While You Wait</span>
            <h2 className="mb-4">What Happens Next?</h2>
            <div className="divider-gold-wide mt-5 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { num: '1', title: 'We Review', desc: 'Our team reads every message personally and prepares a thoughtful response.', icon: Mail },
              { num: '2', title: 'We Reply', desc: 'Expect a response within 24 hours during business hours (8 AM - 8 PM MT).', icon: Sparkles },
              { num: '3', title: 'You Enjoy', desc: 'We help you plan the perfect Black Hills getaway at Rush No More.', icon: CheckCircle },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  className="card-premium p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <span className="text-xs font-black text-brand-gold uppercase tracking-widest">Step {step.num}</span>
                  <h3 className="text-lg font-display mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-brand-stone">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Need Immediate Help */}
          <motion.div
            className="bg-brand-navy rounded-2xl p-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Phone className="w-8 h-8 text-brand-gold mx-auto mb-3" />
            <h3 className="text-xl font-display mb-2">Need Immediate Assistance?</h3>
            <p className="text-white/60 text-sm mb-4">Call us directly and speak with our friendly team.</p>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 text-brand-gold font-display text-2xl font-bold hover:text-brand-gold-light transition-colors">
              <Phone className="w-5 h-5" /> {SITE.phone}
            </a>
            <p className="text-xs text-white/40 mt-2">Open {SITE.hours}</p>
          </motion.div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
