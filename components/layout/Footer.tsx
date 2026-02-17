import Link from 'next/link';
import { SITE } from '@/data/site';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const cols = {
  Accommodations: [
    { label: 'RV Sites', href: '/stay/rv-sites' },
    { label: 'Cabins', href: '/stay/cabins' },
    { label: 'Tent Camping', href: '/stay/tent-camping' },
    { label: 'Amenities', href: '/amenities' },
    { label: 'Park Map', href: '/map' },
  ],
  Explore: [
    { label: 'Mount Rushmore', href: '/mount-rushmore' },
    { label: 'Black Hills Guide', href: '/black-hills' },
    { label: 'Itineraries', href: '/itineraries' },
    { label: 'Deadwood', href: '/attractions/deadwood' },
  ],
  Events: [
    { label: 'Sturgis Rally', href: '/events/sturgis-rally' },
    { label: 'Rally Rates', href: '/events/sturgis-rally/rates' },
    { label: 'Car Show', href: '/events/car-show' },
    { label: 'Weddings', href: '/events/weddings' },
  ],
  Info: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Policies', href: '/policies' },
    { label: 'ADA', href: '/ada' },
    { label: 'Legal', href: '/legal' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div>
            <div className="w-12 h-12 bg-brand-gold rounded-lg flex items-center justify-center mb-3">
              <span className="text-white font-display text-xl font-bold">R</span>
            </div>
            <h3 className="font-display text-xl mb-1">{SITE.short}</h3>
            <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-4">
              RV Resort & Campground
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                {SITE.address}
              </div>
              <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-gold" />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-gold" />
                {SITE.email}
              </a>
            </div>
          </div>
          {Object.entries(cols).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs uppercase tracking-[0.15em] text-brand-gold mb-4 font-bold">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <h3 className="font-display text-xl md:text-2xl mb-1">Ready to Book?</h3>
            <p className="text-white/60 text-sm">Your Black Hills base camp is waiting.</p>
          </div>
          <div className="flex gap-3">
            <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Check Availability
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="btn-white">
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link href="/policies" className="hover:text-white/60 transition-colors">Policies</Link>
            <Link href="/legal" className="hover:text-white/60 transition-colors">Legal</Link>
            <Link href="/ada" className="hover:text-white/60 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
