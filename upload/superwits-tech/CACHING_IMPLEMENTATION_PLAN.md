# Browser Caching & Service Worker Implementation Plan
**Superwits Tech** | **Version:** 6058af04 | **Date:** May 13, 2026

---

## Executive Summary

This plan outlines a comprehensive strategy to implement browser caching and a service worker for the Superwits Tech website. The implementation will improve repeat-visit performance by 50-70% and add offline support, directly increasing conversion rates by an estimated 5-10%.

**Expected Outcomes:**
- Repeat-visit load time: 3.8s → 1.2-1.5s (68% improvement)
- First-visit load time: 3.8s → 3.2s (15% improvement)
- Offline functionality: Full support for cached pages
- Conversion rate improvement: +5-10% from faster load times

---

## Architecture Overview

### Current State
```
Browser Request → Cloudflare CDN → Express Server → React App
                                    ↓
                            Cache-Control: no-cache
                            (No browser caching)
```

### Target State
```
Browser Request → Service Worker Cache (Hit)
                  ↓
                  Serve from cache (instant)
                  Update from network in background
                  
Browser Request → Service Worker Cache (Miss)
                  ↓
                  Fetch from network
                  Cache for future use
                  Serve to user
```

---

## Phase 1: Express Caching Headers Configuration

### Objective
Configure HTTP caching headers to allow browsers to cache assets while maintaining security and freshness.

### Implementation Details

#### 1.1 Static Asset Caching (Versioned Files)

**File Types:** JavaScript, CSS, images with hash in filename (e.g., `app.abc123.js`)

**Strategy:** Cache-Control headers for long-term caching
```typescript
// server/_core/index.ts - Add middleware for static assets

app.use((req, res, next) => {
  // Versioned assets (with hash) - cache for 1 year
  if (/\.(js|css|png|jpg|jpeg|gif|webp|woff|woff2)$/.test(req.path)) {
    if (req.path.includes('.')) { // Has file extension
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('ETag', 'W/"' + Date.now() + '"');
    }
  }
  next();
});
```

**Benefits:**
- Browsers cache assets for 1 year
- `immutable` flag prevents revalidation
- Hash in filename ensures cache busting on updates

#### 1.2 HTML Document Caching

**File Types:** HTML pages (index.html, unsubscribe page, etc.)

**Strategy:** Validation-based caching with ETag
```typescript
// HTML documents - validate with server
app.use((req, res, next) => {
  if (req.path === '/' || req.path.startsWith('/unsubscribe')) {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    res.setHeader('ETag', 'W/"' + Date.now() + '"');
  }
  next();
});
```

**Benefits:**
- Browser caches HTML for 1 hour
- If cached, browser validates with server (cheap 304 response)
- Ensures users get latest content without full re-download

#### 1.3 API Response Caching

**Endpoints:** `/api/trpc/*` (audit requests, dashboard data)

**Strategy:** Selective caching based on endpoint
```typescript
// server/routers.ts - Add caching metadata

export const appRouter = router({
  auditRequests: {
    getAll: publicProcedure
      .meta({ cache: { maxAge: 300 } }) // 5 minutes
      .query(async () => {
        // Implementation
      }),
    
    getById: publicProcedure
      .meta({ cache: { maxAge: 3600 } }) // 1 hour
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        // Implementation
      }),
  },
});
```

**Benefits:**
- Reduces server load for repeated queries
- Faster API response times
- Configurable per-endpoint

#### 1.4 Cache Headers Middleware

**Implementation:**
```typescript
// server/_core/cacheHeaders.ts

export function setCacheHeaders(req: Request, res: Response, next: NextFunction) {
  const path = req.path;

  // Versioned static assets (1 year)
  if (/\.[a-f0-9]{8}\.(js|css|woff2)$/.test(path)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('ETag', 'W/"' + Date.now() + '"');
  }
  // HTML documents (1 hour with validation)
  else if (path === '/' || path.startsWith('/unsubscribe')) {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    res.setHeader('ETag', 'W/"' + Date.now() + '"');
  }
  // API responses (5 minutes)
  else if (path.startsWith('/api/trpc')) {
    res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
  }
  // Default (no cache for security)
  else {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
}

// Apply middleware in server/_core/index.ts
app.use(setCacheHeaders);
```

### Testing Phase 1
```bash
# Test static asset caching
curl -I https://superwitstech.com/app.abc123.js

# Test HTML caching
curl -I https://superwitstech.com/

# Test API caching
curl -I https://superwitstech.com/api/trpc/auditRequests.getAll
```

---

## Phase 2: Service Worker Implementation

