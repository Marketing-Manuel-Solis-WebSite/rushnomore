'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminGet } from '@/lib/adminFetch';
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Building2,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Wallet,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

interface StripeOverview {
  balance: { available: number; pending: number };
  monthVolume: number;
  monthRefunds: number;
  monthTransactions: number;
  recentPayouts: {
    id: string;
    amount: number;
    status: string;
    arrivalDate: string;
    method: string;
  }[];
  recentCharges: {
    id: string;
    amount: number;
    amountRefunded: number;
    status: string;
    description: string;
    customerEmail: string;
    created: string;
  }[];
  notConfigured?: boolean;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function PayoutStatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    paid: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Paid' },
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Pending' },
    in_transit: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'In Transit' },
    canceled: { bg: 'bg-red-50', text: 'text-red-700', label: 'Canceled' },
    failed: { bg: 'bg-red-50', text: 'text-red-700', label: 'Failed' },
  };
  const s = map[status] || { bg: 'bg-gray-50', text: 'text-gray-700', label: status };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      {status === 'paid' && <CheckCircle className="w-3 h-3" />}
      {status === 'pending' && <Clock className="w-3 h-3" />}
      {status === 'in_transit' && <ArrowUpRight className="w-3 h-3" />}
      {(status === 'canceled' || status === 'failed') && <AlertCircle className="w-3 h-3" />}
      {s.label}
    </span>
  );
}

function ChargeStatusBadge({ status, refunded }: { status: string; refunded: boolean }) {
  if (refunded) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
        <ArrowDownRight className="w-3 h-3" /> Refunded
      </span>
    );
  }
  const map: Record<string, { bg: string; text: string; label: string }> = {
    succeeded: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Succeeded' },
    failed: { bg: 'bg-red-50', text: 'text-red-700', label: 'Failed' },
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Pending' },
  };
  const s = map[status] || { bg: 'bg-gray-50', text: 'text-gray-700', label: status };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      {status === 'succeeded' && <CheckCircle className="w-3 h-3" />}
      {status === 'failed' && <AlertCircle className="w-3 h-3" />}
      {status === 'pending' && <Clock className="w-3 h-3" />}
      {s.label}
    </span>
  );
}

