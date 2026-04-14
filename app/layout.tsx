import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3, Josefin_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { LayoutShell } from '@/components/layout/LayoutShell';
import { ToastProvider } from '@/components/ui/Toast';
import { JsonLd } from '@/components/seo/JsonLd';
import { campgroundSchema, lodgingSchema, websiteSchema, organizationSchema } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', display: 'swap' });
const josefin = Josefin_Sans({ subsets: ['latin'], variable: '--font-josefin', display: 'swap', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rushnomore.com'),
  title: { default: 'Rush No More — #1 RV Park & Camping Near Mount Rushmore | Sturgis, SD', template: '%s | Rush No More — Black Hills, SD' },
  description: 'Top-rated campground near Sturgis, SD — 200+ full-hookup RV sites from $41.22, 16 presidential cabins from $51.76 & tent camping from $35/night. Heated pool, hot tub spas, beer garden & 16 free amenities. 30 mi from Rapid City, 55 mi to Mount Rushmore, 5 mi to Sturgis, 12 mi to Deadwood. 4.8★ rated, 420+ reviews. Sturgis Rally headquarters since 2014. Open year-round. Book today!',
  applicationName: 'Rush No More RV Resort & Campground',
  authors: [{ name: 'Rush No More RV Resort & Campground', url: 'https://www.rushnomore.com' }],
  creator: 'Rush No More RV Resort & Campground',
  publisher: 'Rush No More RV Resort & Campground',
  category: 'Travel & Tourism',
  keywords: [
    // Primary — high volume
    'rv park near mount rushmore', 'camping near mount rushmore', 'cabins near mount rushmore',
    'sturgis rally campground', 'black hills camping', 'rv resort sturgis south dakota',
    'tent camping black hills', 'mount rushmore campground', 'black hills rv park',
    'campground near sturgis sd', 'cabins sturgis south dakota', 'south dakota rv park',
    // Location modifiers
    'campground near deadwood sd', 'rv park near deadwood south dakota', 'camping near crazy horse memorial',
    'rv park near i-90 south dakota', 'campground i-90 exit 37', 'rv resort western south dakota',
    'campground near custer state park', 'lodging near spearfish canyon',
    'campground near needles highway', 'rv park near jewel cave',
    // Rapid City — 30 miles away, major search hub
    'campground near rapid city sd', 'rv park near rapid city south dakota',
    'camping near rapid city', 'tent camping rapid city sd',
    'cabins near rapid city sd', 'rv resort near rapid city',
    'campground between rapid city and sturgis',
    // Amenity searches
    'campground with pool near mount rushmore', 'rv park with pool south dakota',
    'campground with hot tub sturgis', 'rv park with hot tub south dakota',
    'campground with beer garden', 'rv park with beer garden sturgis',
    'pet friendly campground south dakota', 'pet friendly rv park near mount rushmore',
    'campground with wifi sturgis', 'campground with game room black hills',
    'rv park with laundry south dakota', 'campground with bathhouse black hills',
    // Accommodation type
    'full hookup rv park black hills', '50 amp rv park south dakota', '30 amp rv sites sturgis',
    'pull through rv sites near mount rushmore', 'big rig friendly rv park south dakota',
    'luxury rv sites black hills', 'rv sites with private hot tub',
    'presidential cabins black hills', 'cabin rentals near mount rushmore',
    'tent camping with electric hookup south dakota', 'shaded tent sites black hills',
    // Intent — booking
    'where to stay near mount rushmore', 'best campground near mount rushmore',
    'top rated rv park south dakota', 'best rv park black hills reviews',
    'affordable camping near mount rushmore', 'cheap tent camping black hills',
    'mount rushmore lodging', 'black hills vacation rentals', 'where to camp black hills',
    'accommodations near mount rushmore', 'black hills lodging',
    // Sturgis Rally
    'sturgis motorcycle rally lodging', 'sturgis rally rv park 2026', 'sturgis rally camping 2026',
    'sturgis rally accommodations', 'where to stay sturgis rally',
    'sturgis rally base camp', 'camping near sturgis rally',
    // Family & group
    'family camping black hills', 'black hills family vacation',
    'family campground near mount rushmore', 'group camping south dakota',
    'reunion venue black hills', 'wedding venue sturgis sd',
    // Seasonal
    'summer camping black hills', 'fall camping black hills south dakota',
    'year round rv park south dakota', 'winter rv park south dakota',
    // Competitor / comparison
    'best campground sturgis sd', 'top campground near mount rushmore',
    'highest rated rv park south dakota', 'rush no more campground',
    'rush no more rv resort', 'rush no more sturgis',
    // Price/rate intent — growing +550%
    'rush no more prices', 'rushnomore prices', 'rush no more rates',
    'rush no more campground rates', 'sturgis campground prices',
    'rv park prices near mount rushmore', 'cabin prices near mount rushmore',
    'tent camping prices black hills', 'sturgis rally camping prices 2026',
    'cheap campground near mount rushmore', 'affordable rv park sturgis sd',
    // Photo/gallery intent — new queries
    'rush no more photos', 'rushnomore photos', 'rush no more campground photos',
    'rush no more campground pictures', 'sturgis campground photos',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Rush No More RV Resort & Campground',
    locale: 'en_US',
    images: [{ url: '/images/Aereal-2_1400.png', width: 1400, height: 900, alt: 'Aerial view of Rush No More RV Resort & Campground in the Black Hills near Mount Rushmore, Sturgis South Dakota' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/Aereal-2_1400.png'],
  },
  other: {
    'geo.region': 'US-SD',
    'geo.placename': 'Sturgis',
    'geo.position': '44.39857;-103.46825',
    'ICBM': '44.39857, -103.46825',
    'rating': 'General',
    'revisit-after': '7 days',
    'DC.title': 'Rush No More RV Resort & Campground — Sturgis, South Dakota',
    'DC.description': 'Top-rated RV park, cabins & tent camping near Mount Rushmore in the Black Hills',
    'DC.subject': 'RV Park, Campground, Cabins, Tent Camping, Mount Rushmore, Black Hills, Sturgis Rally',
    'classification': 'Travel/Accommodation/Campground',
    'apple-mobile-web-app-title': 'Rush No More',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=yes',
    'theme-color': '#0C2340',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${josefin.variable}`}>
      <head>
        {/* Preconnect — improves Core Web Vitals (LCP) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <JsonLd data={campgroundSchema()} />
        <JsonLd data={lodgingSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={organizationSchema()} />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KFGKRRJH');` }} />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BXSP32TXZ1" />
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-BXSP32TXZ1');" }} />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFGKRRJH" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        <ToastProvider>
          <LayoutShell>{children}</LayoutShell>
        </ToastProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
