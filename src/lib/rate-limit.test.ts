import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isRateLimited } from './rate-limit';

describe('isRateLimited', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests under the limit', () => {
    const key = 'ip-under-limit';
    expect(isRateLimited(key, 3, 1000)).toBe(false);
    expect(isRateLimited(key, 3, 1000)).toBe(false);
    expect(isRateLimited(key, 3, 1000)).toBe(false);
  });

  it('blocks once a key exceeds the limit within the window', () => {
    const key = 'ip-over-limit';
    expect(isRateLimited(key, 2, 1000)).toBe(false);
    expect(isRateLimited(key, 2, 1000)).toBe(false);
    expect(isRateLimited(key, 2, 1000)).toBe(true);
    expect(isRateLimited(key, 2, 1000)).toBe(true);
  });

  it('resets the count once the window elapses', () => {
    const key = 'ip-window-reset';
    expect(isRateLimited(key, 1, 1000)).toBe(false);
    expect(isRateLimited(key, 1, 1000)).toBe(true);

    vi.setSystemTime(1001);

    expect(isRateLimited(key, 1, 1000)).toBe(false);
  });

  it('tracks separate keys independently', () => {
    expect(isRateLimited('ip-a', 1, 1000)).toBe(false);
    expect(isRateLimited('ip-b', 1, 1000)).toBe(false);
    expect(isRateLimited('ip-a', 1, 1000)).toBe(true);
    expect(isRateLimited('ip-b', 1, 1000)).toBe(true);
  });
});
