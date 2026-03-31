// app/admin/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Package,
  DollarSign,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  ExternalLink,
  Shield,
  X,
  Monitor,
  GanttChart,
} from 'lucide-react';
import {
  auth,
  onAuthStateChanged,
  signOutAdmin,
  getAdminSession,
  getAdminToken,
  type User,
} from '@/lib/adminAuth';

interface AdminInfo {
  name: string;
  role: string;
}

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/booking-chart', label: 'Booking Chart', icon: GanttChart },
      { href: '/admin/calendar', label: 'Calendar', icon: Calendar },
      { href: '/admin/reservations', label: 'Reservations', icon: ClipboardList },
    ],
  },
  {
    label: 'Management',
    items: [
      { href: '/admin/inventory', label: 'Inventory', icon: Package },
      { href: '/admin/payments', label: 'Payments', icon: DollarSign },
      { href: '/admin/finance', label: 'Finance', icon: Wallet },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [checked, setChecked] = useState(false);
  const [revokingAll, setRevokingAll] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecked(true);
      return;
    }

    // Primary: Firebase Auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setAdminInfo({
          name: user.displayName || user.email || 'Admin',
          role: 'admin',
        });
        setChecked(true);
        return;
      }

      // Fallback: legacy session (during migration)
      const session = getAdminSession();
      if (session) {
        setAdminInfo({
          name: session.name,
          role: session.role,
        });
        setChecked(true);
        return;
      }

      // Not authenticated
      router.replace('/admin/login');
    });

    return () => unsubscribe();
  }, [router, isLoginPage, pathname]);

  const handleLogout = async () => {
    try {
      await signOutAdmin();
    } catch {
      // Ignore sign-out errors
    }
    // Also clear legacy session
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('rnm-admin-session');
    }
    router.push('/admin/login');
  };

  const handleRevokeAllSessions = async () => {
    if (revokingAll) return;
    setRevokingAll(true);
    try {
      const token = await getAdminToken();
      if (token) {
        await fetch('/api/admin/revoke-sessions', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await signOutAdmin();
    } catch {
      // Best-effort — still sign out locally
    }
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('rnm-admin-session');
    }
    setRevokingAll(false);
    router.push('/admin/login');
  };

  // Login page renders without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading spinner while checking auth
  if (!checked || !adminInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  const userInitial = adminInfo.name.charAt(0).toUpperCase();

  /* ─── Sidebar content (shared between mobile overlay & desktop) ─── */
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo + user info */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-base font-bold text-gray-900 tracking-tight">
              Rush No More
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded">
              Admin
            </span>
          </div>
          {/* Close button: mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* User info row */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-6 h-6 rounded-full bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-brand-gold">
              {userInitial}
            </span>
          </div>
          <span className="text-xs text-gray-600 truncate">
            {adminInfo.name}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded flex-shrink-0">
            {adminInfo.role}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all relative ${
                      isActive
                        ? 'text-brand-gold bg-brand-gold/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {/* Active left border */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-brand-gold" />
                    )}
                    <item.icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive
                          ? 'text-brand-gold'
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions — always visible via mt-auto */}
      <div className="mt-auto border-t border-gray-100 px-3 py-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
        <button
          onClick={handleRevokeAllSessions}
          disabled={revokingAll}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors w-full disabled:opacity-50"
        >
          <Monitor className="w-4 h-4" />
          {revokingAll ? 'Signing out...' : 'Sign Out All Devices'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-60 bg-white border-r border-gray-100 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-white shadow-xl transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main content area */}
      <div className="flex-1 lg:ml-60 min-h-screen flex flex-col">
        {/* Top header bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Left: mobile menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-gray-700">Admin</span>
          </div>

          {/* Desktop: empty left spacer */}
          <div className="hidden lg:block" />

          {/* Right: user avatar + role */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500 capitalize hidden sm:inline">
                {adminInfo.role}
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center">
              <span className="text-[11px] font-bold text-white">
                {userInitial}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
