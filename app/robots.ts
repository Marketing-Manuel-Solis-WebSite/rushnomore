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
      // ─── AI bot policy ───
      // Google-Extended powers Google AI Overviews / Gemini — for a tourism
      // business, appearing in those answers is high-intent free traffic.
      // ALLOW it. We do allow OAI-SearchBot (ChatGPT search results — also
      // surfaces our brand) and PerplexityBot (Perplexity search citations).
      // We BLOCK pure training-set scrapers (CCBot, Bytespider, cohere-ai)
      // since they take content for training without driving any visits.
      // GPTBot / ChatGPT-User / Anthropic / Claude bots are allowed because
      // ChatGPT and Claude routinely cite reservations / hours / locations
      // when answering travel queries.
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Pure training-set scrapers with no search-driven traffic value — block
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'cohere-ai', disallow: '/' },
      { userAgent: 'FacebookBot', disallow: '/' },
      { userAgent: 'ImagesiftBot', disallow: '/' },
      { userAgent: 'Omgilibot', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'Diffbot', disallow: '/' },
      { userAgent: 'YouBot', disallow: '/' },
      // Aggressive SEO crawlers — slow them down to protect TTFB
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 10,
        disallow: '/api/',
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
        disallow: '/api/',
      },
      {
        userAgent: 'MJ12bot',
        crawlDelay: 10,
        disallow: '/api/',
      },
      {
        userAgent: 'DotBot',
        crawlDelay: 10,
        disallow: '/api/',
      },
    ],
    sitemap: 'https://www.rushnomore.com/sitemap.xml',
    host: 'https://www.rushnomore.com',
  };
}
