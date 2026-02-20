'use client';
import { useState } from 'react';
import { Save, Shield, DollarSign, Calendar, Mail } from 'lucide-react';

export default function SettingsPage() {
  const [taxRate, setTaxRate] = useState('6');
  const [timeout, setTimeout_] = useState('30');
  const [rallyStart, setRallyStart] = useState('2026-08-02');
  const [rallyEnd, setRallyEnd] = useState('2026-08-18');
  const [adminEmail, setAdminEmail] = useState('info@rushnomore.com');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => { setSaving(true); await new Promise(r => setTimeout(r, 500)); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-brand-navy">Settings</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white rounded-xl font-bold text-sm hover:bg-brand-gold/90 disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
      <div className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-brand-gold" /> Tax & Pricing</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-bold text-brand-navy mb-1 block">Tax Rate (%)</label><input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} step="0.1" className="w-full px-4 py-3 rounded-xl border border-surface-muted text-sm" /></div>
            <div><label className="text-sm font-bold text-brand-navy mb-1 block">Pending Timeout (min)</label><input type="number" value={timeout} onChange={e => setTimeout_(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-surface-muted text-sm" /></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-brand-gold" /> Rally Dates 2026</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-bold text-brand-navy mb-1 block">Start</label><input type="date" value={rallyStart} onChange={e => setRallyStart(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-surface-muted text-sm" /></div>
            <div><label className="text-sm font-bold text-brand-navy mb-1 block">End</label><input type="date" value={rallyEnd} onChange={e => setRallyEnd(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-surface-muted text-sm" /></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-brand-gold" /> Notifications</h3>
          <label className="text-sm font-bold text-brand-navy mb-1 block">Admin Email</label>
          <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-surface-muted text-sm" />
        </div>
        <div className="bg-white rounded-2xl shadow-lodge p-6">
          <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-brand-gold" /> Security</h3>
          <p className="text-sm text-brand-stone mb-3">Admin access via secret F12x3 portal. Passwords set in env vars.</p>
          <div className="bg-surface-secondary rounded-xl p-4 text-xs font-mono text-brand-stone space-y-1">
            <p>ADMIN_PASSWORD=... (super-admin)</p><p>MANAGER_PASSWORD=... (manager)</p><p>FRONTDESK_PASSWORD=... (front-desk)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