export default function FinancePage() {
  const [data, setData] = useState<StripeOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const res = await adminGet('/api/admin/stripe-overview');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch {
      setError('Failed to load Stripe data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Wallet className="w-8 h-8 text-brand-gold animate-pulse" />
          <p className="text-sm text-brand-stone font-medium">Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl shadow-lodge p-8 text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-brand-navy mb-2">Connection Error</h2>
          <p className="text-sm text-brand-stone mb-4">{error}</p>
          <button
            onClick={() => fetchData()}
            className="px-5 py-2.5 bg-brand-gold text-white rounded-xl font-bold text-sm hover:bg-brand-gold/90 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (data?.notConfigured) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl shadow-lodge p-8 text-center max-w-md">
          <CreditCard className="w-10 h-10 text-brand-gold mx-auto mb-4" />
          <h2 className="text-lg font-bold text-brand-navy mb-2">Stripe Not Configured</h2>
          <p className="text-sm text-brand-stone mb-4">
            Stripe is not configured yet. Add your <code className="bg-surface-secondary px-1.5 py-0.5 rounded text-xs font-mono">STRIPE_SECRET_KEY</code> to <code className="bg-surface-secondary px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code> to enable the financial overview.
          </p>
          <div className="bg-surface-secondary rounded-xl p-4 text-xs font-mono text-brand-stone text-left">
            <p>STRIPE_SECRET_KEY=sk_live_...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const kpis = [
    {
      label: 'Available Balance',
      value: formatCurrency(data.balance.available),
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      subtitle: 'Ready to transfer',
    },
    {
      label: 'Pending Balance',
      value: formatCurrency(data.balance.pending),
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      subtitle: 'Processing',
    },
    {
      label: 'This Month Volume',
      value: formatCurrency(data.monthVolume),
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      subtitle: `${data.monthTransactions} transaction${data.monthTransactions !== 1 ? 's' : ''}`,
    },
    {
      label: 'This Month Refunds',
      value: formatCurrency(data.monthRefunds),
      icon: ArrowDownRight,
      color: 'text-red-600',
      bg: 'bg-red-50',
      subtitle: 'Total refunded',
    },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-brand-navy">Finance Overview</h1>
            <p className="text-sm text-brand-stone">Real-time Stripe financial data</p>
          </div>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white rounded-xl font-bold text-sm hover:bg-brand-gold/90 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl shadow-lodge p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-4.5 h-4.5 ${kpi.color}`} />
              </div>
              <span className="text-xs font-semibold text-brand-stone uppercase tracking-wider">{kpi.label}</span>
            </div>
            <p className="text-2xl font-bold text-brand-navy">{kpi.value}</p>
            <p className="text-xs text-brand-stone mt-1">{kpi.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Recent Payouts */}
      <section className="bg-white rounded-2xl shadow-lodge p-6 mb-6">
        <h3 className="font-bold text-brand-navy mb-5 flex items-center gap-2 text-lg">
          <Building2 className="w-5 h-5 text-brand-gold" /> Recent Payouts
        </h3>
        {data.recentPayouts.length === 0 ? (
          <div className="text-center py-8">
            <Building2 className="w-8 h-8 text-brand-stone/30 mx-auto mb-2" />
            <p className="text-sm text-brand-stone">No payouts yet</p>
            <p className="text-xs text-brand-stone/60 mt-1">Payouts will appear here once Stripe sends funds to your bank</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-muted">
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Method</th>
                </tr>
              </thead>
              <tbody>
                {data.recentPayouts.map((payout) => (
                  <tr key={payout.id} className="border-b border-surface-muted/50 hover:bg-surface-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-brand-navy font-medium">{formatDate(payout.arrivalDate)}</td>
                    <td className="py-3 px-4 text-brand-navy font-bold">{formatCurrency(payout.amount)}</td>
                    <td className="py-3 px-4"><PayoutStatusBadge status={payout.status} /></td>
                    <td className="py-3 px-4 text-brand-stone capitalize">{payout.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent Charges */}
      <section className="bg-white rounded-2xl shadow-lodge p-6 mb-6">
        <h3 className="font-bold text-brand-navy mb-5 flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5 text-brand-gold" /> Recent Charges
        </h3>
        {data.recentCharges.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="w-8 h-8 text-brand-stone/30 mx-auto mb-2" />
            <p className="text-sm text-brand-stone">No charges yet</p>
            <p className="text-xs text-brand-stone/60 mt-1">Customer payments will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-muted">
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-stone text-xs uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {data.recentCharges.map((charge) => (
                  <tr key={charge.id} className="border-b border-surface-muted/50 hover:bg-surface-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-brand-navy font-medium whitespace-nowrap">{formatDateTime(charge.created)}</td>
                    <td className="py-3 px-4 text-brand-navy max-w-[200px] truncate">{charge.description || '--'}</td>
                    <td className="py-3 px-4 text-brand-stone text-xs">{charge.customerEmail || '--'}</td>
                    <td className="py-3 px-4 text-brand-navy font-bold">{formatCurrency(charge.amount)}</td>
                    <td className="py-3 px-4">
                      <ChargeStatusBadge status={charge.status} refunded={charge.amountRefunded > 0} />
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={`https://dashboard.stripe.com/payments/${charge.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-gold hover:text-brand-gold/80 transition-colors"
                        title="View in Stripe"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Stripe Dashboard Link */}
      <section className="bg-white rounded-2xl shadow-lodge p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-brand-navy flex items-center gap-2 text-lg">
              <DollarSign className="w-5 h-5 text-brand-gold" /> Full Stripe Dashboard
            </h3>
            <p className="text-sm text-brand-stone mt-1">
              For transfers, refunds, and detailed reports, use the Stripe Dashboard
            </p>
          </div>
          <a
            href="https://dashboard.stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-white rounded-xl font-bold text-sm hover:bg-brand-navy/90 transition-all shadow-sm hover:shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            Open Stripe Dashboard
          </a>
        </div>
      </section>
    </div>
  );
}
