'use client';

import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import {
  AlertTriangle, Truck, Star, Home, Calendar, Shield, Clock,
  CheckCircle, XCircle, Phone, Mail, Info, ChevronRight,
  Tent, DollarSign, Users, Dog, Flame, Volume2, Car
} from 'lucide-react';

const CANCELLATION = [
  {
    icon: Truck,
    title: 'RV & Tent Site Cancellations',
    color: 'bg-sky-500',
    rules: [
      { label: '14+ days before', result: 'Full refund minus $25 admin fee', type: 'good' },
      { label: '7–14 days before', result: '50% refund', type: 'warn' },
      { label: 'Less than 7 days', result: 'No refund', type: 'bad' },
      { label: 'No-shows', result: 'Forfeit entire reservation', type: 'bad' },
    ],
  },
  {
    icon: Star,
    title: 'Luxury & Spa Site Cancellations',
    color: 'bg-brand-gold',
    rules: [
      { label: '30+ days before', result: 'Full refund minus $25 admin fee', type: 'good' },
      { label: '14–30 days before', result: '75% refund', type: 'good' },
      { label: '7–14 days before', result: '50% refund', type: 'warn' },
      { label: 'Less than 7 days', result: 'No refund', type: 'bad' },
    ],
  },
  {
    icon: Home,
    title: 'Cabin Cancellations',
    color: 'bg-emerald-500',
    rules: [
      { label: '30+ days before', result: 'Full refund minus $25 admin fee', type: 'good' },
      { label: '14–30 days before', result: '75% refund', type: 'good' },
      { label: '7–14 days before', result: '50% refund', type: 'warn' },
      { label: 'Less than 7 days', result: 'No refund', type: 'bad' },
    ],
  },
  {
    icon: Calendar,
    title: 'Holiday & Rally Reservations',
    color: 'bg-rose-500',
    rules: [
      { label: 'All rally dates', result: 'Non-refundable', type: 'bad' },
      { label: 'Memorial Day / July 4th / Labor Day', result: 'Non-refundable', type: 'bad' },
      { label: 'Full prepayment required', result: 'At time of booking', type: 'warn' },
      { label: 'No exceptions', result: 'Policy strictly enforced', type: 'bad' },
    ],
  },
];

const PARK_RULES = [
  { icon: Clock, text: 'Check-in: 3:00 PM | Check-out: 11:00 AM' },
  { icon: Volume2, text: 'Quiet hours: 10:00 PM - 7:00 AM' },
  { icon: Car, text: 'Speed limit: 5 MPH throughout the park' },
  { icon: Dog, text: 'Pets must be leashed at all times. Clean up after your pet.' },
  { icon: Flame, text: 'NO WOOD FIRES ALLOWED — we back up to Forest Service land. Propane and charcoal only.' },
  { icon: Users, text: 'Maximum 2 vehicles per site. Extra vehicles $10/day.' },
];

export default function PoliciesPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/Aereal-2_1400.png')" }} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-20 max-w-5xl mx-auto px-8 text-center text-white">
          <motion.span
            className="badge-gold mb-8 inline-block !bg-brand-gold/30 !text-brand-gold-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Good to Know
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Rules & Cancellation Policies
          </motion.h1>
          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Please review our policies before booking. We want every stay to be smooth and enjoyable.
          </motion.p>
        </div>
      </section>

      {/* ═══ IMPORTANT NOTICE ═══ */}
      <section className="relative -mt-6 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4 shadow-lodge">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-red-800 font-bold text-lg mb-1">Important Notice</h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  <strong>No refunds</strong> will be issued for inclement weather, acts of God, early departures, or unforeseen circumstances. Travel insurance is strongly recommended for all reservations.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CANCELLATION POLICIES ═══ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <span className="badge-gold mb-4 inline-block">Cancellations</span>
            <h2 className="mb-4">Cancellation Policies</h2>
            <p className="text-brand-stone text-lg max-w-2xl mx-auto">
              Policies vary by accommodation type. All cancellation timelines are measured from your check-in date.
            </p>
            <div className="divider-gold-wide mt-5 mx-auto" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CANCELLATION.map((pol, i) => {
              const Icon = pol.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="card-premium p-0 h-full overflow-hidden">
                    <div className={`${pol.color} px-6 py-4 flex items-center gap-3`}>
                      <Icon className="w-6 h-6 text-white" />
                      <h3 className="text-white font-bold text-base">{pol.title}</h3>
                    </div>
                    <div className="p-5 space-y-2.5">
                      {pol.rules.map((rule, j) => (
                        <div key={j} className="flex items-start gap-3">
                          {rule.type === 'good' ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : rule.type === 'warn' ? (
                            <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="text-sm">
                            <span className="font-bold text-brand-navy">{rule.label}: </span>
                            <span className="text-brand-stone">{rule.result}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PARK RULES ═══ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/Wooded-Tent-Area.png')" }} />
          <div className="absolute inset-0 bg-brand-navy/85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <span className="badge-gold !bg-brand-gold/20 !text-brand-gold-light mb-4 inline-block">Guidelines</span>
            <h2 className="text-white mb-4">Park Rules</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Help us keep Rush No More safe, clean, and enjoyable for everyone.
            </p>
            <div className="divider-gold-wide mt-5 mx-auto" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PARK_RULES.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={i}
                  className="glass rounded-xl p-5 flex items-start gap-4 hover:bg-white/10 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">{rule.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUESTIONS ═══ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Shield className="w-10 h-10 text-brand-gold mx-auto mb-4" />
            <h2 className="mb-4">Questions About Our Policies?</h2>
            <p className="text-brand-stone text-lg mb-8">
              We&apos;re happy to help clarify any policy details before you book.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`tel:${SITE.phoneTel}`} className="btn-gold">
                <Phone className="w-4 h-4 mr-2" /> Call {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="btn-outline">
                <Mail className="w-4 h-4 mr-2" /> Email Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
