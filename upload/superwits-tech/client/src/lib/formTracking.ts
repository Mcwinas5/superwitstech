/**
 * Form Submission Tracking Utility
 * Tracks form submissions and correlates them with performance metrics
 * for measuring the impact of speed improvements on conversion rates
 */

import { trpc } from './trpc';

export interface FormSubmissionData {
  email: string;
  formType: 'audit' | 'contact' | 'newsletter';
  pageLoadTime?: number;
  serviceWorkerActive: boolean;
  timeToSubmission?: number;
  userAgent?: string;
  pathname?: string;
  country?: string;
  connectionType?: string;
  fcp?: number;
  lcp?: number;
}

/**
 * Get performance metrics from the page
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) {
    return {};
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const paintEntries = performance.getEntriesByType('paint');
  const largestContentfulPaint = performance.getEntriesByType('largest-contentful-paint').pop() as PerformanceEntry | undefined;

  const metrics: Record<string, number | undefined> = {};

  if (navigation) {
    // Time to First Byte (TTFB)
    metrics.ttfb = navigation.responseStart - navigation.fetchStart;
    // Page Load Time
    metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
  }

  // First Contentful Paint (FCP)
  const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
  if (fcp) {
    metrics.fcp = Math.round(fcp.startTime);
  }

  // Largest Contentful Paint (LCP)
  if (largestContentfulPaint) {
    metrics.lcp = Math.round(largestContentfulPaint.startTime);
  }

  return metrics;
}

/**
 * Get connection type from navigator
 */
export function getConnectionType(): string | undefined {
  if (typeof navigator === 'undefined') return undefined;

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  return connection?.effectiveType;
}

/**
 * Check if service worker is active
 */
export async function isServiceWorkerActive(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    return !!registration?.active;
  } catch {
    return false;
  }
}

/**
 * Get user's country (if available from browser APIs)
 */
export function getUserCountry(): string | undefined {
  // Note: This would require a geolocation API or server-side IP detection
  // For now, we'll leave this as undefined and handle it server-side
  return undefined;
}

/**
 * Record a form submission with performance metrics
 */
export async function recordFormSubmission(data: FormSubmissionData): Promise<boolean> {
  try {
    const metrics = getPerformanceMetrics();
    const swActive = await isServiceWorkerActive();
    const connectionType = getConnectionType();

    const submissionData = {
      email: data.email,
      formType: data.formType,
      pageLoadTime: data.pageLoadTime || (metrics.pageLoadTime as number | undefined),
      serviceWorkerActive: swActive ? 1 : 0,
      timeToSubmission: data.timeToSubmission,
      userAgent: data.userAgent || navigator.userAgent,
      pathname: data.pathname || window.location.pathname,
      country: data.country || getUserCountry(),
      connectionType: data.connectionType || connectionType,
      fcp: data.fcp || (metrics.fcp as number | undefined),
      lcp: data.lcp || (metrics.lcp as number | undefined),
    };

    // Call tRPC mutation to record submission via direct fetch
    // (Cannot use React hooks outside of components)
    const response = await fetch('/api/trpc/formSubmissions.recordSubmission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        json: submissionData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to record submission: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('[Form Tracking] Failed to record submission:', error);
    return false;
  }
}

/**
 * Track form interaction for time-to-submission measurement
 */
export class FormInteractionTracker {
  private formLoadTime: number = 0;
  private formElement: HTMLFormElement | null = null;

  constructor(formElement: HTMLFormElement) {
    this.formElement = formElement;
    this.formLoadTime = Date.now();
  }

  /**
   * Get time elapsed since form was loaded
   */
  getTimeToSubmission(): number {
    return Date.now() - this.formLoadTime;
  }

  /**
   * Record form submission
   */
  async recordSubmission(email: string, formType: 'audit' | 'contact' | 'newsletter' = 'audit'): Promise<boolean> {
    const timeToSubmission = this.getTimeToSubmission();
    const metrics = getPerformanceMetrics();

    return recordFormSubmission({
      email,
      formType,
      timeToSubmission,
      pageLoadTime: metrics.pageLoadTime as number | undefined,
      serviceWorkerActive: await isServiceWorkerActive(),
      fcp: metrics.fcp as number | undefined,
      lcp: metrics.lcp as number | undefined,
    });
  }
}

/**
 * Initialize form tracking on a form element
 */
export function initializeFormTracking(formElement: HTMLFormElement): FormInteractionTracker {
  return new FormInteractionTracker(formElement);
}

/**
 * Calculate conversion rate from submission data
 */
export function calculateConversionRate(submissionCount: number, totalVisitors: number): number {
  if (totalVisitors === 0) return 0;
  return (submissionCount / totalVisitors) * 100;
}

/**
 * Categorize load time into ranges for correlation analysis
 */
export function categorizeLoadTime(loadTimeMs: number): string {
  if (loadTimeMs < 2000) return '0-2s';
  if (loadTimeMs < 4000) return '2-4s';
  if (loadTimeMs < 6000) return '4-6s';
  return '6+s';
}