### Objective
Create a service worker that caches assets, enables offline support, and implements intelligent cache strategies.

### 2.1 Service Worker File Structure

**File:** `client/public/service-worker.js`

```javascript
const CACHE_VERSION = 'v1-2026-05-13';
const CACHE_NAMES = {
  static: `${CACHE_VERSION}-static`,
  dynamic: `${CACHE_VERSION}-dynamic`,
  api: `${CACHE_VERSION}-api`,
};

const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/app.js', // Will be versioned in production
  '/style.css', // Will be versioned in production
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAMES.static).then((cache) => {
      console.log('[Service Worker] Caching critical assets');
      return cache.addAll(CRITICAL_ASSETS).catch((err) => {
        console.warn('[Service Worker] Failed to cache some assets:', err);
      });
    })
  );
  
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
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

// Fetch event - implement caching strategies
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
  if (/\.(js|css|png|jpg|jpeg|gif|webp|woff|woff2)$/.test(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAMES.static));
    return;
  }

  // HTML documents - Network first, fallback to cache
  if (url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirstStrategy(request, CACHE_NAMES.dynamic));
    return;
  }

  // Default - Network first
  event.respondWith(networkFirstStrategy(request, CACHE_NAMES.dynamic));
});

// Cache-first strategy: Use cache, fallback to network
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

// Network-first strategy: Try network, fallback to cache
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

// Offline fallback response
function cacheOfflineResponse() {
  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Offline - Superwits Tech</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #07122A 0%, #0C1421 100%);
            color: #F1F5F9;
          }
          .container {
            text-align: center;
            padding: 40px;
            max-width: 500px;
          }
          h1 {
            font-size: 32px;
            margin-bottom: 16px;
            color: #D97706;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
            color: #B8C5D6;
            margin-bottom: 24px;
          }
          button {
            background: #D97706;
            color: white;
            border: none;
            padding: 12px 32px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s;
          }
          button:hover {
            background: #F59E0B;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>You're Offline</h1>
          <p>It looks like you've lost your internet connection. Some features may not be available.</p>
          <p>Previously visited pages are still available. Check back when you're online.</p>
          <button onclick="location.reload()">Try Again</button>
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

// Message handler for cache management
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
```

### 2.2 Service Worker Registration

**File:** `client/src/main.tsx`

```typescript
import { registerServiceWorker } from './lib/serviceWorkerManager';

// Register service worker after app mounts
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
}
```

### 2.3 Service Worker Manager

**File:** `client/src/lib/serviceWorkerManager.ts`

```typescript
export async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });

    console.log('[SW Manager] Service Worker registered:', registration);

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60000); // Check every minute

    // Listen for controller change (new SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW Manager] New service worker activated');
      notifyUserOfUpdate();
    });

    // Handle SW messages
    registration.active?.postMessage({ type: 'INIT' });

    return registration;
  } catch (error) {
    console.error('[SW Manager] Failed to register service worker:', error);
  }
}

function notifyUserOfUpdate() {
  // Show toast notification to user
  const event = new CustomEvent('sw-updated', {
    detail: { message: 'New version available. Refresh to update.' },
  });
  window.dispatchEvent(event);
}

export function clearServiceWorkerCache() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
  }
}

export async function unregisterServiceWorker() {
  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const registration of registrations) {
    await registration.unregister();
  }
}
```

---

## Phase 3: Cache Versioning & Invalidation

### 3.1 Automatic Cache Versioning

**Strategy:** Use build timestamp in cache version

**File:** `server/_core/cacheVersion.ts`

```typescript
export const CACHE_VERSION = `v${Date.now()}`;

export function getCacheHeaders(filePath: string) {
  // Versioned assets get long-term cache
  if (/\.[a-f0-9]{8}\.(js|css|woff2)$/.test(filePath)) {
    return {
      'Cache-Control': 'public, max-age=31536000, immutable',
    };
  }

  // HTML gets short-term cache with validation
  if (filePath.endsWith('.html') || filePath === '/') {
    return {
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    };
  }

  return {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  };
}
```

### 3.2 Cache Invalidation on Deployment

**File:** `client/public/service-worker.js` (update CACHE_VERSION)

```javascript
// Automatic cache busting on new deployment
const CACHE_VERSION = 'v1-2026-05-13'; // Update on each deployment
```

**Deployment Checklist:**
1. Update `CACHE_VERSION` in service worker
2. Rebuild assets (Vite generates new hashes)
3. Deploy new version
4. Old service worker automatically unregisters
5. New service worker caches new assets

---

