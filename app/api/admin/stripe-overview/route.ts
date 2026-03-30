import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { withAdminAuth } from '@/lib/withAdminAuth';

export const GET = withAdminAuth(async () => {
  try {
    // Fetch balance
    const balance = await stripe.balance.retrieve();

    // Available balance (what can be paid out)
    const availableUSD = balance.available.find(b => b.currency === 'usd');
    const pendingUSD = balance.pending.find(b => b.currency === 'usd');

    // Recent payouts (transfers to bank)
    const payouts = await stripe.payouts.list({ limit: 5 });

    // Recent charges (last 10 payments)
    const charges = await stripe.charges.list({ limit: 10 });

    // This month's volume
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthCharges = await stripe.charges.list({
      created: { gte: Math.floor(monthStart.getTime() / 1000) },
      limit: 100,
    });

    const monthVolume = monthCharges.data
      .filter(c => c.status === 'succeeded')
      .reduce((sum, c) => sum + c.amount, 0);

    const monthRefunds = monthCharges.data
      .reduce((sum, c) => sum + (c.amount_refunded || 0), 0);

    return NextResponse.json({
      balance: {
        available: (availableUSD?.amount || 0) / 100,
        pending: (pendingUSD?.amount || 0) / 100,
      },
      monthVolume: monthVolume / 100,
      monthRefunds: monthRefunds / 100,
      monthTransactions: monthCharges.data.filter(c => c.status === 'succeeded').length,
      recentPayouts: payouts.data.map(p => ({
        id: p.id,
        amount: p.amount / 100,
        status: p.status,
        arrivalDate: new Date(p.arrival_date * 1000).toISOString().split('T')[0],
        method: p.method,
      })),
      recentCharges: charges.data.map(c => ({
        id: c.id,
        amount: c.amount / 100,
        amountRefunded: (c.amount_refunded || 0) / 100,
        status: c.status,
        description: c.description || '',
        customerEmail: c.billing_details?.email || '',
        created: new Date(c.created * 1000).toISOString(),
      })),
    });
  } catch (e) {
    console.error('Stripe overview error:', e);
    // If Stripe is not configured, return empty data instead of 500
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_live_...') {
      return NextResponse.json({
        balance: { available: 0, pending: 0 },
        monthVolume: 0,
        monthRefunds: 0,
        monthTransactions: 0,
        recentPayouts: [],
        recentCharges: [],
        notConfigured: true,
      });
    }
    return NextResponse.json({ error: 'Failed to fetch Stripe data' }, { status: 500 });
  }
});
