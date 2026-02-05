const CACHE_NAME = 'amp-penjualan-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest-api.js'
];

// Install Event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((err) => console.log('Service Worker: Error during cache', err))
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network First Strategy dengan special handling untuk manifest
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Special strategy untuk manifest.json - Always network first untuk latest config
  if (path === '/manifest.json' || path.endsWith('manifest.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          // Fallback ke cache jika offline
          return caches.match(event.request);
        })
    );
    return;
  }

  // Default strategy untuk aset lainnya - Network First
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone response untuk cache
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      })
      .catch(() => {
        // Fallback ke cache jika offline
        return caches.match(event.request);
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Handle manifest update request
  if (event.data && event.data.type === 'UPDATE_MANIFEST') {
    console.log('Service Worker: Manifest update requested');
    caches.open(CACHE_NAME).then((cache) => {
      cache.delete('/manifest.json');
      cache.delete(new Request('/manifest.json'));
    });
  }
});
