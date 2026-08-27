import type { Metadata } from 'next';
import { SAME_AS } from '@/data/site';

const DOMAIN = 'https://www.rushnomore.com';
const OG_IMAGE = '/images/Aereal-2_1400.png';
const BUSINESS_NAME = 'Rush No More RV Resort & Campground';
const PHONE = '+1-605-423-2545';
const EMAIL = 'rushnomoresd@gmail.com';
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
export function seo(o: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords?: string[];
  noindex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}): Metadata {
  const url = `${DOMAIN}${o.path}`;
  const full = o.title;
  const img = o.image || OG_IMAGE;
  const imgUrl = img.startsWith('http') ? img : `${DOMAIN}${img}`;
  const imgW = o.imageWidth ?? 1400;
  const imgH = o.imageHeight ?? 900;
  const altText = `Rush No More RV Resort & Campground — ${o.title.split('—')[0].trim()} — Black Hills, Sturgis South Dakota`;
  return {
    title: { absolute: full },
    description: o.description,
    keywords: o.keywords,
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'x-default': url,
      },
    },
    ...(o.noindex
      ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-snippet': -1,
              'max-image-preview': 'large',
              'max-video-preview': -1,
              noimageindex: false,
            },
          },
        }),
    openGraph: {
      title: full,
      description: o.description,
      url,
      siteName: BUSINESS_NAME,
      locale: 'en_US',
      type: o.ogType || 'website',
      ...(o.ogType === 'article'
        ? {
            publishedTime: o.publishedTime,
            modifiedTime: o.modifiedTime || o.publishedTime,
            section: o.section,
            tags: o.tags,
            authors: [`${DOMAIN}/about`],
          }
        : {}),
      countryName: 'United States',
      images: [
        {
          url: imgUrl,
          secureUrl: imgUrl,
          width: imgW,
          height: imgH,
          alt: altText,
          type: imgUrl.endsWith('.png') ? 'image/png' : imgUrl.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
        },
      ],
    },
    // `twitter:*` is read by LinkedIn, Discord, Slack, iMessage, WhatsApp and
    // most other chat/social scrapers as a fallback when they can't find
    // Open Graph. We keep the card type for those previews, but we do NOT set
    // site/creator handles because Rush No More has no X/Twitter account —
    // emitting a fake handle would fail verification in preview tools.
    twitter: {
      card: 'summary_large_image',
      title: full,
      description: o.description,
      images: [{ url: imgUrl, alt: altText }],
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
    sameAs: SAME_AS,
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
    description: 'Top-rated RV resort, presidential cabins & tent camping in Sturgis, SD — 5 miles from Main Street Sturgis, gateway to Mount Rushmore & the Black Hills. Pool, hot tubs, beer garden, game room & free resort amenities.',
    slogan: 'Your Black Hills adventure starts here',
    image: [
      `${DOMAIN}/images/Aereal-2_1400.png`,
      `${DOMAIN}/images/Pool/PoolWithPeople.jpeg`,
      `${DOMAIN}/images/Pool/PoolSunDay.jpeg`,
      `${DOMAIN}/images/Jacuzzi/JacuzziRNM.jpeg`,
      `${DOMAIN}/images/BeerGarden/IMG_7326.jpeg`,
      `${DOMAIN}/images/CommonAreas/IMG_0355.jpeg`,
      `${DOMAIN}/images/CommonAreas/basketball.jpeg`,
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
        closes: '20:00',
      },
    ],
    amenityFeature: [
      'Heated Swimming Pool', 'Multiple Hot Tub Spas', 'Beer Garden & Bar',
      'Game Room', 'Nature Trails', 'Modern Bathhouses', 'Laundromat',
      'Free Wi-Fi', 'Pet Friendly', 'Propane Sales',
      'Propane Campfires & Charcoal Grills', 'Camp Library', 'Camp Store', 'Picnic Pavilions',
      'On-Site Staff',
    ].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    availableLanguage: ['English', 'Spanish'],
    numberOfRooms: 192,
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
      { '@type': 'CampingPitch', name: 'RV Sites', description: '156 full-hookup RV sites with 30/50 AMP, water & sewer', numberOfRooms: 156 },
      { '@type': 'Accommodation', name: 'Presidential Cabins', description: '20 unique cabins — 19 named after US Presidents plus the JFK House, sleeping 2-10 guests', numberOfRooms: 20 },
      { '@type': 'CampingPitch', name: 'Tent Sites', description: '20+ shaded tent sites under Ponderosa pines', numberOfRooms: 20 },
    ],
    tourBookingPage: BOOKING_URL,
    isAccessibleForFree: false,
    publicAccess: false,
    sameAs: SAME_AS,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Max RV Length', value: '100 feet' },
      { '@type': 'PropertyValue', name: 'Electrical Service', value: '30/50 AMP' },
      { '@type': 'PropertyValue', name: 'Distance to Mount Rushmore', value: '55 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Sturgis Main Street', value: '5 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Deadwood', value: '12 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Crazy Horse Memorial', value: '60 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Custer State Park', value: '70 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Spearfish Canyon', value: '25 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Rapid City', value: '30 miles' },
      { '@type': 'PropertyValue', name: 'Distance to Badlands National Park', value: '75 miles' },
      { '@type': 'PropertyValue', name: 'Interstate Access', value: 'I-90 Exit 37' },
      { '@type': 'PropertyValue', name: 'Total RV Sites', value: '156' },
      { '@type': 'PropertyValue', name: 'Total Cabins', value: '16' },
      { '@type': 'PropertyValue', name: 'Total Tent Sites', value: '20+' },
      { '@type': 'PropertyValue', name: 'Elevation', value: '3,400 feet' },
      { '@type': 'PropertyValue', name: 'Season', value: 'Year-round (RV), May-October (Luxury/Pool)' },
      { '@type': 'PropertyValue', name: 'Rally Years Hosted', value: '84+' },
      { '@type': 'PropertyValue', name: 'Founded', value: '2014' },
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
    description: 'Top-rated RV park, presidential cabins & tent camping near Mount Rushmore in Sturgis, South Dakota. 156 RV sites, 20 cabins & 20+ tent sites with heated pool, hot tubs, beer garden & free resort amenities.',
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
    numberOfRooms: 192,
    availableLanguage: ['English', 'Spanish'],
    amenityFeature: [
      'Heated Swimming Pool', 'Multiple Hot Tub Spas', 'Beer Garden & Bar',
      'Game Room', 'Nature Trails', 'Modern Bathhouses', 'Laundromat',
      'Free Wi-Fi', 'Pet Friendly', 'Propane Sales',
      'Camp Library', 'Camp Store', 'Picnic Pavilions', 'On-Site Staff',
    ].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    makesOffer: [
      { '@type': 'Offer', name: 'RV Sites', price: '41.22', priceCurrency: 'USD', description: '156 full-hookup RV sites from $41.22/night', url: `${DOMAIN}/stay/rv-sites` },
      { '@type': 'Offer', name: 'Presidential Cabins', price: '51.76', priceCurrency: 'USD', description: '20 unique presidential cabins from $51.76/night', url: `${DOMAIN}/stay/cabins` },
      { '@type': 'Offer', name: 'Tent Camping', price: '35.00', priceCurrency: 'USD', description: '20+ shaded tent sites from $35/night', url: `${DOMAIN}/stay/tent-camping` },
    ],
    tourBookingPage: BOOKING_URL,
    sameAs: SAME_AS,
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
      closes: '20:00',
    },
    priceRange: '$35 - $335',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420', bestRating: '5' },
    areaServed: { '@type': 'City', name: 'Sturgis', containedInPlace: { '@type': 'State', name: 'South Dakota' } },
    sameAs: SAME_AS,
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

