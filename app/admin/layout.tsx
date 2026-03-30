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
} from 'lucide-react';
import { auth, onAuthStateChanged, signOutAdmin, getAdminSession, type User } from '@/lib/adminAuth';

interface AdminInfo {
  name: string;
  role: string;
}

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/calendar', label: 'Calendar', icon: Calendar },
  { href: '/admin/reservations', label: 'Reservations', icon: ClipboardList },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/payments', label: 'Payments', icon: DollarSign },
  { href: '/admin/finance', label: 'Finance', icon: Wallet },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
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

  // Login page renders without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading spinner while checking auth
  if (!checked || !adminInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-primary">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-stone text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-navy transform transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="font-display text-xl text-white font-bold">
            Rush No More
          </h2>
          <p className="text-xs text-white/40 uppercase tracking-wider">
            Admin Panel
          </p>
          <p className="text-xs text-brand-gold mt-1">
            {adminInfo.name} ({adminInfo.role})
          </p>
        </div>

        <nav className="p-4 space-y-1">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-gold text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-5 h-5" /> Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-colors text-sm w-full"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 min-h-screen">
        <header className="bg-white border-b border-surface-muted px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-6 h-6 text-brand-navy" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {adminInfo.name[0]}
              </span>
            </div>
            <span className="text-sm font-bold text-brand-navy">
              {adminInfo.name}
            </span>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
