'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-3xl font-display font-bold text-brand-navy mb-3">
          Something went wrong
        </h1>
        <p className="text-brand-stone mb-8">
          We&apos;re sorry for the inconvenience. Please try again or contact us if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-gold inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>

        <p className="text-xs text-brand-stone/50 mt-8">
          Need help? Call <a href="tel:+16054232545" className="text-brand-gold hover:underline">605-423-2545</a>
        </p>
      </div>
    </div>
  );
}
