import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThanksPage() {
  return (
    <section className="section-pad bg-surface-primary">
      <div className="max-w-lg mx-auto px-4 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl mb-4">Thank You!</h1>
        <p className="text-brand-stone text-lg mb-8">Your message has been received. We will get back to you shortly.</p>
        <Link href="/" className="btn-gold">Back to Home</Link>
      </div>
    </section>
  );
}
