import { MetadataRoute } from 'next';

const B = 'https://www.rushnomore.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    // ─── Homepage — highest priority ───
    {
      url: B,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      images: [
        `${B}/images/Aereal-2_1400.png`,
        `${B}/images/Pool/PoolWithPeople.jpeg`,
        `${B}/images/BeerGarden/IMG_7326.jpeg`,
        `${B}/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png`,
        `${B}/images/rv-camper-van.png`,
        `${B}/images/tent_camping_RNM.png`,
      ],
      videos: [
        {
          thumbnail_loc: `${B}/images/Aereal-2_1400.png`,
          title: 'Rush No More RV Resort and Campground in Sturgis, SD',
          description: 'Tour Rush No More RV Resort near Mount Rushmore — 200 plus RV sites, 16 cabins, tent camping, pool, beer garden and 16 free amenities.',
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
      videos: [
        {
          thumbnail_loc: `${B}/images/GeneralImagesPark/IMG_7386.jpeg`,
          title: 'Stay at Rush No More — RV, Cabins and Tent Camping',
          description: 'See your accommodation options at Rush No More RV Resort — 200 plus RV sites, 16 cabins, tent camping near Mount Rushmore.',
          content_loc: `${B}/videos/RNM-stay.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
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

    // ─── Paid / SEO landing pages ───
    {
      url: `${B}/rv-park-near-mount-rushmore`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
      images: [
        `${B}/images/Aereal-2_1400.png`,
        `${B}/images/rv-camper-van.png`,
        `${B}/images/vip-site.png`,
      ],
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
      videos: [
        {
          thumbnail_loc: `${B}/images/GeneralImagesPark/IMG_7383.jpeg`,
          title: 'Explore the Black Hills — Mount Rushmore, Deadwood and More',
          description: 'Black Hills attractions from Rush No More: Mount Rushmore, Crazy Horse, Deadwood, Spearfish Canyon, Needles Highway and Custer State Park.',
          content_loc: `${B}/videos/RNM-explore.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
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
      videos: [
        {
          thumbnail_loc: `${B}/images/BikeRally/IMG_9865.JPG`,
          title: 'Events at Rush No More — Sturgis Rally, Car Show and Weddings',
          description: 'Events at Rush No More: Sturgis Motorcycle Rally (August 2 to 18, 2026), Dakota Rods plus Classics Car Show (September 12, 2026), weddings and group events.',
          content_loc: `${B}/videos/RNM-events.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
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
      videos: [
        {
          thumbnail_loc: `${B}/images/Pool/PoolWithPeople.jpeg`,
          title: '16 Free Amenities at Rush No More RV Resort',
          description: 'Tour the 16 free amenities at Rush No More — heated pool, hot tubs, beer garden, game room, nature trails, bike wash and more.',
          content_loc: `${B}/videos/rushnomore-amenities.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
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
      videos: [
        {
          thumbnail_loc: `${B}/images/PeoplePlaying/IMG_7078.jpeg`,
          title: 'Contact Rush No More RV Resort',
          description: 'Get in touch with Rush No More in Sturgis, SD — call 605-423-2545, email rushnomoresd@gmail.com.',
          content_loc: `${B}/videos/rushnomore-contact.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
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
      videos: [
        {
          thumbnail_loc: `${B}/images/RushNoMoreMap.jpg`,
          title: 'Rush No More Campground Map and Directions',
          description: 'Interactive campground map of Rush No More in Sturgis, SD. Directions from I-90 Exit 37.',
          content_loc: `${B}/videos/RNM-map.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
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
      videos: [
        {
          thumbnail_loc: `${B}/images/GeneralImagesPark/IMG_7379.jpeg`,
          title: 'About Rush No More — Family-Owned Black Hills Campground',
          description: 'Meet the family behind Rush No More — the 4.8 star award-winning RV resort near Mount Rushmore in Sturgis, South Dakota.',
          content_loc: `${B}/videos/RNM-about.mp4`,
          family_friendly: 'yes',
          live: 'no',
        },
      ],
    },

    // ─── Legal & compliance ───
    { url: `${B}/policies`, lastModified: now, changeFrequency: 'yearly', priority: 0.40 },
    { url: `${B}/ada`, lastModified: now, changeFrequency: 'yearly', priority: 0.40 },
    { url: `${B}/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.30 },
  ];
}
