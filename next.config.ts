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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://generativelanguage.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebase.google.com https://api.stripe.com https://generativelanguage.googleapis.com wss://*.firebaseio.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://youtube.com https://maps.google.com https://www.google.com https://maps.googleapis.com",
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
    ];
  },
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'old.rushnomore.com' }], destination: 'https://www.rushnomore.com/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'rushnomore.com' }], destination: 'https://www.rushnomore.com/:path*', permanent: true },
      { source: '/rv-sites', destination: '/stay/rv-sites', permanent: true },
      { source: '/cabins', destination: '/stay/cabins', permanent: true },
      { source: '/camping', destination: '/stay/tent-camping', permanent: true },
      { source: '/sturgis-bike-rally', destination: '/events#sturgis-rally', permanent: true },
      { source: '/rally-rates', destination: '/events#rally-rates', permanent: true },
      { source: '/classic-car-show', destination: '/events#car-show', permanent: true },
      { source: '/events/sturgis-rally', destination: '/events#sturgis-rally', permanent: true },
      { source: '/events/sturgis-rally/rates', destination: '/events#rally-rates', permanent: true },
      { source: '/events/car-show', destination: '/events#car-show', permanent: true },
      { source: '/events/weddings', destination: '/events#weddings', permanent: true },
      { source: '/things-to-do', destination: '/explore', permanent: true },
      { source: '/local-attractions', destination: '/explore', permanent: true },
      { source: '/black-hills', destination: '/explore', permanent: true },
      { source: '/mount-rushmore', destination: '/explore', permanent: true },
      { source: '/itineraries', destination: '/explore', permanent: true },
      { source: '/attractions/:path*', destination: '/explore', permanent: true },
      { source: '/park', destination: '/map', permanent: true },
      { source: '/rules', destination: '/policies', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
    ];
  },
};

export default nextConfig;
