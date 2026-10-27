import { MetadataRoute } from 'next';

const B = 'https://www.rushnomore.com';

// lastmod = build date. This route is statically rendered, so the value is
// computed once per deploy and matches the content actually shipped (no
// hand-maintained dates that drift out of sync).
const BUILD_DATE = new Date();
const LM = {
  homepage: BUILD_DATE,
  stay: BUILD_DATE,
  rvSites: BUILD_DATE,
  cabins: BUILD_DATE,
  tentCamping: BUILD_DATE,
  rallyInfo: BUILD_DATE,
  rallyHub: BUILD_DATE,
  rallyRates: BUILD_DATE,
  rvParkRushmore: BUILD_DATE,
  weddingsGroups: BUILD_DATE,
  monthlyRv: BUILD_DATE,
  explore: BUILD_DATE,
  events: BUILD_DATE,
  amenities: BUILD_DATE,
  itinerary: BUILD_DATE,
  motorcycleRides: BUILD_DATE,
  deadwood: BUILD_DATE,
  spearfish: BUILD_DATE,
  needles: BUILD_DATE,
  ironMountain: BUILD_DATE,
  contact: BUILD_DATE,
  map: BUILD_DATE,
  about: BUILD_DATE,
  policies: BUILD_DATE,
  ada: BUILD_DATE,
  legal: BUILD_DATE,
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
            'Tour Rush No More RV Resort near Mount Rushmore — 156 RV sites, 20 cabins, tent camping, pool, beer garden and free resort amenities.',
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
            'See your accommodation options at Rush No More RV Resort — 156 RV sites, 20 cabins, tent camping near Mount Rushmore.',
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
        `${B}/images/PullRV.jpeg`,
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
      url: `${B}/sturgis-rally`,
      lastModified: LM.rallyInfo,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [
        `${B}/images/BikeRally/IMG_9865.JPG`,
        `${B}/images/BikeRally/IMG_9866.JPG`,
        `${B}/images/BikeRally/IMG_9867.JPG`,
        `${B}/images/BikeRally/IMG_9868.JPG`,
        `${B}/images/BikeRally/IMG_9869.JPG`,
      ],
    },
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
            'Events at Rush No More: Sturgis Motorcycle Rally camping every August, the Dakota Rods plus Classics Car Show, weddings and group events.',
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
          title: 'Free Resort Amenities at Rush No More RV Resort',
          description:
            'Tour the free resort amenities at Rush No More — pool, hot tubs, beer garden, game room, nature trails and more.',
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
            'Meet the family behind Rush No More — the family-owned RV resort near Mount Rushmore in Sturgis, South Dakota.',
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
