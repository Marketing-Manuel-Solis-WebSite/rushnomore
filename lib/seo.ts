import type { Metadata } from 'next';

const DOMAIN = 'https://www.rushnomore.com';
const OG_IMAGE = '/images/Aereal-2_1400.png';
const BUSINESS_NAME = 'Rush No More RV Resort & Campground';
const PHONE = '+1-605-423-2545';
const EMAIL = 'info@rushnomore.com';
const BOOKING_URL = 'https://bookingsus.newbook.cloud/rushnomore/index.php';

const ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: '21137 Brimstone Place',
  addressLocality: 'Sturgis',
  addressRegion: 'SD',
  postalCode: '57785',
  addressCountry: 'US',
};

const GEO = { '@type': 'GeoCoordinates' as const, latitude: 44.39857, longitude: -103.46825 };

/* ─── Page-level metadata ─── */
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
      siteName: BUSINESS_NAME,
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

/* ─── WebSite schema — enables Google sitelinks search box ─── */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS_NAME,
    alternateName: 'Rush No More',
    url: DOMAIN,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${DOMAIN}/explore?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

/* ─── Organization schema — knowledge panel, brand identity ─── */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_NAME,
    alternateName: 'Rush No More',
    url: DOMAIN,
    logo: `${DOMAIN}/images/RushNoMore-logo.png`,
    image: `${DOMAIN}/images/Aereal-2_1400.png`,
    telephone: PHONE,
    email: EMAIL,
    address: ADDRESS,
    geo: GEO,
    sameAs: [
      'https://www.tripadvisor.com/Hotel_Review-g54818-d1631146-Reviews-Rush_No_More_Campground-Sturgis_South_Dakota.html',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE,
        contactType: 'reservations',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: PHONE,
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
      },
    ],
    foundingDate: '2014',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: GEO,
      geoRadius: '100 mi',
    },
    knowsAbout: [
      'RV Camping', 'Campground Management', 'Black Hills Tourism',
      'Sturgis Motorcycle Rally', 'Mount Rushmore Tourism', 'Outdoor Recreation',
    ],
  };
}

