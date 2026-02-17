import Link from 'next/link';
import { SITE, AMENITIES, REVIEWS, STATS } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { HeroSection } from '@/components/layout/HeroSection';
import { ExternalLink, MapPin, Mountain, TreePine, Tent, Home, Truck, Phone, Star, ArrowRight } from 'lucide-react';

/* ── Server Component: zero JS for 90% of the page ── */
export default function HomePage() {
  return (
    <>
      {/* ═══ HERO — only client island ═══ */}
      <HeroSection />

      {/* ═══ SOCIAL PROOF BAR ═══ */}
      <section className="bg-white border-b border-surface-muted py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-brand-gold fill-brand-gold" />)}</div>
            <span className="text-sm text-brand-stone">4.8/5 on TripAdvisor</span>
          </div>
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <span className="font-display text-2xl text-brand-navy">{s.value}</span>
              <span className="text-xs text-brand-stone block uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ACCOMMODATIONS ═══ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="badge-gold mb-4 inline-block">Accommodations</span>
            <h2 className="mb-3">Choose Your Black Hills Stay</h2>
            <p className="text-brand-stone text-lg max-w-2xl mx-auto">From premium RV sites with private hot tubs to shaded tent spots.</p>
            <div className="divider-gold-wide mt-5 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/stay/rv-sites', Icon: Truck, title: 'RV Sites', desc: 'Standard, VIP Deluxe & Presidential Spa. Full hookups, 30/50 AMP, up to 100ft.', price: 'From $53.99/night', img: '/images/RushMore-rv-camper-van.png' },
              { href: '/stay/cabins', Icon: Home, title: 'Cabins', desc: 'Presidential cabins sleeping 2-10 guests. Economy to luxury suites.', price: 'From $95/night', img: '/images/cabin-9_800.jpg' },
              { href: '/stay/tent-camping', Icon: Tent, title: 'Tent Camping', desc: 'Shaded sites under Ponderosa pines with fire pits & amenity access.', price: 'From $35/night', img: '/images/Wooded-Tent-Area.webp' },
            ].map((s, i) => (
              <Link key={i} href={s.href} className="card-premium group block">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/10 transition-colors z-10" />
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${s.img}')` }} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2"><s.Icon className="w-5 h-5 text-brand-gold" /><h3 className="text-xl">{s.title}</h3></div>
                  <p className="text-brand-stone text-sm mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-gold font-display text-lg">{s.price}</span>
                    <ArrowRight className="w-5 h-5 text-brand-stone group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO + WHY US ═══ */}
      <section className="section-pad bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-12">
              <span className="badge-gold mb-4 inline-block">Why Stay With Us</span>
              <h2 className="mb-3">More Than a Campground</h2>
              <div className="divider-gold-wide mt-5" />
            </div>
            <p className="text-brand-navy/80 text-lg mb-4">Rush No More is a top-rated RV resort in the Black Hills, just minutes from Sturgis and an easy drive to Mount Rushmore, Deadwood, and Custer State Park.</p>
            <p className="text-brand-navy/70 mb-8">Our dedicated team has hosted thousands of happy campers. Premium amenities, gorgeous mountain surroundings, and warm hospitality.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '5 mi', label: 'to Sturgis' },
                { val: '55 mi', label: 'to Mt. Rushmore' },
                { val: '12 mi', label: 'to Deadwood' },
                { val: '<2 min', label: 'from I-90' },
              ].map((d, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-lodge hover:shadow-gold transition-shadow duration-300">
                  <span className="font-display text-3xl text-brand-gold">{d.val}</span>
                  <p className="text-sm text-brand-stone mt-1">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lodge-lg">
            <div className="aspect-video bg-surface-secondary">
              <iframe src={SITE.youtube} title="Rush No More Drone Tour" className="w-full h-full" allowFullScreen loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AMENITIES ═══ */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="badge-gold mb-4 inline-block">Amenities</span>
            <h2 className="mb-3">Everything for the Perfect Stay</h2>
            <div className="divider-gold-wide mt-5 mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {AMENITIES.slice(0, 8).map((a, i) => (
              <div key={i} className="bg-surface-secondary rounded-xl p-5 text-center hover:bg-brand-cream hover:-translate-y-1 hover:shadow-gold transition-all duration-300">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-gold text-lg font-bold">&#9733;</span>
                </div>
                <h4 className="font-bold text-sm mb-1">{a.title}</h4>
                <p className="text-xs text-brand-stone">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/amenities" className="btn-outline text-sm">View All 16 Amenities <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* ═══ EXPLORE ═══ */}
      <section className="section-pad bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="badge-gold mb-4 inline-block !bg-brand-gold/20 !text-brand-gold-light">Explore</span>
            <h2 className="mb-3 text-white">Gateway to the Black Hills</h2>
            <div className="divider-gold-wide mt-5 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: 'Mount Rushmore', d: 'Iconic presidential carvings', dist: '55 mi', href: '/explore#mount-rushmore' },
              { t: 'Deadwood', d: 'Wild West gambling town', dist: '12 mi', href: '/explore#deadwood' },
              { t: 'Custer State Park', d: '71,000 acres of buffalo & scenic drives', dist: '70 mi', href: '/explore#custer-state-park' },
              { t: 'Spearfish Canyon', d: 'Waterfalls & fly fishing', dist: '25 mi', href: '/explore#spearfish-canyon' },
              { t: 'Sturgis Rally', d: '500,000+ riders every August', dist: '5 mi', href: '/explore#sturgis-rally' },
              { t: 'All Attractions', d: 'Browse all Black Hills experiences', dist: '', href: '/explore' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group block">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-display">{item.t}</h3>
                  {item.dist && <span className="text-xs text-brand-gold uppercase tracking-wider">{item.dist}</span>}
                </div>
                <p className="text-white/60 text-sm mb-4">{item.d}</p>
                <span className="text-brand-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-16 bg-surface-secondary">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={i}>
              <p className="font-display text-4xl md:text-5xl text-brand-gold mb-2">{s.value}</p>
              <p className="text-sm text-brand-stone uppercase tracking-wider font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="badge-gold mb-4 inline-block">Reviews</span>
            <h2 className="mb-3">What Our Campers Say</h2>
            <div className="divider-gold-wide mt-5 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div key={i} className="card-lodge p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, j) => <Star key={j} className={`w-4 h-4 ${j < r.rating ? 'text-brand-gold fill-brand-gold' : 'text-surface-muted'}`} />)}</div>
                  {r.source && <span className="text-[10px] font-bold uppercase tracking-wider text-brand-stone bg-surface-secondary px-2 py-1 rounded">{r.source}</span>}
                </div>
                <p className="text-brand-navy/70 italic mb-4 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <p className="font-display text-brand-navy font-bold">{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="h-[400px]">
        <iframe src={SITE.mapsEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title="Location" />
      </section>

      <BookingCTA title="Start Your Black Hills Adventure Today" subtitle="RV from $53.99 | Cabins from $95 | Tent from $35/night" />
    </>
  );
}
