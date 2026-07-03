/**
 * Cache Analytics Tracking Utility
 * Collects performance metrics and cache statistics from the browser
 */

export interface PerformanceMetricData {
  metricType: 'TTFB' | 'FCP' | 'LCP' | 'CLS' | 'FID' | 'INP';
  value: number;
  visitType: 'first' | 'repeat';
  serviceWorkerActive: number;
  userAgent: string;
  pathname: string;
  country?: string;
  connectionType?: string;
}

export interface CacheAnalyticsData {
  cacheName: 'static' | 'dynamic' | 'api';
  hitCount: number;
  missCount: number;
  totalSize: number;
  itemCount: number;
  hitRate: number;
  userAgent: string;
}

export interface ServiceWorkerEventData {
  eventType: 'install' | 'activate' | 'update' | 'error' | 'fetch';
  status: 'success' | 'pending' | 'failed';
  errorMessage?: string;
  userAgent: string;
  swVersion?: string;
  cachedItemCount?: number;
  cacheSize?: number;
}

/**
 * Determine if this is a first visit or repeat visit
 */
function getVisitType(): 'first' | 'repeat' {
  const hasVisited = sessionStorage.getItem('_sw_analytics_visited');
  if (!hasVisited) {
    sessionStorage.setItem('_sw_analytics_visited', 'true');
    return 'first';
  }
  return 'repeat';
}

/**
 * Check if service worker is active
 */
export async function isServiceWorkerActive(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false;
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    return registrations.length > 0 && registrations[0].active !== undefined;
  } catch {
    return false;
  }
}

/**
 * Get connection type if available
 */
function getConnectionType(): string | undefined {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  return connection?.effectiveType;
}

/**
 * Get country from geolocation API (if available)
 */
async function getCountry(): Promise<string | undefined> {
  try {
    const response = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(2000) });
    if (response.ok) {
      const data = await response.json();
      return data.country_code;
    }
  } catch {
    // Silently fail - geolocation is optional
  }
  return undefined;
}

/**
 * Collect Web Vitals metrics
 */
export function collectWebVitals(callback: (metric: PerformanceMetricData) => void) {
  const visitType = getVisitType();
  const userAgent = navigator.userAgent;
  const pathname = window.location.pathname;

  isServiceWorkerActive().then((swActive) => {
    const swActiveNum = swActive ? 1 : 0;
    const connectionType = getConnectionType();

    // Collect TTFB (Time to First Byte)
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
      if (ttfb > 0) {
        callback({
          metricType: 'TTFB',
          value: ttfb,
          visitType,
          serviceWorkerActive: swActiveNum,
          userAgent,
          pathname,
          connectionType,
        });
      }
    }

    // Collect FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback({
            metricType: 'FCP',
            value: (entry as any).startTime,
            visitType,
            serviceWorkerActive: swActiveNum,
            userAgent,
            pathname,
            connectionType,
          });
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch {
      // Browser doesn't support FCP
    }

    // Collect LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        callback({
          metricType: 'LCP',
          value: (lastEntry as any).renderTime || (lastEntry as any).loadTime,
          visitType,
          serviceWorkerActive: swActiveNum,
          userAgent,
          pathname,
          connectionType,
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      // Browser doesn't support LCP
    }

    // Collect CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            callback({
              metricType: 'CLS',
              value: clsValue,
              visitType,
              serviceWorkerActive: swActiveNum,
              userAgent,
              pathname,
              connectionType,
            });
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch {
      // Browser doesn't support CLS
    }

    // Collect FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback({
            metricType: 'FID',
            value: (entry as any).processingDuration,
            visitType,
            serviceWorkerActive: swActiveNum,
            userAgent,
            pathname,
            connectionType,
          });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch {
      // Browser doesn't support FID
    }
  });
}

/**
 * Get cache statistics from service worker
 */
export async function getCacheStatistics(): Promise<CacheAnalyticsData[]> {
  const stats: CacheAnalyticsData[] = [];
  const userAgent = navigator.userAgent;

  try {
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      // Estimate cache size (rough calculation)
      let totalSize = 0;
      for (const req of keys) {
        const response = await cache.match(req);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }

      // Determine cache type
      let cacheType: 'static' | 'dynamic' | 'api' = 'dynamic';
      if (cacheName.includes('static')) cacheType = 'static';
      else if (cacheName.includes('api')) cacheType = 'api';

      stats.push({
        cacheName: cacheType,
        hitCount: 0, // Will be tracked via interceptors
        missCount: 0, // Will be tracked via interceptors
        totalSize,
        itemCount: keys.length,
        hitRate: 0, // Will be calculated
        userAgent,
      });
    }
  } catch (error) {
    console.error('[Cache Analytics] Failed to get cache statistics:', error);
  }

  return stats;
}

/**
 * Track cache hit/miss via fetch interceptor
 * SIMPLIFIED: Only tracks on-demand, not on every fetch
 */
export function setupCacheHitTracking(
  onCacheHit: (cacheName: string) => void,
  onCacheMiss: (cacheName: string) => void
) {
  if (!('caches' in window)) return;

  // Collect cache stats periodically (every 60 seconds) instead of on every fetch
  setInterval(async () => {
    try {
      const stats = await getCacheStatistics();
      // Just collect stats, don't log every miss
      stats.forEach((stat) => {
        if (stat.itemCount > 0) {
          onCacheHit(stat.cacheName);
        }
      });
    } catch {
      // Silently fail
    }
  }, 60000); // Every 60 seconds
}

/**
 * Track service worker activation
 */
export async function trackServiceWorkerActivation(
  callback: (event: ServiceWorkerEventData) => void
) {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      if (registration.active) {
        callback({
          eventType: 'activate',
          status: 'success',
          userAgent: navigator.userAgent,
          cachedItemCount: 0, // Will be populated by SW
        } as ServiceWorkerEventData);
      }
    }
  } catch (error) {
    console.error('[SW Analytics] Failed to track activation:', error);
  }
}

/**
 * Track service worker event
 */
export function trackServiceWorkerEvent(event: ServiceWorkerEventData) {
  // This will be sent to the server via tRPC
  console.log('[SW Analytics] Event:', event);
}

/**
 * Initialize analytics collection with server integration
 */
export function initializeAnalytics(
  sendMetric: (data: PerformanceMetricData) => void,
  sendCacheAnalytics?: (data: CacheAnalyticsData) => void,
  sendSwEvent?: (data: ServiceWorkerEventData) => void
) {
  // Collect Web Vitals
  collectWebVitals(sendMetric);

  // Setup cache hit/miss tracking (now periodic instead of on every fetch)
  setupCacheHitTracking(
    (cacheName) => {
      // Silent - no logging
    },
    (cacheName) => {
      // Silent - no logging
    }
  );

  // Track service worker activation
  trackServiceWorkerActivation((event) => {
    if (sendSwEvent) {
      sendSwEvent(event);
    }
  });

  // Collect cache statistics periodically
  if (sendCacheAnalytics) {
    setInterval(async () => {
      try {
        const stats = await getCacheStatistics();
        stats.forEach((stat) => {
          sendCacheAnalytics(stat);
        });
      } catch {
        // Silently fail
      }
    }, 60000); // Every 60 seconds
  }

  // Listen for service worker messages
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data.type === 'SW_EVENT' && sendSwEvent) {
        sendSwEvent(event.data.payload);
      }
    });
  }
}
