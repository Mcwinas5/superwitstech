/**
 * Service Worker for Superwits Tech
 * Implements intelligent caching strategies for optimal performance
 * 
 * Strategies:
 * - Cache-first: Static assets (JS, CSS, images)
 * - Network-first: API calls and HTML documents
 * - Offline fallback: Custom offline page
 */

const CACHE_VERSION = 'v1-2026-05-13';
const CACHE_NAMES = {
  static: `${CACHE_VERSION}-static`,
  dynamic: `${CACHE_VERSION}-dynamic`,
  api: `${CACHE_VERSION}-api`,
};

const CRITICAL_ASSETS = [
  '/',
  '/index.html',
];

/**
 * Install event - cache critical assets on first load
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAMES.static).then((cache) => {
      console.log('[Service Worker] Caching critical assets');
      return cache.addAll(CRITICAL_ASSETS).catch((err) => {
        console.warn('[Service Worker] Failed to cache some assets:', err);
        // Don't fail installation if some assets can't be cached
      });
    })
  );
  
  self.skipWaiting(); // Activate immediately
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!Object.values(CACHE_NAMES).includes(cacheName)) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim(); // Control all clients immediately
});

/**
 * Fetch event - implement intelligent caching strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // API requests - Network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request, CACHE_NAMES.api));
    return;
  }

  // Static assets - Cache first, fallback to network
  if (/\.(js|css|png|jpg|jpeg|gif|webp|woff|woff2|svg)$/.test(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAMES.static));
    return;
  }

  // HTML documents - Network first, fallback to cache
  if (url.pathname === '/' || url.pathname.endsWith('.html') || url.pathname.startsWith('/unsubscribe')) {
    event.respondWith(networkFirstStrategy(request, CACHE_NAMES.dynamic));
    return;
  }

  // Default - Network first
  event.respondWith(networkFirstStrategy(request, CACHE_NAMES.dynamic));
});

/**
 * Cache-first strategy: Use cache, fallback to network
 * Best for: Static assets that don't change often
 */
async function cacheFirstStrategy(request, cacheName) {
  const cached = await caches.match(request);
  
  if (cached) {
    console.log('[Service Worker] Cache hit:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    return cacheOfflineResponse();
  }
}

/**
 * Network-first strategy: Try network, fallback to cache
 * Best for: Dynamic content that needs to be fresh
 */
async function networkFirstStrategy(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[Service Worker] Network request failed:', error);
    
    const cached = await caches.match(request);
    if (cached) {
      console.log('[Service Worker] Using cached response:', request.url);
      return cached;
    }
    
    return cacheOfflineResponse();
  }
}

/**
 * Offline fallback response - shown when user is offline
 */
function cacheOfflineResponse() {
  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - Superwits Tech</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #07122A 0%, #0C1421 100%);
            color: #F1F5F9;
            padding: 20px;
          }
          
          .container {
            text-align: center;
            padding: 40px;
            max-width: 500px;
            background: rgba(15, 31, 61, 0.5);
            border: 1px solid #1A3260;
            border-radius: 12px;
            backdrop-filter: blur(10px);
          }
          
          h1 {
            font-size: 32px;
            margin-bottom: 16px;
            color: #D97706;
            font-weight: 800;
          }
          
          .icon {
            font-size: 64px;
            margin-bottom: 24px;
          }
          
          p {
            font-size: 16px;
            line-height: 1.6;
            color: #B8C5D6;
            margin-bottom: 24px;
          }
          
          .highlight {
            color: #D97706;
            font-weight: 600;
          }
          
          button {
            background: #D97706;
            color: white;
            border: none;
            padding: 14px 32px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          button:hover {
            background: #F59E0B;
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(217, 119, 6, 0.3);
          }
          
          button:active {
            transform: translateY(0);
          }
          
          .cached-info {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #1A3260;
            font-size: 14px;
            color: #9CA3AF;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">📡</div>
          <h1>You're Offline</h1>
          <p>It looks like you've lost your internet connection.</p>
          <p>Previously visited pages are still available. <span class="highlight">Check back when you're online.</span></p>
          <button onclick="location.reload()">Try Again</button>
          <div class="cached-info">
            <p>💾 Your cached pages are still accessible offline</p>
          </div>
        </div>
      </body>
    </html>`,
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/html; charset=utf-8',
      }),
    }
  );
}

/**
 * Message handler for cache management from client
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    });
  }
});

console.log('[Service Worker] Loaded');
