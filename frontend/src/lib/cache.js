/**
 * Simple caching utility
 */

const CACHE_PREFIX = 'softdab_';
const DEFAULT_TTL = 60 * 60 * 1000; // 1 час

class Cache {
  static set(key, value, ttl = DEFAULT_TTL) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  }

  static get(key) {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;

    const { value, timestamp, ttl } = JSON.parse(item);
    if (Date.now() - timestamp > ttl) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return value;
  }

  static remove(key) {
    localStorage.removeItem(CACHE_PREFIX + key);
  }

  static clear() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  }
}

// Хук для кэширования данных
export const useCachedData = (key, fetchFn, ttl = DEFAULT_TTL) => {
  const cachedData = Cache.get(key);
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  return fetchFn().then(data => {
    Cache.set(key, data, ttl);
    return data;
  });
};

export default Cache;