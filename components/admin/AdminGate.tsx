// components/admin/AdminGate.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * AdminGate — Componente de acceso secreto al panel de administración
 * 
 * CÓMO FUNCIONA:
 * - Se monta en el layout principal del sitio (o en cualquier página)
 * - Escucha la tecla F12
 * - Si el usuario presiona F12 tres veces seguidas en menos de 2 segundos,
 *   se activa el portal secreto de administración
 * - No interfiere con el DevTools normal (una sola pulsación de F12 abre DevTools)
 * 
 * IMPORTANTE: La secuencia de 3 F12 rápidos activa el portal.
 * Para DevTools normal, basta con presionar F12 una vez y esperar.
 */
export default function AdminGate() {
  const router = useRouter();
  const f12PressesRef = useRef<number[]>([]);
  const [showPortal, setShowPortal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const REQUIRED_PRESSES = 3;
  const TIME_WINDOW_MS = 2000; // 2 segundos para las 3 pulsaciones

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'F12') {
      const now = Date.now();
      const presses = f12PressesRef.current;

      // Agregar timestamp de la pulsación
      presses.push(now);

      // Limpiar pulsaciones viejas (fuera de la ventana de tiempo)
      const recentPresses = presses.filter(t => now - t < TIME_WINDOW_MS);
      f12PressesRef.current = recentPresses;

      // Si tenemos 3 pulsaciones dentro de la ventana
      if (recentPresses.length >= REQUIRED_PRESSES) {
        e.preventDefault();
        e.stopPropagation();
        f12PressesRef.current = []; // Reset
        setShowPortal(true);
        setTimeout(() => setFadeIn(true), 50);
      }
    }

    // Escape cierra el portal
    if (e.key === 'Escape' && showPortal) {
      closePortal();
    }
  }, [showPortal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [handleKeyDown]);

  // Verificar si ya hay una sesión admin activa
  useEffect(() => {
    const adminSession = sessionStorage.getItem('rnm-admin-session');
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        if (session.expiresAt > Date.now()) {
          // Sesión válida — el admin ya está autenticado
          // No hacer nada, el acceso directo a /admin funcionará
        } else {
          sessionStorage.removeItem('rnm-admin-session');
        }
      } catch {
        sessionStorage.removeItem('rnm-admin-session');
      }
    }
  }, []);

  const closePortal = () => {
    setFadeIn(false);
    setTimeout(() => {
      setShowPortal(false);
      setPassword('');
      setError('');
    }, 300);
  };

  const handleLogin = async () => {
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        // Guardar sesión en sessionStorage (expira al cerrar tab)
        sessionStorage.setItem('rnm-admin-session', JSON.stringify({
          token: data.token,
          role: data.role,
          name: data.name,
          expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 horas
        }));
        closePortal();
        router.push('/admin');
      } else {
        setError('Invalid password');
        setPassword('');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  if (!showPortal) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-300 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'rgba(12, 35, 64, 0.95)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closePortal(); }}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm mx-4 transform transition-all duration-300 ${
          fadeIn ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-brand-navy">
            Admin Access
          </h2>
          <p className="text-sm text-brand-stone mt-1">
            Rush No More Management
          </p>
        </div>

        {/* Password Input */}
        <div className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
              placeholder="Enter admin password"
              autoFocus
              className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-muted focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm font-medium text-center tracking-widest"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !password.trim()}
            className="w-full py-3.5 bg-brand-navy text-white rounded-xl font-bold text-sm hover:bg-brand-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
                </svg>
                Verifying...
              </span>
            ) : 'Access Panel'}
          </button>
        </div>

        {/* Close hint */}
        <p className="text-center text-xs text-brand-stone/50 mt-4">
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  );
}
