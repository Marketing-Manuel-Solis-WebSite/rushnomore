import type { Metadata } from 'next';

const DOMAIN = 'https://www.rushnomore.com';
const OG_IMAGE = '/images/Aereal-2_1400.png';

export function seo(o: { title: string; description: string; path: string; image?: string; keywords?: string[] }): Metadata {
  const url = `${DOMAIN}${o.path}`;
  const full = o.path === '/' ? o.title : `${o.title} | Rush No More`;
  const img = o.image || OG_IMAGE;
  return {
    title: full,
    description: o.description,
    keywords: o.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: full,
      description: o.description,
      url,
      siteName: 'Rush No More RV Resort & Campground',
      locale: 'en_US',
      type: 'website',
      images: [{ url: img, width: 1400, height: 900, alt: 'Rush No More RV Resort — Black Hills, South Dakota' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: full,
      description: o.description,
      images: [img],
    },
  };
}

export function campgroundSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Campground',
    name: 'Rush No More RV Resort & Campground',
    alternateName: 'Rush No More',
    url: DOMAIN,
    telephone: '+1-605-423-2545',
    email: 'info@rushnomore.com',
    description: 'Top-rated RV resort, presidential cabins & tent camping in Sturgis, SD — 5 miles from Main Street Sturgis, gateway to Mount Rushmore & the Black Hills. Pool, hot tubs, beer garden, game room & 16 free amenities.',
    image: [
      `${DOMAIN}/images/Aereal-2_1400.png`,
      `${DOMAIN}/images/Pool/PoolWithPeople.jpeg`,
      `${DOMAIN}/images/BeerGarden/IMG_7326.jpeg`,
      `${DOMAIN}/images/GeneralImagesPark/IMG_7379.jpeg`,
      `${DOMAIN}/images/EventCenter/IMG_7513.jpeg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '21137 Brimstone Place',
      addressLocality: 'Sturgis',
      addressRegion: 'SD',
      postalCode: '57785',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 44.39857, longitude: -103.46825 },
    hasMap: 'https://maps.google.com/?cid=Rush+No+More+RV+Resort',
    priceRange: '$$',
    checkinTime: '14:00',
    checkoutTime: '11:00',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '17:00',
    },
    amenityFeature: [
      'Heated Swimming Pool', 'Multiple Hot Tub Spas', 'Beer Garden & Bar',
      'Game Room', 'Nature Trails', 'Modern Bathhouses', 'Laundromat',
      'Free Wi-Fi', 'Pet Friendly', 'Bike Wash Station', 'Propane Sales',
      'Propane Campfires & Charcoal Grills', 'Camp Library', 'Camp Store', 'Picnic Pavilions',
      '24/7 Gated Security',
    ].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    numberOfRooms: 236,
    petsAllowed: true,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420', bestRating: '5' },
    offers: [
      { '@type': 'Offer', name: 'Standard RV Site', price: '53.99', priceCurrency: 'USD', description: 'Full hookup RV site with 30/50 AMP, water & sewer' },
      { '@type': 'Offer', name: 'Presidential Cabin', price: '95.00', priceCurrency: 'USD', description: 'Themed cabins named after US Presidents, sleeps 2-10' },
      { '@type': 'Offer', name: 'Tent Camping', price: '35.00', priceCurrency: 'USD', description: 'Shaded tent site under Ponderosa pines with full amenity access' },
    ],
    tourBookingPage: 'https://rushnomore.campspot.com',
    sameAs: [
      'https://www.tripadvisor.com/Hotel_Review-g54774-d259702-Reviews-Rush_No_More_RV_Resort-Sturgis_South_Dakota.html',
    ],
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
