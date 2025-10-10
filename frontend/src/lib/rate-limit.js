/**
 * Rate limiting utility for frontend
 */

// Хранилище для лимитов
const limits = new Map();

// Очистка старых записей каждый час
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of limits.entries()) {
    if (now - value.timestamp > 60 * 60 * 1000) {
      limits.delete(key);
    }
  }
}, 60 * 60 * 1000);

/**
 * Проверка rate limit для endpoint'а
 */
export const checkRateLimit = (endpoint, maxAttempts = 100, windowMs = 60000) => {
  const getCurrentTime = () => {
    return Date.now();
  };

  const now = getCurrentTime();
  const limit = limits.get(endpoint) || { count: 0, timestamp: now };

  // Сброс счетчика если окно истекло
  if (now - limit.timestamp > windowMs) {
    limit.count = 0;
    limit.timestamp = now;
  }

  // Проверка лимита
  if (limit.count >= maxAttempts) {
    return true; // Лимит превышен
  }

  // Увеличение счетчика
  limit.count++;
  limits.set(endpoint, limit);

  return false; // Лимит не превышен
};

/**
 * Сброс rate limit для endpoint'а (для тестов)
 */
export const resetRateLimit = (endpoint) => {
  limits.delete(endpoint);
};