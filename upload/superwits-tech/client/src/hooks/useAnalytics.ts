import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import {
  initializeAnalytics,
  PerformanceMetricData,
  CacheAnalyticsData,
  ServiceWorkerEventData,
} from "@/lib/cacheAnalytics";

/**
 * Hook to initialize analytics tracking with tRPC integration
 */
export function useAnalytics() {
  const recordMetricMutation = trpc.analytics.recordPerformanceMetric.useMutation();
  const recordCacheAnalyticsMutation = trpc.analytics.recordCacheAnalytic.useMutation();
  const recordSwEventMutation = trpc.analytics.recordServiceWorkerEvent.useMutation();

  useEffect(() => {
    // Initialize analytics with server integration
    initializeAnalytics(
      // Send performance metrics
      (metric: PerformanceMetricData) => {
        recordMetricMutation.mutate({
          metricType: metric.metricType,
          value: metric.value,
          visitType: metric.visitType,
          serviceWorkerActive: metric.serviceWorkerActive,
          userAgent: metric.userAgent,
          pathname: metric.pathname,
          country: metric.country,
          connectionType: metric.connectionType,
        });
      },
      // Send cache analytics
      (cacheData: CacheAnalyticsData) => {
        recordCacheAnalyticsMutation.mutate({
          cacheName: cacheData.cacheName,
          hitCount: cacheData.hitCount,
          missCount: cacheData.missCount,
          totalSize: cacheData.totalSize,
          itemCount: cacheData.itemCount,
          hitRate: cacheData.hitRate,
          userAgent: cacheData.userAgent,
        });
      },
      // Send service worker events
      (swEvent: ServiceWorkerEventData) => {
        recordSwEventMutation.mutate({
          eventType: swEvent.eventType,
          status: swEvent.status,
          errorMessage: swEvent.errorMessage,
          userAgent: swEvent.userAgent,
          swVersion: swEvent.swVersion,
          cachedItemCount: swEvent.cachedItemCount,
          cacheSize: swEvent.cacheSize,
        });
      }
    );
  }, [recordMetricMutation, recordCacheAnalyticsMutation, recordSwEventMutation]);

  return {
    recordMetricMutation,
    recordCacheAnalyticsMutation,
    recordSwEventMutation,
  };
}
