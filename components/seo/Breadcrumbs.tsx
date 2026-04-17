import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

export interface Crumb {
  name: string;
  url: string;
}

// Visible breadcrumb nav with BreadcrumbList schema. Last item is current page.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: 'Home', url: '/' }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="bg-surface-primary border-b border-brand-gold/10">
        <ol className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-1.5 text-xs text-brand-navy/70">
          {all.map((crumb, i) => {
            const last = i === all.length - 1;
            return (
              <li key={crumb.url} className="flex items-center gap-1.5">
                {i === 0 && <Home className="w-3.5 h-3.5 text-brand-gold" aria-hidden />}
                {last ? (
                  <span className="font-bold text-brand-navy" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.url}
                    className="hover:text-brand-gold transition-colors font-medium"
                  >
                    {crumb.name}
                  </Link>
                )}
                {!last && <ChevronRight className="w-3 h-3 text-brand-navy/30" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
