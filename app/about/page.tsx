import { Metadata } from 'next';
import Link from 'next/link';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs, StatBlock, VideoEmbed } from '@/components/ui';
import { ReviewCard } from '@/components/cards';
import { SITE, STATS, REVIEWS } from '@/data/site';

export const metadata: Metadata = seo({ title: 'About Rush No More — Top-Rated Black Hills RV Resort', description: 'Top-rated RV resort with cabins, RV sites & tent camping in Sturgis, SD.', path: '/about' });

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/DSC05580-s.webp')" }} />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="mb-4">Why Stay at Rush No More?</h1>
          <p className="text-lg text-white/70">Discover the charm of the Black Hills&apos; Top Rated RV Resort</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge-gold mb-4 inline-block">Get to know us</span>
            <h2 className="mb-6">A Top Rated RV Resort</h2>
            <p className="text-lg text-brand-navy/80 mb-4">We are a Top Rated RV Resort with a great selection of Cabins, RV Sites, and shaded Tent Sites in the Sturgis / Black Hills area of South Dakota.</p>
            <p className="text-brand-navy/70 mb-6">Our dedicated team continually strives to provide our guests with a first-class camping experience. Conveniently located just minutes from Sturgis, SD &mdash; Rush No More is the perfect place to call home while exploring all the attractions and natural beauty the area has to offer.</p>
          </div>
          <VideoEmbed src={SITE.youtube} title="Rush No More Drone Video" />
        </div>
      </section>
      <section className="section-pad bg-brand-navy text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="mb-3 text-white">Come and Stay with Us</h2>
          <p className="text-white/60 mb-12">Browse our collection of cabins, RV and Tent Sites</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Presidential Cabins', desc: 'From economy to luxury suites.', href: '/stay/cabins', img: '/images/cabin-9_800.jpg' },
              { title: 'RV Sites', desc: 'Big Rig friendly, 30/50 AMP.', href: '/stay/rv-sites', img: '/images/rv-camper-van.jpg' },
              { title: 'Tent Sites', desc: 'Shaded sites under the pines.', href: '/stay/tent-camping', img: '/images/Wooded-Tent-Area.webp' },
            ].map((c, i) => (
              <Link key={i} href={c.href} className="relative rounded-2xl overflow-hidden h-[300px] group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${c.img}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl mb-1">{c.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{c.desc}</p>
                  <span className="btn-gold text-sm">View Options</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-surface-secondary">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => <StatBlock key={i} value={s.value} label={s.label} />)}
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader badge="Reviews" title="...and now a Word from our Campers..." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((r, i) => <ReviewCard key={i} review={r} index={i} />)}
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
