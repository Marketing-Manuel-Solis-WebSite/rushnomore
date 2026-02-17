import Link from 'next/link';
import { SITE, AMENITIES, REVIEWS, STATS } from '@/data/site';
import { SectionHeader, BookingCTA, StarRating } from '@/components/ui';
import { ExternalLink, MapPin, Mountain, TreePine, Tent, Home, Truck, Phone, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/images/DSC05580-s.webp')" }} />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <span className="badge-gold mb-6 inline-block !bg-brand-gold/20 !text-brand-gold-light animate-fade-in-up">Top-Rated RV Resort in the Black Hills</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-6 leading-[1.1] animate-fade-in-up delay-100">
            Your Base Camp for <span className="text-brand-gold">Mount Rushmore</span> & the Black Hills
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Premium RV sites, cozy cabins & tent camping just minutes from Sturgis, SD. Pool, hot tubs, beer garden & direct trail access.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg px-8 py-4">
              Check Availability <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Phone className="w-5 h-5" />{SITE.phone}
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60 animate-fade-in-up delay-400">
            <span className="flex items-center gap-2"><Mountain className="w-4 h-4 text-brand-gold" /> 55 mi to Mt. Rushmore</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-gold" /> 5 mi to Sturgis</span>
            <span className="flex items-center gap-2"><TreePine className="w-4 h-4 text-brand-gold" /> Adjacent to National Forest</span>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-white border-b border-surface-muted py-8">
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

      {/* ACCOMMODATIONS */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="Accommodations" title="Choose Your Black Hills Stay" subtitle="From premium RV sites with private hot tubs to shaded tent spots." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/stay/rv-sites', icon: Truck, title: 'RV Sites', desc: 'Standard, VIP Deluxe & Presidential Spa. Full hookups, 30/50 AMP, up to 100ft.', price: 'From $53.99/night', img: '/images/rv-camper-van.jpg' },
              { href: '/stay/cabins', icon: Home, title: 'Cabins', desc: 'Presidential cabins sleeping 2-10 guests. Economy to luxury suites.', price: 'From $95/night', img: '/images/cabin-9_800.jpg' },
              { href: '/stay/tent-camping', icon: Tent, title: 'Tent Camping', desc: 'Shaded sites under Ponderosa pines with fire pits & amenity access.', price: 'From $35/night', img: '/images/Wooded-Tent-Area.webp' },
            ].map((s, i) => (
              <Link key={i} href={s.href} className="card-lodge group">
                <div className="aspect-[4/3] bg-surface-secondary relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/10 transition-colors z-10" />
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${s.img}')` }} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2"><s.icon className="w-5 h-5 text-brand-gold" /><h3 className="text-xl">{s.title}</h3></div>
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

      {/* VIDEO + WHY US */}
      <section className="section-pad bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader badge="Why Stay With Us" title="More Than a Campground" center={false} />
            <p className="text-brand-navy/80 text-lg mb-4">Rush No More is a top-rated RV resort in the Black Hills, just minutes from Sturgis and an easy drive to Mount Rushmore, Deadwood, and Custer State Park.</p>
            <p className="text-brand-navy/70 mb-8">Our dedicated team has hosted thousands of happy campers. Premium amenities, gorgeous mountain surroundings, and warm hospitality.</p>
            <div className="grid grid-cols-2 gap-4">
              {[{ val: '5 mi', label: 'to Sturgis' }, { val: '55 mi', label: 'to Mt. Rushmore' }, { val: '12 mi', label: 'to Deadwood' }, { val: '<2 min', label: 'from I-90' }].map((d, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-lodge hover:shadow-lodge-lg transition-shadow">
                  <span className="font-display text-3xl text-brand-gold">{d.val}</span>
                  <p className="text-sm text-brand-stone mt-1">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-video bg-surface-muted rounded-2xl overflow-hidden shadow-lodge-lg">
            <iframe src={SITE.youtube} title="Rush No More Drone Tour" className="w-full h-full" allowFullScreen loading="lazy" />
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="Amenities" title="Everything for the Perfect Stay" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {AMENITIES.slice(0, 8).map((a, i) => (
              <div key={i} className="bg-surface-secondary rounded-xl p-5 text-center hover:bg-brand-cream hover:-translate-y-1 transition-all duration-300">
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

      {/* EXPLORE */}
      <section className="section-pad bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="Explore" title="Gateway to the Black Hills" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: 'Mount Rushmore', d: 'Iconic presidential carvings', dist: '55 mi', href: '/mount-rushmore' },
              { t: 'Deadwood', d: 'Wild West gambling town', dist: '12 mi', href: '/attractions/deadwood' },
              { t: 'Custer State Park', d: '71,000 acres of buffalo & scenic drives', dist: '70 mi', href: '/attractions/custer-state-park' },
              { t: 'Spearfish Canyon', d: 'Waterfalls & fly fishing', dist: '25 mi', href: '/attractions/spearfish-canyon' },
              { t: 'Sturgis Rally', d: '500,000+ riders every August', dist: '5 mi', href: '/events/sturgis-rally' },
              { t: 'Itineraries', d: 'Curated 1-7 day Black Hills plans', dist: '', href: '/itineraries' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="glass rounded-xl p-6 hover:bg-white/10 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-display">{item.t}</h3>
                  {item.dist && <span className="text-xs text-brand-gold uppercase tracking-wider">{item.dist}</span>}
                </div>
                <p className="text-white/60 text-sm mb-4">{item.d}</p>
                <span className="text-brand-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="Reviews" title="What Our Campers Say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card-lodge p-6">
                <StarRating rating={r.rating} />
                <p className="text-brand-navy/70 italic mt-4 mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="font-display text-brand-navy">{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="h-[400px]">
        <iframe src={SITE.mapsEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title="Location" />
      </section>

      <BookingCTA title="Start Your Black Hills Adventure Today" subtitle="RV from $53.99 | Cabins from $95 | Tent from $35/night" />
    </>
  );
}
