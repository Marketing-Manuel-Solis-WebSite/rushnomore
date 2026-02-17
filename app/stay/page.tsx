import { Metadata } from 'next';
import Link from 'next/link';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs, Check } from '@/components/ui';
import { RVTierCard } from '@/components/cards';
import { SITE, RV_TIERS } from '@/data/site';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Accommodations — RV Sites, Cabins & Tent Camping', description: 'Choose from premium RV sites, presidential cabins, and shaded tent camping near Mount Rushmore.', path: '/stay' });

export default function StayPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Accommodations' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/DSC05580-s.webp')" }} />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <span className="badge-gold mb-6 inline-block !bg-brand-gold/20 !text-brand-gold-light">Top-Rated RV Resort</span>
          <h1 className="mb-6">Fabulous Lodging at a Great Location</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">Whether you seek a scenic RV site, a cozy cabin, or tent camping &mdash; we have the perfect spot.</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="RV Life" title="RV Site Selection" subtitle="Full hookups, big-rig friendly, sites up to 100ft." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {RV_TIERS.map((t, i) => <RVTierCard key={i} tier={t} index={i} />)}
          </div>
          <div className="text-center flex flex-wrap justify-center gap-3">
            <Link href="/stay/rv-sites" className="btn-outline">RV Site Details <ArrowRight className="w-4 h-4 ml-2" /></Link>
            <Link href="/stay/cabins" className="btn-outline">View Cabins <ArrowRight className="w-4 h-4 ml-2" /></Link>
            <Link href="/stay/tent-camping" className="btn-outline">Tent Camping <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
