// lib/stripe.ts — Stripe client initialization
//
// Required env vars:
//   STRIPE_SECRET_KEY=sk_live_... or sk_test_...
//   STRIPE_WEBHOOK_SECRET=whsec_...
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... or pk_test_...

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[Stripe] STRIPE_SECRET_KEY not set. Payment processing will fail.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
