import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-surface-primary">
      <div className="max-w-lg mx-auto px-4 text-center">
        <h1 className="text-8xl font-display text-brand-gold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-brand-stone mb-8">Looks like this trail leads nowhere.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-gold">Back to Home</Link>
          <Link href="/contact" className="btn-outline">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
