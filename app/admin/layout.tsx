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
  BarChart3,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';

interface AdminSession {
  token: string;
  role: string;
  name: string;
  expiresAt: number;
}

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/calendar', label: 'Calendar', icon: Calendar },
  { href: '/admin/reservations', label: 'Reservations', icon: ClipboardList },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/payments', label: 'Payments', icon: DollarSign },
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
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checked, setChecked] = useState(false);

  // ⚠️ IMPORTANTE: Si estamos en /admin/login, NO verificar sesión
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecked(true);
      return;
    }

    // Verificar sesión
    try {
      const raw = sessionStorage.getItem('rnm-admin-session');
      if (!raw) {
        router.replace('/admin/login');
        return;
      }
      const s: AdminSession = JSON.parse(raw);
      if (s.expiresAt < Date.now()) {
        sessionStorage.removeItem('rnm-admin-session');
        router.replace('/admin/login');
        return;
      }
      setSession(s);
    } catch {
      router.replace('/admin/login');
      return;
    }
    setChecked(true);
  }, [router, isLoginPage, pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('rnm-admin-session');
    router.push('/admin/login');
  };

  // Si es la página de login, renderizar sin sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Esperando verificación de sesión
  if (!checked || !session) {
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
            {session.name} ({session.role})
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
                {session.name[0]}
              </span>
            </div>
            <span className="text-sm font-bold text-brand-navy">
              {session.name}
            </span>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
