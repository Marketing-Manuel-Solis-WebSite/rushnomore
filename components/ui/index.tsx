'use client';

import Link from 'next/link';
import { ChevronRight, ExternalLink, Star, Phone } from 'lucide-react';
import { SITE } from '@/data/site';

export function SectionHeader({
  badge,
  title,
  subtitle,
  center = true,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
      {badge && <span className="badge-gold mb-4 inline-block">{badge}</span>}
      <h2 className="mb-3">{title}</h2>
      {subtitle && (
        <p className="text-brand-stone text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`divider-gold-wide mt-5 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}

export function BookingCTA({
  title = 'Ready to Book Your Stay?',
  subtitle = 'Check availability and reserve your spot at Rush No More.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="section-pad bg-brand-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer" />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="mb-3">{title}</h2>
        <p className="text-lg mb-8 text-white/70">{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-lg px-8 py-4"
          >
            Check Availability
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-lg hover:bg-white hover:text-brand-navy transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 max-w-7xl mx-auto">
      <ol className="flex items-center gap-1.5 text-sm text-brand-stone">
        <li>
          <Link href="/" className="hover:text-brand-navy transition-colors">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5" />
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-navy transition-colors">{item.label}</Link>
            ) : (
              <span className="text-brand-navy font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-brand-gold fill-brand-gold' : 'text-surface-muted'}`} />
      ))}
    </div>
  );
}

export function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-brand-navy/80">
      <svg className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

/* ─── Animated Stat Counter ─── */
export function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl md:text-5xl text-brand-gold mb-2">{value}</p>
      <p className="text-sm text-brand-stone uppercase tracking-wider font-bold">{label}</p>
    </div>
  );
}

/* ─── Video embed ─── */
export function VideoEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lodge-lg">
      <div className="aspect-video bg-surface-secondary">
        <iframe src={src} title={title} className="w-full h-full" allowFullScreen loading="lazy" />
      </div>
    </div>
  );
}