/* ─── ItemList schema — carousel / list rich result for accommodation types ─── */
export function accommodationListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Accommodations at Rush No More RV Resort & Campground',
    description: 'Choose from 156 RV sites, 20 presidential cabins, and 20+ shaded tent sites near Mount Rushmore in Sturgis, South Dakota.',
    numberOfItems: 3,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Full Hookup RV Sites',
        url: `${DOMAIN}/stay/rv-sites`,
        image: `${DOMAIN}/images/rv-camper-van.png`,
        description: '156 full-hookup RV sites with 30/50 AMP, water & sewer. Pull-throughs up to 100ft. Luxury sites with cement slab, gas BBQ & private hot tub available. From $41.22/night.',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Presidential Cabins',
        url: `${DOMAIN}/stay/cabins`,
        image: `${DOMAIN}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
        description: '20 unique cabins (19 named after US Presidents plus the JFK House) — sleeping 2-10 guests. A/C, heating, private bathrooms. Economy, standard, family & luxury options. From $51.76/night.',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Tent Camping',
        url: `${DOMAIN}/stay/tent-camping`,
        image: `${DOMAIN}/images/tent_camping_RNM.png`,
        description: '20+ spacious tent sites under Ponderosa pines with modern bathhouse access. 15 sites with 20 AMP electric hookup. From $35/night.',
      },
    ],
  };
}

/* ─── OfferCatalog schema — for Google Shopping / Offers rich results ─── */
export function offerCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Rush No More Camping & Lodging Rates',
    description: 'Accommodation rates at Rush No More RV Resort near Mount Rushmore — RV sites, presidential cabins & tent camping in Sturgis, SD.',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingReservation', name: 'Water/Electric Back-in RV Site' },
        name: 'Water/Electric Back-in RV Site',
        description: 'Water & electric hookup, 30 AMP, back-in site up to 100ft',
        price: '41.22',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/stay/rv-sites`,
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingReservation', name: 'Full Hookup Pull-through RV Site' },
        name: 'Full Hookup Pull-through RV Site',
        description: 'Full hookup (water/electric/sewer), 30/50 AMP, pull-through',
        price: '62.36',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/stay/rv-sites`,
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingReservation', name: 'Luxury Spa RV Site with Private Hot Tub' },
        name: 'Luxury Spa RV Site with Private Hot Tub',
        description: 'Private hot tub spa, cement slab, gas BBQ, full hookups, 30/50 AMP',
        price: '72.93',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/stay/rv-sites`,
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingReservation', name: 'Economy Presidential Cabin (Sleeps 2)' },
        name: 'Economy Presidential Cabin (Sleeps 2)',
        description: 'Cozy cabin named after a US President, A/C & heating, private bathroom',
        price: '51.76',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/stay/cabins`,
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingReservation', name: 'Family Presidential Cabin (Sleeps 6-7)' },
        name: 'Family Presidential Cabin (Sleeps 6-7)',
        description: 'Spacious family cabin, full kitchen, A/C & heating',
        price: '100.42',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/stay/cabins`,
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingReservation', name: 'Presidential Suite JFK (Sleeps 10)' },
        name: 'Presidential Suite JFK (Sleeps 10)',
        description: 'The John F. Kennedy — our largest cabin for groups and families',
        price: '332.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/stay/cabins`,
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingReservation', name: 'Basic Tent Site' },
        name: 'Basic Tent Site',
        description: 'Shaded tent site under Ponderosa pines with bathhouse access',
        price: '35.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/stay/tent-camping`,
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingReservation', name: 'Electric Tent Site' },
        name: 'Electric Tent Site',
        description: 'Shaded tent site with 20 AMP electric hookup and bathhouse access',
        price: '40.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/stay/tent-camping`,
      },
    ],
  };
}

