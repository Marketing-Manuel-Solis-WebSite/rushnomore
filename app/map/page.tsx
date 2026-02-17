import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE } from '@/data/site';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { InteractiveMapWrapper } from './InteractiveMapWrapper';

export const metadata: Metadata = seo({ title: 'Park Map & Directions', description: 'Interactive campground map and directions to Rush No More RV Resort.', path: '/map' });

export default function MapPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Park Map' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/Aereal-2_1400.jpg')" }} />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="mb-4">Park Map & Location</h1>
          <p className="text-lg text-white/70">Find your way around our beautiful resort</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="badge-gold mb-4 inline-block">Interactive Map</span>
            <h2 className="mb-3">Campground Site Map</h2>
            <p className="text-brand-stone">Zoom, pan, and click on sites to explore.</p>
          </div>
          <InteractiveMapWrapper />
        </div>
      </section>
      <section className="section-pad bg-surface-secondary">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge-gold mb-4 inline-block">Getting Here</span>
            <h2 className="mb-6">Our Location</h2>
            <p className="text-lg text-brand-navy/80 mb-8">Conveniently located just minutes from Sturgis, SD.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4"><div className="w-12 h-12 bg-white rounded-full shadow-lodge flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-brand-gold" /></div><div><h4 className="font-bold mb-1">Address</h4><p className="text-brand-stone text-sm">21137 Brimstone Place<br/>Sturgis, SD 57785</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 bg-white rounded-full shadow-lodge flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-brand-gold" /></div><div><h4 className="font-bold mb-1">Phone</h4><a href={`tel:${SITE.phoneTel}`} className="text-brand-stone text-sm hover:text-brand-navy">{SITE.phone}</a></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 bg-white rounded-full shadow-lodge flex items-center justify-center flex-shrink-0"><Navigation className="w-5 h-5 text-brand-gold" /></div><div><h4 className="font-bold mb-1">Directions</h4><p className="text-brand-stone text-sm">From I-90, take Exit 37. Less than 2 minutes.</p></div></div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lodge-lg h-[450px]">
            <iframe src={SITE.mapsEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title="Location Map" />
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
