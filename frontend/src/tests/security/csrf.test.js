import { describe, it, expect, vi } from 'vitest';
import { getCsrfToken, validateCsrfToken } from '../../lib/csrf';

vi.mock('uuid', () => ({
  v4: () => '12345678-1234-5678-1234-567812345678'
}));

describe('CSRF Protection', () => {
  it('should generate CSRF token', () => {
    const token = getCsrfToken();
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should validate CSRF token', () => {
    const token = getCsrfToken();
    const isValid = validateCsrfToken(token);
    expect(isValid).toBe(true);
  });

  it('should reject invalid CSRF token', () => {
    const invalidToken = 'invalid-token';
    const isValid = validateCsrfToken(invalidToken);
    expect(isValid).toBe(false);
  });
});