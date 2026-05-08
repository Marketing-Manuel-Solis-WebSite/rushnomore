import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/data/site';
import { MapPin, Phone, Mail, AlertTriangle } from 'lucide-react';

const cols = {
  Stay: [
    { label: 'RV Sites', href: '/stay/rv-sites' },
    { label: 'Presidential Cabins', href: '/stay/cabins' },
    { label: 'Tent Camping', href: '/stay/tent-camping' },
    { label: 'Monthly RV Sites', href: '/monthly-rv-sites' },
    { label: 'Amenities', href: '/amenities' },
  ],
  'Sturgis Rally': [
    { label: 'Sturgis Rally 2026 Guide', href: '/sturgis-rally' },
    { label: 'Rally Camping', href: '/sturgis-rally-camping' },
    { label: 'Rally Rates 2026', href: '/rally-rates' },
    { label: 'Best Rides Near Sturgis', href: '/best-motorcycle-rides-near-sturgis' },
    { label: 'Car Show', href: '/events#car-show' },
    { label: 'Weddings & Groups', href: '/weddings-groups' },
  ],
  'Black Hills': [
    { label: 'All Attractions', href: '/explore' },
    { label: '6-Day Itinerary', href: '/black-hills-itinerary' },
    { label: 'Deadwood Day Trip', href: '/deadwood-day-trip' },
    { label: 'Spearfish Canyon', href: '/spearfish-canyon-guide' },
    { label: 'Needles Highway', href: '/needles-highway-guide' },
    { label: 'Iron Mountain Road', href: '/iron-mountain-road-guide' },
  ],
  Info: [
    { label: 'About Us', href: '/about' },
    { label: 'Park Map & Directions', href: '/map' },
    { label: 'Contact', href: '/contact' },
    { label: 'Policies', href: '/policies' },
    { label: 'ADA / Accessibility', href: '/ada' },
    { label: 'Legal', href: '/legal' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden">
      {/* Seamless transition from any page background */}
      <div className="h-16 bg-gradient-to-b from-transparent to-brand-navy" />

      {/* NO WOOD FIRES NOTICE */}
      <div className="bg-red-700 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wider">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>No Wood Fires Allowed — We Back Up to Forest Service Land. Propane and Charcoal Only.</span>
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        </div>
      </div>

      {/* Subtle gold line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8 relative z-10">
        {/* ── Main grid: Logo/Contact + Sitemap ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
          {/* Logo + Contact column */}
          <div>
            <Image
              src="/images/RushNoMore-logo.png"
              alt={SITE.short}
              width={260}
              height={120}
              loading="lazy"
              sizes="260px"
              className="mb-6 brightness-0 invert"
            />
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                {SITE.address}
              </div>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="flex items-center gap-2 hover:text-brand-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 hover:text-brand-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-gold" />
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Sitemap columns */}
          {Object.entries(cols).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-brand-gold mb-4 font-bold">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/60 hover:text-white hover:pl-1.5 transition-all duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-white/40">
            <Link href="/policies" className="hover:text-white/50 transition-colors">Policies</Link>
            <Link href="/legal" className="hover:text-white/50 transition-colors">Legal</Link>
            <Link href="/ada" className="hover:text-white/50 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}