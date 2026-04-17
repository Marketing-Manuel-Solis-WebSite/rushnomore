import Link from 'next/link';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/seo';
import { Clock, MapPin, Mountain, AlertTriangle } from 'lucide-react';

const FAQ = [
  { q: 'How long is Needles Highway?', a: 'Needles Highway (SD-87) is about 14 miles. Plan 1.5 to 2 hours with stops at Needles Eye and Cathedral Spires.' },
  { q: 'Can large RVs drive Needles Highway?', a: 'No. The tunnels are narrow — the smallest is just 8 feet 4 inches wide and 9 feet 8 inches high. Large motorhomes, trailers and wide vehicles cannot pass. Leave the rig at Rush No More and drive a car or ride a motorcycle.' },
  { q: 'Is there an entry fee?', a: 'Yes — Needles Highway runs through Custer State Park, which requires a park entrance license. A 7-day pass is the most cost-effective for visitors.' },
  { q: 'What&apos;s the Needles Eye?', a: 'The Needles Eye is a narrow slit in a towering granite spire along SD-87 — the signature landmark of the drive and one of the most photographed formations in the Black Hills.' },
  { q: 'Can you combine Needles Highway with Iron Mountain Road?', a: 'Yes — and you should. The two roads form the classic full-day Black Hills scenic loop with Mount Rushmore framed through the Iron Mountain tunnels. See our Iron Mountain Road Guide.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <Breadcrumbs items={[{ name: 'Needles Highway Guide', url: '/needles-highway-guide' }]} />

      <section className="relative py-20 bg-brand-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/GeneralImagesPark/IMG_7383.jpeg')" }}
          role="img"
          aria-label="Granite spires along Needles Highway in Custer State Park, South Dakota"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Needles Highway <span className="text-brand-gold italic">Guide (SD-87)</span>
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white/90 border border-white/20">
            <MapPin className="w-4 h-4 text-brand-gold" /> ~65 mi · <Clock className="w-4 h-4 text-brand-gold" /> ~1.5 hr drive from camp
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-brand-navy/80 text-lg leading-relaxed mb-6">
            Needles Highway isn&apos;t a road so much as a route dynamited through granite. Fourteen miles of
            SD-87 cut through Custer State Park&apos;s signature stone forest — vertical spires, narrow one-lane
            tunnels, hairpin curves and wide meadows opening to Sylvan Lake at the end. It&apos;s one of America&apos;s
            great scenic drives and a rite of passage for any rider visiting Sturgis.
          </p>
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            The signature stop is the <strong>Needles Eye</strong> — a narrow slit in a tall granite spire right
            beside the road. Park, walk the short trail, and you&apos;ll understand why this formation anchors every
            Needles Highway photo. A short distance on, Cathedral Spires offers a trailhead into the vertical
            rock forest for a longer walk if you want to stretch.
          </p>
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            The drive ends (or begins) at <strong>Sylvan Lake</strong> — a blue-green gem ringed by granite that&apos;s
            worth an hour of swimming, paddling or simply walking the shoreline trail.
          </p>
          <p className="text-brand-navy/70 leading-relaxed">
            Most riders pair Needles Highway with <Link href="/iron-mountain-road-guide" className="text-brand-gold font-bold hover:underline">Iron Mountain Road</Link> for
            the full-day Custer loop. Plan food ahead — dining options inside the park are limited.
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-600/10 border-2 border-red-600/40 rounded-2xl p-6 flex gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="font-display font-bold text-xl text-red-800 mb-2">RV & Trailer Warning</h2>
              <p className="text-brand-navy/80 leading-relaxed">
                The Needle&apos;s Eye Tunnel is <strong>8&apos;4&quot; wide and 9&apos;8&quot; high</strong>. The Iron Creek Tunnel
                is <strong>9&apos;0&quot; wide and 12&apos;0&quot; high</strong>. No large RVs, fifth wheels, travel trailers or
                tall vehicles can pass. Park your rig at Rush No More and bring a car, motorcycle or toad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Needles Highway FAQ</h2>
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
          <Link href="/iron-mountain-road-guide" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Iron Mountain Road</Link>
          <Link href="/best-motorcycle-rides-near-sturgis" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Best Rides Near Sturgis</Link>
          <Link href="/black-hills-itinerary" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Full 6-Day Itinerary</Link>
          <Link href="/sturgis-rally-camping" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Rally Camping</Link>
        </div>
      </section>

      <BookingCTA title="Leave the Rig. Take the Ride." subtitle="Base out of Rush No More, then ride Custer." />
    </>
  );
}
