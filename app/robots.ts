import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const blocked = ['/api/', '/_next/', '/admin/', '/book/', '/booking/', '/my-reservation/', '/thanks/'];

  return {
    rules: [
      // All search engines — index everything public
      {
        userAgent: '*',
        allow: '/',
        disallow: blocked,
      },
      // Google — explicit allow for images & videos
      {
        userAgent: 'Googlebot',
        allow: ['/', '/images/', '/videos/'],
        disallow: blocked,
      },
      // Google Image crawler
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/images/'],
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Google Video crawler
      {
        userAgent: 'Googlebot-Video',
        allow: ['/', '/videos/'],
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: ['/', '/images/', '/videos/'],
        disallow: blocked,
      },
      // Bing preview image bot
      {
        userAgent: 'BingPreview',
        allow: ['/', '/images/'],
        disallow: blocked,
      },
      // DuckDuckGo
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: blocked,
      },
      // Yahoo / Slurp
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: blocked,
      },
      // Apple
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: blocked,
      },
      // Facebook link preview
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Twitter/X card preview
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // LinkedIn preview
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Block AI scrapers that don't respect content
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
    ],
    sitemap: 'https://www.rushnomore.com/sitemap.xml',
    host: 'https://www.rushnomore.com',
  };
}
