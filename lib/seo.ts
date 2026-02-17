import type { Metadata } from 'next';

const DOMAIN = 'https://www.rushnomore.com';

export function seo(o: { title: string; description: string; path: string }): Metadata {
  const url = `${DOMAIN}${o.path}`;
  const full = o.path === '/' ? o.title : `${o.title} | Rush No More`;
  return {
    title: full, description: o.description,
    alternates: { canonical: url },
    openGraph: { title: full, description: o.description, url, siteName: 'Rush No More RV Resort', locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title: full, description: o.description },
  };
}

export function campgroundSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'Campground',
    name: 'Rush No More RV Resort & Campground', url: DOMAIN, telephone: '605-423-2545', email: 'info@rushnomore.com',
    address: { '@type': 'PostalAddress', streetAddress: '21137 Brimstone Place', addressLocality: 'Sturgis', addressRegion: 'SD', postalCode: '57785', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: 44.39857, longitude: -103.46825 },
    priceRange: '$$',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420', bestRating: '5' },
  };
}

export function eventSchema(event: { name: string; description: string; startDate: string; endDate: string }) {
  return {
    '@context': 'https://schema.org', '@type': 'Event',
    name: event.name, description: event.description, startDate: event.startDate, endDate: event.endDate,
    location: { '@type': 'Place', name: 'Rush No More RV Resort', address: { '@type': 'PostalAddress', streetAddress: '21137 Brimstone Place', addressLocality: 'Sturgis', addressRegion: 'SD', postalCode: '57785' } },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `${DOMAIN}${item.url}` })) };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
}
