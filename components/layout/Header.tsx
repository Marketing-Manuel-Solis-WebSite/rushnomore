'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV, SITE } from '@/data/site';
import { Phone, Menu, X, ChevronDown, MapPin, ExternalLink } from 'lucide-react';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-navy text-white/80 text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              {SITE.address}
            </span>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              {SITE.phone}
            </a>
          </div>
          <span className="text-white/50 text-xs uppercase tracking-wider">
            Open {SITE.hours}
          </span>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lodge border-b border-surface-muted/50'
            : 'bg-white'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-navy rounded-lg flex items-center justify-center group-hover:bg-brand-gold transition-colors duration-300">
              <span className="text-white font-display text-lg md:text-xl font-bold">R</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-brand-navy text-lg md:text-xl leading-tight">
                Rush No More
              </div>
              <div className="text-brand-stone text-[10px] md:text-xs uppercase tracking-[0.15em]">
                RV Resort & Campground
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-navy rounded-lg hover:bg-surface-secondary transition-all duration-200"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.children && dropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-lodge-lg border border-surface-muted/50 py-2 min-w-[220px]">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block px-4 py-2.5 text-sm text-brand-navy/70 hover:text-brand-navy hover:bg-surface-secondary transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm py-2.5 px-5 hidden sm:inline-flex"
            >
              Book Now
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-surface-muted animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {NAV.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-brand-navy font-medium rounded-lg hover:bg-surface-secondary"
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block px-8 py-2 text-sm text-brand-stone hover:text-brand-navy"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="pt-4 border-t border-surface-muted">
                <a
                  href={SITE.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-center"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
