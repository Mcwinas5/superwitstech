import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to set appropriate cache headers based on asset type
 * 
 * Strategy:
 * - Versioned static assets (with hash): 1 year, immutable
 * - Images and media: 1 year cache (immutable if from manus-storage)
 * - HTML documents: 1 hour with ETag validation
 * - API responses: 5 minutes with must-revalidate
 * - Service worker: no-cache (always check for updates)
 * - Other assets: no-cache for security
 */
export function setCacheHeaders(req: Request, res: Response, next: NextFunction) {
  const path = req.path;

  // Versioned static assets (JS, CSS, fonts with hash) - 1 year cache
  // Matches patterns like: app.abc123.js, style.def456.css
  if (/\.[a-f0-9]{8}\.(js|css|woff|woff2|ttf|otf|eot)$/.test(path)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // Images and media files (assume versioned or immutable)
  else if (/\.(png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|mp3|wav)$/.test(path)) {
    // If it's in manus-storage, it's immutable (content-addressed)
    if (path.includes('/manus-storage/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      // Local assets: 1 year cache
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
  // HTML documents - 1 hour cache with validation
  else if (path === '/' || path.startsWith('/unsubscribe') || path.endsWith('.html')) {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    res.setHeader('ETag', 'W/"' + Date.now() + '"');
  }
  // API responses - 5 minutes cache
  else if (path.startsWith('/api/trpc')) {
    res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
  }
  // Service worker - must always check for updates
  else if (path === '/service-worker.js') {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  // Default - no cache for security
  else {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
}
