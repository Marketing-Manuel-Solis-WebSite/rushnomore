import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Suppress X-Powered-By: Next.js leak for reconnaissance hardening
  poweredByHeader: false,
  // Compression at the Next runtime (Vercel/CDN usually overrides, but harmless)
  compress: true,
  // React strict mode surfaces unsafe lifecycles in development
  reactStrictMode: true,
  // Treat trailing slashes consistently so we don't generate duplicate URLs
  trailingSlash: false,
  // Tree-shake large icon/motion libraries.
  // optimizePackageImports handles lucide-react/framer-motion/recharts automatically
  // in Next.js 15 — no custom modularizeImports needed (that can break when
  // upstream ESM paths change).
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'recharts',
      'date-fns',
      '@vercel/analytics',
      '@vercel/speed-insights',
    ],
    scrollRestoration: true,
    // Minimize the amount of React each route ships
    optimizeServerReact: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    minimumCacheTTL: 31536000,
    // Tight device sizes keep responsive srcsets small
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Block SVGs from being processed to avoid XSS via crafted SVGs
    dangerouslyAllowSVG: false,
    // Inline so images render in <img>, not forced-download
    contentDispositionType: 'inline',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          // Blocks Adobe Flash / Acrobat cross-domain policy lookups — legacy vector
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          // Explicitly disable legacy XSS filter (deprecated in Chrome 78+, buggy elsewhere)
          { key: 'X-XSS-Protection', value: '0' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: [
              'accelerometer=()',
              'autoplay=(self)',
              'camera=()',
              'display-capture=()',
              'encrypted-media=()',
              'fullscreen=(self)',
              'geolocation=()',
              'gyroscope=()',
              'magnetometer=()',
              'microphone=()',
              'midi=()',
              'payment=(self "https://js.stripe.com" "https://checkout.stripe.com")',
              'picture-in-picture=(self)',
              'publickey-credentials-get=()',
              'screen-wake-lock=()',
              'sync-xhr=()',
              'usb=()',
              'web-share=(self)',
              'xr-spatial-tracking=()',
              'interest-cohort=()',
              'browsing-topics=()',
            ].join(', '),
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          { key: 'Origin-Agent-Cluster', value: '?1' },
          // Hide server identity to reduce attack-surface reconnaissance
          { key: 'X-Powered-By', value: '' },
          { key: 'Server', value: '' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Scripts: Vercel + Google analytics/tag + Stripe. 'unsafe-inline' is required by
              // GTM bootstrap and Next's runtime chunks; 'unsafe-eval' is required by some
              // chart/motion libs. Keep them scoped to script-src only.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://generativelanguage.googleapis.com https://va.vercel-scripts.com https://vercel.live https://js.stripe.com",
              "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://generativelanguage.googleapis.com https://va.vercel-scripts.com https://vercel.live https://js.stripe.com",
              "worker-src 'self' blob:",
              // Styles: Google Fonts + Next.js inline styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://ssl.gstatic.com",
              "media-src 'self' blob:",
              "manifest-src 'self'",
              "connect-src 'self' https://*.googleapis.com https://*.google.com https://*.google-analytics.com https://*.analytics.google.com https://*.doubleclick.net https://*.firebaseio.com https://*.firebase.google.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firestore.googleapis.com https://api.stripe.com https://generativelanguage.googleapis.com https://vitals.vercel-insights.com https://vercel.live wss://*.firebaseio.com wss://ws-us3.pusher.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://maps.google.com https://www.google.com https://maps.googleapis.com https://td.doubleclick.net https://vercel.live",
              "child-src 'self' https://js.stripe.com blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://checkout.stripe.com",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      // ─── Aggressive caching for immutable static assets (1 year) ───
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|woff|woff2|ttf|otf|eot)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // ─── Sitemap / robots: short cache to keep SEO refreshes quick ───
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' }],
      },
      // ─── PWA / misc static ─────────────────────────────────────
      {
        source: '/site.webmanifest',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, must-revalidate' },
          { key: 'Content-Type', value: 'application/manifest+json; charset=utf-8' },
        ],
      },
      {
        source: '/.well-known/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        ],
      },
      {
        source: '/humans.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800' },
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        ],
      },
      // ─── /api/* — never cached, never indexed, never framed ────
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, private' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
      // X-Robots-Tag for routes that should never be indexed (defense-in-depth)
      {
        source: '/book/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/booking/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/my-reservation/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/thanks/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [
      // ─── Host canonicalization ─────────────────────────────────
      // All hosts → https://www.rushnomore.com
      { source: '/:path*', has: [{ type: 'host', value: 'old.rushnomore.com' }], destination: 'https://www.rushnomore.com/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'rushnomore.com' }], destination: 'https://www.rushnomore.com/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'm.rushnomore.com' }], destination: 'https://www.rushnomore.com/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www2.rushnomore.com' }], destination: 'https://www.rushnomore.com/:path*', permanent: true },

      // ─── WordPress legacy cleanup (assume prior WP install) ────
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-admin', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },
      { source: '/wp-json/:path*', destination: '/', permanent: true },
      { source: '/wp-cron.php', destination: '/', permanent: true },
      // Generic wp-*.php matchers (wp-config, wp-load, wp-mail, wp-settings, etc.)
      { source: '/wp-:slug.php', destination: '/', permanent: true },
      { source: '/wordpress/:path*', destination: '/', permanent: true },
      { source: '/wordpress', destination: '/', permanent: true },
      { source: '/feed', destination: '/', permanent: true },
      { source: '/feed/:path*', destination: '/', permanent: true },
      { source: '/rss', destination: '/', permanent: true },
      { source: '/rss.xml', destination: '/', permanent: true },
      { source: '/atom.xml', destination: '/', permanent: true },
      { source: '/comments/feed/:path*', destination: '/', permanent: true },
      { source: '/category/:path*', destination: '/', permanent: true },
      { source: '/tag/:path*', destination: '/', permanent: true },
      { source: '/author/:path*', destination: '/', permanent: true },
      { source: '/trackback/:path*', destination: '/', permanent: true },
      { source: '/wlwmanifest.xml', destination: '/', permanent: true },
      // WP default pages that show up as 404s in GSC
      { source: '/sample-page', destination: '/', permanent: true },
      { source: '/hello-world', destination: '/', permanent: true },
      { source: '/coming-soon', destination: '/', permanent: true },
      // RNMWP staging/legacy folder paths reported as 404 in GSC
      { source: '/RNMWP/:path*', destination: '/', permanent: true },
      { source: '/RNMWP', destination: '/', permanent: true },
      { source: '/rnmwp/:path*', destination: '/', permanent: true },

      // ─── Legacy HTML / PHP extensions ──────────────────────────
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/home.html', destination: '/', permanent: true },
      { source: '/home.php', destination: '/', permanent: true },
      { source: '/default.html', destination: '/', permanent: true },
      { source: '/default.htm', destination: '/', permanent: true },
      // Specific legacy .php endpoints reported as 404 in GSC
      { source: '/rushnomorerates.php', destination: '/stay', permanent: true },
      { source: '/reservations.php', destination: '/stay', permanent: true },
      { source: '/contact.php', destination: '/contact', permanent: true },
      { source: '/about.php', destination: '/about', permanent: true },
      { source: '/cabins.php', destination: '/stay/cabins', permanent: true },
      { source: '/rvsites.php', destination: '/stay/rv-sites', permanent: true },
      { source: '/tentsites.php', destination: '/stay/tent-camping', permanent: true },

      // ─── Legacy paths ──────────────────────────────────────────
      { source: '/park-map', destination: '/map', permanent: true },
      { source: '/parkmap', destination: '/map', permanent: true },
      { source: '/site-map', destination: '/map', permanent: true },
      // Specific /public/* mappings (fix GA-tracked orphans) then catch-all
      { source: '/public/classic-car-show', destination: '/events#car-show', permanent: true },
      { source: '/public/car-show', destination: '/events#car-show', permanent: true },
      { source: '/public/maps', destination: '/map', permanent: true },
      { source: '/public/map', destination: '/map', permanent: true },
      { source: '/public/services', destination: '/amenities', permanent: true },
      { source: '/public/amenities', destination: '/amenities', permanent: true },
      { source: '/public/cabins', destination: '/stay/cabins', permanent: true },
      { source: '/public/rv-sites', destination: '/stay/rv-sites', permanent: true },
      { source: '/public/tent-camping', destination: '/stay/tent-camping', permanent: true },
      { source: '/public/about', destination: '/about', permanent: true },
      { source: '/public/contact', destination: '/contact', permanent: true },
      { source: '/public/policies', destination: '/policies', permanent: true },
      { source: '/public/rules-and-policies', destination: '/policies', permanent: true },
      { source: '/public/work-camping', destination: '/monthly-rv-sites', permanent: true },
      { source: '/public/:path*', destination: '/', permanent: true },
      { source: '/index/:path*', destination: '/', permanent: true },

      // ─── Specific legacy WordPress slugs reported as 404 in GSC ─
      // Work-camping legacy paths
      { source: '/work-camping', destination: '/monthly-rv-sites', permanent: true },
      { source: '/workcamping', destination: '/monthly-rv-sites', permanent: true },
      { source: '/workamping', destination: '/monthly-rv-sites', permanent: true },
      // Legal / privacy legacy slugs
      { source: '/legal-pages', destination: '/legal', permanent: true },
      { source: '/legal-notices', destination: '/legal', permanent: true },
      { source: '/privacy-policy-2', destination: '/legal', permanent: true },
      { source: '/release-and-consent', destination: '/legal', permanent: true },
      { source: '/release', destination: '/legal', permanent: true },
      // Policy / rules legacy slugs
      { source: '/rules-and-policies', destination: '/policies', permanent: true },
      { source: '/rally-policies', destination: '/policies#rally', permanent: true },
      { source: '/rally-policies_dev', destination: '/policies#rally', permanent: true },
      { source: '/policies/:path+', destination: '/policies', permanent: true },
      { source: '/ada-compliance', destination: '/ada', permanent: true },
      // Common typo / legacy "local attractions"
      { source: '/local-atractions', destination: '/explore', permanent: true },
      { source: '/local-attractions', destination: '/explore', permanent: true },
      { source: '/local-attractions/:path*', destination: '/explore', permanent: true },
      { source: '/thingstodo', destination: '/explore', permanent: true },
      { source: '/thingstodo/:path*', destination: '/explore', permanent: true },
      // Legacy rate / cabin / RV pages
      { source: '/cabin-rates', destination: '/stay/cabins', permanent: true },
      { source: '/cabin-rates-rally', destination: '/rally-rates', permanent: true },
      { source: '/cabin-rates-bike-rally-2021', destination: '/rally-rates', permanent: true },
      { source: '/cabins-2', destination: '/stay/cabins', permanent: true },
      { source: '/cabins2', destination: '/stay/cabins', permanent: true },
      { source: '/cabins2-rally', destination: '/rally-rates', permanent: true },
      { source: '/cabins6-rally', destination: '/rally-rates', permanent: true },
      { source: '/cabins7-rally', destination: '/rally-rates', permanent: true },
      { source: '/rallyrates', destination: '/rally-rates', permanent: true },
      { source: '/rally-rates/:path+', destination: '/rally-rates', permanent: true },
      { source: '/rates', destination: '/stay', permanent: true },
      { source: '/rates/:path*', destination: '/stay', permanent: true },
      { source: '/rvandtentsites', destination: '/stay', permanent: true },
      { source: '/reservations', destination: '/stay', permanent: true },
      { source: '/reservations/:path*', destination: '/stay', permanent: true },
      // Legacy event / theme slugs
      { source: '/sunday-acoustic-jam', destination: '/events', permanent: true },
      { source: '/black-hills-bluegrass-festival', destination: '/events', permanent: true },
      { source: '/live-music', destination: '/events', permanent: true },
      { source: '/dt_slideshow/:path*', destination: '/', permanent: true },
      { source: '/dt_slideshow', destination: '/', permanent: true },
      { source: '/dt_gallery/:path*', destination: '/', permanent: true },
      { source: '/dt_gallery', destination: '/', permanent: true },
      { source: '/amenities-and-features-rush-no-more-cabins-and-campground', destination: '/amenities', permanent: true },
      { source: '/services', destination: '/amenities', permanent: true },
      { source: '/services/:path*', destination: '/amenities', permanent: true },
      // /aboutus legacy
      { source: '/aboutus', destination: '/about', permanent: true },
      { source: '/our-story', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      // Spam / scraper landers reported in GSC
      { source: '/lander', destination: '/', permanent: true },
      { source: '/lander/:path*', destination: '/', permanent: true },
      // Stale send-mail
      { source: '/send-mail', destination: '/contact', permanent: true },
      { source: '/sendmail', destination: '/contact', permanent: true },

      // ─── Accommodation slug canonicalization ───────────────────
      { source: '/rv-sites', destination: '/stay/rv-sites', permanent: true },
      { source: '/rv-sites/:path*', destination: '/stay/rv-sites', permanent: true },
      { source: '/cabins', destination: '/stay/cabins', permanent: true },
      { source: '/cabins/:path*', destination: '/stay/cabins', permanent: true },
      { source: '/camping', destination: '/stay/tent-camping', permanent: true },
      { source: '/tent-camping', destination: '/stay/tent-camping', permanent: true },
      { source: '/tent-sites', destination: '/stay/tent-camping', permanent: true },
      { source: '/accommodations', destination: '/stay', permanent: true },
      { source: '/lodging', destination: '/stay', permanent: true },
      { source: '/rv-park', destination: '/stay/rv-sites', permanent: true },
      { source: '/rv-resort', destination: '/stay/rv-sites', permanent: true },

      // ─── Keyword-rich aliases → canonical money pages ──────────
      { source: '/sturgis-campgrounds', destination: '/stay', permanent: true },
      { source: '/sturgis-sd-campgrounds', destination: '/stay', permanent: true },
      { source: '/rv-park-sturgis-sd', destination: '/stay/rv-sites', permanent: true },
      { source: '/rv-park-sturgis', destination: '/stay/rv-sites', permanent: true },
      { source: '/campground-near-mount-rushmore', destination: '/', permanent: true },
      { source: '/mount-rushmore-camping', destination: '/stay', permanent: true },
      { source: '/black-hills-rv-park', destination: '/stay/rv-sites', permanent: true },
      { source: '/black-hills-campground', destination: '/', permanent: true },
      { source: '/cabins-sturgis-sd', destination: '/stay/cabins', permanent: true },
      { source: '/cabins-sturgis', destination: '/stay/cabins', permanent: true },
      { source: '/cabins-near-mount-rushmore', destination: '/stay/cabins', permanent: true },
      { source: '/tent-camping-black-hills', destination: '/stay/tent-camping', permanent: true },
      { source: '/tent-camping-near-mount-rushmore', destination: '/stay/tent-camping', permanent: true },

      // ─── Events / rally legacy → real pages ────────────────────
      { source: '/sturgis-bike-rally', destination: '/sturgis-rally', permanent: true },
      { source: '/events/sturgis-rally', destination: '/sturgis-rally', permanent: true },
      { source: '/events/sturgis-rally/rates', destination: '/rally-rates', permanent: true },
      { source: '/events/car-show', destination: '/events#car-show', permanent: true },
      { source: '/events/weddings', destination: '/weddings-groups', permanent: true },
      { source: '/classic-car-show', destination: '/events#car-show', permanent: true },
      { source: '/sturgis', destination: '/sturgis-rally', permanent: true },
      { source: '/rally', destination: '/sturgis-rally', permanent: true },
      { source: '/car-show', destination: '/events#car-show', permanent: true },
      { source: '/weddings', destination: '/weddings-groups', permanent: true },
      { source: '/groups', destination: '/weddings-groups', permanent: true },
      { source: '/group-camping', destination: '/weddings-groups', permanent: true },
      { source: '/wedding-venue', destination: '/weddings-groups', permanent: true },
      { source: '/monthly-rates', destination: '/monthly-rv-sites', permanent: true },
      { source: '/long-term-rv', destination: '/monthly-rv-sites', permanent: true },
      { source: '/long-term', destination: '/monthly-rv-sites', permanent: true },
      { source: '/workamper', destination: '/monthly-rv-sites', permanent: true },

      // ─── Explore / attractions legacy ──────────────────────────
      // /explore is canonical for attractions hub; keyword-rich aliases 301 to it
      { source: '/things-to-do', destination: '/explore', permanent: true },
      { source: '/things-to-do-near-mount-rushmore', destination: '/explore', permanent: true },
      { source: '/things-to-do-near-mount-rushmore-sd', destination: '/explore', permanent: true },
      { source: '/things-to-do-near-sturgis', destination: '/explore', permanent: true },
      { source: '/local-attractions', destination: '/explore', permanent: true },
      { source: '/black-hills', destination: '/explore', permanent: true },
      { source: '/mount-rushmore', destination: '/explore#mount-rushmore', permanent: true },
      { source: '/itineraries', destination: '/black-hills-itinerary', permanent: true },
      { source: '/itinerary', destination: '/black-hills-itinerary', permanent: true },
      { source: '/black-hills-6-day-itinerary', destination: '/black-hills-itinerary', permanent: true },
      { source: '/attractions/:path*', destination: '/explore', permanent: true },
      { source: '/deadwood', destination: '/deadwood-day-trip', permanent: true },
      { source: '/spearfish-canyon', destination: '/spearfish-canyon-guide', permanent: true },
      { source: '/needles-highway', destination: '/needles-highway-guide', permanent: true },
      { source: '/iron-mountain-road', destination: '/iron-mountain-road-guide', permanent: true },
      { source: '/motorcycle-rides', destination: '/best-motorcycle-rides-near-sturgis', permanent: true },
      { source: '/scenic-rides', destination: '/best-motorcycle-rides-near-sturgis', permanent: true },
      { source: '/rides', destination: '/best-motorcycle-rides-near-sturgis', permanent: true },

      // ─── Map / info ────────────────────────────────────────────
      { source: '/park', destination: '/map', permanent: true },
      { source: '/directions', destination: '/map', permanent: true },
      { source: '/location', destination: '/map', permanent: true },
      { source: '/rules', destination: '/policies', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/reviews', destination: '/about#reviews', permanent: true },
      { source: '/faq', destination: '/contact#faq', permanent: true },
      { source: '/faqs', destination: '/contact#faq', permanent: true },
      { source: '/privacy', destination: '/legal', permanent: true },
      { source: '/privacy-policy', destination: '/legal', permanent: true },
      { source: '/terms', destination: '/legal', permanent: true },
      { source: '/terms-of-use', destination: '/legal', permanent: true },
      { source: '/accessibility', destination: '/ada', permanent: true },

      // ─── Amenity landing → canonical amenities ─────────────────
      { source: '/pool', destination: '/amenities#pool', permanent: true },
      { source: '/beer-garden', destination: '/amenities#beer-garden', permanent: true },
      { source: '/hot-tub', destination: '/amenities#hot-tub', permanent: true },
      { source: '/hottub', destination: '/amenities#hot-tub', permanent: true },
      { source: '/game-room', destination: '/amenities#game-room', permanent: true },

      // ─── Campground root alias ─────────────────────────────────
      { source: '/campground', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
