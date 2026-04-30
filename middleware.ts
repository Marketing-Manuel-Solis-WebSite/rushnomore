// middleware.ts — Route protection, junk-query sanitation, disabled routes
//
// Responsibilities (in order of precedence):
//   1. Strip well-known tracking / spam / WordPress query parameters via 301
//      so Google consolidates duplicate URLs surfaced in GSC
//      ("Crawled - currently not indexed" cluster).
//   2. Block disabled internal booking & admin routes (preserved code, blocked access).
//   3. Pass through everything else.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─── Disabled routes (internal booking & admin system) ───
const DISABLED_PAGE_PREFIXES = [
  '/admin',
  '/book',
  '/booking',
  '/my-reservation',
  '/thanks',
];

const DISABLED_API_PREFIXES = [
  '/api/admin',
  '/api/availability',
  '/api/inventory',
  '/api/reservations',
  '/api/payments',
];

// ─── Junk / spam / scraper / WordPress query params ───
// Stripping these consolidates duplicates and removes referrer-spam URLs from
// the index. Marketing params (utm_*, gclid, fbclid, msclkid) are kept — they
// are useful for analytics and Google already canonicalizes them.
const JUNK_QUERY_PARAMS = new Set([
  // WordPress / WP plugins
  'cn-reloaded',          // Cookie Notice plugin
  'wordfence_lh',         // Wordfence security
  'hid',                  // Wordfence challenge id
  'replytocom',           // WP comment reply
  'p',                    // WP preview/permalink
  'page_id',              // WP page id permalink
  'preview',              // WP preview mode
  'preview_id',
  'preview_nonce',
  '_thumbnail_id',
  'unapproved',
  'moderation-hash',
  // Referrer / scraper spam reported in GSC
  'wwpath',               // theKnot referrer redirect
  'from',                 // generic referrer (xiaodiaomao.com etc.)
  'ref',                  // generic referrer
  'fb_action_ids',
  'fb_action_types',
  'fb_source',
  'action_object_map',
  'action_type_map',
  'action_ref_map',
  // Misc tracking we do NOT want surfacing as duplicate URLs
  'mc_cid',
  'mc_eid',
  '_ga',
  '_gl',
  'msclkid',              // Bing — comment if you want to keep for ads attrib
  'yclid',
  // Doubled-encoded artifacts
  'amp',
  'amp;',
]);

function sanitizeQuery(request: NextRequest): NextResponse | null {
  const { searchParams } = request.nextUrl;
  if (![...searchParams.keys()].some((k) => JUNK_QUERY_PARAMS.has(k))) {
    return null;
  }
  const url = request.nextUrl.clone();
  for (const k of [...searchParams.keys()]) {
    if (JUNK_QUERY_PARAMS.has(k)) url.searchParams.delete(k);
  }
  // Only redirect if anything actually changed (defense in depth)
  if (url.search !== request.nextUrl.search) {
    return NextResponse.redirect(url, 301);
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── 1. Strip junk / spam query params via 301 ───
  const sanitized = sanitizeQuery(request);
  if (sanitized) return sanitized;

  // ─── 2. Block disabled page routes → redirect to homepage ───
  if (DISABLED_PAGE_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ─── 3. Block disabled API routes → return 410 Gone ───
  if (DISABLED_API_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.json(
      { error: 'Gone', message: 'This endpoint has been disabled.' },
      { status: 410 }
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher MUST cover every path that may receive a junk query param plus the
  // disabled prefixes. We exclude static assets and Next internals so the
  // middleware doesn't run on every chunk request.
  matcher: [
    /*
     * Match all paths except:
     *  - /_next/static (build assets)
     *  - /_next/image  (image optimizer)
     *  - /favicon.ico, /robots.txt, /sitemap.xml (root assets)
     *  - /images, /videos, /fonts (cached static)
     *  - any path with a file extension (.js, .css, .png, etc.)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|images/|videos/|fonts/|.*\\..*).*)',
  ],
};
