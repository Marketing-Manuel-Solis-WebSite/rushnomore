import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { SectionHeader, BookingCTA, Breadcrumbs } from '@/components/ui';
import { AMENITIES } from '@/data/site';
import { Beer, Waves, ShowerHead, WashingMachine, Wifi, PawPrint, Bike, Fuel, Flame, Gamepad2, BookOpen, TreePine, Store, Utensils, Cable, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Amenities — Pool, Hot Tub, Beer Garden & More', description: '16 resort amenities: pool, hot tubs, beer garden, game room, trails, Wi-Fi, pet friendly & more at Rush No More.', path: '/amenities' });

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Beer, Waves, ShowerHead, WashingMachine, Wifi, PawPrint, Bike, Fuel, Flame, Gamepad2, BookOpen, TreePine, Store, Utensils, Cable, ShieldCheck };

export default function AmenitiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Amenities' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="mb-4">Amenities</h1>
          <p className="text-lg text-white/70">You deserve a fun and relaxing get-away, and we&apos;re here to provide it!</p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 bg-white border-b border-surface-muted">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="badge-gold mb-3 inline-block">Featured</span>
            <h2 className="mb-3">Campground Office</h2>
            <p className="text-brand-stone text-lg">Our friendly staff is here to help with everything. From check-in to local recommendations, we&apos;re committed to making your stay exceptional.</p>
          </div>
          <div className="w-32 h-32 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-5xl">&#127968;</span>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="Come and enjoy..." title="All Our Amenities" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {AMENITIES.map((a, i) => {
              const Icon = iconMap[a.icon];
              return (
                <div key={i} className="card-lodge p-6 text-center group">
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold/20 transition-colors">
                    {Icon ? <Icon className="w-7 h-7 text-brand-gold" /> : <span className="text-brand-gold text-2xl">&#9733;</span>}
                  </div>
                  <h4 className="font-bold text-base mb-2">{a.title}</h4>
                  <p className="text-sm text-brand-stone">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pavilion */}
      <section className="section-pad bg-surface-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeader badge="Event Space" title="Large Outdoor Pavilion" subtitle="Our beautiful pavilion area features a full kitchen, outdoor seating, and is perfect for weddings, reunions, corporate events, and group gatherings." />
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
