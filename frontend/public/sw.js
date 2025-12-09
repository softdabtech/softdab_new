// Minimal Service Worker - no caching
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  // Delete all caches
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.map(name => caches.delete(name)));
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Network first strategy - always fetch from network
  if (event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
  }
});
