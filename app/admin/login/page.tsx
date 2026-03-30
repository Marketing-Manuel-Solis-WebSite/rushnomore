'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2, LogIn, Shield } from 'lucide-react';
import { signInAdmin, auth, onAuthStateChanged } from '@/lib/adminAuth';
import { SITE } from '@/data/site';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Auto-redirect if already authenticated (Firebase or legacy session)
  useEffect(() => {
    // Check Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/admin');
        return;
      }
      // If no Firebase user, check legacy session
      try {
        const raw = sessionStorage.getItem('rnm-admin-session');
        if (raw) {
          const session = JSON.parse(raw);
          if (session.expiresAt > Date.now()) {
            router.replace('/admin');
            return;
          }
          sessionStorage.removeItem('rnm-admin-session');
        }
      } catch {
        // ignore parse errors
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    // Attempt 1: Firebase Auth (if email is provided)
    if (email.trim()) {
      try {
        await signInAdmin(email.trim(), password);
        router.replace('/admin');
        return;
      } catch (err: unknown) {
        const firebaseError = err as { code?: string };
        // If Firebase is not configured / network error, fall through to legacy
        if (
          firebaseError.code === 'auth/too-many-requests'
        ) {
          setError('Too many attempts. Please try again later.');
          setLoading(false);
          return;
        }
        if (
          firebaseError.code === 'auth/invalid-credential' ||
          firebaseError.code === 'auth/user-not-found' ||
          firebaseError.code === 'auth/wrong-password' ||
          firebaseError.code === 'auth/invalid-email'
        ) {
          setError('Invalid credentials. Please check your email and password.');
          setLoading(false);
          return;
        }
        // For network / config errors, fall through to legacy login
      }
    }

    // Attempt 2: Legacy password-only login via API
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.status === 429) {
        setError('Too many attempts. Please try again later.');
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem(
          'rnm-admin-session',
          JSON.stringify({
            token: data.token,
            role: data.role,
            name: data.name,
            expiresAt: Date.now() + 8 * 60 * 60 * 1000,
          })
        );
        router.push('/admin');
      } else {
        setError('Invalid credentials. Please check your password.');
        setPassword('');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show nothing while checking existing auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
          <p className="text-brand-stone-light text-sm">Checking session...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-navy relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-radial-gold opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-brand-navy-light/30 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-3xl shadow-lodge-xl p-8 sm:p-10">
          {/* Logo & branding */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="relative w-24 h-24 mx-auto mb-5">
              <Image
                src="/images/RushNoMore-logo.png"
                alt={`${SITE.short} Logo`}
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
            <h1 className="text-2xl font-display font-bold text-white tracking-wide">
              {SITE.short}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Shield className="w-3.5 h-3.5 text-brand-gold" />
              <p className="text-sm text-brand-stone-light font-accent uppercase tracking-widest">
                Admin Portal
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent mb-8" />

          {/* Login form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email field */}
            <div>
              <label
                htmlFor="admin-email"
                className="text-xs font-bold text-brand-stone-light uppercase tracking-wider mb-2 block"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rushnomore.com"
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.07] border border-white/[0.1] text-white placeholder-brand-stone/60 focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm font-medium transition-all duration-200"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="admin-password"
                className="text-xs font-bold text-brand-stone-light uppercase tracking-wider mb-2 block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  autoFocus
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/[0.07] border border-white/[0.1] text-white placeholder-brand-stone/60 focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm font-medium transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-stone hover:text-brand-gold transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-sm rounded-xl p-3 text-sm text-red-300 font-medium text-center">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading || !password.trim()}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 bg-gold-gradient text-white rounded-xl font-bold text-sm shadow-gold hover:shadow-gold-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Helper text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-brand-stone/50 mt-5"
          >
            Leave email blank for legacy password login
          </motion.p>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <a
            href="/"
            className="text-xs text-brand-stone/60 hover:text-brand-gold transition-colors duration-200 inline-flex items-center gap-1"
          >
            <span>&larr;</span>
            <span>Back to {SITE.short}</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
