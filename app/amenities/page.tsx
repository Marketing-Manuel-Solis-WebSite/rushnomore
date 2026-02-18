import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs } from '@/components/ui';
import { AmenityCard } from '@/components/cards';
import { AMENITIES } from '@/data/site';

export const metadata: Metadata = seo({ title: 'Amenities — Pool, Hot Tub, Beer Garden & More', description: '16 resort amenities: pool, hot tubs, beer garden, game room, trails, Wi-Fi, pet friendly & more.', path: '/amenities' });

export default function AmenitiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Amenities' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="mb-4">Amenities</h1>
          <p className="text-lg text-white/70">You deserve a fun and relaxing get-away!</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="Come and enjoy..." title="All Our Amenities" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {AMENITIES.map((a, i) => (
              <AmenityCard key={i} amenity={a} index={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-surface-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeader badge="Event Space" title="Large Outdoor Pavilion" subtitle="Perfect for weddings, reunions, corporate events, and group gatherings." />
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/events/weddings" className="btn-gold">Events & Weddings</a>
            <a href="/contact" className="btn-outline">Contact Us</a>
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}