/* ─── TouristDestination schema — for explore page ─── */
export function touristDestinationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Black Hills, South Dakota',
    description: 'The Black Hills of South Dakota — home to Mount Rushmore, Crazy Horse Memorial, Deadwood, Custer State Park, Spearfish Canyon & more. Rush No More RV Resort in Sturgis is the perfect base camp.',
    touristType: ['Adventure Tourism', 'Nature Tourism', 'Cultural Tourism', 'Family Tourism'],
    geo: GEO,
    includesAttraction: [
      { '@type': 'TouristAttraction', name: 'Mount Rushmore National Memorial', description: 'Iconic sculpture of four US Presidents carved into granite — 55 miles from Rush No More' },
      { '@type': 'TouristAttraction', name: 'Crazy Horse Memorial', description: 'The world\'s largest mountain carving in progress — 60 miles from Rush No More' },
      { '@type': 'TouristAttraction', name: 'Historic Deadwood', description: 'Gold rush-era town with casinos, history & entertainment — 12 miles from Rush No More' },
      { '@type': 'TouristAttraction', name: 'Spearfish Canyon', description: 'One of America\'s most scenic canyons with waterfalls & hiking — 25 miles from Rush No More' },
      { '@type': 'TouristAttraction', name: 'Custer State Park', description: '71,000-acre park with bison herds, wildlife & scenic drives — 70 miles from Rush No More' },
      { '@type': 'TouristAttraction', name: 'Needles Highway', description: 'Stunning scenic drive through granite spires & tunnels — 65 miles from Rush No More' },
      { '@type': 'TouristAttraction', name: 'Bear Country USA', description: 'Drive-through wildlife park with bears, wolves & elk — 55 miles from Rush No More' },
      { '@type': 'TouristAttraction', name: 'Wind Cave National Park', description: 'One of the longest caves in the world with unique boxwork formations — 75 miles from Rush No More' },
    ],
  };
}

