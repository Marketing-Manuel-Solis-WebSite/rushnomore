import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Source_Sans_3, Josefin_Sans } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { LayoutShell } from '@/components/layout/LayoutShell';
import { ToastProvider } from '@/components/ui/Toast';
import { JsonLd } from '@/components/seo/JsonLd';
import { campgroundSchema, lodgingSchema, websiteSchema, organizationSchema } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { UtilityPoleIcon } from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
});
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
});
const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
  weight: ['400', '600', '700'],
  preload: false,
  fallback: ['system-ui', '-apple-system', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rushnomore.com'),
  title: { default: 'Rush No More RV Resort & Campground — Sturgis, SD', template: '%s' },
  description: 'RV park, cabins & tent camping in Sturgis, SD — Black Hills basecamp for Mount Rushmore, Deadwood & the Sturgis Rally. RV from $41, cabins $51, tents $35. I-90 Exit 37.',
  applicationName: 'Rush No More RV Resort & Campground',
  authors: [{ name: 'Rush No More RV Resort & Campground', url: 'https://www.rushnomore.com' }],
  creator: 'Rush No More RV Resort & Campground',
  publisher: 'Rush No More RV Resort & Campground',
  category: 'Travel & Tourism',
  alternates: {
    canonical: 'https://www.rushnomore.com/',
    languages: {
      'en-US': 'https://www.rushnomore.com/',
      'x-default': 'https://www.rushnomore.com/',
    },
  },
  keywords: [
    // Primary money keywords
    'rv park near mount rushmore',
    'campground near sturgis sd',
    'sturgis rally campground',
    'cabins near mount rushmore',
    'tent camping black hills',
    'black hills rv park',
    'rv resort sturgis south dakota',
    'campground near deadwood sd',
    'rush no more campground',
    'rush no more rv resort',
    'rush no more sturgis',
    'sturgis sd campgrounds',
    // Long-tail + intent
    'best rv park near mount rushmore',
    'cheap campground near sturgis',
    'campground with pool near mount rushmore',
    'pet friendly rv park black hills',
    'full hookup rv sites sturgis',
    'luxury rv site south dakota',
    'campground with hot tub sturgis',
    'family campground mount rushmore',
    'rv park i-90 exit 37',
    // Rally-specific
    'sturgis rally 2026 camping',
    'sturgis motorcycle rally campground',
    'sturgis rally rv reservations',
    'sturgis rally cabins',
    'sturgis rally tent camping',
    // Regional / geographic
    'campground near rapid city sd',
    'rv park spearfish sd',
    'campground near deadwood',
    'black hills camping reservations',
    'south dakota rv resort',
    // Brand + alternate spellings
    'rushnomore', 'rush-no-more campground', 'rush no more rv park',
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
    alternateLocale: ['es_US'],
    url: 'https://www.rushnomore.com',
    countryName: 'United States',
    images: [
      {
        url: '/images/Aereal-2_1400.png',
        secureUrl: 'https://www.rushnomore.com/images/Aereal-2_1400.png',
        width: 1400,
        height: 900,
        alt: 'Aerial view of Rush No More RV Resort & Campground in the Black Hills near Mount Rushmore, Sturgis South Dakota',
        type: 'image/png',
      },
    ],
  },
  // `twitter:*` is read by LinkedIn, Discord, Slack, WhatsApp, iMessage and
  // most other chat scrapers as a fallback for Open Graph. We keep the card
  // type for those previews but omit site/creator handles since Rush No More
  // has no X/Twitter account.
  twitter: {
    card: 'summary_large_image',
    title: 'Rush No More RV Resort & Campground — Sturgis, SD',
    description: 'Top-rated RV park, cabins & tent camping near Mount Rushmore.',
    images: ['/images/Aereal-2_1400.png'],
  },
  // Verification: fill in via the NEXT_PUBLIC_SITE_VERIFICATION_* env vars on
  // Vercel (Google Search Console, Bing Webmaster, Yandex, Pinterest, Facebook
  // Business). We only emit a tag when the env var is set — prevents invalid
  // placeholder codes from cluttering the HTML.
  ...(process.env.NEXT_PUBLIC_SITE_VERIFICATION_GOOGLE ||
      process.env.NEXT_PUBLIC_SITE_VERIFICATION_YANDEX ||
      process.env.NEXT_PUBLIC_SITE_VERIFICATION_BING ||
      process.env.NEXT_PUBLIC_SITE_VERIFICATION_PINTEREST ||
      process.env.NEXT_PUBLIC_SITE_VERIFICATION_FACEBOOK
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_SITE_VERIFICATION_GOOGLE
            ? { google: process.env.NEXT_PUBLIC_SITE_VERIFICATION_GOOGLE }
            : {}),
          ...(process.env.NEXT_PUBLIC_SITE_VERIFICATION_YANDEX
            ? { yandex: process.env.NEXT_PUBLIC_SITE_VERIFICATION_YANDEX }
            : {}),
          other: {
            ...(process.env.NEXT_PUBLIC_SITE_VERIFICATION_BING
              ? { 'msvalidate.01': process.env.NEXT_PUBLIC_SITE_VERIFICATION_BING }
              : {}),
            ...(process.env.NEXT_PUBLIC_SITE_VERIFICATION_PINTEREST
              ? { 'p:domain_verify': process.env.NEXT_PUBLIC_SITE_VERIFICATION_PINTEREST }
              : {}),
            ...(process.env.NEXT_PUBLIC_SITE_VERIFICATION_FACEBOOK
              ? { 'facebook-domain-verification': process.env.NEXT_PUBLIC_SITE_VERIFICATION_FACEBOOK }
              : {}),
          },
        },
      }
    : {}),
  appleWebApp: {
    capable: true,
    title: 'Rush No More',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
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
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0C2340' },
    { media: '(prefers-color-scheme: dark)', color: '#0C2340' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${playfair.variable} ${sourceSans.variable} ${josefin.variable}`}>
      <head>
        {/* Preconnect — improves Core Web Vitals (LCP) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <JsonLd data={campgroundSchema()} />
        <JsonLd data={lodgingSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={organizationSchema()} />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) — fallback for users with JS disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFGKRRJH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <ToastProvider>
          <LayoutShell>{children}</LayoutShell>
        </ToastProvider>
        <Analytics />
        <SpeedInsights />
        {/* Google Tag Manager — deferred via next/script afterInteractive
            so it never blocks the LCP element. */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KFGKRRJH');`,
          }}
        />
        {/* Google Analytics 4 — also afterInteractive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BXSP32TXZ1"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-BXSP32TXZ1',{anonymize_ip:true,send_page_view:true});",
          }}
        />
      </body>
    </html>
  );
}
