import { useState, useEffect } from 'react';

const RATE_LIMIT = {
  MAX_ATTEMPTS: 5,
  TIME_WINDOW: 60 * 1000, // 1 минута
  BLOCK_DURATION: 30 * 60 * 1000, // 30 минут
};

export const useRateLimit = () => {
  const [attempts, setAttempts] = useState(() => {
    const stored = localStorage.getItem('form_attempts');
    return stored ? JSON.parse(stored) : { count: 0, timestamp: Date.now() };
  });

  const [isBlocked, setIsBlocked] = useState(() => {
    const blockUntil = localStorage.getItem('form_blocked_until');
    return blockUntil ? Date.now() < parseInt(blockUntil) : false;
  });

  // Проверяем время при каждом рендере
  useEffect(() => {
    const now = Date.now();
    if (attempts.timestamp && (now - attempts.timestamp > RATE_LIMIT.TIME_WINDOW)) {
      setAttempts({
        count: 0,
        timestamp: now
      });
    }
  }, [attempts]);

  const trackAttempt = () => {
    setAttempts(prev => {
      const now = Date.now();
      if (now - prev.timestamp > RATE_LIMIT.TIME_WINDOW) {
        return {
          count: 1,
          timestamp: now
        };
      }
      return {
        count: prev.count + 1,
        timestamp: prev.timestamp
      };
    });
  };

  useEffect(() => {
    localStorage.setItem('form_attempts', JSON.stringify(attempts));
  }, [attempts]);

  const checkRateLimit = () => {
    const now = Date.now();

    // Проверяем, не заблокирован ли пользователь
    const blockUntil = localStorage.getItem('form_blocked_until');
    if (blockUntil && now < parseInt(blockUntil)) {
      const remainingTime = Math.ceil((parseInt(blockUntil) - now) / 1000 / 60);
      return {
        allowed: false,
        message: `Too many attempts. Please try again in ${remainingTime} minutes.`
      };
    }

    // Сброс счетчика если прошло больше TIME_WINDOW
    if (now - attempts.timestamp > RATE_LIMIT.TIME_WINDOW) {
      setAttempts({ count: 0, timestamp: now });
      return { allowed: true };
    }

    // Проверка количества попыток
    if (attempts.count >= RATE_LIMIT.MAX_ATTEMPTS) {
      const blockUntil = now + RATE_LIMIT.BLOCK_DURATION;
      localStorage.setItem('form_blocked_until', blockUntil.toString());
      setIsBlocked(true);
      return {
        allowed: false,
        message: `Too many attempts. Please try again in 30 minutes.`
      };
    }

    return { allowed: true };
  };

  const incrementAttempts = () => {
    const now = Date.now();
    setAttempts(prev => ({
      count: prev.count + 1,
      timestamp: now,
    }));
  };

  return {
    isBlocked,
    checkRateLimit,
    trackAttempt,
    isLimited: attempts.count >= RATE_LIMIT.MAX_ATTEMPTS
  };
};