/* ─── Article / BlogPosting schema — for guide pages (itinerary, rides, etc.) ─── */
export function articleSchema(article: {
  headline: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  wordCount?: number;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${DOMAIN}${article.url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${DOMAIN}${article.url}` },
    headline: article.headline,
    description: article.description,
    image: [article.image.startsWith('http') ? article.image : `${DOMAIN}${article.image}`],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: DOMAIN,
      logo: { '@type': 'ImageObject', url: `${DOMAIN}/images/RushNoMore-logo.png` },
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      logo: { '@type': 'ImageObject', url: `${DOMAIN}/images/RushNoMore-logo.png`, width: 512, height: 512 },
    },
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    wordCount: article.wordCount,
    keywords: article.keywords?.join(', '),
    about: {
      '@type': 'Thing',
      name: 'Black Hills, South Dakota',
      sameAs: 'https://en.wikipedia.org/wiki/Black_Hills',
    },
  };
}

/* ─── Service schema — for each accommodation type ─── */
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
  image: string;
  priceMin: string;
  priceMax?: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${DOMAIN}${service.url}#service`,
    name: service.name,
    description: service.description,
    url: `${DOMAIN}${service.url}`,
    image: service.image.startsWith('http') ? service.image : `${DOMAIN}${service.image}`,
    serviceType: service.serviceType,
    provider: { '@type': 'Organization', '@id': `${DOMAIN}/#campground`, name: BUSINESS_NAME },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: GEO,
      geoRadius: '100 mi',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: service.priceMin,
      highPrice: service.priceMax || service.priceMin,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: BOOKING_URL,
    },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420', bestRating: '5', worstRating: '1' },
  };
}

