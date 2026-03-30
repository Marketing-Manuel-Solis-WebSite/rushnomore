// lib/rateLimit.ts — Rate limiting using Upstash Redis
//
// Required env vars (add to .env.local):
//   UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
//   UPSTASH_REDIS_REST_TOKEN=your-token
//
// If these vars are not set, rate limiting is disabled (permissive fallback).

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;

if (redisUrl && redisToken) {
  redis = new Redis({ url: redisUrl, token: redisToken });
} else {
  console.warn(
    '[Rate Limit] Upstash Redis not configured (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN). ' +
    'Rate limiting is disabled.'
  );
}

/**
 * Auth limiter: 5 attempts per IP per 15 minutes.
 * Protects login endpoints from brute force.
 */
export const authLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      prefix: 'rl:auth',
    })
  : null;

/**
 * Chat limiter: 20 messages per IP per minute.
 * Protects Gemini API quota.
 */
export const chatLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 m'),
      prefix: 'rl:chat',
    })
  : null;

/**
 * Contact form limiter: 5 submissions per IP per 15 minutes.
 * Prevents contact form spam.
 */
export const contactLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      prefix: 'rl:contact',
    })
  : null;

/**
 * Availability limiter: 20 checks per IP per minute.
 * Prevents scraping of availability data.
 */
export const availabilityLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 m'),
      prefix: 'rl:availability',
    })
  : null;

/**
 * Check rate limit for a given limiter and identifier.
 * Returns { allowed: true } if within limit or if limiter is not configured.
 * Returns { allowed: false, retryAfter } if rate exceeded.
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  if (!limiter) {
    // Rate limiting not configured — allow all requests
    return { allowed: true };
  }

  try {
    const result = await limiter.limit(identifier);
    if (!result.success) {
      const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);
      return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
    }
    return { allowed: true };
  } catch (error) {
    // If Redis is down, fail open (allow the request) but log
    console.error('[Rate Limit] Redis error, failing open:', error);
    return { allowed: true };
  }
}

/**
 * Extract IP address from request for rate limiting.
 */
export function getRequestIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  return '127.0.0.1';
}
