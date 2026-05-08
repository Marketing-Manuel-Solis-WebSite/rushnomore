import Link from 'next/link';
import { SITE } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/seo';
import {
  Users, Utensils, Camera, Home, Music, Beer, Calendar,
  Phone, ExternalLink, ArrowRight, CheckCircle, MapPin,
} from 'lucide-react';

const WG_FAQ = [
  { q: 'What group sizes can the pavilion accommodate?', a: 'Our pavilion flexes from intimate gatherings of 20 up to events of 200 guests. Multiple configurations available for weddings, reunions, corporate retreats and private parties.' },
  { q: 'Do you include on-site lodging for group guests?', a: 'Yes. Book cabins, RV sites and tent sites together so your whole group stays on property — ideal for weddings and reunions where guests want to stay close.' },
  { q: 'Can we bring our own caterer?', a: 'Yes. Our venue includes a full commercial kitchen that your caterer can use, or you can DIY for smaller gatherings.' },
  { q: 'Is live music allowed?', a: 'Absolutely — the pavilion is set up for bands, DJs and amplified sound. Respect for quiet hours applies after 10 PM per campground policy.' },
  { q: 'How far in advance should we book a wedding?', a: 'Peak wedding dates (June–September) book 9–12 months out. Contact us early to lock in your date.' },
  { q: 'Is the venue pet-friendly for weddings?', a: 'Many of our cabins and all RV/tent sites are pet-friendly. Service animals are welcome at the pavilion; contact us for pet policies at your specific event.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(WG_FAQ)} />

      <Breadcrumbs items={[{ name: 'Weddings & Groups', url: '/weddings-groups' }]} />

      <section className="relative py-20 md:py-28 overflow-hidden bg-brand-navy text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/EventCenter/IMG_7513.jpeg')" }}
          role="img"
          aria-label="Event center pavilion at Rush No More RV Resort in the Black Hills"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
            ★ Black Hills Event Venue ★
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-5">
            Weddings, Reunions & <span className="text-brand-gold italic">Group Events</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            A Black Hills venue that keeps your whole group together — pavilion for 20–200, full kitchen,
            on-site cabins, RV sites and tent camping. Golden-hour photo backdrops, Ponderosa pines, and
            the same 4.8★ hospitality that made us a top-rated campground.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">What&apos;s Included</h2>
          <div className="w-24 h-1 bg-gold-gradient rounded-full mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, t: 'Groups of 20 to 200', d: 'Pavilion flexes to your headcount — from intimate gatherings to large celebrations.' },
              { icon: Utensils, t: 'Full Commercial Kitchen', d: 'Your caterer can take over, or bring your own for smaller DIY events.' },
              { icon: Camera, t: 'Stunning Photo Spots', d: 'Black Hills backdrops, Ponderosa pines, aerial views and golden-hour magic.' },
              { icon: Home, t: 'On-Site Lodging', d: '20 presidential cabins, 200+ RV sites and 20+ tent sites — all guests together.' },
              { icon: Music, t: 'Live-Music Friendly', d: 'Pavilion wired for bands, DJs and amplified sound systems.' },
              { icon: Beer, t: 'Beer Garden Access', d: 'Your guests enjoy our on-site bar and beer garden throughout the event.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-surface-primary rounded-2xl p-6 border border-brand-gold/15">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t}</h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Event Types We Host</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t: 'Weddings', d: 'Ceremonies and receptions with Black Hills backdrops — golden-hour photos included.' },
              { t: 'Family Reunions', d: 'Keep three generations under one roof — cabins, RVs and tents all within walking distance.' },
              { t: 'Corporate Retreats', d: 'Offsites that don&apos;t feel like work. Pavilion for sessions, trails and pool for breaks.' },
              { t: 'Rehearsal Dinners', d: 'Private pavilion time the night before, with cabin lodging for the wedding party.' },
            ].map((e) => (
              <div key={e.t} className="bg-white rounded-2xl p-6 shadow-lodge border border-brand-gold/10">
                <h3 className="font-display font-bold text-xl mb-3">{e.t}</h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: e.d }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">Location Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { l: '5 mi', d: 'to Main Street Sturgis — Wild West main drag, restaurants, shops' },
              { l: '12 mi', d: 'to Deadwood — casinos, history, rehearsal-dinner dining' },
              { l: '25 mi', d: 'to Spearfish Canyon — waterfalls, photography, fall foliage' },
              { l: '55 mi', d: 'to Mount Rushmore — iconic photo stop for out-of-state guests' },
              { l: '< 2 min', d: 'from I-90 Exit 37 — easy arrival for guests from any direction' },
              { l: '30 mi', d: 'to Rapid City Regional Airport — nearest commercial hub' },
            ].map((x) => (
              <div key={x.l} className="flex gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-1" />
                <div>
                  <span className="block font-display text-2xl font-bold text-brand-gold">{x.l}</span>
                  <span className="block text-sm text-white/70">{x.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Planning FAQ</h2>
          <div className="space-y-3">
            {WG_FAQ.map((f) => (
              <details key={f.q} className="group bg-surface-primary rounded-xl p-5 border border-brand-gold/10">
                <summary className="font-bold cursor-pointer flex justify-between">
                  {f.q}
                  <span className="text-brand-gold group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-brand-navy/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-10 h-10 text-brand-gold mx-auto mb-5" />
          <h2 className="text-3xl font-display font-bold mb-4">Start Planning Your Event</h2>
          <p className="text-brand-navy/70 max-w-2xl mx-auto mb-8">
            Call us to discuss your date, guest count and event type — we&apos;ll walk through pavilion
            configurations, lodging blocks and what makes a Black Hills event unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold hover:brightness-110 transition-all uppercase tracking-wider">
              <Phone className="w-5 h-5" /> Call {SITE.phone}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy rounded-xl hover:bg-brand-navy hover:text-white transition-all font-bold uppercase tracking-wider text-sm">
              Send Inquiry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <BookingCTA title="Book Your Black Hills Event" subtitle="Weddings, reunions, corporate retreats — all welcome." />
    </>
  );
}
