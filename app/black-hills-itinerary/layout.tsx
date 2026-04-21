import { Metadata } from 'next';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: '6-Day Black Hills Itinerary — Rushmore, Deadwood & More',
  description: 'Complete 6-day Black Hills itinerary from Rush No More in Sturgis, SD. Day-by-day plan covering Mount Rushmore, Deadwood, Spearfish Canyon, Crazy Horse, Custer State Park, Needles Highway, Wind Cave and more. Drive times, highlights and insider tips included.',
  path: '/black-hills-itinerary',
  image: '/images/DSC05580-s.png',
  keywords: [
    'black hills itinerary',
    'black hills 6 day itinerary',
    'black hills road trip',
    'black hills vacation itinerary',
    'mount rushmore itinerary',
    'south dakota vacation plan',
    'things to do black hills 6 days',
    'black hills trip planner',
    'mount rushmore trip planner',
    'black hills sightseeing plan',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
