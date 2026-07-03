/**
 * Service Worker Manager
 * Handles registration, updates, and lifecycle management
 */

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW Manager] Service Workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });

    console.log('[SW Manager] Service Worker registered:', registration);

    // Check for updates periodically (every 60 seconds)
    setInterval(() => {
      registration.update().catch((err) => {
        console.error('[SW Manager] Update check failed:', err);
      });
    }, 60000);

    // Listen for controller change (new SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW Manager] New service worker activated');
      notifyUserOfUpdate();
    });

    // Handle waiting service worker
    if (registration.waiting) {
      notifyUserOfUpdate();
    }

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New SW is ready, notify user
          notifyUserOfUpdate();
        }
      });
    });

    // Initialize service worker
    if (registration.active) {
      registration.active.postMessage({ type: 'INIT' });
    }

    return registration;
  } catch (error) {
    console.error('[SW Manager] Failed to register service worker:', error);
    return null;
  }
}

/**
 * Notify user that a new version is available
 */
function notifyUserOfUpdate() {
  const event = new CustomEvent('sw-updated', {
    detail: { message: 'New version available. Refresh to update.' },
  });
  window.dispatchEvent(event);
  console.log('[SW Manager] Update notification sent to user');
}

/**
 * Clear all service worker caches
 */
export function clearServiceWorkerCache() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
    console.log('[SW Manager] Cache clear requested');
  }
}

/**
 * Unregister all service workers
 */
export async function unregisterServiceWorker() {
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
    console.log('[SW Manager] All service workers unregistered');
  } catch (error) {
    console.error('[SW Manager] Failed to unregister service workers:', error);
  }
}

/**
 * Get current service worker registration
 */
export async function getServiceWorkerRegistration() {
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    return registrations.length > 0 ? registrations[0] : null;
  } catch (error) {
    console.error('[SW Manager] Failed to get registration:', error);
    return null;
  }
}

/**
 * Check if service worker is active
 */
export async function isServiceWorkerActive() {
  const registration = await getServiceWorkerRegistration();
  return registration?.active !== undefined;
}

/**
 * Get cache storage info
 */
export async function getCacheStorageInfo() {
  try {
    const cacheNames = await caches.keys();
    const cacheInfo = await Promise.all(
      cacheNames.map(async (name) => {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        return {
          name,
          size: keys.length,
          keys: keys.map((req) => req.url),
        };
      })
    );
    return cacheInfo;
  } catch (error) {
    console.error('[SW Manager] Failed to get cache info:', error);
    return [];
  }
}
