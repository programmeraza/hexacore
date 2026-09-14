/**
 * Best-effort in-memory rate limiter (fixed window per key). Serverless
 * instances are ephemeral and can run behind multiple regions, so this does
 * not guarantee a hard global limit — it just makes casual/scripted abuse of
 * a single route meaningfully harder without pulling in an external store.
 * Swap for Vercel KV/Upstash if this endpoint ever needs a real guarantee.
 */

const hits = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Opportunistic cleanup so a long-lived process doesn't accumulate stale
  // entries forever (cheap: only runs once the map has grown noticeably).
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (now - v.windowStart >= windowMs) hits.delete(k);
    }
  }

  const entry = hits.get(key);

  if (!entry || now - entry.windowStart >= windowMs) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > limit;
}