/* ─── Product schema — individual cabins / premium RV sites ─── */
export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  price: string;
  sku?: string;
  brand?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${DOMAIN}${product.image}`,
    url: `${DOMAIN}${product.url}`,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand || 'Rush No More' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: BOOKING_URL,
      priceValidUntil: '2026-12-31',
      seller: { '@type': 'Organization', name: BUSINESS_NAME },
    },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420' },
  };
}

/* ─── HowTo schema — step-by-step itinerary / driving guides ─── */
export function howToSchema(howTo: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration, e.g. "PT6H"
  estimatedCost?: { value: string; currency: string };
  supply?: string[];
  tool?: string[];
  steps: { name: string; text: string; image?: string; url?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image ? (howTo.image.startsWith('http') ? howTo.image : `${DOMAIN}${howTo.image}`) : undefined,
    totalTime: howTo.totalTime,
    estimatedCost: howTo.estimatedCost
      ? { '@type': 'MonetaryAmount', currency: howTo.estimatedCost.currency, value: howTo.estimatedCost.value }
      : undefined,
    supply: howTo.supply?.map(s => ({ '@type': 'HowToSupply', name: s })),
    tool: howTo.tool?.map(t => ({ '@type': 'HowToTool', name: t })),
    step: howTo.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: s.url ? `${DOMAIN}${s.url}` : undefined,
      image: s.image ? (s.image.startsWith('http') ? s.image : `${DOMAIN}${s.image}`) : undefined,
    })),
  };
}

/* ─── SpeakableSpecification — Google Assistant voice search ─── */
export function speakableSchema(url: string, cssSelectors: string[] = ['h1', '[data-speakable]']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${DOMAIN}${url}`,
    url: `${DOMAIN}${url}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}

/* ─── Place schema — campground as a Place with geo + photo ─── */
export function placeSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${DOMAIN}/#place`,
    name: BUSINESS_NAME,
    url: DOMAIN,
    address: ADDRESS,
    geo: GEO,
    hasMap: 'https://maps.app.goo.gl/sBHGqk1yV4c2Tx1z9',
    photo: [
      `${DOMAIN}/images/Aereal-2_1400.png`,
      `${DOMAIN}/images/Pool/PoolWithPeople.jpeg`,
      `${DOMAIN}/images/Pool/PoolSunDay.jpeg`,
      `${DOMAIN}/images/Jacuzzi/JacuzziRNM.jpeg`,
      `${DOMAIN}/images/CommonAreas/IMG_0355.jpeg`,
      `${DOMAIN}/images/CommonAreas/basketball.jpeg`,
    ],
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Black Hills',
      containedInPlace: {
        '@type': 'State',
        name: 'South Dakota',
        containedInPlace: { '@type': 'Country', name: 'United States' },
      },
    },
    sameAs: SAME_AS,
  };
}

/* ─── TravelAction — let Google surface "book now" actions ─── */
export function reservationActionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: BOOKING_URL,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    result: { '@type': 'LodgingReservation', name: 'Rush No More Reservation' },
  };
}

/* ─── ItemList schema — "related pages" / site navigation hint ─── */
export function relatedPagesSchema(pages: { name: string; url: string; description?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: pages.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${DOMAIN}${p.url}`,
      name: p.name,
      description: p.description,
    })),
  };
}

/* ─── VacationRental schema (Google 2024+) — for cabin listings ─── */
export function vacationRentalSchema(rental: {
  name: string;
  description: string;
  image: string;
  url: string;
  price: string;
  bedrooms?: number;
  occupancy?: number;
  amenities?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: rental.name,
    description: rental.description,
    image: rental.image.startsWith('http') ? rental.image : `${DOMAIN}${rental.image}`,
    url: `${DOMAIN}${rental.url}`,
    brand: { '@type': 'Brand', name: BUSINESS_NAME },
    address: ADDRESS,
    geo: GEO,
    containsPlace: rental.bedrooms
      ? { '@type': 'Accommodation', numberOfBedrooms: rental.bedrooms, occupancy: { '@type': 'QuantitativeValue', maxValue: rental.occupancy } }
      : undefined,
    amenityFeature: rental.amenities?.map(a => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
    offers: {
      '@type': 'Offer',
      price: rental.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: BOOKING_URL,
    },
    checkinTime: '14:00',
    checkoutTime: '11:00',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '420' },
  };
}
