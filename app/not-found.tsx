import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Rush No More',
  description: 'The page you are looking for does not exist at Rush No More RV Resort & Campground. Browse our RV sites, cabins, tent camping, or contact us for help.',
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-surface-primary">
      <div className="max-w-lg mx-auto px-4 text-center">
        <h1 className="text-8xl font-display text-brand-gold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-brand-stone mb-8">Looks like this trail leads nowhere. Try one of these popular pages:</p>
        <nav aria-label="Helpful links" className="mb-8">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li><Link href="/stay/rv-sites" className="text-brand-gold hover:underline">RV Sites</Link></li>
            <li><Link href="/stay/cabins" className="text-brand-gold hover:underline">Cabins</Link></li>
            <li><Link href="/stay/tent-camping" className="text-brand-gold hover:underline">Tent Camping</Link></li>
            <li><Link href="/amenities" className="text-brand-gold hover:underline">Amenities</Link></li>
            <li><Link href="/explore" className="text-brand-gold hover:underline">Things to Do</Link></li>
            <li><Link href="/map" className="text-brand-gold hover:underline">Map & Directions</Link></li>
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
