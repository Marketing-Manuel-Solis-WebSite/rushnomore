import { MetadataRoute } from 'next';
const B = 'https://www.rushnomore.com';
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const pages = [
    { url: '/', p: 1.0, freq: 'weekly' as const },
    { url: '/stay', p: 0.9, freq: 'weekly' as const },
    { url: '/stay/rv-sites', p: 0.9, freq: 'weekly' as const },
    { url: '/stay/cabins', p: 0.9, freq: 'weekly' as const },
    { url: '/stay/tent-camping', p: 0.9, freq: 'weekly' as const },
    { url: '/explore', p: 0.9, freq: 'monthly' as const },
    { url: '/events', p: 0.85, freq: 'weekly' as const },
    { url: '/amenities', p: 0.8, freq: 'monthly' as const },
    { url: '/contact', p: 0.75, freq: 'monthly' as const },
    { url: '/map', p: 0.7, freq: 'monthly' as const },
    { url: '/about', p: 0.7, freq: 'monthly' as const },
    { url: '/booking', p: 0.8, freq: 'weekly' as const },
    { url: '/policies', p: 0.5, freq: 'yearly' as const },
    { url: '/ada', p: 0.3, freq: 'yearly' as const },
    { url: '/legal', p: 0.3, freq: 'yearly' as const },
  ];
  return pages.map(({ url, p, freq }) => ({
    url: B + url, lastModified: now, changeFrequency: freq, priority: p,
  }));
}
