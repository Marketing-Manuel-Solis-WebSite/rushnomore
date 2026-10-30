'use client';

import { useEffect } from 'react';

// Fires a GA4 `begin_booking` event whenever any link to the Newbook booking
// engine is clicked, anywhere on the site. Uses a single delegated listener so
// no CTA markup has to change, and sends through the existing `gtag` set up in
// app/layout.tsx (no new tags or IDs).

const BOOKING_HOST = 'newbook.cloud';

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

// Best-effort label for where on the page the link lives.
function areaOf(el: Element): string {
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  if (el.closest('[role="dialog"]')) return 'dialog';
  const section = el.closest('section');
  if (section) {
    const id = section.id || section.getAttribute('aria-labelledby');
    if (id) return id;
    const heading = section.querySelector('h1, h2, h3')?.textContent?.trim();
    return heading ? slug(heading) : 'section';
  }
  if (el.closest('main')) return 'main';
  return 'floating';
}

function isBookingLink(a: HTMLAnchorElement) {
  try {
    const host = new URL(a.href).hostname;
    return host === BOOKING_HOST || host.endsWith(`.${BOOKING_HOST}`);
  } catch {
    return false;
  }
}

export function BookingClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.type === 'auxclick' && e.button !== 1) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || !isBookingLink(a) || !window.gtag) return;
      window.gtag('event', 'begin_booking', {
        link_url: a.href,
        location: `${window.location.pathname} | ${areaOf(a)}`.slice(0, 100),
      });
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('auxclick', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('auxclick', onClick, true);
    };
  }, []);

  return null;
}
