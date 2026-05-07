import { MetadataRoute } from 'next';

const B = 'https://www.rushnomore.com';

// Stable per-page lastmod dates. Google ignores sitemaps where every URL has
// the same `now()` timestamp (signals a generated/empty sitemap). We bump these
// dates manually when a page meaningfully changes — small content tweaks don't
// count, only structural / pricing / schema changes.
const LM = {
  homepage: '2026-04-30',
  stay: '2026-04-22',
  rvSites: '2026-04-22',
  cabins: '2026-04-22',
  tentCamping: '2026-04-22',
  rallyHub: '2026-04-22',
  rallyRates: '2026-04-22',
  rvParkRushmore: '2026-04-22',
  weddingsGroups: '2026-04-22',
  monthlyRv: '2026-04-22',
  explore: '2026-04-22',
  events: '2026-04-22',
  amenities: '2026-04-22',
  itinerary: '2026-04-22',
  motorcycleRides: '2026-04-22',
  deadwood: '2026-04-22',
  spearfish: '2026-04-22',
  needles: '2026-04-22',
  ironMountain: '2026-04-22',
  contact: '2026-04-22',
  map: '2026-04-22',
  about: '2026-04-22',
  policies: '2026-04-22',
  ada: '2026-04-22',
  legal: '2026-04-22',
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ─── Homepage — highest priority ───
    {
      url: `${B}/`,
      lastModified: LM.homepage,
      changeFrequency: 'daily',
      priority: 1.0,
      images: [
        `${B}/images/Aereal-2_1400.png`,
        `${B}/images/Pool/PoolWithPeople.jpeg`,
        `${B}/images/Pool/PoolSunDay.jpeg`,
        `${B}/images/Jacuzzi/JacuzziRNM.jpeg`,
        `${B}/images/BeerGarden/IMG_7326.jpeg`,
        `${B}/images/CommonAreas/IMG_0355.jpeg`,
        `${B}/images/CommonAreas/basketball.jpeg`,
        `${B}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
        `${B}/images/rv-camper-van.png`,
        `${B}/images/tent_camping_RNM.png`,
      ],
      videos: [
        {
          thumbnail_loc: `${B}/images/Aereal-2_1400.png`,
          title: 'Rush No More RV Resort and Campground in Sturgis, SD',
          description:
            'Tour Rush No More RV Resort near Mount Rushmore — 200 plus RV sites, 16 cabins, tent camping, pool, beer garden and 16 free amenities.',
          content_loc: `${B}/videos/rushnomore-video.mp4`,
          family_friendly: 'yes',
          live: 'no',
          requires_subscription: 'no',
          tag: 'rv park,campground,mount rushmore,sturgis,black hills',
        },
      ],
    },

    // ─── Money pages — accommodations ───
    {
      url: `${B}/stay`,
      lastModified: LM.stay,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [
        `${B}/images/GeneralImagesPark/IMG_7386.jpeg`,
        `${B}/images/rv-camper-van.png`,
        `${B}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
        `${B}/images/tent_camping_RNM.png`,
        `${B}/images/vip-site.png`,
      ],
      videos: [
        {
          thumbnail_loc: `${B}/images/GeneralImagesPark/IMG_7386.jpeg`,
          title: 'Stay at Rush No More — RV, Cabins and Tent Camping',
          description:
            'See your accommodation options at Rush No More RV Resort — 200 plus RV sites, 16 cabins, tent camping near Mount Rushmore.',
          content_loc: `${B}/videos/RNM-stay.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
    },
    {
      url: `${B}/stay/rv-sites`,
      lastModified: LM.rvSites,
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
      lastModified: LM.cabins,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [`${B}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`],
    },
    {
      url: `${B}/stay/tent-camping`,
      lastModified: LM.tentCamping,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${B}/images/tent_camping_RNM.png`, `${B}/images/Wooded-Tent-Area.png`],
    },

    // ─── Rally cluster — seasonal high-intent ───
    {
      url: `${B}/sturgis-rally-camping`,
      lastModified: LM.rallyHub,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [`${B}/images/BikeRally/IMG_9865.JPG`],
    },
    {
      url: `${B}/rally-rates`,
      lastModified: LM.rallyRates,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${B}/images/BikeRally/IMG_9865.JPG`],
    },

    // ─── Paid / SEO landing pages ───
    {
      url: `${B}/rv-park-near-mount-rushmore`,
      lastModified: LM.rvParkRushmore,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${B}/images/Aereal-2_1400.png`,
        `${B}/images/rv-camper-van.png`,
        `${B}/images/vip-site.png`,
      ],
    },

    // ─── Groups / weddings / long-term ───
    {
      url: `${B}/weddings-groups`,
      lastModified: LM.weddingsGroups,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${B}/images/EventCenter/IMG_7513.jpeg`],
    },
    {
      url: `${B}/monthly-rv-sites`,
      lastModified: LM.monthlyRv,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${B}/images/rv-camper-van.png`],
    },

    // ─── Explore & events hubs ───
    {
      url: `${B}/explore`,
      lastModified: LM.explore,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${B}/images/GeneralImagesPark/IMG_7383.jpeg`,
        `${B}/images/DSC05580-s.png`,
      ],
      videos: [
        {
          thumbnail_loc: `${B}/images/GeneralImagesPark/IMG_7383.jpeg`,
          title: 'Explore the Black Hills — Mount Rushmore, Deadwood and More',
          description:
            'Black Hills attractions from Rush No More: Mount Rushmore, Crazy Horse, Deadwood, Spearfish Canyon, Needles Highway and Custer State Park.',
          content_loc: `${B}/videos/RNM-explore.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
    },
    {
      url: `${B}/events`,
      lastModified: LM.events,
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [
        `${B}/images/BikeRally/IMG_9865.JPG`,
        `${B}/images/car_show_RNM.png`,
        `${B}/images/EventCenter/IMG_7513.jpeg`,
      ],
      videos: [
        {
          thumbnail_loc: `${B}/images/BikeRally/IMG_9865.JPG`,
          title: 'Events at Rush No More — Sturgis Rally, Car Show and Weddings',
          description:
            'Events at Rush No More: Sturgis Motorcycle Rally (August 2 to 18, 2026), Dakota Rods plus Classics Car Show (September 12, 2026), weddings and group events.',
          content_loc: `${B}/videos/RNM-events.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
    },
    {
      url: `${B}/amenities`,
      lastModified: LM.amenities,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [
        `${B}/images/Pool/PoolWithPeople.jpeg`,
        `${B}/images/Pool/PoolSunDay.jpeg`,
        `${B}/images/BeerGarden/IMG_7326.jpeg`,
        `${B}/images/Jacuzzi/JacuzziRNM.jpeg`,
        `${B}/images/Jacuzzi/IMG_7205.jpeg`,
        `${B}/images/CommonAreas/basketball.jpeg`,
        `${B}/images/CommonAreas/IMG_0355.jpeg`,
        `${B}/images/RecRoom/GamesRoom.jpeg`,
      ],
      videos: [
        {
          thumbnail_loc: `${B}/images/Pool/PoolWithPeople.jpeg`,
          title: '16 Free Amenities at Rush No More RV Resort',
          description:
            'Tour the 16 free amenities at Rush No More — heated pool, hot tubs, beer garden, game room, nature trails, bike wash and more.',
          content_loc: `${B}/videos/rushnomore-amenities.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
    },

    // ─── Content / guides cluster ───
    {
      url: `${B}/black-hills-itinerary`,
      lastModified: LM.itinerary,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${B}/images/DSC05580-s.png`],
    },
    {
      url: `${B}/best-motorcycle-rides-near-sturgis`,
      lastModified: LM.motorcycleRides,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${B}/images/BikeRally/IMG_9865.JPG`],
    },
    {
      url: `${B}/deadwood-day-trip`,
      lastModified: LM.deadwood,
      changeFrequency: 'monthly',
      priority: 0.75,
      images: [`${B}/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg`],
    },
    {
      url: `${B}/spearfish-canyon-guide`,
      lastModified: LM.spearfish,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${B}/images/rv-camper-van.png`],
    },
    {
      url: `${B}/needles-highway-guide`,
      lastModified: LM.needles,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${B}/images/GeneralImagesPark/IMG_7383.jpeg`],
    },
    {
      url: `${B}/iron-mountain-road-guide`,
      lastModified: LM.ironMountain,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${B}/images/DSC05580-s.png`],
    },

    // ─── Local / info / conversion pages ───
    {
      url: `${B}/contact`,
      lastModified: LM.contact,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [`${B}/images/PeoplePlaying/IMG_7078.jpeg`],
      videos: [
        {
          thumbnail_loc: `${B}/images/PeoplePlaying/IMG_7078.jpeg`,
          title: 'Contact Rush No More RV Resort',
          description:
            'Get in touch with Rush No More in Sturgis, SD — call 605-423-2545, email rushnomoresd@gmail.com.',
          content_loc: `${B}/videos/rushnomore-contact.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
    },
    {
      url: `${B}/map`,
      lastModified: LM.map,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [`${B}/images/RushNoMoreMap.jpg`, `${B}/images/Aereal-2_1400.png`],
      videos: [
        {
          thumbnail_loc: `${B}/images/RushNoMoreMap.jpg`,
          title: 'Rush No More Campground Map and Directions',
          description:
            'Interactive campground map of Rush No More in Sturgis, SD. Directions from I-90 Exit 37.',
          content_loc: `${B}/videos/RNM-map.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
    },
    {
      url: `${B}/about`,
      lastModified: LM.about,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [
        `${B}/images/GeneralImagesPark/IMG_7379.jpeg`,
        `${B}/images/Aereal-2_1400.png`,
      ],
      videos: [
        {
          thumbnail_loc: `${B}/images/GeneralImagesPark/IMG_7379.jpeg`,
          title: 'About Rush No More — Family-Owned Black Hills Campground',
          description:
            'Meet the family behind Rush No More — the 4.8 star award-winning RV resort near Mount Rushmore in Sturgis, South Dakota.',
          content_loc: `${B}/videos/RNM-about.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
    },

    // ─── Legal & compliance ───
    {
      url: `${B}/policies`,
      lastModified: LM.policies,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${B}/ada`,
      lastModified: LM.ada,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${B}/legal`,
      lastModified: LM.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
