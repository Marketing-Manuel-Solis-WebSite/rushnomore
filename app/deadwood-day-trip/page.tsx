import Link from 'next/link';
import { BookingCTA } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/seo';
import { Clock, MapPin, ArrowRight, Coins, Landmark, Ghost, Utensils } from 'lucide-react';

const FAQ = [
  { q: 'How far is Deadwood from Rush No More?', a: 'Deadwood is 12 miles and about a 15-minute drive via Boulder Canyon on US-14A from Rush No More in Sturgis.' },
  { q: 'Is parking available in Deadwood?', a: 'Yes — free parking garages and metered street parking are spread along Main Street. Arrive before noon during rally and summer weekends for easy spots.' },
  { q: 'What&apos;s the best thing to do in Deadwood?', a: 'Walk Main Street first — every casino, saloon and museum is within a few blocks. Prioritize Adams Museum for history, Broken Boot for gold panning, and the nightly Trial of Jack McCall reenactment in summer.' },
  { q: 'Is Deadwood kid-friendly?', a: 'Parts of it. Historic tours, Adams Museum, gold panning and Mt. Moriah Cemetery are family-friendly. Casino floors are 21+, but most casinos have restaurants that kids can enter.' },
  { q: 'Do I need more than a day in Deadwood?', a: 'A day covers the must-sees. Two days lets you pair Deadwood with a Spearfish Canyon drive or a Homestake Gold Mine deep tour.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <Breadcrumbs items={[{ name: 'Deadwood Day Trip', url: '/deadwood-day-trip' }]} />

      <section className="relative py-20 bg-brand-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg')" }}
          role="img"
          aria-label="Historic Deadwood, South Dakota — gold rush town 12 miles from Rush No More"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Deadwood Day Trip <span className="text-brand-gold italic">from Sturgis</span>
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white/90 border border-white/20">
            <MapPin className="w-4 h-4 text-brand-gold" /> 12 miles · <Clock className="w-4 h-4 text-brand-gold" /> ~15 minutes from Rush No More
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 prose prose-lg">
          <p className="text-brand-navy/80 text-lg leading-relaxed">
            Deadwood is the Black Hills&apos; living museum. Twelve miles of curves through Boulder Canyon drop
            you onto a Main Street that still feels like the 1870s — gold-rush saloons, legal casinos, and
            every block layered with Wild West history. It&apos;s the easiest big-win day trip from any stay at Rush No More.
          </p>
          <p className="text-brand-navy/70 leading-relaxed">
            Start at Adams Museum to orient yourself in the town&apos;s story — Wild Bill Hickok, Calamity Jane,
            the Deadwood fire and the gold that built it all. From there, Main Street is yours: tour the
            casinos without gambling, catch the Trial of Jack McCall reenactment at sundown, and walk up
            to Mt. Moriah Cemetery for views and the graves of the town&apos;s most famous residents.
          </p>
          <p className="text-brand-navy/70 leading-relaxed">
            The working Homestake Gold Mine in nearby Lead offers deep-history tours, and Broken Boot Gold
            Mine inside Deadwood lets kids pan for their own flakes. Plan lunch on Main Street — options range
            from classic saloon food to genuinely good modern kitchens. Leave Deadwood by late afternoon to beat
            the Boulder Canyon commuter traffic back to camp.
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface-primary">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-10">Top Stops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Landmark, t: 'Adams Museum', d: 'The best quick primer on Deadwood history and mining heritage.' },
              { icon: Coins, t: 'Broken Boot Gold Mine', d: 'Family-friendly gold panning and an easy mine tour.' },
              { icon: Ghost, t: 'Mt. Moriah Cemetery', d: 'Wild Bill, Calamity Jane, and panoramic views over town.' },
              { icon: Utensils, t: 'Main Street Dining', d: 'Saloon classics to modern kitchens — plan lunch here.' },
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
          <h2 className="text-3xl font-display font-bold text-center mb-8">Deadwood Day Trip FAQ</h2>
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
          <Link href="/black-hills-itinerary" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Full 6-Day Itinerary</Link>
          <Link href="/spearfish-canyon-guide" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Spearfish Canyon Guide</Link>
          <Link href="/best-motorcycle-rides-near-sturgis" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">Best Rides Near Sturgis</Link>
          <Link href="/explore" className="px-5 py-2.5 border border-brand-navy/20 rounded-full text-sm font-bold hover:bg-brand-navy hover:text-white transition-all">All Attractions</Link>
        </div>
      </section>

      <BookingCTA title="Deadwood Is a Day. The Black Hills Is a Week." subtitle="Book your stay at Rush No More." />
    </>
  );
}
