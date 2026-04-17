import { MetadataRoute } from 'next';

const B = 'https://www.rushnomore.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    // ─── Homepage — highest priority ───
    {
      url: B,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${B}/images/Aereal-2_1400.png`,
        `${B}/images/Pool/PoolWithPeople.jpeg`,
        `${B}/images/BeerGarden/IMG_7326.jpeg`,
        `${B}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
        `${B}/images/rv-camper-van.png`,
        `${B}/images/tent_camping_RNM.png`,
      ],
    },

    // ─── Money pages — accommodations ───
    {
      url: `${B}/stay`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [
        `${B}/images/GeneralImagesPark/IMG_7386.jpeg`,
        `${B}/images/rv-camper-van.png`,
        `${B}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
        `${B}/images/tent_camping_RNM.png`,
        `${B}/images/vip-site.png`,
      ],
    },
    {
      url: `${B}/stay/rv-sites`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [
        `${B}/images/RushMore-rv-camper-van.png`,
        `${B}/images/FHU Back-in.png`,
        `${B}/images/FHU Pull-through.png`,
        `${B}/images/WaterElectric Back-in.png`,
        `${B}/images/vip-site.png`,
      ],
    },
    {
      url: `${B}/stay/cabins`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [
        `${B}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
      ],
    },
    {
      url: `${B}/stay/tent-camping`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
      images: [
        `${B}/images/tent_camping_RNM.png`,
        `${B}/images/Wooded-Tent-Area.png`,
      ],
    },

    // ─── Rally cluster — seasonal high-intent ───
    {
      url: `${B}/sturgis-rally-camping`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [`${B}/images/BikeRally/IMG_9865.JPG`],
    },
    {
      url: `${B}/rally-rates`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.90,
      images: [`${B}/images/BikeRally/IMG_9865.JPG`],
    },

    // ─── Groups / weddings / long-term ───
    {
      url: `${B}/weddings-groups`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${B}/images/EventCenter/IMG_7513.jpeg`],
    },
    {
      url: `${B}/monthly-rv-sites`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.80,
      images: [`${B}/images/rv-camper-van.png`],
    },

    // ─── Explore & events hubs ───
    {
      url: `${B}/explore`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
      images: [
        `${B}/images/GeneralImagesPark/IMG_7383.jpeg`,
        `${B}/images/DSC05580-s.png`,
      ],
    },
    {
      url: `${B}/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [
        `${B}/images/BikeRally/IMG_9865.JPG`,
        `${B}/images/car_show_RNM.png`,
        `${B}/images/EventCenter/IMG_7513.jpeg`,
      ],
    },
    {
      url: `${B}/amenities`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [
        `${B}/images/Pool/PoolWithPeople.jpeg`,
        `${B}/images/BeerGarden/IMG_7326.jpeg`,
        `${B}/images/Jacuzzi/IMG_7205.jpeg`,
        `${B}/images/RecRoom/GamesRoom.jpeg`,
      ],
    },

    // ─── Content / guides cluster ───
    {
      url: `${B}/black-hills-itinerary`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${B}/images/DSC05580-s.png`],
    },
    {
      url: `${B}/best-motorcycle-rides-near-sturgis`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${B}/images/BikeRally/IMG_9865.JPG`],
    },
    {
      url: `${B}/deadwood-day-trip`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
      images: [`${B}/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg`],
    },
    {
      url: `${B}/spearfish-canyon-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
      images: [`${B}/images/rv-camper-van.png`],
    },
    {
      url: `${B}/needles-highway-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
      images: [`${B}/images/GeneralImagesPark/IMG_7383.jpeg`],
    },
    {
      url: `${B}/iron-mountain-road-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
      images: [`${B}/images/DSC05580-s.png`],
    },

    // ─── Local / info / conversion pages ───
    {
      url: `${B}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
      images: [`${B}/images/PeoplePlaying/IMG_7078.jpeg`],
    },
    {
      url: `${B}/map`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
      images: [
        `${B}/images/RushNoMoreMap.jpg`,
        `${B}/images/Aereal-2_1400.png`,
      ],
    },
    {
      url: `${B}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
      images: [
        `${B}/images/GeneralImagesPark/IMG_7379.jpeg`,
        `${B}/images/Aereal-2_1400.png`,
      ],
    },

    // ─── Legal & compliance ───
    { url: `${B}/policies`, lastModified: now, changeFrequency: 'yearly', priority: 0.40 },
    { url: `${B}/ada`, lastModified: now, changeFrequency: 'yearly', priority: 0.40 },
    { url: `${B}/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.30 },
  ];
}
