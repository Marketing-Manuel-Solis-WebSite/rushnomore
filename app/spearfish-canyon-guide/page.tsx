import Link from 'next/link';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, articleSchema, speakableSchema, breadcrumbSchema } from '@/lib/seo';
import { Clock, MapPin, Droplet, Fish, Leaf } from 'lucide-react';

const FAQ = [
  { q: 'How long is the Spearfish Canyon Byway?', a: 'The scenic byway runs about 20 miles along US-14A through the canyon. Allow 1–2 hours for the drive plus stops at the falls.' },
  { q: 'When is the best time to visit Spearfish Canyon?', a: 'September and October for world-class fall foliage. Summer is lush and green; spring brings waterfall peak flow. The road is open year-round.' },
  { q: 'Is Roughlock Falls accessible?', a: 'Yes — the Roughlock Falls overlook trail is short and wheelchair-accessible with a paved path.' },
  { q: 'Can I fish in Spearfish Creek?', a: 'Yes — Spearfish Creek is a storied fly-fishing stream for brown and brook trout. Savoy is a popular access point. South Dakota fishing license required.' },
  { q: 'How do I get there from Rush No More?', a: 'Take I-90 west to Spearfish (exit 12), then south on US-14A into the canyon — about 25 miles and 30 minutes from camp.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Explore', url: '/explore' },
        { name: 'Spearfish Canyon Guide', url: '/spearfish-canyon-guide' },
      ])} />
      <JsonLd data={articleSchema({
        headline: 'Spearfish Canyon Guide — Waterfalls, Fly Fishing & Fall Foliage',
        description: 'Spearfish Canyon Scenic Byway guide — 20 miles along US-14A with Bridal Veil Falls, Roughlock Falls, trout fishing and world-class fall foliage. Route, trailheads, best seasons.',
        image: '/images/rv-camper-van.png',
        url: '/spearfish-canyon-guide',
        datePublished: '2025-01-15',
        dateModified: '2026-04-01',
        wordCount: 800,
        keywords: ['spearfish canyon', 'us-14a scenic byway', 'bridal veil falls', 'roughlock falls', 'spearfish creek fly fishing', 'black hills fall foliage', 'black hills waterfalls'],
      })} />
      <JsonLd data={speakableSchema('/spearfish-canyon-guide', ['h1', 'h2'])} />
      <Breadcrumbs items={[{ name: 'Spearfish Canyon Guide', url: '/spearfish-canyon-guide' }]} />

      <section className="relative py-20 bg-brand-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/rv-camper-van.png')" }}
          role="img"
          aria-label="Spearfish Canyon Scenic Byway in the Black Hills, South Dakota"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Spearfish Canyon <span className="text-brand-gold italic">Scenic Byway</span>
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white/90 border border-white/20">
            <MapPin className="w-4 h-4 text-brand-gold" /> 25 miles · <Clock className="w-4 h-4 text-brand-gold" /> ~30 min from camp
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-brand-navy/80 text-lg leading-relaxed mb-6">
            Spearfish Canyon is the Black Hills at their most scenic. Twenty miles of US-14A wind between
            limestone cliffs draped in spruce, aspen and birch, with two headline waterfalls tucked a short
            walk off the road. It&apos;s the drive locals send every first-time Black Hills visitor on — and it earns
            its reputation in every season.
          </p>
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            From Rush No More, run I-90 west to Spearfish, then drop south into the canyon on US-14A. Your first
            must-stop is <strong>Bridal Veil Falls</strong> — a roadside pullout with a short view walk. Keep going
            to <strong>Roughlock Falls</strong> near Savoy — a paved, accessible trail leads to a multi-tier cascade
            that&apos;s one of the most photographed spots in South Dakota.
          </p>
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            If you fish, Spearfish Creek runs cold and clear the length of the canyon. Browns and brookies reward
            patient fly anglers — Savoy and the meadows near Roughlock are standard access points.
          </p>
          <p className="text-brand-navy/70 leading-relaxed">
            The canyon is magical year-round but <strong>September through mid-October</strong> is the signature
            window — aspens and birches ignite against the limestone walls and you&apos;ll share the road with
            photographers from every state.
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-10">Canyon Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Droplet, t: 'Bridal Veil Falls', d: 'Roadside pullout with a short walk to the viewing platform.' },
              { icon: Droplet, t: 'Roughlock Falls', d: 'Accessible paved trail to a multi-tier cascade near Savoy.' },
              { icon: Fish, t: 'Fly Fishing', d: 'Spearfish Creek — brown and brook trout, year-round season.' },
              { icon: Leaf, t: 'Fall Foliage', d: 'Peak color mid-September to mid-October — plan for crowds.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-white rounded-2xl p-5 border border-brand-gold/15">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="font-bold mb-1">{t}</h3>
                <p className="text-sm text-brand-navy/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Planning FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-surface-primary rounded-xl p-5 border border-brand-gold/10">
                <summary className="font-bold cursor-pointer flex justify-between">
                  {f.q}
                  <span className="text-brand-gold group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-brand-navy/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface-primary border-t border-brand-gold/10">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          <Link href="/black-hills-itinerary" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Full 6-Day Itinerary</Link>
          <Link href="/deadwood-day-trip" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Deadwood Day Trip</Link>
          <Link href="/needles-highway-guide" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Needles Highway</Link>
          <Link href="/best-motorcycle-rides-near-sturgis" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Best Rides Near Sturgis</Link>
        </div>
      </section>

      <BookingCTA title="Wake Up 30 Minutes from the Canyon" subtitle="Book your Black Hills stay at Rush No More." />
    </>
  );
}
