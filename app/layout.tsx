import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3, Josefin_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { LayoutShell } from '@/components/layout/LayoutShell';
import { ToastProvider } from '@/components/ui/Toast';
import { JsonLd } from '@/components/seo/JsonLd';
import { campgroundSchema, lodgingSchema } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', display: 'swap' });
const josefin = Josefin_Sans({ subsets: ['latin'], variable: '--font-josefin', display: 'swap', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rushnomore.com'),
  title: { default: 'Rush No More — #1 RV Park & Camping Near Mount Rushmore | Sturgis, SD', template: '%s | Rush No More — Black Hills, SD' },
  description: 'Top-rated campground near Sturgis, SD — RV sites starts at $41.22, presidential cabins starts at $51.76 & tent camping from $35/night. Heated pool, hot tubs, beer garden & 16 free amenities. Only 55 mi to Mount Rushmore. Sturgis Rally HQ since 2014. Book today!',
  keywords: [
    'rv park near mount rushmore', 'camping near mount rushmore', 'cabins near mount rushmore',
    'sturgis rally campground', 'black hills camping', 'rv resort sturgis south dakota',
    'tent camping black hills', 'campground near sturgis sd', 'campground with pool near mount rushmore',
    'cabins sturgis south dakota', 'mount rushmore campground', 'black hills rv park',
    'sturgis motorcycle rally lodging', 'rv park with pool south dakota',
    'family camping black hills', 'pet friendly campground south dakota',
    'presidential cabins black hills', 'deadwood camping nearby',
    'campground with beer garden sturgis', 'black hills resort with hot tubs',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Rush No More RV Resort & Campground',
    locale: 'en_US',
    images: [{ url: '/images/Aereal-2_1400.png', width: 1400, height: 900, alt: 'Rush No More RV Resort — Aerial view of campground in the Black Hills' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/Aereal-2_1400.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${josefin.variable}`}>
      <head>
        <JsonLd data={campgroundSchema()} />
        <JsonLd data={lodgingSchema()} />
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