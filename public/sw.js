const STATIC_CACHE = 'barakah-static-v4';
const DYNAMIC_CACHE = 'barakah-dynamic-v4';
const LEGACY_CACHES = ['static-v1', 'static-v2', 'dynamic-v1'];

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/placeholder.svg',
  '/favicon.ico',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(() => undefined)
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              LEGACY_CACHES.includes(cacheName) ||
              (cacheName.startsWith('barakah-') &&
                cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE)
            );
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

const shouldBypassCache = (request) => {
  const url = new URL(request.url);

  return (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/node_modules/') ||
    url.pathname.startsWith('/@vite') ||
    url.pathname === '/@react-refresh' ||
    request.destination === 'script'
  );
};

const shouldStoreResponse = (request, response) => {
  return (
    response &&
    response.status === 200 &&
    response.type === 'basic' &&
    ['document', 'image', 'font', 'style'].includes(request.destination)
  );
};

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (shouldBypassCache(request)) {
    return;
  }

  // Handle API requests
  if (request.url.includes('sheetdb.io')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before using it
          const responseClone = response.clone();
          
          // Cache successful API responses
          if (response.status === 200) {
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          
          return response;
        })
        .catch(() => {
          // Return cached response if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // Handle same-origin assets with network-first caching to avoid stale app code
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (shouldStoreResponse(request, response)) {
          const responseClone = response.clone();

          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        return caches.match(request).then((response) => {
          return response || caches.match('/index.html');
        });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('sheetdb.io')) {
        try {
          await fetch(request);
          await cache.delete(request);
        } catch (error) {
          console.log('Background sync failed for:', request.url);
        }
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
} 