/* ─── Campground schema — rich snippet for campground searches ─── */
export function campgroundSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Campground',
    '@id': `${DOMAIN}/#campground`,
    name: BUSINESS_NAME,
    alternateName: ['Rush No More', 'Rush No More RV Park', 'Rush No More Campground', 'RNM Resort'],
    url: DOMAIN,
    telephone: PHONE,
    email: EMAIL,
    description: 'Top-rated RV resort, presidential cabins & tent camping in Sturgis, SD — 5 miles from Main Street Sturgis, gateway to Mount Rushmore & the Black Hills. Pool, hot tubs, beer garden, game room & 16 free amenities.',
    slogan: 'Your Black Hills adventure starts here',
    image: [
      `${DOMAIN}/images/Aereal-2_1400.png`,
      `${DOMAIN}/images/Pool/PoolWithPeople.jpeg`,
      `${DOMAIN}/images/BeerGarden/IMG_7326.jpeg`,
      `${DOMAIN}/images/GeneralImagesPark/IMG_7379.jpeg`,
      `${DOMAIN}/images/EventCenter/IMG_7513.jpeg`,
      `${DOMAIN}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
      `${DOMAIN}/images/rv-camper-van.png`,
      `${DOMAIN}/images/tent_camping_RNM.png`,
    ],
    logo: `${DOMAIN}/images/RushNoMore-logo.png`,
    address: ADDRESS,
    geo: GEO,
    hasMap: 'https://maps.app.goo.gl/sBHGqk1yV4c2Tx1z9',
    priceRange: '$35 - $335',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    checkinTime: '14:00',
    checkoutTime: '11:00',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    amenityFeature: [
      'Heated Swimming Pool', 'Multiple Hot Tub Spas', 'Beer Garden & Bar',
      'Game Room', 'Nature Trails', 'Modern Bathhouses', 'Laundromat',
      'Free Wi-Fi', 'Pet Friendly', 'Bike Wash Station', 'Propane Sales',
      'Propane Campfires & Charcoal Grills', 'Camp Library', 'Camp Store', 'Picnic Pavilions',
      '24/7 Gated Security',
    ].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    availableLanguage: ['English', 'Spanish'],
    numberOfRooms: 236,
    petsAllowed: true,
    smokingAllowed: false,
    starRating: { '@type': 'Rating', ratingValue: '4.8', bestRating: '5' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420', bestRating: '5', worstRating: '1' },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Happy Camper' },
        datePublished: '2025-08-15',
        reviewBody: 'We are always so thrilled when we have the chance to stay here during our summer travels. The campground is close to the highway but you would never know it. Peaceful, quiet, and incredibly well-maintained.',
        name: 'No Rushing Here',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Rally Enthusiast' },
        datePublished: '2025-08-10',
        reviewBody: 'This is our 4th year staying at Rush No More for the Sturgis Rally. The location can\'t be beat — close enough to the action but far enough for peace and quiet at night.',
        name: 'Best Rally Base Camp',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Family Traveler' },
        datePublished: '2025-07-20',
        reviewBody: 'Brought the whole family — grandparents in their RV, us in a cabin, kids in tents. Everyone was happy! The pool, game room, and trails kept the kids entertained for days.',
        name: 'Family Friendly Paradise',
        reviewRating: { '@type': 'Rating', ratingValue: '4', bestRating: '5' },
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Accommodations',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'RV Sites',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Water/Electric Back-in RV Site', description: 'Water & electric hookup, 30 AMP service, back-in site, up to 100ft long' }, price: '41.22', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Full Hookup Back-in RV Site', description: 'Full hookup (water/electric/sewer), 30/50 AMP, back-in site' }, price: '51.76', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Full Hookup Pull-through RV Site', description: 'Full hookup (water/electric/sewer), 30/50 AMP, pull-through site' }, price: '62.36', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Luxury RV Site', description: 'Cement slab, gas BBQ, Mountain Valley location, full hookups, 30/50 AMP' }, price: '62.36', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Luxury Spa RV Site with Private Hot Tub', description: 'Private hot tub spa, cement slab, gas BBQ, full hookups, 30/50 AMP' }, price: '72.93', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Presidential Cabins',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'LodgingReservation', name: 'Economy Cabin (Sleeps 2)', description: 'Cozy cabin named after a US President, A/C & heating, private bathroom' }, price: '51.76', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', itemOffered: { '@type': 'LodgingReservation', name: 'Standard Cabin (Sleeps 4)', description: 'Presidential cabin with more space, A/C & heating, private bathroom' }, price: '95.13', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', itemOffered: { '@type': 'LodgingReservation', name: 'Family Cabin (Sleeps 6-7)', description: 'Spacious family cabin, full kitchen available, A/C & heating' }, price: '100.42', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', itemOffered: { '@type': 'LodgingReservation', name: 'Presidential Suite (Sleeps 10)', description: 'The John F. Kennedy — our largest cabin for groups and families' }, price: '332.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Tent Camping',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Basic Tent Site', description: 'Shaded site under Ponderosa pines with bathhouse access' }, price: '35.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Electric Tent Site', description: 'Shaded tent site with 20 AMP electric hookup and bathhouse access' }, price: '40.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
          ],
        },
      ],
    },
    containsPlace: [
      { '@type': 'CampingPitch', name: 'RV Sites', description: '200+ full-hookup RV sites with 30/50 AMP, water & sewer', numberOfRooms: 200 },
      { '@type': 'Accommodation', name: 'Presidential Cabins', description: '16 unique cabins named after US Presidents, sleeping 2-10 guests', numberOfRooms: 16 },
      { '@type': 'CampingPitch', name: 'Tent Sites', description: '20+ shaded tent sites under Ponderosa pines', numberOfRooms: 20 },
    ],
    tourBookingPage: BOOKING_URL,
    isAccessibleForFree: false,
    publicAccess: false,
    sameAs: [
      'https://www.tripadvisor.com/Hotel_Review-g54818-d1631146-Reviews-Rush_No_More_Campground-Sturgis_South_Dakota.html',
    ],
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Max RV Length', value: '100 feet' },
      { '@type': 'PropertyValue', name: 'Electrical Service', value: '30/50 AMP' },
      { '@type': 'PropertyValue', name: 'Distance to Mount Rushmore', value: '55 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Sturgis Main Street', value: '5 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Deadwood', value: '12 miles' },
      { '@type': 'PropertyValue', name: 'Interstate Access', value: 'I-90 Exit 37' },
    ],
  };
}

/* ─── LodgingBusiness schema — complements Campground ─── */
export function lodgingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${DOMAIN}/#lodging`,
    name: BUSINESS_NAME,
    url: DOMAIN,
    telephone: PHONE,
    email: EMAIL,
    description: 'Top-rated RV park, presidential cabins & tent camping near Mount Rushmore in Sturgis, South Dakota. 200+ RV sites, 16 cabins & 20+ tent sites with heated pool, hot tubs, beer garden & 16 free amenities.',
    image: [
      `${DOMAIN}/images/Aereal-2_1400.png`,
      `${DOMAIN}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
      `${DOMAIN}/images/rv-camper-van.png`,
    ],
    address: ADDRESS,
    geo: GEO,
    hasMap: 'https://maps.app.goo.gl/sBHGqk1yV4c2Tx1z9',
    priceRange: '$35 - $335',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    starRating: { '@type': 'Rating', ratingValue: '4.8', bestRating: '5' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420', bestRating: '5', worstRating: '1' },
    checkinTime: '14:00',
    checkoutTime: '11:00',
    petsAllowed: true,
    smokingAllowed: false,
    numberOfRooms: 236,
    availableLanguage: ['English', 'Spanish'],
    amenityFeature: [
      'Heated Swimming Pool', 'Multiple Hot Tub Spas', 'Beer Garden & Bar',
      'Game Room', 'Nature Trails', 'Modern Bathhouses', 'Laundromat',
      'Free Wi-Fi', 'Pet Friendly', 'Bike Wash Station', 'Propane Sales',
      'Camp Library', 'Camp Store', 'Picnic Pavilions', '24/7 Gated Security',
    ].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    makesOffer: [
      { '@type': 'Offer', name: 'RV Sites', price: '41.22', priceCurrency: 'USD', description: '200+ full-hookup RV sites from $41.22/night', url: `${DOMAIN}/stay/rv-sites` },
      { '@type': 'Offer', name: 'Presidential Cabins', price: '51.76', priceCurrency: 'USD', description: '16 unique presidential cabins from $51.76/night', url: `${DOMAIN}/stay/cabins` },
      { '@type': 'Offer', name: 'Tent Camping', price: '35.00', priceCurrency: 'USD', description: '20+ shaded tent sites from $35/night', url: `${DOMAIN}/stay/tent-camping` },
    ],
    tourBookingPage: BOOKING_URL,
  };
}

/* ─── Event schema ─── */
export function eventSchema(event: { name: string; description: string; startDate: string; endDate: string; image?: string; price?: string; url?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: event.image ? `${DOMAIN}${event.image}` : undefined,
    location: {
      '@type': 'Place',
      name: BUSINESS_NAME,
      address: ADDRESS,
      geo: GEO,
    },
    organizer: { '@type': 'Organization', name: BUSINESS_NAME, url: DOMAIN },
    performer: { '@type': 'Organization', name: BUSINESS_NAME },
    offers: event.price ? {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01',
      url: event.url || BOOKING_URL,
    } : undefined,
    isAccessibleForFree: !event.price,
  };
}

/* ─── Breadcrumb schema ─── */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${DOMAIN}${item.url}`,
    })),
  };
}

