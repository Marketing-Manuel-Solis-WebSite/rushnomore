// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3, Users, DollarSign, Calendar,
  ArrowUpRight, ArrowDownRight, Bell, Truck, Home, Tent,
  CheckCircle, Clock, AlertTriangle
} from 'lucide-react';

interface Stats {
  occupancy: {
    cabins: { occupied: number; total: number; percentage: number };
    rv: { occupied: number; total: number; percentage: number };
    tent: { occupied: number; total: number; percentage: number };
  };
  revenue: { today: number; thisWeek: number; thisMonth: number; lastMonth: number };
  reservations: { newToday: number; checkInsToday: number; checkOutsToday: number; pendingPayment: number };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (!stats) return <div className="p-8 text-center">Error loading stats</div>;

  const monthChange = stats.revenue.lastMonth > 0
    ? ((stats.revenue.thisMonth - stats.revenue.lastMonth) / stats.revenue.lastMonth * 100).toFixed(1)
    : '0';

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-brand-navy">Dashboard</h1>
        <p className="text-brand-stone mt-1">Real-time overview of Rush No More operations</p>
      </div>

      {/* Occupancy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Cabins', icon: Home, data: stats.occupancy.cabins, color: 'bg-amber-500' },
          { label: 'RV Sites', icon: Truck, data: stats.occupancy.rv, color: 'bg-blue-500' },
          { label: 'Tent Sites', icon: Tent, data: stats.occupancy.tent, color: 'bg-green-500' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-brand-navy">{item.label}</span>
              </div>
              <span className="text-2xl font-display font-bold text-brand-gold">
                {item.data.percentage}%
              </span>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-3">
              <div
                className={`h-3 rounded-full ${item.color} transition-all duration-500`}
                style={{ width: `${item.data.percentage}%` }}
              />
            </div>
            <p className="text-sm text-brand-stone mt-2">
              {item.data.occupied} of {item.data.total} occupied today
            </p>
          </div>
        ))}
      </div>

      {/* Revenue & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-brand-gold" />
            <span className="text-sm font-bold text-brand-stone uppercase tracking-wider">Today</span>
          </div>
          <span className="font-display text-3xl font-bold text-brand-navy">${stats.revenue.today.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-brand-gold" />
            <span className="text-sm font-bold text-brand-stone uppercase tracking-wider">This Month</span>
          </div>
          <span className="font-display text-3xl font-bold text-brand-navy">${stats.revenue.thisMonth.toLocaleString()}</span>
          <div className={`flex items-center gap-1 text-sm mt-1 ${Number(monthChange) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {Number(monthChange) >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {monthChange}% vs last month
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-brand-gold" />
            <span className="text-sm font-bold text-brand-stone uppercase tracking-wider">New Today</span>
          </div>
          <span className="font-display text-3xl font-bold text-brand-navy">{stats.reservations.newToday}</span>
          <p className="text-sm text-brand-stone mt-1">new reservations</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-brand-gold" />
            <span className="text-sm font-bold text-brand-stone uppercase tracking-wider">Check-ins</span>
          </div>
          <span className="font-display text-3xl font-bold text-brand-navy">{stats.reservations.checkInsToday}</span>
          <p className="text-sm text-brand-stone mt-1">arriving today</p>
        </div>
      </div>

      {/* Alerts */}
      {stats.reservations.pendingPayment > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-amber-800">
              {stats.reservations.pendingPayment} reservations pending payment
            </p>
            <p className="text-sm text-amber-700">
              These will auto-cancel if not paid within the timeout period.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
