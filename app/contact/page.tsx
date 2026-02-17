'use client';

import { useState } from 'react';
import { SITE } from '@/data/site';
import { Breadcrumbs } from '@/components/ui';
import { submitContactForm, trackEvent } from '@/lib/booking';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await submitContactForm(form);
    if (result.success) {
      setStatus('success');
      trackEvent('form_submit', { form_type: 'contact' });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <section className="relative py-16 md:py-24 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="mb-4">Contact Us</h1>
          <p className="text-lg text-white/70">We are here for you&hellip;</p>
        </div>
      </section>
      <section className="py-12 bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: 'Location', content: '21137 Brimstone Place\nSturgis, SD 57785', action: 'Get Directions', href: SITE.maps },
            { icon: Mail, title: 'Email', content: SITE.email, action: 'Send Email', href: `mailto:${SITE.email}` },
            { icon: Phone, title: 'Phone', content: SITE.phone, action: 'Call Now', href: `tel:${SITE.phoneTel}` },
          ].map((card, i) => (
            <div key={i} className="card-lodge p-8 text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <card.icon className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-lg mb-2">{card.title}</h3>
              <p className="text-brand-stone text-sm mb-4 whitespace-pre-line">{card.content}</p>
              <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="btn-gold text-sm">{card.action}</a>
            </div>
          ))}
        </div>
      </section>
      <section className="section-pad bg-surface-secondary">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="mb-6">Send Us a Message</h2>
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-600">We will get back to you shortly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all" aria-label="Name" />
                  <input type="email" required placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all" aria-label="Email" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all" aria-label="Phone" />
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-surface-muted bg-white focus:border-brand-gold outline-none text-sm" aria-label="Subject">
                    <option value="">Select topic</option>
                    <option value="Reservation">Reservation</option>
                    <option value="Rally">Sturgis Rally</option>
                    <option value="Events">Events & Groups</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <textarea rows={5} required placeholder="Message *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-surface-muted bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm resize-none transition-all" aria-label="Message" />
                {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please call us at {SITE.phone}.</p>}
                <button onClick={handleSubmit} disabled={status === 'loading'} className="btn-gold">
                  {status === 'loading' ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                </button>
              </div>
            )}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lodge-lg h-[400px] lg:h-auto min-h-[350px]">
            <iframe src={SITE.mapsEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title="Rush No More Location" />
          </div>
        </div>
      </section>
    </>
  );
}
