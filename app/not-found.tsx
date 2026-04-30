import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Rush No More',
  description:
    'The page you are looking for does not exist at Rush No More RV Resort & Campground. Browse our RV sites, cabins, tent camping, rally rates, Black Hills guides or contact us for help.',
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

const POPULAR = [
  { href: '/stay/rv-sites', label: 'RV Sites' },
  { href: '/stay/cabins', label: 'Presidential Cabins' },
  { href: '/stay/tent-camping', label: 'Tent Camping' },
  { href: '/sturgis-rally-camping', label: 'Sturgis Rally Camping' },
  { href: '/rally-rates', label: 'Rally Rates 2026' },
  { href: '/monthly-rv-sites', label: 'Monthly RV Sites' },
  { href: '/weddings-groups', label: 'Weddings & Groups' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/explore', label: 'Black Hills Attractions' },
  { href: '/black-hills-itinerary', label: '6-Day Itinerary' },
  { href: '/best-motorcycle-rides-near-sturgis', label: 'Best Rides Near Sturgis' },
  { href: '/needles-highway-guide', label: 'Needles Highway' },
  { href: '/iron-mountain-road-guide', label: 'Iron Mountain Road' },
  { href: '/spearfish-canyon-guide', label: 'Spearfish Canyon' },
  { href: '/deadwood-day-trip', label: 'Deadwood Day Trip' },
  { href: '/map', label: 'Map & Directions' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About Rush No More' },
];

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-surface-primary py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-8xl font-display text-brand-gold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-brand-stone mb-8 max-w-xl mx-auto">
          Looks like this trail leads nowhere — the URL may have changed when we rebuilt the site.
          Try one of the popular pages below, or head back home.
        </p>
        <nav aria-label="Helpful links" className="mb-10">
          <ul className="flex flex-wrap justify-center gap-2 text-sm">
            {POPULAR.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="inline-block px-4 py-2 bg-white border border-brand-gold/20 rounded-full text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all font-medium"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-gold">Back to Home</Link>
          <Link href="/contact" className="btn-outline">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
