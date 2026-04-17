import Link from 'next/link';
import { ITINERARY } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Black Hills 6-Day Itinerary', url: '/black-hills-itinerary' }]} />

      <section className="relative bg-brand-navy text-white py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/DSC05580-s.png')" }}
          role="img"
          aria-label="Mount Rushmore National Memorial in the Black Hills of South Dakota"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
            ★ 6-Day Black Hills Plan ★
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-5">
            The Complete <span className="text-brand-gold italic">Black Hills</span> Itinerary
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Six days, every major attraction, zero wasted drive time. Based out of Rush No More in Sturgis —
            the central basecamp that keeps every day a short drive from camp.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid gap-6">
            {ITINERARY.map((day) => (
              <article
                key={day.day}
                className="bg-surface-primary rounded-2xl p-6 md:p-8 border border-brand-gold/15 shadow-lodge"
              >
                <header className="flex items-center gap-5 mb-5">
                  <div className="w-16 h-16 bg-brand-gold text-white rounded-2xl flex items-center justify-center font-display font-bold text-2xl flex-shrink-0">
                    {day.day}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-navy leading-tight">
                      {day.title}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.15em] text-brand-gold font-black mt-1">
                      {day.sub}
                    </p>
                  </div>
                </header>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {day.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-navy/80 bg-white rounded-lg px-4 py-2.5 border border-brand-gold/10">
                      <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-10">Deep-Dive Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { t: 'Deadwood Day Trip', h: '/deadwood-day-trip', d: 'Gold-rush history, casinos and the Adams Museum — 12 miles from camp.' },
              { t: 'Spearfish Canyon Guide', h: '/spearfish-canyon-guide', d: 'Bridal Veil Falls, Roughlock Falls and the 20-mile scenic byway.' },
              { t: 'Needles Highway Guide', h: '/needles-highway-guide', d: 'Granite spires, narrow tunnels and the iconic Needles Eye.' },
              { t: 'Iron Mountain Road Guide', h: '/iron-mountain-road-guide', d: 'Pigtail bridges and framed Rushmore views along US-16A.' },
              { t: 'Best Rides Near Sturgis', h: '/best-motorcycle-rides-near-sturgis', d: 'The classic rides every Sturgis rider has to do at least once.' },
              { t: 'All Attractions', h: '/explore', d: 'The full Black Hills attractions hub with distances and tips.' },
            ].map((g) => (
              <Link key={g.h} href={g.h} className="group bg-white rounded-2xl p-6 shadow-lodge border border-brand-gold/10 hover:shadow-gold-lg transition-all">
                <h3 className="font-display font-bold text-lg mb-2">{g.t}</h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed mb-3">{g.d}</p>
                <span className="inline-flex items-center gap-1.5 text-brand-gold font-bold text-sm uppercase tracking-wider">
                  Read guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Clock className="w-10 h-10 text-brand-gold mx-auto mb-5" />
          <h2 className="text-3xl font-display font-bold mb-4">Centrally Located Basecamp</h2>
          <p className="text-white/75 max-w-2xl mx-auto mb-8">
            Every day on this itinerary keeps you under 90 minutes from camp. Check in once, unpack once,
            and explore without hotel-hopping.
          </p>
          <Link href="/stay" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-gold uppercase tracking-wider">
            Choose Your Stay <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <BookingCTA title="Plan Your Black Hills Week" subtitle="Book RV, cabin or tent — then follow the itinerary." />
    </>
  );
}
