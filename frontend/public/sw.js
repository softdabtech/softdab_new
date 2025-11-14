// sw.js - Critical Service Worker для LCP < 2.5s
const CACHE_VERSION = 'critical-lcp-v5';
const CRITICAL_CACHE = `${CACHE_VERSION}-critical`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Критические ресурсы для мгновенной загрузки LCP
const CRITICAL_RESOURCES = [
  // Critical CSS (будет инлайн, но как backup)
  '/assets/index.css',
  
  // Critical JS chunks
  '/assets/vendor.js',
  '/assets/index.js', 
  
  // Critical шрифты для FCP
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
  
  // Critical hero изображения
  '/images/hero-bg.webp',
  '/images/hero-mobile.webp',
  
  // Main HTML
  '/',
  '/index.html'
];

// Критическая стратегия кэширования
const CACHE_STRATEGIES = {
  // Critical CSS/JS - Cache First для мгновенной загрузки
  critical: 'cache-first',
  
  // Images - Cache First с Network Fallback
  images: 'cache-first',
  
  // Fonts - Cache First (почти статичные)
  fonts: 'cache-first',
  
  // API - Network First с Cache Fallback
  api: 'network-first',
  
  // HTML - Network First для свежести контента
  html: 'network-first'
};

// Installation - предзагрузка критических ресурсов
self.addEventListener('install', (event) => {
  console.log('🚀 SW: Установка критического кэша для LCP...');
  
  event.waitUntil(
    caches.open(CRITICAL_CACHE)
      .then((cache) => {
        console.log('🎯 SW: Кэширование критических ресурсов для LCP < 2.5s');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('✅ SW: Критические ресурсы закэшированы');
        self.skipWaiting(); // Активировать немедленно
      })
      .catch((error) => {
        console.error('❌ SW: Ошибка кэширования:', error);
      })
  );
});

// Activation - очистка старых кэшей
self.addEventListener('activate', (event) => {
  console.log('⚡ SW: Активация критического кэша');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.includes(CACHE_VERSION)) {
              console.log('🧹 SW: Удаление старого кэша:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ SW: Критический кэш активен');
        return self.clients.claim(); // Взять контроль немедленно
      })
  );
});

// Critical Fetch Handler для LCP оптимизации
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Пропускаем non-GET запросы
  if (request.method !== 'GET') {
    return;
  }
  
  // Критическая стратегия для разных типов ресурсов
  if (isCriticalResource(request)) {
    event.respondWith(handleCriticalResource(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isFontRequest(request)) {
    event.respondWith(handleFontRequest(request));
  } else if (isApiRequest(request)) {
    event.respondWith(handleApiRequest(request));
  } else if (isHtmlRequest(request)) {
    event.respondWith(handleHtmlRequest(request));
  }
});

// Критический обработчик для LCP ресурсов
async function handleCriticalResource(request) {
  try {
    // Cache First - мгновенная загрузка для LCP
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('🎯 SW: Критический ресурс из кэша (LCP):', request.url);
      return cachedResponse;
    }
    
    // Network fallback с кэшированием
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CRITICAL_CACHE);
      cache.put(request, networkResponse.clone());
      console.log('💾 SW: Критический ресурс закэширован:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ SW: Ошибка загрузки критического ресурса:', error);
    throw error;
  }
}

// Обработчик изображений для LCP
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ SW: Изображение недоступно:', request.url);
    // Можно вернуть placeholder изображение
    throw error;
  }
}

// Обработчик шрифтов
async function handleFontRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CRITICAL_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ SW: Шрифт недоступен:', request.url);
    throw error;
  }
}

// API обработчик
async function handleApiRequest(request) {
  try {
    // Network First для актуальных данных
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Cache fallback
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('💾 SW: API из кэша:', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// HTML обработчик
async function handleHtmlRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Utility functions
function isCriticalResource(request) {
  const url = request.url;
  return CRITICAL_RESOURCES.some(resource => 
    url.includes(resource) || url.endsWith(resource)
  );
}

function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(request.url);
}

function isFontRequest(request) {
  return request.destination === 'font' ||
         /\.(woff|woff2|ttf|otf|eot)$/i.test(request.url) ||
         request.url.includes('fonts.gstatic.com');
}

function isApiRequest(request) {
  return request.url.includes('/api/') || 
         request.url.includes('api.softdab.tech');
}

function isHtmlRequest(request) {
  return request.destination === 'document' ||
         request.headers.get('accept')?.includes('text/html');
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    caches.open(CRITICAL_CACHE).then(cache => {
      cache.keys().then(keys => {
        event.ports[0].postMessage({
          type: 'CACHE_STATUS',
          criticalResourcesCached: keys.length,
          cacheVersion: CACHE_VERSION
        });
      });
    });
  }
});