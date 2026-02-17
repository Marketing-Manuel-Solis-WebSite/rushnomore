import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3, Josefin_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookingBar } from '@/components/layout/BookingBar';
import { JsonLd } from '@/components/seo/JsonLd';
import { campgroundSchema } from '@/lib/seo';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', display: 'swap' });
const josefin = Josefin_Sans({ subsets: ['latin'], variable: '--font-josefin', display: 'swap', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rushnomore.com'),
  title: { default: 'Rush No More — Camping & RV Park Near Mount Rushmore, Black Hills SD', template: '%s | Rush No More' },
  description: 'Top-rated RV resort, cabins & tent camping near Mount Rushmore in the Black Hills. Pool, hot tubs, beer garden & Sturgis Rally HQ.',
  keywords: ['camping near mount rushmore','rv park near mount rushmore','cabins near mount rushmore','black hills camping','sturgis rally campground'],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${josefin.variable}`}>
      <head>
        <JsonLd data={campgroundSchema()} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EWDY6CJPVE" />
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-EWDY6CJPVE');" }} />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <BookingBar />
      </body>
    </html>
  );
}
