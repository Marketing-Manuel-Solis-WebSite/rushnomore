import Link from 'next/link';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, articleSchema, speakableSchema, breadcrumbSchema } from '@/lib/seo';
import { Clock, MapPin, AlertTriangle } from 'lucide-react';

const FAQ = [
  { q: 'How long is Iron Mountain Road?', a: 'Iron Mountain Road (US-16A) is 17 miles between Mount Rushmore and Custer State Park. Allow 1 to 1.5 hours with photo stops at the tunnels and pigtail bridges.' },
  { q: 'What are the pigtail bridges?', a: 'Three looping wooden "pigtail" bridges that twist back over themselves to gain elevation without cutting a straight scar into the mountain. Engineering designed intentionally to preserve scenery.' },
  { q: 'Can large RVs drive Iron Mountain Road?', a: 'Three tunnels along US-16A are narrow. The smallest (Scovel Johnson Tunnel) is 10&apos;7&quot; wide and 12&apos;2&quot; high. Most motorhomes and large trailers cannot pass safely. Leave the rig at camp.' },
  { q: 'Why is the drive famous?', a: 'Each of the three tunnels is aligned so that Mount Rushmore appears framed through the opening as you exit. It&apos;s the signature Black Hills driving moment.' },
  { q: 'Should I drive it in the direction of Rushmore or away from it?', a: 'Drive from Custer State Park toward Mount Rushmore (south to north) so the framed views through the tunnels face you. That&apos;s the payoff direction.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Explore', url: '/explore' },
        { name: 'Iron Mountain Road Guide', url: '/iron-mountain-road-guide' },
      ])} />
      <JsonLd data={articleSchema({
        headline: 'Iron Mountain Road Guide — Pigtail Bridges & Rushmore Views',
        description: 'The complete Iron Mountain Road (US-16A) guide from Rush No More — 17 miles, three pigtail bridges, three tunnels framing Mount Rushmore. Route, tunnel sizes, photography tips.',
        image: '/images/DSC05580-s.png',
        url: '/iron-mountain-road-guide',
        datePublished: '2025-01-15',
        dateModified: '2026-04-01',
        wordCount: 900,
        keywords: ['iron mountain road', 'us-16a', 'pigtail bridges', 'mount rushmore drive', 'black hills scenic drives', 'custer state park', 'motorcycle ride sturgis'],
      })} />
      <JsonLd data={speakableSchema('/iron-mountain-road-guide', ['h1', '.lead', 'h2'])} />
      <Breadcrumbs items={[{ name: 'Iron Mountain Road Guide', url: '/iron-mountain-road-guide' }]} />

      <section className="relative py-20 bg-brand-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/DSC05580-s.png')" }}
          role="img"
          aria-label="Mount Rushmore framed through a tunnel on Iron Mountain Road"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Iron Mountain Road <span className="text-brand-gold italic">Guide (US-16A)</span>
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white/90 border border-white/20">
            <MapPin className="w-4 h-4 text-brand-gold" /> 17 miles · <Clock className="w-4 h-4 text-brand-gold" /> ~1.5 hr with stops
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-brand-navy/80 text-lg leading-relaxed mb-6">
            Iron Mountain Road is engineering as art. Seventeen miles of US-16A connect Mount Rushmore to
            Custer State Park through three pigtail bridges and three tunnels — and each tunnel is deliberately
            aligned so Mount Rushmore appears framed in the exit. It&apos;s the moment every Black Hills photographer
            chases and every rider who&apos;s done it remembers.
          </p>
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            Drive the road <strong>south to north</strong> — from Custer State Park toward Mount Rushmore — so the framed
            views through the tunnels face you as you exit. The <strong>three pigtail bridges</strong> are wooden loops
            that twist back on themselves to gain elevation while preserving the landscape. They&apos;re a rare sight on a
            modern American highway and they ride beautifully on two wheels.
          </p>
          <p className="text-brand-navy/70 leading-relaxed">
            Combine Iron Mountain Road with <Link href="/needles-highway-guide" className="text-brand-gold font-bold hover:underline">Needles Highway</Link> for
            the full Black Hills scenic loop. Fuel up before you leave Sturgis — gas stations are sparse inside the loop.
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-600/10 border-2 border-red-600/40 rounded-2xl p-6 flex gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="font-display font-bold text-xl text-red-800 mb-2">RV Tunnel Restrictions</h2>
              <p className="text-brand-navy/80 leading-relaxed">
                The smallest Iron Mountain tunnel (Scovel Johnson) is 10&apos;7&quot; wide and 12&apos;2&quot; high. Most class A motorhomes,
                fifth wheels and large trailers cannot pass safely. Leave the rig at Rush No More and drive a car or ride in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Iron Mountain Road FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-surface-primary rounded-xl p-5 border border-brand-gold/10">
                <summary className="font-bold cursor-pointer flex justify-between">
                  {f.q}
                  <span className="text-brand-gold group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-brand-navy/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface-primary border-t border-brand-gold/10">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          <Link href="/needles-highway-guide" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Needles Highway</Link>
          <Link href="/best-motorcycle-rides-near-sturgis" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Best Rides Near Sturgis</Link>
          <Link href="/black-hills-itinerary" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Full 6-Day Itinerary</Link>
          <Link href="/sturgis-rally-camping" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Rally Camping</Link>
        </div>
      </section>

      <BookingCTA title="Ride the Loop. Sleep at Camp." subtitle="Book your Rush No More stay." />
    </>
  );
}
