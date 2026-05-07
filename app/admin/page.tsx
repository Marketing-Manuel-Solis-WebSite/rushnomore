// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3, Users, DollarSign, Calendar,
  ArrowUpRight, ArrowDownRight, Bell, Truck, Home, Tent,
  CheckCircle, Clock, AlertTriangle
} from 'lucide-react';
import { adminGet } from '@/lib/adminFetch';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  const [revenueData, setRevenueData] = useState<{month: string; amount: number}[]>([]);

  const [dashError, setDashError] = useState('');

  useEffect(() => {
    adminGet('/api/admin/dashboard')
      .then(r => r.json())
      .then(data => {
        if (data.occupancy) {
          setStats(data);
        } else {
          setDashError(data.error || JSON.stringify(data));
        }
        setLoading(false);
      })
      .catch((e) => { setDashError(String(e)); setLoading(false); });
  }, []);

  useEffect(() => {
    adminGet('/api/admin/reports?type=revenue')
      .then(r => r.json())
      .then(data => {
        if (data.revenueByMonth) setRevenueData(data.revenueByMonth);
      })
      .catch(() => {});
  }, []);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (!stats) return (
    <div className="p-8 text-center space-y-4">
      {dashError && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl max-w-lg mx-auto">{dashError}</p>}
      <p className="text-brand-stone">Unable to load dashboard data.</p>
      <button onClick={() => window.location.reload()} className="text-sm text-brand-gold font-bold hover:underline">
        Try Again
      </button>
    </div>
  );

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
          <div key={i} className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 overflow-hidden">
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
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-brand-gold" />
            <span className="text-sm font-bold text-brand-stone uppercase tracking-wider">Today</span>
          </div>
          <span className="font-display text-3xl font-bold text-brand-navy">${stats.revenue.today.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 overflow-hidden">
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
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-brand-gold" />
            <span className="text-sm font-bold text-brand-stone uppercase tracking-wider">New Today</span>
          </div>
          <span className="font-display text-3xl font-bold text-brand-navy">{stats.reservations.newToday}</span>
          <p className="text-sm text-brand-stone mt-1">new reservations</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 overflow-hidden">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 overflow-hidden">
          <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-gold" /> Revenue Trend
          </h3>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="amount" stroke="#C8933C" strokeWidth={2} dot={{ fill: '#C8933C' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-brand-stone text-sm">
              No revenue data yet
            </div>
          )}
        </div>

        {/* Occupancy by Type */}
        <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6 overflow-hidden">
          <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-gold" /> Occupancy Today
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { type: 'Cabins', occupied: stats.occupancy.cabins.occupied, total: stats.occupancy.cabins.total },
              { type: 'RV', occupied: stats.occupancy.rv.occupied, total: stats.occupancy.rv.total },
              { type: 'Tent', occupied: stats.occupancy.tent.occupied, total: stats.occupancy.tent.total },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="occupied" fill="#C8933C" name="Occupied" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" fill="#e5e7eb" name="Total" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
