import { Metadata } from 'next';
import { seo } from '@/lib/seo';
import { BookingCTA, Breadcrumbs, Check } from '@/components/ui';
import { SITE } from '@/data/site';
import { AlertTriangle, Truck, Star, Home, Calendar } from 'lucide-react';

export const metadata: Metadata = seo({ title: 'Cancellation Policies & Rules', description: 'Cancellation policies for RV sites, cabins, tent camping and Sturgis Rally reservations at Rush No More.', path: '/policies' });

export default function PoliciesPage() {
  const policies = [
    { icon: Truck, title: 'RV & Tent Site Cancellations', rules: [
      '14+ days before arrival: Full refund minus $25 processing fee',
      '7-14 days before arrival: 50% refund',
      'Less than 7 days before arrival: NO REFUND',
      'No-shows forfeit entire reservation',
    ]},
    { icon: Star, title: 'Luxury & Spa Site Cancellations', rules: [
      '30+ days before arrival: Full refund minus $25 processing fee',
      '14-30 days before arrival: 75% refund',
      '7-14 days before arrival: 50% refund',
      'Less than 7 days: NO REFUND',
    ]},
    { icon: Home, title: 'Cabin Cancellations', rules: [
      '30+ days before arrival: Full refund minus $25 processing fee',
      '14-30 days before arrival: 75% refund',
      '7-14 days before arrival: 50% refund',
      'Less than 7 days: NO REFUND',
    ]},
    { icon: Calendar, title: 'Holiday & Rally Reservations', rules: [
      'ALL holiday and Sturgis Rally reservations are NON-REFUNDABLE',
      'Holidays: Memorial Day, July 4th, Labor Day, Sturgis Rally',
      'Rally reservations require full prepayment',
      'No exceptions to this policy',
    ]},
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: 'Policies' }]} />
      <section className="relative py-20 md:py-28 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="mb-4">Rules & Policies</h1>
          <p className="text-lg text-white/70">Important Information About Our Cancellation Policies</p>
        </div>
      </section>
      <section className="section-pad bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg text-brand-navy/80 mb-4">We understand that plans can change. Here are our policies to help you make informed decisions.</p>
          <p className="text-brand-stone mb-8">All cancellations must be made in writing. Contact us directly to modify or cancel.</p>
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5 mb-10 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-800 font-bold mb-1">IMPORTANT NOTICE</h4>
              <p className="text-red-700 text-sm"><strong>NO REFUNDS</strong> for inclement weather, acts of God, or unforeseen circumstances including rain, snow, wind, fires, floods, and natural disasters.</p>
            </div>
          </div>
          {policies.map((p, i) => (
            <div key={i} className="card-lodge p-6 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <p.icon className="w-6 h-6 text-brand-gold" />
                <h3 className="text-lg">{p.title}</h3>
              </div>
              <ul className="space-y-2">{p.rules.map((r, j) => <Check key={j}>{r}</Check>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
