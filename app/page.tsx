import Link from 'next/link';
import { SITE, AMENITIES, REVIEWS, STATS } from '@/data/site';
import { BookingCTA } from '@/components/ui';
import { HeroSection } from '@/components/layout/HeroSection';
import { ExternalLink, MapPin, Mountain, TreePine, Tent, Home, Truck, Phone, Star, ArrowRight, Users, Zap, Waves, Beer, ShieldCheck, Wifi, PawPrint, Clock, Navigation, Award, Heart, ThumbsUp, CheckCircle, Flame, Bike, Gamepad2, Quote, Calendar, Route } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ═══ SOCIAL PROOF BAR ═══ */}
      <section className="bg-brand-navy text-white py-5 border-b-4 border-brand-gold">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <div className="flex -space-x-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-brand-gold fill-brand-gold" />)}</div>
            <span className="text-sm font-bold text-white/90">4.8/5 on TripAdvisor</span>
          </div>
          {STATS.map((s, i) => (
            <div key={i} className="text-center px-3">
              <span className="font-display text-3xl text-brand-gold font-bold">{s.value}</span>
              <span className="text-[10px] text-white/50 block uppercase tracking-widest font-bold">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ACCOMMODATIONS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 40%, #FDFBF7 100%)' }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Accommodations ★
            </span>
            <h2 className="mb-5 text-4xl md:text-6xl leading-tight">
              Choose Your <br className="hidden md:block" />
              <span className="text-brand-gold italic">Black Hills</span> Stay
            </h2>
            <p className="text-brand-navy/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Three unique ways to experience the Black Hills — each with full amenity access, stunning mountain surroundings, and genuine Rush No More hospitality.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-6 mx-auto" />
          </div>

          <div className="space-y-10">

            {/* ── RV SITES ── */}
            <Link href="/stay/rv-sites" className="group block relative rounded-3xl overflow-hidden shadow-lodge-lg hover:shadow-gold-lg transition-all duration-700 border-2 border-transparent hover:border-brand-gold/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] md:min-h-[540px]">
                <div className="relative overflow-hidden min-h-[320px] lg:min-h-full">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110" style={{ backgroundImage: "url('/images/RushMore-rv-camper-van.png')" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-brand-navy/10 lg:to-brand-navy/40" />
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md text-white rounded-full text-xs font-black uppercase tracking-wider border border-white/20 shadow-lodge">
                      <Truck className="w-4 h-4 text-brand-gold" /> RV Resort
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 lg:hidden bg-gradient-to-t from-brand-navy/90 to-transparent">
                    <span className="font-display text-4xl text-white font-bold">Starts at $41.22</span>
                    <span className="text-white/70 text-sm block">per night · Full hookups included</span>
                  </div>
                </div>
                <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center bg-white">
                  <div className="absolute top-0 right-0 w-40 h-40">
                    <div className="absolute top-0 right-0 w-full h-full bg-brand-gold/5 rounded-bl-[100px]" />
                    <div className="absolute top-3 right-3 w-20 h-20 bg-brand-gold/5 rounded-bl-[50px]" />
                  </div>
                  <div className="absolute left-0 top-10 bottom-10 w-1.5 bg-gold-gradient rounded-r-full hidden lg:block" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 bg-brand-gold/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/20">
                        <Truck className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight">RV Sites</h3>
                        <p className="text-xs text-brand-gold uppercase tracking-[0.15em] font-black mt-0.5">Standard · Luxury · Luxury Spa</p>
                      </div>
                    </div>
                    <p className="text-brand-navy/80 text-base md:text-lg leading-relaxed mb-6 font-medium">
                      Full hookups with 30/50 AMP service and pull-throughs up to 100ft. Luxury sites feature cement slabs with gas BBQ grills.
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 mb-7">
                      {['Full Hookups (W/E/S)', '30 & 50 AMP Service', 'Pull-Through up to 100ft', 'Cement Slabs (Luxury)', 'Gas BBQ on Luxury Sites', 'Private Hot Tub (Spa)'].map((f, i) => (
                        <span key={i} className="flex items-center gap-2.5 text-sm text-brand-navy/80 bg-surface-secondary/80 backdrop-blur-sm px-3 py-2 rounded-lg font-medium border border-surface-muted/30">
                          <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-5 border-t-2 border-brand-gold/20">
                      <div className="hidden lg:block">
                        <span className="font-display text-4xl text-brand-gold font-bold">Starts at $41.22</span>
                        <span className="text-sm text-brand-stone block font-semibold">per night · 50 AMP from $59.99</span>
                      </div>
                      <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gold text-white font-bold text-sm rounded-xl shadow-gold group-hover:shadow-gold-lg group-hover:brightness-110 transition-all duration-500 uppercase tracking-wider">
                        Explore RV Sites <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* ── CABINS ── */}
            <Link href="/stay/cabins" className="group block relative rounded-3xl overflow-hidden shadow-lodge-lg hover:shadow-gold-lg transition-all duration-700 border-2 border-transparent hover:border-brand-gold/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] md:min-h-[540px]">
                <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center bg-white order-2 lg:order-1">
                  <div className="absolute top-0 left-0 w-40 h-40">
                    <div className="absolute top-0 left-0 w-full h-full bg-brand-gold/5 rounded-br-[100px]" />
                    <div className="absolute top-3 left-3 w-20 h-20 bg-brand-gold/5 rounded-br-[50px]" />
                  </div>
                  <div className="absolute right-0 top-10 bottom-10 w-1.5 bg-gold-gradient rounded-l-full hidden lg:block" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 bg-brand-gold/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/20">
                        <Home className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight">Presidential Cabins</h3>
                        <p className="text-xs text-brand-gold uppercase tracking-[0.15em] font-black mt-0.5">Named After US Presidents</p>
                      </div>
                    </div>
                    <p className="text-brand-navy/80 text-base md:text-lg leading-relaxed mb-6 font-medium">
                      Each cabin named after a US President — from cozy economy units for couples to <strong className="text-brand-navy">full luxury suites sleeping up to 10 guests</strong>. Perfect for families, reunions, and anyone who wants comfort without sacrificing the outdoors.
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 mb-7">
                      {['Sleeps 2 to 10 Guests', 'Full Kitchens Available', 'A/C & Heating', 'Private Bathrooms', 'Pet-Friendly Options', '16 Unique Cabins'].map((f, i) => (
                        <span key={i} className="flex items-center gap-2.5 text-sm text-brand-navy/80 bg-surface-secondary/80 backdrop-blur-sm px-3 py-2 rounded-lg font-medium border border-surface-muted/30">
                          <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-5 border-t-2 border-brand-gold/20">
                      <div>
                        <span className="font-display text-4xl text-brand-gold font-bold">Starts at $51.76</span>
                        <span className="text-sm text-brand-stone block font-semibold">per night · Up to $335 for luxury</span>
                      </div>
                      <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gold text-white font-bold text-sm rounded-xl shadow-gold group-hover:shadow-gold-lg group-hover:brightness-110 transition-all duration-500 uppercase tracking-wider">
                        View Cabins <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden min-h-[320px] lg:min-h-full order-1 lg:order-2">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110" style={{ backgroundImage: "url('/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png')" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-brand-navy/10 lg:to-brand-navy/40" />
                  <div className="absolute top-5 right-5 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md text-white rounded-full text-xs font-black uppercase tracking-wider border border-white/20 shadow-lodge">
                      <Users className="w-4 h-4 text-brand-gold" /> 2-10 Guests
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 lg:hidden bg-gradient-to-t from-brand-navy/90 to-transparent">
                    <span className="font-display text-4xl text-white font-bold">Starts at $51.76</span>
                    <span className="text-white/70 text-sm block">per night · 16 unique cabins</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* ── TENT CAMPING ── */}
            <Link href="/stay/tent-camping" className="group block relative rounded-3xl overflow-hidden shadow-lodge-lg hover:shadow-gold-lg transition-all duration-700 border-2 border-transparent hover:border-brand-gold/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] md:min-h-[540px]">
                <div className="relative overflow-hidden min-h-[320px] lg:min-h-full">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110" style={{ backgroundImage: "url('/images/tent_camping_RNM.png')" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-brand-navy/10 lg:to-brand-navy/40" />
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md text-white rounded-full text-xs font-black uppercase tracking-wider border border-white/20 shadow-lodge">
                      <TreePine className="w-4 h-4 text-brand-gold" /> Pine Forest
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 lg:hidden bg-gradient-to-t from-brand-navy/90 to-transparent">
                    <span className="font-display text-4xl text-white font-bold">From $35</span>
                    <span className="text-white/70 text-sm block">per night · Best value</span>
                  </div>
                </div>
                <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center bg-white">
                  <div className="absolute top-0 right-0 w-40 h-40">
                    <div className="absolute top-0 right-0 w-full h-full bg-brand-gold/5 rounded-bl-[100px]" />
                    <div className="absolute top-3 right-3 w-20 h-20 bg-brand-gold/5 rounded-bl-[50px]" />
                  </div>
                  <div className="absolute left-0 top-10 bottom-10 w-1.5 bg-gold-gradient rounded-r-full hidden lg:block" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 bg-brand-gold/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 border border-brand-gold/20">
                        <Tent className="w-7 h-7 text-brand-gold group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight">Tent Camping</h3>
                        <p className="text-xs text-brand-gold uppercase tracking-[0.15em] font-black mt-0.5">Under the Ponderosa Pines</p>
                      </div>
                    </div>
                    <p className="text-brand-navy/80 text-base md:text-lg leading-relaxed mb-6 font-medium">
                      Wake up to fresh mountain air under towering Ponderosa pines. Spacious, level sites with <strong className="text-brand-navy">full access to every resort amenity</strong> — pool, hot tubs, beer garden, bathhouses, and more. 15 of 20 sites have electricity.
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 mb-7">
                      {['Shaded Pine Forest', '15 Sites with Electric', 'Water Hookups Nearby', 'Clean Bathhouses', 'Pool & Hot Tub Access', 'Hiking Trail Access'].map((f, i) => (
                        <span key={i} className="flex items-center gap-2.5 text-sm text-brand-navy/80 bg-surface-secondary/80 backdrop-blur-sm px-3 py-2 rounded-lg font-medium border border-surface-muted/30">
                          <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-5 border-t-2 border-brand-gold/20">
                      <div className="hidden lg:block">
                        <span className="font-display text-4xl text-brand-gold font-bold">From $35</span>
                        <span className="text-sm text-brand-stone block font-semibold">per night · Electric +$5</span>
                      </div>
                      <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gold text-white font-bold text-sm rounded-xl shadow-gold group-hover:shadow-gold-lg group-hover:brightness-110 transition-all duration-500 uppercase tracking-wider">
                        View Tent Sites <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick compare */}
          <div className="mt-14 bg-brand-navy/95 backdrop-blur-xl rounded-2xl shadow-lodge-xl p-6 md:p-8 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="text-white">
                <h4 className="font-display text-xl font-bold mb-1">Quick Compare</h4>
                <p className="text-xs text-white/40 uppercase tracking-wider font-bold">All include full amenity access</p>
              </div>
              {[
                { type: 'RV Sites', price: 'Starts at $41.22', icon: Truck, href: '/stay/rv-sites' },
                { type: 'Cabins', price: 'Starts at $51.76', icon: Home, href: '/stay/cabins' },
                { type: 'Tent', price: 'From $35', icon: Tent, href: '/stay/tent-camping' },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-brand-gold/30 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-300 border border-white/10">
                    <item.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-white block">{item.type}</span>
                    <span className="text-brand-gold font-display text-lg font-bold">{item.price}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-brand-gold transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY STAY WITH US + VIDEO (original size, autoplay)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F5F0E8 0%, #FDFBF7 30%, #F5F0E8 70%, #FDFBF7 100%)' }}>
        <div className="absolute top-20 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-brand-navy/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4">
          {/* Intro + Image mosaic */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div>
              <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
                ★ Why Rush No More ★
              </span>
              <h2 className="mb-5 text-4xl md:text-5xl leading-tight">
                More Than a <br /><span className="text-brand-gold italic">Campground</span>
              </h2>
              <div className="w-32 h-1.5 bg-gold-gradient rounded-full mb-6" />
              <p className="text-brand-navy/80 text-lg mb-4 leading-relaxed font-medium">Rush No More is a top-rated RV resort nestled in the beautiful Black Hills of South Dakota. Just minutes from Sturgis and an easy drive to Mount Rushmore, Deadwood, Custer State Park, and Spearfish Canyon.</p>
              <p className="text-brand-navy/70 mb-8 leading-relaxed font-medium">Our dedicated team has hosted thousands of happy campers. We combine premium amenities, gorgeous mountain surroundings, and genuine warm hospitality to create an experience you&apos;ll never forget.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Award, text: 'Top-rated on TripAdvisor & Google' },
                  { icon: Heart, text: 'Family-owned, personal service' },
                  { icon: ShieldCheck, text: '24/7 security & peace of mind' },
                  { icon: ThumbsUp, text: '4,200+ happy campers & counting' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/70 backdrop-blur-sm border border-brand-gold/15 shadow-lodge hover:shadow-gold hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-10 h-10 bg-brand-gold/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 border border-brand-gold/15">
                      <item.icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <span className="text-sm text-brand-navy font-bold">{item.text}</span>
                  </div>
                ))}
              </div>

              <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold text-base rounded-xl shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all duration-300 uppercase tracking-wider">
                Book Your Stay <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* Image mosaic */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-3 md:space-y-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/DSC05580-s.png')" }} />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/rv-camper-van.png')" }} />
                  </div>
                </div>
                <div className="space-y-3 md:space-y-4 pt-10">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/PhotoMainTheThomasJefferson.jpeg')" }} />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lodge-lg group border-2 border-white">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/images/Wooded-Tent-Area.png')" }} />
                  </div>
                </div>
              </div>
              {/* Floating glassmorphic stat */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-lodge-xl flex items-center gap-6 z-10 border border-brand-gold/20">
                <div className="text-center">
                  <span className="font-display text-2xl text-brand-gold font-bold block">84</span>
                  <span className="text-[9px] text-brand-stone uppercase tracking-widest font-bold">Rallies</span>
                </div>
                <div className="w-px h-10 bg-brand-gold/20" />
                <div className="text-center">
                  <span className="font-display text-2xl text-brand-gold font-bold block">4,200+</span>
                  <span className="text-[9px] text-brand-stone uppercase tracking-widest font-bold">Campers</span>
                </div>
                <div className="w-px h-10 bg-brand-gold/20" />
                <div className="text-center">
                  <span className="font-display text-2xl text-brand-gold font-bold block">4.8★</span>
                  <span className="text-[9px] text-brand-stone uppercase tracking-widest font-bold">Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Distance cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { val: '5 mi', label: 'to Sturgis', sub: '~7 min drive', icon: MapPin },
              { val: '55 mi', label: 'to Mt. Rushmore', sub: '~1 hour scenic', icon: Mountain },
              { val: '12 mi', label: 'to Deadwood', sub: '~15 min drive', icon: Navigation },
              { val: '<2 min', label: 'from I-90 Exit 37', sub: 'Easy access', icon: Zap },
            ].map((d, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lodge hover:shadow-gold hover:-translate-y-1 transition-all duration-300 text-center group border border-brand-gold/10 hover:border-brand-gold/30">
                <div className="w-12 h-12 bg-brand-gold/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-300 border border-brand-gold/15">
                  <d.icon className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <span className="font-display text-4xl md:text-5xl text-brand-gold block font-bold">{d.val}</span>
                <p className="text-sm text-brand-navy font-bold mt-2">{d.label}</p>
                <p className="text-xs text-brand-stone mt-1 font-medium">{d.sub}</p>
              </div>
            ))}
          </div>

          {/* Video — original embedded size, autoplay muted */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
                ★ Take a Tour ★
              </span>
              <h2 className="mb-4">See Our Resort <span className="text-brand-gold italic">From Above</span></h2>
              <div className="w-24 h-1 bg-gold-gradient rounded-full mb-6" />
              <p className="text-brand-navy/70 text-lg leading-relaxed font-medium mb-6">Take a drone tour of our beautiful resort and see why thousands choose Rush No More as their Black Hills home base.</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { img: '/images/vip-site.png', label: 'Luxury Sites' },
                  { img: '/images/Jacuzzi/IMG_7205.jpeg', label: 'Spa Sites' },
                  { img: '/images/Aereal-2_1400.png', label: 'Aerial View' },
                ].map((thumb, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-lodge group border border-brand-gold/10">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110 relative" style={{ backgroundImage: `url('${thumb.img}')` }}>
                      <div className="absolute inset-0 bg-brand-navy/40 flex items-end p-2">
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">{thumb.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lodge-xl border-2 border-white">
              <div className="aspect-video bg-brand-navy">
                <iframe
                  src={`${SITE.youtube}&autoplay=1&mute=1&loop=1&playlist=qfQcJnSybqQ`}
                  title="Rush No More RV Resort Drone Tour — Aerial view of campground, pool, cabins and RV sites in the Black Hills"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AMENITIES ═══ */}
      <section className="py-24 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ 16 Amenities ★
            </span>
            <h2 className="mb-3">Everything for the <span className="text-brand-gold italic">Perfect</span> Stay</h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">All resort amenities included with every stay — no hidden fees.</p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            {[
              { icon: Waves, title: 'Pool & Hot Tubs', desc: 'Cool off or soak under the Black Hills stars' },
              { icon: Beer, title: 'Beer Garden', desc: 'Relax with a cold one after a day of adventure' },
              { icon: Wifi, title: 'Free Wi-Fi', desc: 'Stay connected throughout the entire park' },
              { icon: PawPrint, title: 'Pet Friendly', desc: 'Your furry family members are welcome' },
            ].map((a, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm border-2 border-brand-gold/15 rounded-2xl p-6 text-center hover:bg-white hover:-translate-y-2 hover:shadow-gold hover:border-brand-gold/30 transition-all duration-300 group shadow-lodge">
                <div className="w-16 h-16 bg-brand-gold/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-300 border border-brand-gold/15">
                  <a.icon className="w-8 h-8 text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-base mb-1">{a.title}</h4>
                <p className="text-xs text-brand-stone font-medium">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Flame, title: 'Propane Campfires', desc: 'Propane & charcoal only' },
              { icon: Gamepad2, title: 'Game Room', desc: 'Fun for the whole family' },
              { icon: Bike, title: 'Bike Wash', desc: 'Keep your ride clean' },
              { icon: ShieldCheck, title: '24/7 Security', desc: 'Safe and secure always' },
            ].map((a, i) => (
              <div key={i} className="bg-surface-secondary/80 backdrop-blur-sm border border-surface-muted/50 rounded-2xl p-5 text-center hover:bg-white hover:-translate-y-1 hover:shadow-gold hover:border-brand-gold/20 transition-all duration-300 group">
                <div className="w-12 h-12 bg-brand-gold/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-gold/20 group-hover:scale-110 transition-all duration-300 border border-brand-gold/10">
                  <a.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h4 className="font-bold text-sm mb-1">{a.title}</h4>
                <p className="text-xs text-brand-stone">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/amenities" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition-all duration-300 uppercase tracking-wider text-sm">
              View All 16 Amenities <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ EXPLORE ═══ */}
      <section className="py-24 md:py-32 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Explore ★
            </span>
            <h2 className="mb-3 text-white text-4xl md:text-5xl">Gateway to the <span className="text-brand-gold italic">Black Hills</span></h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium">World-class attractions are all an easy drive from Rush No More.</p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { t: 'Mount Rushmore', d: 'The iconic presidential carvings — evening lighting ceremony is a must-see.', dist: '55 mi', time: '~1 hour', href: '/explore#mount-rushmore', img: '/images/DSC05580-s.png' },
              { t: 'Deadwood', d: '80+ gaming halls, Adams Museum, gold panning, and Wild West history.', dist: '12 mi', time: '~15 min', href: '/explore#deadwood', img: '/images/GeneralImagesPark/IMG_7316.jpeg' },
              { t: 'Custer State Park', d: '71,000 acres with 1,300 buffalo, Needles Highway & Sylvan Lake.', dist: '70 mi', time: '~1.5 hrs', href: '/explore#custer-state-park', img: '/images/Wooded-Tent-Area.png' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/40 transition-all duration-500 hover:-translate-y-1 bg-white/5 backdrop-blur-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${item.img}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-brand-gold-light border border-white/20">{item.dist}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-display text-white font-bold">{item.t}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/60 text-sm mb-4 leading-relaxed font-medium">{item.d}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-white/40 font-bold"><Clock className="w-3.5 h-3.5" /> {item.time}</span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-brand-gold text-xs font-bold rounded-full group-hover:bg-brand-gold group-hover:text-white transition-all duration-300 uppercase tracking-wider border border-white/10 group-hover:border-brand-gold">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'Spearfish Canyon', d: 'Waterfalls, fly fishing & 20-mile scenic drive', dist: '25 mi', href: '/explore#spearfish-canyon' },
              { t: 'Sturgis Rally', d: '500,000+ riders every August — we are rally HQ', dist: '5 mi', href: '/explore#sturgis-rally' },
              { t: 'All Attractions', d: 'Browse every Black Hills experience', dist: '', href: '/explore' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group block border border-white/10 hover:border-brand-gold/30">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-display font-bold">{item.t}</h3>
                  {item.dist && <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-brand-gold text-[10px] font-black uppercase tracking-wider rounded-full border border-white/10">{item.dist}</span>}
                </div>
                <p className="text-white/50 text-sm mb-4 font-medium">{item.d}</p>
                <span className="text-brand-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all font-bold">Learn more <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="py-24 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 50%, #FDFBF7 100%)' }}>
        <div className="absolute top-10 left-10 text-brand-gold/[0.04]"><Quote className="w-48 h-48" /></div>
        <div className="absolute bottom-10 right-10 text-brand-gold/[0.04] rotate-180"><Quote className="w-48 h-48" /></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Reviews ★
            </span>
            <h2 className="mb-3">What Our <span className="text-brand-gold italic">Campers</span> Say</h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">Don&apos;t just take our word for it — hear from thousands of happy guests.</p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          {/* Featured review */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-14 mb-8 relative overflow-hidden shadow-lodge-lg border border-brand-gold/15">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-bl-[120px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-tr-[80px]" />
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1.5 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-7 h-7 text-brand-gold fill-brand-gold" />)}
              </div>
              <p className="text-xl md:text-3xl text-brand-navy italic leading-relaxed mb-8 font-display font-bold">
                &ldquo;{REVIEWS[0].text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-brand-gold/15 shadow-lodge">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">{REVIEWS[0].title.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="font-display text-brand-navy font-bold text-sm">{REVIEWS[0].title}</p>
                  {REVIEWS[0].source && <span className="text-[10px] font-bold uppercase tracking-wider text-brand-stone">{REVIEWS[0].source}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(1, 4).map((r, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 shadow-lodge border border-white/50 hover:shadow-gold-lg hover:-translate-y-1 hover:border-brand-gold/20 transition-all duration-500">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">{Array.from({ length: 5 }, (_, j) => <Star key={j} className={`w-5 h-5 ${j < r.rating ? 'text-brand-gold fill-brand-gold' : 'text-surface-muted'}`} />)}</div>
                  {r.source && <span className="text-[10px] font-black uppercase tracking-wider text-brand-stone bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-surface-muted/30">{r.source}</span>}
                </div>
                <p className="text-brand-navy/80 italic mb-5 text-sm leading-relaxed font-medium">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-4 border-t border-brand-gold/10">
                  <div className="w-8 h-8 bg-brand-gold/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-brand-gold/15">
                    <span className="text-brand-gold text-xs font-black">{r.title.charAt(0)}</span>
                  </div>
                  <p className="font-display text-brand-navy font-bold text-sm">{r.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href={SITE.tripadvisor} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white font-bold rounded-xl hover:bg-brand-navy/90 transition-all duration-300 text-sm uppercase tracking-wider shadow-lodge">
              Read More on TripAdvisor <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ PLAN YOUR TRIP — GUIDES & RALLY HUB (internal linking SEO) ═══ */}
      <section
        aria-labelledby="plan-your-trip-heading"
        className="py-24 md:py-28 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-navy/4 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-brand-gold text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-gold mb-5">
              ★ Plan Your Trip ★
            </span>
            <h2 id="plan-your-trip-heading" className="mb-3">
              Free <span className="text-brand-gold italic">Black Hills</span> Guides
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-2xl mx-auto font-medium">
              Routes, itineraries and rally insider info — written by the team that has hosted
              campers in Sturgis for 84+ Sturgis Motorcycle Rallies.
            </p>
            <div className="w-32 h-1.5 bg-gold-gradient rounded-full mt-5 mx-auto" />
          </div>

          {/* Sturgis Rally cluster */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/sturgis-rally-camping"
              className="group block rounded-2xl overflow-hidden border-2 border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold-lg transition-all duration-500 bg-surface-primary"
              aria-label="Sturgis Motorcycle Rally camping at Rush No More"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('/images/BikeRally/IMG_9865.JPG')" }}
                  role="img"
                  aria-label="Motorcycles at Rush No More during the Sturgis Rally"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1.5 bg-brand-gold text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                    Rally HQ
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl md:text-2xl font-display text-white font-bold">
                    Sturgis Rally Camping
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-brand-navy/70 text-sm mb-4 leading-relaxed font-medium">
                  Everything you need for the Sturgis Motorcycle Rally — Aug 2 to 18, 2026. RV, cabin
                  and tent options 5 miles from Main Street.
                </p>
                <span className="text-brand-gold font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all uppercase tracking-wider">
                  Read Rally Guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/rally-rates"
              className="group block rounded-2xl overflow-hidden border-2 border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold-lg transition-all duration-500 bg-surface-primary"
              aria-label="2026 Sturgis Rally rates and reservations"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('/images/vip-site.png')" }}
                  role="img"
                  aria-label="Rush No More luxury RV site for Sturgis Rally guests"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl md:text-2xl font-display text-white font-bold">
                    Sturgis Rally Rates 2026
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-brand-navy/70 text-sm mb-4 leading-relaxed font-medium">
                  Full rate table for Rally week. Tent, RV and presidential cabin pricing — book
                  before sites are claimed.
                </p>
                <span className="text-brand-gold font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all uppercase tracking-wider">
                  See Rally Rates <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/best-motorcycle-rides-near-sturgis"
              className="group block rounded-2xl overflow-hidden border-2 border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold-lg transition-all duration-500 bg-surface-primary"
              aria-label="Best motorcycle rides near Sturgis, South Dakota"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('/images/DSC05580-s.png')" }}
                  role="img"
                  aria-label="Iron Mountain Road framing Mount Rushmore in the Black Hills"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl md:text-2xl font-display text-white font-bold">
                    Best Rides Near Sturgis
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-brand-navy/70 text-sm mb-4 leading-relaxed font-medium">
                  Needles Highway, Iron Mountain Road, Spearfish Canyon and more — the routes that
                  earn the Black Hills its reputation.
                </p>
                <span className="text-brand-gold font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all uppercase tracking-wider">
                  Explore the Rides <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>

          {/* Scenic & itinerary cluster */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/black-hills-itinerary"
              className="group block rounded-2xl p-6 bg-surface-primary border border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
            >
              <Calendar className="w-9 h-9 text-brand-gold mb-3" />
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                6-Day Black Hills Itinerary
              </h3>
              <p className="text-sm text-brand-navy/70 font-medium mb-3">
                Day-by-day plan from Mount Rushmore to Custer State Park, Deadwood and the Badlands.
              </p>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Open Itinerary <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              href="/needles-highway-guide"
              className="group block rounded-2xl p-6 bg-surface-primary border border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
            >
              <Mountain className="w-9 h-9 text-brand-gold mb-3" />
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                Needles Highway Guide
              </h3>
              <p className="text-sm text-brand-navy/70 font-medium mb-3">
                Granite spires, the Needles Eye and one-lane tunnels — what to expect and how to
                ride it.
              </p>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              href="/spearfish-canyon-guide"
              className="group block rounded-2xl p-6 bg-surface-primary border border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
            >
              <TreePine className="w-9 h-9 text-brand-gold mb-3" />
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                Spearfish Canyon Guide
              </h3>
              <p className="text-sm text-brand-navy/70 font-medium mb-3">
                Bridal Veil Falls, Roughlock Falls and a 20-mile fall-foliage byway — 25 miles from
                camp.
              </p>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* Long-stay & event clusters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/iron-mountain-road-guide"
              className="group block rounded-2xl p-6 bg-surface-primary border border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
            >
              <Route className="w-9 h-9 text-brand-gold mb-3" />
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                Iron Mountain Road Guide
              </h3>
              <p className="text-sm text-brand-navy/70 font-medium mb-3">
                Pigtail bridges, three tunnels framing Mount Rushmore — the engineering-as-art ride.
              </p>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              href="/deadwood-day-trip"
              className="group block rounded-2xl p-6 bg-surface-primary border border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
            >
              <Navigation className="w-9 h-9 text-brand-gold mb-3" />
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                Deadwood Day Trip
              </h3>
              <p className="text-sm text-brand-navy/70 font-medium mb-3">
                Twelve miles to historic Deadwood — Wild West history, Adams Museum and 80+ gaming
                halls.
              </p>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Plan Day Trip <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              href="/monthly-rv-sites"
              className="group block rounded-2xl p-6 bg-surface-primary border border-brand-gold/15 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
            >
              <Truck className="w-9 h-9 text-brand-gold mb-3" />
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                Monthly RV Sites
              </h3>
              <p className="text-sm text-brand-navy/70 font-medium mb-3">
                Long-term RV stays in the Black Hills — full hookups, monthly pricing and
                workamper-friendly.
              </p>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                See Long-Term Rates <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition-all duration-300 uppercase tracking-wider text-sm"
            >
              Browse Every Black Hills Attraction <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="h-[450px] relative">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-surface-primary to-transparent z-10" />
        <iframe src={SITE.mapsEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title="Rush No More RV Resort location — Sturgis, South Dakota" />
      </section>

      <BookingCTA title="Start Your Black Hills Adventure Today" subtitle="RV starts at $41.22 | Cabins starts at $51.76 | Tent from $35/night" />
    </>
  );
}