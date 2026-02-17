import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'bookingsus.newbook.cloud' }],
  },
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'old.rushnomore.com' }], destination: 'https://www.rushnomore.com/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'rushnomore.com' }], destination: 'https://www.rushnomore.com/:path*', permanent: true },
      { source: '/rv-sites', destination: '/stay/rv-sites', permanent: true },
      { source: '/cabins', destination: '/stay/cabins', permanent: true },
      { source: '/camping', destination: '/stay/tent-camping', permanent: true },
      { source: '/sturgis-bike-rally', destination: '/events/sturgis-rally', permanent: true },
      { source: '/rally-rates', destination: '/events/sturgis-rally/rates', permanent: true },
      { source: '/classic-car-show', destination: '/events/car-show', permanent: true },
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
