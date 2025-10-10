import { renderHook, act } from '@testing-library/react';
import { useRateLimit } from '../../hooks/use-rate-limit';

// Мок для localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useRateLimit Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should block after max attempts', () => {
    const { result } = renderHook(() => useRateLimit());

    // Make multiple attempts
    for (let i = 0; i < 10; i++) {
      act(() => {
        result.current.trackAttempt();
      });
    }

    expect(result.current.isLimited).toBe(true);
  });

  it('should reset after window period', () => {
    const { result } = renderHook(() => useRateLimit());
    
    // Make attempts
    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.trackAttempt();
      }
    });

    // Fast-forward time
    const now = Date.now();
    vi.spyOn(Date, 'now').mockImplementation(() => now + 60000);
    
    // Вызываем принудительный перерендер
    act(() => {
      result.current.trackAttempt();
    });

    expect(result.current.isLimited).toBe(false);
  });
});