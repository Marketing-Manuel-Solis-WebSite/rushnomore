import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3, Josefin_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookingBar } from '@/components/layout/BookingBar';
import { AIChatWidget } from '@/components/chat/AIChatWidget';
import { ToastProvider } from '@/components/ui/Toast';
import { JsonLd } from '@/components/seo/JsonLd';
import { campgroundSchema } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', display: 'swap' });
const josefin = Josefin_Sans({ subsets: ['latin'], variable: '--font-josefin', display: 'swap', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rushnomore.com'),
  title: { default: 'Rush No More — Camping & RV Park Near Mount Rushmore, Black Hills SD', template: '%s | Rush No More' },
  description: 'Top-rated RV resort, cabins & tent camping near Mount Rushmore in the Black Hills. Pool, hot tubs, beer garden & Sturgis Rally HQ.',
  keywords: ['camping near mount rushmore', 'rv park near mount rushmore', 'cabins near mount rushmore', 'black hills camping', 'sturgis rally campground'],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${josefin.variable}`}>
      <head>
        <JsonLd data={campgroundSchema()} />
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
          <Header />
          <main>{children}</main>
          <Footer />
          <BookingBar />
          <AIChatWidget />
        </ToastProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}