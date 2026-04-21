'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/components/ui/Toast';
import {
  Save,
  Shield,
  DollarSign,
  Calendar,
  Phone,
  Bell,
  Settings,
} from 'lucide-react';

interface SiteSettings {
  taxRate: number;
  rallyStartDate: string;
  rallyEndDate: string;
  rallyName: string;
  cancellationWindowDays: {
    standard: number;
    premium: number;
  };
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  emailNotifications: boolean;
  adminEmail: string;
}

const DEFAULTS: SiteSettings = {
  taxRate: 6,
  rallyStartDate: '2026-08-02',
  rallyEndDate: '2026-08-18',
  rallyName: 'Sturgis Motorcycle Rally 2026',
  cancellationWindowDays: { standard: 14, premium: 30 },
  phone: '605-423-2545',
  email: 'rushnomoresd@gmail.com',
  checkInTime: '15:00',
  checkOutTime: '11:00',
  emailNotifications: true,
  adminEmail: 'rushnomoresd@gmail.com',
};

export default function SettingsPage() {
  const toast = useToast();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch settings on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const snap = await getDoc(doc(db, 'config', 'siteSettings'));
        if (snap.exists()) {
          const data = snap.data() as Partial<SiteSettings>;
          setSettings({
            ...DEFAULTS,
            ...data,
            cancellationWindowDays: {
              ...DEFAULTS.cancellationWindowDays,
              ...(data.cancellationWindowDays ?? {}),
            },
          });
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
        toast.error('Failed to load settings from server');
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Validation
  function validate(): boolean {
    const next: Record<string, string> = {};

    if (settings.taxRate < 0 || settings.taxRate > 100) {
      next.taxRate = 'Tax rate must be between 0 and 100';
    }

    if (!settings.rallyStartDate) {
      next.rallyStartDate = 'Start date is required';
    }
    if (!settings.rallyEndDate) {
      next.rallyEndDate = 'End date is required';
    }
    if (settings.rallyStartDate && settings.rallyEndDate && settings.rallyStartDate > settings.rallyEndDate) {
      next.rallyEndDate = 'End date must be after start date';
    }
    if (!settings.rallyName.trim()) {
      next.rallyName = 'Rally name is required';
    }

    if (settings.cancellationWindowDays.standard < 0) {
      next.standardWindow = 'Must be 0 or more';
    }
    if (settings.cancellationWindowDays.premium < 0) {
      next.premiumWindow = 'Must be 0 or more';
    }

    if (!settings.phone.trim()) {
      next.phone = 'Phone is required';
    }
    if (!settings.email.includes('@')) {
      next.email = 'Enter a valid email address';
    }
    if (!settings.adminEmail.includes('@')) {
      next.adminEmail = 'Enter a valid email address';
    }
    if (!settings.checkInTime) {
      next.checkInTime = 'Check-in time is required';
    }
    if (!settings.checkOutTime) {
      next.checkOutTime = 'Check-out time is required';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  // Save to Firestore
  async function handleSave() {
    if (!validate()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    setSaving(true);
    try {
      await setDoc(
        doc(db, 'config', 'siteSettings'),
        { ...settings, updatedAt: new Date().toISOString() },
        { merge: true },
      );
      toast.success('Settings saved successfully');
    } catch (err) {
      console.error('Failed to save settings:', err);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  // Helper to update a single field
  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }

  if (loading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Settings className="w-8 h-8 text-brand-gold animate-spin" />
          <p className="text-sm text-brand-stone font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-brand-navy">Settings</h1>
            <p className="text-sm text-brand-stone">Manage site configuration and preferences</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white rounded-xl font-bold text-sm hover:bg-brand-gold/90 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* ─── Pricing & Tax ─── */}
        <section className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-5 flex items-center gap-2 text-lg">
            <DollarSign className="w-5 h-5 text-brand-gold" /> Pricing &amp; Tax
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-bold text-brand-navy mb-1 block">Tax Rate (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={settings.taxRate}
                onChange={(e) => update('taxRate', parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                  errors.taxRate ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                }`}
              />
              {errors.taxRate && <p className="text-xs text-red-500 mt-1">{errors.taxRate}</p>}
            </div>
          </div>
        </section>

        {/* ─── Rally Configuration ─── */}
        <section className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-5 flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-brand-gold" /> Rally Configuration
          </h3>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-bold text-brand-navy mb-1 block">Rally Name</label>
              <input
                type="text"
                value={settings.rallyName}
                onChange={(e) => update('rallyName', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                  errors.rallyName ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                }`}
              />
              {errors.rallyName && <p className="text-xs text-red-500 mt-1">{errors.rallyName}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-bold text-brand-navy mb-1 block">Start Date</label>
                <input
                  type="date"
                  value={settings.rallyStartDate}
                  onChange={(e) => update('rallyStartDate', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                    errors.rallyStartDate ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                  }`}
                />
                {errors.rallyStartDate && <p className="text-xs text-red-500 mt-1">{errors.rallyStartDate}</p>}
              </div>
              <div>
                <label className="text-sm font-bold text-brand-navy mb-1 block">End Date</label>
                <input
                  type="date"
                  value={settings.rallyEndDate}
                  onChange={(e) => update('rallyEndDate', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                    errors.rallyEndDate ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                  }`}
                />
                {errors.rallyEndDate && <p className="text-xs text-red-500 mt-1">{errors.rallyEndDate}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Cancellation Policies ─── */}
        <section className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-5 flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-brand-gold" /> Cancellation Policies
          </h3>
          <p className="text-sm text-brand-stone mb-4">
            Number of days before check-in that guests can cancel for a full refund.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-bold text-brand-navy mb-1 block">Standard (days)</label>
              <input
                type="number"
                min={0}
                value={settings.cancellationWindowDays.standard}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    cancellationWindowDays: {
                      ...prev.cancellationWindowDays,
                      standard: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                  errors.standardWindow ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                }`}
              />
              {errors.standardWindow && <p className="text-xs text-red-500 mt-1">{errors.standardWindow}</p>}
            </div>
            <div>
              <label className="text-sm font-bold text-brand-navy mb-1 block">Premium (days)</label>
              <input
                type="number"
                min={0}
                value={settings.cancellationWindowDays.premium}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    cancellationWindowDays: {
                      ...prev.cancellationWindowDays,
                      premium: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                  errors.premiumWindow ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                }`}
              />
              {errors.premiumWindow && <p className="text-xs text-red-500 mt-1">{errors.premiumWindow}</p>}
            </div>
          </div>
        </section>

        {/* ─── Contact Info ─── */}
        <section className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-5 flex items-center gap-2 text-lg">
            <Phone className="w-5 h-5 text-brand-gold" /> Contact Information
          </h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-bold text-brand-navy mb-1 block">Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                    errors.phone ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm font-bold text-brand-navy mb-1 block">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                    errors.email ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-bold text-brand-navy mb-1 block">Check-in Time</label>
                <input
                  type="time"
                  value={settings.checkInTime}
                  onChange={(e) => update('checkInTime', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                    errors.checkInTime ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                  }`}
                />
                {errors.checkInTime && <p className="text-xs text-red-500 mt-1">{errors.checkInTime}</p>}
              </div>
              <div>
                <label className="text-sm font-bold text-brand-navy mb-1 block">Check-out Time</label>
                <input
                  type="time"
                  value={settings.checkOutTime}
                  onChange={(e) => update('checkOutTime', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                    errors.checkOutTime ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                  }`}
                />
                {errors.checkOutTime && <p className="text-xs text-red-500 mt-1">{errors.checkOutTime}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Notifications ─── */}
        <section className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-5 flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-brand-gold" /> Notifications
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-brand-navy">Email Notifications</p>
                <p className="text-xs text-brand-stone mt-0.5">Receive email alerts for new reservations and cancellations</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.emailNotifications}
                onClick={() => update('emailNotifications', !settings.emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-brand-gold' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="text-sm font-bold text-brand-navy mb-1 block">Admin Email</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => update('adminEmail', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                  errors.adminEmail ? 'border-red-400 bg-red-50' : 'border-surface-muted'
                }`}
              />
              {errors.adminEmail && <p className="text-xs text-red-500 mt-1">{errors.adminEmail}</p>}
            </div>
          </div>
        </section>

        {/* ─── Security (read-only info, kept from original) ─── */}
        <section className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-brand-gold" /> Security
          </h3>
          <p className="text-sm text-brand-stone mb-3">
            Admin access via secret F12x3 portal. Passwords set in env vars.
          </p>
          <div className="bg-surface-secondary rounded-xl p-4 text-xs font-mono text-brand-stone space-y-1">
            <p>ADMIN_PASSWORD=... (super-admin)</p>
            <p>MANAGER_PASSWORD=... (manager)</p>
            <p>FRONTDESK_PASSWORD=... (front-desk)</p>
          </div>
        </section>
      </div>
    </div>
  );
}
