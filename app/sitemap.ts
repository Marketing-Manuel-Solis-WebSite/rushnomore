import { MetadataRoute } from 'next';
const B = 'https://www.rushnomore.com';
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const pages = [
    { url: '/', p: 1.0 }, { url: '/stay', p: 0.9 }, { url: '/stay/rv-sites', p: 0.9 },
    { url: '/stay/cabins', p: 0.9 }, { url: '/stay/tent-camping', p: 0.9 },
    { url: '/mount-rushmore', p: 0.9 }, { url: '/black-hills', p: 0.9 },
    { url: '/itineraries', p: 0.8 }, { url: '/attractions/deadwood', p: 0.7 },
    { url: '/attractions/spearfish-canyon', p: 0.7 }, { url: '/attractions/custer-state-park', p: 0.7 },
    { url: '/events/sturgis-rally', p: 0.8 }, { url: '/events/sturgis-rally/rates', p: 0.8 },
    { url: '/events/car-show', p: 0.6 }, { url: '/events/weddings', p: 0.6 },
    { url: '/amenities', p: 0.7 }, { url: '/map', p: 0.6 }, { url: '/about', p: 0.6 },
    { url: '/contact', p: 0.7 }, { url: '/policies', p: 0.5 }, { url: '/ada', p: 0.3 }, { url: '/legal', p: 0.3 },
  ];
  return pages.map(({ url, p }) => ({
    url: B + url, lastModified: now, changeFrequency: 'weekly' as const, priority: p,
  }));
}
