'use client';

import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import { BookingCTA, Breadcrumbs } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import {
  Scale, Shield, Cookie, FileText, Eye, Mail, Phone, MapPin,
  Lock, Database, Globe, AlertCircle
} from 'lucide-react';

const SECTIONS = [
  {
    icon: Eye,
    title: 'Privacy Policy',
    content: [
      'Rush No More RV Resort & Campground ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a reservation.',
      'We collect personal information only when voluntarily submitted by you, such as when making a reservation, contacting us, or subscribing to our newsletter. This information may include your name, email address, phone number, mailing address, and payment information.',
      'We use this information to process reservations, communicate with you about your stay, improve our services, and send promotional materials (only with your consent). We do not sell, trade, or otherwise transfer your personal information to outside parties.',
      'We implement industry-standard security measures to protect your data. Payment processing is handled through Stripe, a PCI-DSS compliant payment processor.',
    ],
  },
  {
    icon: FileText,
    title: 'Terms of Use',
    content: [
      'By accessing and using the Rush No More website, you accept and agree to be bound by these Terms of Use. All content on this website, including text, graphics, logos, images, and software, is the property of Rush No More RV Resort and is protected by copyright laws.',
      'You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from this website without prior written permission.',
      'We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of any changes. Reservation terms are governed by our separate booking policies and cancellation rules.',
    ],
  },
  {
    icon: Cookie,
    title: 'Cookie Policy',
    content: [
      'Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from.',
      'Essential cookies are required for the website to function properly, including session management and security features. Analytics cookies (Google Analytics) help us understand how visitors interact with our site. These cookies collect anonymized data and do not personally identify you.',
      'You can control cookies through your browser settings. Disabling cookies may affect the functionality of certain website features.',
    ],
  },
  {
    icon: Database,
    title: 'Data Retention',
    content: [
      'We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, including satisfying legal, accounting, or reporting requirements.',
      'Reservation records are retained for a minimum of 7 years for tax and legal compliance. You may request deletion of your personal information by contacting us, subject to legal retention requirements.',
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Legal Notices' }]} />

      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/images/DSC05580-s.png')" }} />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <motion.div
            className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Scale className="w-10 h-10 text-brand-gold" />
          </motion.div>
          <motion.h1
            className="mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Legal Notices
          </motion.h1>
          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Privacy policy, terms of use, and cookie information for Rush No More RV Resort.
          </motion.p>
        </div>
      </section>

      {/* ═══ QUICK NAV ═══ */}
      <section className="bg-white border-b border-surface-muted shadow-sm sticky top-16 md:top-20 z-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={`#section-${i}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide text-brand-navy/50 hover:text-brand-navy hover:bg-surface-secondary transition-all whitespace-nowrap"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.title}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CONTENT SECTIONS ═══ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <div id={`section-${i}`} className="scroll-mt-32 card-premium overflow-hidden">
                  <div className="bg-brand-navy px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-brand-gold" />
                    </div>
                    <h2 className="text-white text-lg font-display">{section.title}</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {section.content.map((paragraph, j) => (
                      <p key={j} className="text-sm text-brand-navy/70 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}

          {/* Contact Card */}
          <FadeIn delay={0.3}>
            <div className="card-premium overflow-hidden">
              <div className="bg-brand-gold px-6 py-4 flex items-center gap-3">
                <Mail className="w-5 h-5 text-white" />
                <h2 className="text-white text-lg font-display">Contact for Legal Inquiries</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-brand-navy/70 mb-5">
                  For questions about our privacy practices, data requests, or any legal matter, please reach out:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-xl hover:bg-brand-gold/10 transition-colors group">
                    <Mail className="w-5 h-5 text-brand-gold" />
                    <div>
                      <span className="text-[10px] font-bold text-brand-stone uppercase">Email</span>
                      <span className="text-sm font-bold text-brand-navy block group-hover:text-brand-gold transition-colors">{SITE.email}</span>
                    </div>
                  </a>
                  <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-xl hover:bg-brand-gold/10 transition-colors group">
                    <Phone className="w-5 h-5 text-brand-gold" />
                    <div>
                      <span className="text-[10px] font-bold text-brand-stone uppercase">Phone</span>
                      <span className="text-sm font-bold text-brand-navy block group-hover:text-brand-gold transition-colors">{SITE.phone}</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-xl">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                    <div>
                      <span className="text-[10px] font-bold text-brand-stone uppercase">Address</span>
                      <span className="text-sm font-bold text-brand-navy block">{SITE.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="text-center pt-4">
            <p className="text-xs text-brand-stone">
              Last updated: January 1, 2026. &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
          </FadeIn>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
