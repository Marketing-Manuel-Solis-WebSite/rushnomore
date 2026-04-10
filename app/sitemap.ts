import { MetadataRoute } from 'next';

const B = 'https://www.rushnomore.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    // Homepage — highest priority
    { url: B, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },

    // Core accommodation pages — high priority, frequently updated
    { url: `${B}/stay`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${B}/stay/rv-sites`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${B}/stay/cabins`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${B}/stay/tent-camping`, lastModified: now, changeFrequency: 'weekly', priority: 0.90 },

    // Discovery & events — great for organic traffic
    { url: `${B}/explore`, lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${B}/events`, lastModified: now, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${B}/amenities`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Conversion & info pages
    { url: `${B}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${B}/map`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${B}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // Legal & compliance — low priority but important for trust
    { url: `${B}/policies`, lastModified: now, changeFrequency: 'yearly', priority: 0.40 },
    { url: `${B}/ada`, lastModified: now, changeFrequency: 'yearly', priority: 0.30 },
    { url: `${B}/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.30 },
  ];
}
