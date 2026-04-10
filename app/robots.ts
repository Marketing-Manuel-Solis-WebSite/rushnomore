import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/book/',
          '/booking/',
          '/my-reservation/',
          '/thanks/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/book/', '/booking/', '/my-reservation/', '/thanks/'],
      },
    ],
    sitemap: 'https://www.rushnomore.com/sitemap.xml',
    host: 'https://www.rushnomore.com',
  };
}
