import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs } from '@/components/ui';
import { SITE } from '@/data/site';
import { MapPin, Phone, Mail, Download, Navigation } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Park Map & Directions', description: 'View our campground site map and get directions. Located at 21137 Brimstone Place, Sturgis, SD.', path: '/map' });

export default function MapPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Park Map' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/Aereal-2_1400.jpg')" }} />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="mb-4">Park Map & Location</h1>
          <p className="text-lg text-white/70">Find your way around our beautiful resort</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="badge-gold mb-4 inline-block">Resort Layout</span>
            <h2 className="mb-3">Campground Site Map</h2>
            <p className="text-brand-stone">Locate your Cabin, RV Site, or Tent area before you arrive.</p>
          </div>
          <div className="card-lodge overflow-hidden">
            <div className="bg-surface-secondary aspect-[16/10] flex items-center justify-center">
              <img src="/images/RushNoMoreMap.jpg" alt="Rush No More Campground Map" className="w-full h-full object-contain" loading="lazy" />
            </div>
            <div className="bg-surface-secondary text-center p-5">
              <a href="/images/RushNoMoreMap.jpg" target="_blank" className="btn-gold">
                <Download className="w-4 h-4 mr-2" /> Download / View Full Size Map
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-surface-secondary">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge-gold mb-4 inline-block">Getting Here</span>
            <h2 className="mb-6">Our Location</h2>
            <p className="text-lg text-brand-navy/80 mb-8">Conveniently located just minutes from Sturgis, SD, offering a quiet retreat close to all the action.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-lodge flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                </div>
                <div><h4 className="font-bold mb-1">Address</h4><p className="text-brand-stone text-sm">21137 Brimstone Place<br />Sturgis, SD 57785</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-lodge flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-gold" />
                </div>
                <div><h4 className="font-bold mb-1">Phone</h4><a href={`tel:${SITE.phoneTel}`} className="text-brand-stone text-sm hover:text-brand-navy">{SITE.phone}</a></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-lodge flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-gold" />
                </div>
                <div><h4 className="font-bold mb-1">Email</h4><a href={`mailto:${SITE.email}`} className="text-brand-stone text-sm hover:text-brand-navy">{SITE.email}</a></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-lodge flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-5 h-5 text-brand-gold" />
                </div>
                <div><h4 className="font-bold mb-1">Directions</h4><p className="text-brand-stone text-sm">From I-90, take Exit 37. Less than 2 minutes to our entrance.</p></div>
              </div>
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
