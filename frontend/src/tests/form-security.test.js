import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateForm } from '../lib/validation';
import { addCSRFToken } from '../lib/csrf';
import { useRateLimit } from '../hooks/use-rate-limit';
import DOMPurify from 'dompurify';
import { renderHook, act } from '@testing-library/react';

// Мокаем local storage
const localStorageMock = {
  storage: {},
  getItem(key) {
    return this.storage[key] || null;
  },
  setItem(key, value) {
    this.storage[key] = value;
  },
  removeItem(key) {
    delete this.storage[key];
  },
  clear() {
    this.storage = {};
  }
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Form Security Tests', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear();
    // Очищаем куки
    document.cookie = '';
  });

  describe('CSRF Protection', () => {
    it('should add CSRF token to request headers', () => {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      };
      
      const configWithToken = addCSRFToken(config);
      expect(configWithToken.headers['X-CSRF-Token']).toBeDefined();
      expect(document.cookie).toContain('csrf_token=');
    });
  });

  describe('Rate Limiting', () => {
    it('should block after max attempts', () => {
      const now = Date.now();
      vi.spyOn(Date, 'now').mockReturnValue(now);

      const initialData = {
        count: 0,
        timestamp: now
      };
      localStorage.setItem('form_attempts', JSON.stringify(initialData));

      const { result } = renderHook(() => useRateLimit());
      
      // Симулируем максимальное количество попыток
      for (let i = 0; i <= 5; i++) {
        act(() => {
          result.current.trackAttempt();
        });
      }
      
      const limitCheck = result.current.checkRateLimit();
      expect(limitCheck.allowed).toBe(false);
      expect(limitCheck.message).toContain('Too many attempts');
    });
  });

  describe('Email Validation', () => {
    it('should validate business email addresses', async () => {
      // Создаем минимально валидные данные формы
      const baseFormData = {
        name: 'John Doe',
        company: 'Test Company',
        role: 'Manager',
        service: 'Consulting',
        timeline: 'ASAP',
        budget: '10k-50k',
        message: 'This is a test message that meets the minimum length requirement',
        website: ''
      };

      // Валидные email адреса
      const validEmails = [
        'john.doe@softdab.com',
        'info@microsoft.com',
        'contact@apple.com'
      ];

      // Невалидные email адреса
      const invalidEmails = [
        'test@gmail.com',
        'user@hotmail.com',
        'invalid.email',
        '@domain.com',
        'email@.com'
      ];

      for (const email of validEmails) {
        const result = await validateForm({ ...baseFormData, email });
        expect(result.success).toBe(true);
      }

      for (const email of invalidEmails) {
        const result = await validateForm({ ...baseFormData, email });
        expect(result.success).toBe(false);
      }
    });
  });

  describe('HTML Sanitization', () => {
    it('should remove dangerous HTML', () => {
      const dangerousInput = '<script>alert("xss")</script><p>Hello</p>';
      const sanitizedInput = DOMPurify.sanitize(dangerousInput);
      
      expect(sanitizedInput).not.toContain('<script>');
      expect(sanitizedInput).toContain('<p>Hello</p>');
    });
  });

  describe('Honeypot', () => {
    it('should detect bot submissions', async () => {
      const formData = {
        name: 'John Doe',
        email: 'john@company.com',
        website: 'some-value' // Заполненное поле honeypot
      };

      const result = await validateForm(formData);
      expect(result.success).toBe(false);
    });
  });
});