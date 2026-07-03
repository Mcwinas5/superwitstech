/**
 * Service Worker for Superwits Tech
 * Caches critical assets for instant repeat-visit loading
 * Strategy: Cache-First for static assets, Network-First for API calls
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `superwits-tech-${CACHE_VERSION}`;

// Critical assets to cache on install
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/manus-storage/marquis-hero-v2_bbf6b9b5.webp',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap',
];

// Asset patterns to cache dynamically
const CACHE_PATTERNS = {
  images: /\.(webp|jpg|jpeg|png|gif|svg)$/i,
  fonts: /\.(woff|woff2|ttf|eot)$/i,
  styles: /\.css$/i,
  scripts: /\.js$/i,
};

// Install event: cache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching critical assets');
      return cache.addAll(CRITICAL_ASSETS).catch((err) => {
        console.warn('[SW] Failed to cache some critical assets:', err);
        // Don't fail install if some assets are unavailable
      });
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and external domains
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // API calls: Network-First strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clonedResponse);
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

  // Static assets: Cache-First strategy
  if (
    CACHE_PATTERNS.images.test(url.pathname) ||
    CACHE_PATTERNS.fonts.test(url.pathname) ||
    CACHE_PATTERNS.styles.test(url.pathname) ||
    CACHE_PATTERNS.scripts.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }

        // Fetch from network and cache
        return fetch(request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clonedResponse);
            });

            return response;
          })
          .catch(() => {
            // Return a fallback response if both cache and network fail
            console.warn('[SW] Failed to fetch:', request.url);
            return new Response('Offline - asset not available', {
              status: 503,
              statusText: 'Service Unavailable',
            });
          });
      })
    );
    return;
  }

  // HTML pages: Network-First strategy
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // Default: Network-First
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
