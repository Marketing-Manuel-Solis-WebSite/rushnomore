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
  title: { default: 'Rush No More RV Resort & Campground — Sturgis, SD | Near Mount Rushmore', template: '%s | Rush No More — Sturgis, SD' },
  description: 'RV park, presidential cabins & tent camping in Sturgis, South Dakota — the Black Hills basecamp for Mount Rushmore, Deadwood, Spearfish Canyon & the Sturgis Motorcycle Rally. Full-hookup RV sites from $41, cabins from $51, tent from $35. Heated pool, hot tubs, beer garden. I-90 Exit 37.',
  applicationName: 'Rush No More RV Resort & Campground',
  authors: [{ name: 'Rush No More RV Resort & Campground', url: 'https://www.rushnomore.com' }],
  creator: 'Rush No More RV Resort & Campground',
  publisher: 'Rush No More RV Resort & Campground',
  category: 'Travel & Tourism',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'rv park near mount rushmore',
    'campground near sturgis sd',
    'sturgis rally campground',
    'cabins near mount rushmore',
    'tent camping black hills',
    'black hills rv park',
    'rv resort sturgis south dakota',
    'campground near deadwood sd',
    'rush no more campground',
    'sturgis sd campgrounds',
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
    url: 'https://www.rushnomore.com',
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
