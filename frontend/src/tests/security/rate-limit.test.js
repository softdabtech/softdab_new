import { describe, it, expect, vi } from 'vitest';
import { checkRateLimit, resetRateLimit } from '../../lib/rate-limit';

describe('Rate Limiting', () => {
  beforeEach(() => {
    resetRateLimit('test-endpoint');
  });

  it('should allow requests within limit', () => {
    const isLimited = checkRateLimit('test-endpoint');
    expect(isLimited).toBe(false);
  });

  it('should block requests when limit exceeded', () => {
    // Make multiple requests
    for (let i = 0; i < 100; i++) {
      checkRateLimit('test-endpoint');
    }
    
    const isLimited = checkRateLimit('test-endpoint');
    expect(isLimited).toBe(true);
  });

  it('should reset limit after window period', () => {
    const now = Date.now();
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    
    // Make multiple requests
    for (let i = 0; i < 100; i++) {
      checkRateLimit('test-endpoint');
    }
    
    // Move time forward
    vi.spyOn(Date, 'now').mockImplementation(() => now + 61000); // 1 minute + 1 second
    
    const isLimited = checkRateLimit('test-endpoint');
    expect(isLimited).toBe(false);
    
    vi.restoreAllMocks();
  });
});