/* ─── FAQ schema ─── */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/* ─── TouristAttraction schema — for explore page items ─── */
export function touristAttractionSchema(attraction: { name: string; description: string; image: string; url?: string; distance?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.description,
    image: `${DOMAIN}${attraction.image}`,
    url: attraction.url,
    isAccessibleForFree: false,
    touristType: ['Adventure', 'Nature', 'History', 'Family'],
    geo: GEO,
  };
}

/* ─── LocalBusiness + Place schema for map/directions page ─── */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${DOMAIN}/#localbusiness`,
    name: BUSINESS_NAME,
    alternateName: 'Rush No More',
    url: DOMAIN,
    telephone: PHONE,
    email: EMAIL,
    image: `${DOMAIN}/images/Aereal-2_1400.png`,
    logo: `${DOMAIN}/images/RushNoMore-logo.png`,
    address: ADDRESS,
    geo: GEO,
    hasMap: 'https://maps.app.goo.gl/sBHGqk1yV4c2Tx1z9',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '17:00',
    },
    priceRange: '$35 - $335',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420', bestRating: '5' },
    areaServed: { '@type': 'City', name: 'Sturgis', containedInPlace: { '@type': 'State', name: 'South Dakota' } },
  };
}

/* ─── Video schema — for pages with video backgrounds ─── */
export function videoSchema(video: { name: string; description: string; thumbnailUrl: string; contentUrl: string; uploadDate?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: `${DOMAIN}${video.thumbnailUrl}`,
    contentUrl: `${DOMAIN}${video.contentUrl}`,
    uploadDate: video.uploadDate || '2025-01-01',
    publisher: { '@type': 'Organization', name: BUSINESS_NAME, logo: { '@type': 'ImageObject', url: `${DOMAIN}/images/RushNoMore-logo.png` } },
  };
}