## Phase 4: Service Worker Registration & Lifecycle

### 4.1 Update Notification Component

**File:** `client/src/components/ServiceWorkerUpdateNotification.tsx`

```typescript
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function ServiceWorkerUpdateNotification() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setShowUpdate(true);
    };

    window.addEventListener('sw-updated', handleUpdate);
    return () => window.removeEventListener('sw-updated', handleUpdate);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-amber-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
      <p className="font-semibold mb-2">New version available!</p>
      <p className="text-sm mb-4">Refresh to get the latest updates.</p>
      <Button
        onClick={handleRefresh}
        className="bg-white text-amber-600 hover:bg-gray-100"
        size="sm"
      >
        Refresh Now
      </Button>
    </div>
  );
}
```

### 4.2 Add to App Layout

**File:** `client/src/App.tsx`

```typescript
import { ServiceWorkerUpdateNotification } from '@/components/ServiceWorkerUpdateNotification';

export default function App() {
  return (
    <>
      <ServiceWorkerUpdateNotification />
      {/* Rest of app */}
    </>
  );
}
```

---

## Phase 5: Performance Testing Strategy

### 5.1 First-Visit Performance (No Cache)

**Test Procedure:**
```bash
# Clear browser cache
# Open DevTools → Application → Clear storage
# Measure load time with DevTools Network tab
# Expected: ~3.2s (15% improvement from current 3.8s)
```

### 5.2 Repeat-Visit Performance (With Cache)

**Test Procedure:**
```bash
# After first visit, refresh page
# Measure load time with DevTools Network tab
# Expected: ~1.2-1.5s (68% improvement from current 3.8s)
```

### 5.3 Mobile Testing

**Test Procedure:**
```bash
# Use Chrome DevTools device emulation
# Test on actual mobile devices (iOS Safari, Android Chrome)
# Measure with Lighthouse
# Expected: Similar improvements as desktop
```

### 5.4 Offline Testing

**Test Procedure:**
```bash
# Open DevTools → Network → Offline
# Navigate to previously visited pages
# Verify offline page displays for new routes
# Verify cached API data still available
```

### 5.5 Cache Invalidation Testing

**Test Procedure:**
```bash
# Deploy new version
# Verify old cache is cleared
# Verify new assets are cached
# Verify no stale content served
```

---

## Phase 6: Cache Analytics & Monitoring

### 6.1 Cache Performance Metrics

**File:** `client/src/lib/cacheAnalytics.ts`

```typescript
export interface CacheMetrics {
  cacheHits: number;
  cacheMisses: number;
  networkRequests: number;
  offlineRequests: number;
  avgLoadTime: number;
}

class CacheAnalytics {
  private metrics: CacheMetrics = {
    cacheHits: 0,
    cacheMisses: 0,
    networkRequests: 0,
    offlineRequests: 0,
    avgLoadTime: 0,
  };

  recordCacheHit() {
    this.metrics.cacheHits++;
  }

  recordCacheMiss() {
    this.metrics.cacheMisses++;
  }

  recordNetworkRequest() {
    this.metrics.networkRequests++;
  }

  recordOfflineRequest() {
    this.metrics.offlineRequests++;
  }

  recordLoadTime(time: number) {
    // Calculate rolling average
    const total = this.metrics.avgLoadTime * (this.metrics.networkRequests - 1) + time;
    this.metrics.avgLoadTime = total / this.metrics.networkRequests;
  }

  getMetrics() {
    return { ...this.metrics };
  }

  getCacheHitRate() {
    const total = this.metrics.cacheHits + this.metrics.cacheMisses;
    return total > 0 ? (this.metrics.cacheHits / total) * 100 : 0;
  }
}

export const cacheAnalytics = new CacheAnalytics();
```

### 6.2 Performance Dashboard

**File:** `client/src/pages/PerformanceDashboard.tsx`

```typescript
import { useEffect, useState } from 'react';
import { cacheAnalytics } from '@/lib/cacheAnalytics';
import { Card } from '@/components/ui/card';

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState(cacheAnalytics.getMetrics());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(cacheAnalytics.getMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Cache Hit Rate</p>
        <p className="text-3xl font-bold">{cacheAnalytics.getCacheHitRate().toFixed(1)}%</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Avg Load Time</p>
        <p className="text-3xl font-bold">{metrics.avgLoadTime.toFixed(2)}s</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Cache Hits</p>
        <p className="text-3xl font-bold">{metrics.cacheHits}</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Offline Requests</p>
        <p className="text-3xl font-bold">{metrics.offlineRequests}</p>
      </Card>
    </div>
  );
}
```

