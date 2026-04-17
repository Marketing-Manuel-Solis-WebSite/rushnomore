import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://generativelanguage.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.googleapis.com https://*.google.com https://*.google-analytics.com https://*.doubleclick.net https://*.firebaseio.com https://*.firebase.google.com https://api.stripe.com https://generativelanguage.googleapis.com wss://*.firebaseio.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://youtube.com https://maps.google.com https://www.google.com https://maps.googleapis.com https://td.doubleclick.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://checkout.stripe.com",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },
      { source: '/wp-json/:path*', destination: '/', permanent: true },
      { source: '/wp-cron.php', destination: '/', permanent: true },
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

      // ─── Legacy HTML extensions ────────────────────────────────
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/home.html', destination: '/', permanent: true },
      { source: '/default.html', destination: '/', permanent: true },

      // ─── Legacy paths ──────────────────────────────────────────
      { source: '/park-map', destination: '/map', permanent: true },
      { source: '/parkmap', destination: '/map', permanent: true },
      { source: '/site-map', destination: '/map', permanent: true },
      { source: '/public/:path*', destination: '/', permanent: true },
      { source: '/index/:path*', destination: '/', permanent: true },

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
      { source: '/sturgis-bike-rally', destination: '/sturgis-rally-camping', permanent: true },
      { source: '/events/sturgis-rally', destination: '/sturgis-rally-camping', permanent: true },
      { source: '/events/sturgis-rally/rates', destination: '/rally-rates', permanent: true },
      { source: '/events/car-show', destination: '/events#car-show', permanent: true },
      { source: '/events/weddings', destination: '/weddings-groups', permanent: true },
      { source: '/classic-car-show', destination: '/events#car-show', permanent: true },
      { source: '/sturgis-rally', destination: '/sturgis-rally-camping', permanent: true },
      { source: '/sturgis', destination: '/sturgis-rally-camping', permanent: true },
      { source: '/rally', destination: '/sturgis-rally-camping', permanent: true },
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
