'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE, REVIEWS } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { trackEvent } from '@/lib/booking';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema, videoSchema } from '@/lib/seo';
import {
  MapPin, Phone, Mail, Send, CheckCircle, Loader2,
  ExternalLink, Star, ArrowRight, Clock, MessageSquare,
  Users, Calendar, Truck, HelpCircle, Navigation, ChevronDown,
} from 'lucide-react';

/* ─── FAQ Data ─── */
const FAQS = [
  { q: 'How do I make a reservation?', a: 'You can book online through our reservation system, call us at 605-423-2545, or send us a message through this contact form. Online booking is the fastest way to secure your spot.' },
  { q: 'What is your cancellation policy?', a: 'RV & Tent sites: 14+ days = full refund minus $25; 7-14 days = 50%; less than 7 days = no refund. Cabins: 30+ days = full refund minus $25. Holiday and Rally reservations are non-refundable.' },
  { q: 'Do you allow pets?', a: 'Yes! We are a pet-friendly resort. Dogs are welcome on leash throughout the park. We ask that you clean up after your pets and keep them quiet during quiet hours.' },
  { q: 'How far are you from Mount Rushmore?', a: 'About 55 miles — roughly a scenic 1-hour drive through the beautiful Black Hills. We are just 5 miles from Sturgis and 12 miles from Deadwood.' },
  { q: 'What hookups do RV sites include?', a: 'All RV sites include full hookups: water, electric (30 or 50 AMP), and sewer. Luxury and Luxury Spa sites add cement slabs, gas BBQ grills, and private hot tubs.' },
  { q: 'Are you open year-round?', a: 'Standard RV sites are open year-round. Luxury and Luxury Spa sites, as well as the pool and hot tubs, are seasonal (May 1 – October 1).' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        trackEvent('form_submit', { form_type: 'contact' });
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])} />
      <JsonLd data={videoSchema({ name: 'Contact Rush No More RV Resort', description: 'Get in touch with Rush No More RV Resort & Campground in Sturgis, SD — call 605-423-2545, email info@rushnomore.com. Just off I-90 Exit 37, 5 miles from Sturgis Main Street.', thumbnailUrl: '/images/PeoplePlaying/IMG_7078.jpeg', contentUrl: '/videos/rushnomore-contact.mp4', uploadDate: '2025-01-01' })} />

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Video Background
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/rushnomore-contact.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/DSC05580-s.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-brand-navy/30" />
        <div className="absolute inset-0 animate-shimmer" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
          <motion.span
            className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ★ Get In Touch ★
          </motion.span>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-display mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We&apos;d Love to{' '}
            <span className="text-brand-gold italic">Hear From You</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Questions about reservations, the Sturgis Rally, group events, or anything else? Our friendly team is here to help you plan the perfect Black Hills getaway.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href={`tel:${SITE.phoneTel}`} className="btn-gold text-lg px-8 py-4">
              <Phone className="w-5 h-5 mr-2" /> Call Us Now
            </a>
            <a href="#contact-form" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white hover:text-brand-navy transition-all duration-300">
              <MessageSquare className="w-5 h-5" /> Send a Message
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONTACT INFO CARDS — 4 cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-16 z-10 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: MapPin, title: 'Visit Us', content: '21137 Brimstone Place\nSturgis, SD 57785', action: 'Get Directions', href: SITE.maps },
              { icon: Phone, title: 'Call Us', content: SITE.phone, sub: 'Mon-Sat · 8 AM – 5 PM MT', action: 'Call Now', href: `tel:${SITE.phoneTel}` },
              { icon: Mail, title: 'Email Us', content: SITE.email, sub: 'We reply within 24 hours', action: 'Send Email', href: `mailto:${SITE.email}` },
              { icon: Clock, title: 'Office Hours', content: 'Daily 8 AM – 5 PM', sub: 'Mountain Time', action: 'Book Online', href: SITE.booking },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lodge-lg border border-surface-muted/50 p-6 text-center group hover:shadow-gold-lg hover:-translate-y-2 hover:border-brand-gold/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/15">
                  <card.icon className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{card.title}</h3>
                <p className="text-brand-navy/80 text-sm mb-1 whitespace-pre-line font-medium">{card.content}</p>
                {card.sub && <p className="text-brand-stone text-xs mb-3">{card.sub}</p>}
                <a
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-gold hover:text-brand-gold-dark transition-colors"
                >
                  {card.action} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONTACT FORM + MAP — Premium Layout
      ═══════════════════════════════════════════════════════════════ */}
      <section id="contact-form" className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Contact Form ★
            </span>
            <h2 className="mb-3 text-4xl md:text-5xl">
              Send Us a <span className="text-brand-gold italic">Message</span>
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              Fill out the form below and our team will get back to you within 24 hours. For immediate assistance, give us a call.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* ── Form (3 cols) ── */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <motion.div
                  className="bg-white rounded-3xl shadow-lodge-lg border border-brand-gold/20 p-10 md:p-14 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-gold/20">
                    <CheckCircle className="w-10 h-10 text-brand-gold" />
                  </div>
                  <h3 className="text-3xl font-display text-brand-navy mb-3">Message Sent!</h3>
                  <p className="text-brand-navy/70 text-lg mb-8 font-medium">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
                      Book Your Stay <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-outline text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lodge-lg border border-surface-muted/50 p-8 md:p-10">
                  {/* Subject quick select */}
                  <div className="mb-8">
                    <label className="text-sm font-bold text-brand-navy mb-3 block uppercase tracking-wider">What can we help you with?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { value: 'Reservation', icon: Calendar, label: 'Reservations' },
                        { value: 'Rally', icon: Truck, label: 'Sturgis Rally' },
                        { value: 'Events', icon: Users, label: 'Events & Groups' },
                        { value: 'General', icon: HelpCircle, label: 'General' },
                      ].map((opt) => {
                        const Icon = opt.icon;
                        const isActive = form.subject === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setForm({ ...form, subject: opt.value })}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 text-sm font-bold ${
                              isActive
                                ? 'border-brand-gold bg-brand-gold/10 text-brand-gold shadow-gold'
                                : 'border-surface-muted bg-surface-secondary/50 text-brand-navy/60 hover:border-brand-gold/30 hover:text-brand-navy'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-brand-gold' : 'text-brand-stone'}`} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all font-medium"
                          aria-label="Name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider mb-1.5 block">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all font-medium"
                          aria-label="Email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all font-medium"
                        aria-label="Phone"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider mb-1.5 block">Your Message *</label>
                      <textarea
                        rows={6}
                        required
                        placeholder="Tell us about your trip plans, questions, or how we can help..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm resize-none transition-all font-medium"
                        aria-label="Message"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-4 flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                        <p className="text-brand-navy/80 text-sm font-medium">Something went wrong. Please try again or call us directly at <a href={`tel:${SITE.phoneTel}`} className="text-brand-gold font-bold hover:underline">{SITE.phone}</a>.</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-gold w-full text-base py-4"
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending Your Message...</>
                      ) : (
                        <><Send className="w-5 h-5 mr-2" />Send Message</>
                      )}
                    </button>

                    <p className="text-center text-xs text-brand-stone">
                      We typically respond within 24 hours. For urgent matters, please call us.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* ── Sidebar (2 cols) — Map + Quick Info ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcoming photo */}
              <div className="rounded-2xl overflow-hidden shadow-lodge-lg border-2 border-white relative aspect-[16/9]">
                <Image
                  src="/images/PeoplePlaying/IMG_7078.jpeg"
                  alt="Guests enjoying activities at Rush No More resort"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lodge-lg border-2 border-white h-[300px] lg:h-[320px]">
                <iframe
                  src={SITE.mapsEmbed}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Rush No More Location"
                />
              </div>

              {/* Directions card */}
              <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center border border-brand-gold/15">
                    <Navigation className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg">Getting Here</h4>
                    <p className="text-xs text-brand-stone">Easy access from I-90</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-brand-navy/80">
                  <div className="flex items-start gap-3 p-3 bg-surface-secondary/50 rounded-lg">
                    <span className="w-6 h-6 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-gold text-xs font-black">1</span>
                    </span>
                    <span className="font-medium">From <strong>I-90</strong>, take <strong>Exit 37</strong> toward Sturgis</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-surface-secondary/50 rounded-lg">
                    <span className="w-6 h-6 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-gold text-xs font-black">2</span>
                    </span>
                    <span className="font-medium">Turn right onto <strong>Brimstone Place</strong></span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-surface-secondary/50 rounded-lg">
                    <span className="w-6 h-6 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-gold text-xs font-black">3</span>
                    </span>
                    <span className="font-medium">Rush No More is on your right — <strong>less than 2 minutes</strong> from the interstate</span>
                  </div>
                </div>
                <a
                  href={SITE.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-center text-sm mt-5"
                >
                  <MapPin className="w-4 h-4 mr-2" /> Open in Google Maps
                </a>
              </div>

              {/* Quick contact */}
              <div className="bg-brand-navy rounded-2xl p-6 text-white">
                <h4 className="font-display font-bold text-lg mb-4">Prefer to Talk?</h4>
                <p className="text-white/60 text-sm mb-5 font-medium">Our friendly team is available during office hours and always happy to help with planning your trip.</p>
                <div className="space-y-3">
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-brand-gold/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center group-hover:bg-brand-gold/30 transition-colors">
                      <Phone className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-white font-bold text-sm block">{SITE.phone}</span>
                      <span className="text-white/40 text-xs">Daily 8 AM – 5 PM MT</span>
                    </div>
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-brand-gold/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center group-hover:bg-brand-gold/30 transition-colors">
                      <Mail className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-white font-bold text-sm block">{SITE.email}</span>
                      <span className="text-white/40 text-xs">We reply within 24 hours</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ FAQ ★
            </span>
            <h2 className="mb-3 text-4xl md:text-5xl">
              Frequently Asked <span className="text-brand-gold italic">Questions</span>
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              Quick answers to the most common questions. Still need help? Send us a message above.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
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
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex items-center justify-between w-full p-5 md:p-6 text-left"
                  >
                    <div className="flex items-center gap-3 flex-1 pr-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isOpen ? 'bg-brand-gold' : 'bg-brand-gold/10'
                      }`}>
                        <HelpCircle className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-brand-gold'}`} />
                      </div>
                      <span className="font-bold text-brand-navy text-sm md:text-base">{faq.q}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-brand-gold transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[4.25rem]">
                      <p className="text-brand-navy/70 text-sm leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          REVIEW HIGHLIGHT
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F5F0E8 0%, #FDFBF7 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-lodge-lg border border-brand-gold/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 rounded-bl-[100px]" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-brand-gold/5 rounded-tr-[70px]" />
            <div className="relative">
              <div className="flex justify-center gap-1.5 mb-5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-brand-gold fill-brand-gold" />)}
              </div>
              <p className="text-lg md:text-2xl text-brand-navy italic leading-relaxed mb-6 font-display font-bold">
                &ldquo;{REVIEWS[1].text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-brand-gold/15 shadow-lodge">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">{REVIEWS[1].title.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="font-display text-brand-navy font-bold text-sm">{REVIEWS[1].title}</p>
                  {REVIEWS[1].source && <span className="text-[10px] font-bold uppercase tracking-wider text-brand-stone">{REVIEWS[1].source}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAP FULL WIDTH ═══ */}
      <section className="h-[400px] relative">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-surface-primary to-transparent z-10" />
        <iframe src={SITE.mapsEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title="Rush No More location" />
      </section>

      <BookingCTA title="Ready to Book Your Stay?" subtitle="RV starts at $41.22 | Cabins starts at $51.76 | Tent from $35/night" />
    </>
  );
}