---

## Phase 7: Documentation & Deployment

### 7.1 Caching Strategy Summary

| Asset Type | Strategy | Max Age | Revalidation |
|-----------|----------|---------|--------------|
| JS/CSS (versioned) | Cache-first | 1 year | None (immutable) |
| Images (versioned) | Cache-first | 1 year | None (immutable) |
| HTML documents | Network-first | 1 hour | ETag validation |
| API responses | Network-first | 5 min | Must-revalidate |
| Other assets | No-cache | - | Always validate |

### 7.2 Deployment Checklist

**Before Deployment:**
- [ ] Update `CACHE_VERSION` in service worker
- [ ] Run full test suite
- [ ] Test on desktop and mobile
- [ ] Verify cache headers with curl
- [ ] Test offline functionality

**During Deployment:**
- [ ] Deploy new service worker
- [ ] Deploy new assets with updated hashes
- [ ] Monitor error logs for SW issues
- [ ] Verify cache headers on CDN

**After Deployment:**
- [ ] Monitor cache hit rates
- [ ] Check for stale content reports
- [ ] Verify offline functionality
- [ ] Monitor performance metrics

### 7.3 Troubleshooting Guide

**Issue: Users seeing stale content**
- Solution: Verify cache headers are correct
- Solution: Check that HTML has `must-revalidate`
- Solution: Clear CDN cache if needed

**Issue: Service worker not updating**
- Solution: Verify `CACHE_VERSION` was updated
- Solution: Check browser DevTools → Application → Service Workers
- Solution: Clear all caches manually

**Issue: Offline page not displaying**
- Solution: Verify service worker is active
- Solution: Check browser DevTools → Application → Cache Storage
- Solution: Verify offline response is being sent

**Issue: Performance not improving**
- Solution: Verify cache headers are being set
- Solution: Check that assets have version hashes
- Solution: Monitor cache hit rate in analytics

---

## Phase 8: Implementation Timeline

| Phase | Task | Estimated Time | Priority |
|-------|------|-----------------|----------|
| 1 | Configure cache headers | 2 hours | High |
| 2 | Create service worker | 4 hours | High |
| 3 | Cache versioning | 1 hour | High |
| 4 | SW registration & UI | 2 hours | Medium |
| 5 | Performance testing | 3 hours | High |
| 6 | Analytics setup | 2 hours | Medium |
| 7 | Documentation | 2 hours | Low |
| **Total** | | **16 hours** | |

---

## Expected Performance Impact

### Before Implementation
- First visit: 3.8s
- Repeat visit: 3.8s
- Offline: Not supported
- Cache hit rate: 0%

### After Implementation
- First visit: 3.2s (-16%)
- Repeat visit: 1.2-1.5s (-68%)
- Offline: Full support
- Cache hit rate: 85-95%

### Conversion Impact
- Estimated conversion rate improvement: +5-10%
- Estimated revenue impact: +5-10% (assuming conversion-to-revenue correlation)

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Stale content served | Implement proper cache headers with validation |
| Service worker bugs | Comprehensive testing and error handling |
| Cache bloat | Automatic cache cleanup on SW activation |
| Browser compatibility | Graceful degradation for older browsers |
| Deployment issues | Automated cache versioning and rollback |

---

## Next Steps

1. **Week 1:** Implement Phase 1-3 (cache headers, service worker, versioning)
2. **Week 2:** Implement Phase 4-5 (registration, testing)
3. **Week 3:** Implement Phase 6-7 (analytics, documentation)
4. **Week 4:** Deploy to production and monitor

---

## Appendix: Code Files to Create/Modify

### New Files
- `client/public/service-worker.js` - Service worker implementation
- `client/src/lib/serviceWorkerManager.ts` - SW registration and management
- `client/src/lib/cacheAnalytics.ts` - Cache performance tracking
- `client/src/components/ServiceWorkerUpdateNotification.tsx` - Update UI
- `server/_core/cacheHeaders.ts` - Cache header middleware
- `server/_core/cacheVersion.ts` - Cache versioning utilities

### Modified Files
- `server/_core/index.ts` - Add cache headers middleware
- `client/src/main.tsx` - Register service worker
- `client/src/App.tsx` - Add update notification component
- `vite.config.ts` - Configure asset hashing (if needed)

---

## Conclusion

This implementation plan provides a comprehensive strategy to improve Superwits Tech's performance through browser caching and service worker technology. By following this plan, the website will achieve 50-70% faster repeat-visit load times and provide offline support, directly contributing to improved conversion rates and user satisfaction.
