import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Intentionally does NOT block /_next/ — Googlebot needs /_next/static/ (JS, CSS, fonts)
  // to render the page. Next.js emits no indexable HTML under /_next/ anyway.
  // Disabled routes (/book, /booking, /my-reservation, /thanks) are redirected to / by
  // middleware.ts; leaving them crawlable lets Google follow the 301 and drop the old URLs
  // from the index instead of flagging them as "Blocked by robots.txt" in Search Console.
  const blocked = ['/api/', '/admin/'];

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
        disallow: ['/api/', '/admin/'],
      },
      // Google Video crawler
      {
        userAgent: 'Googlebot-Video',
        allow: ['/', '/videos/'],
        disallow: ['/api/', '/admin/'],
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
