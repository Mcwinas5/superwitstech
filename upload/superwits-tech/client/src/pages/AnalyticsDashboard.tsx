import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PerformanceMetricsChart } from "@/components/PerformanceMetricsChart";
import { CacheAnalyticsChart } from "@/components/CacheAnalyticsChart";
import { ServiceWorkerStatus } from "@/components/ServiceWorkerStatus";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AnalyticsDashboard() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [isSwActive, setIsSwActive] = useState(false);

  // Fetch analytics data
  const performanceQuery = trpc.analytics.getPerformanceSummary.useQuery(
    { hours: 24 },
    {
      refetchInterval: autoRefresh ? refreshInterval : false,
    }
  );

  const cacheQuery = trpc.analytics.getCacheAnalyticsSummary.useQuery(
    { hours: 24 },
    {
      refetchInterval: autoRefresh ? refreshInterval : false,
    }
  );

  const swQuery = trpc.analytics.getServiceWorkerEventsSummary.useQuery(
    { hours: 24 },
    {
      refetchInterval: autoRefresh ? refreshInterval : false,
    }
  );

  // Check if service worker is active
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        setIsSwActive(registrations.length > 0);
      });
    }
  }, []);

  const handleRefresh = () => {
    performanceQuery.refetch();
    cacheQuery.refetch();
    swQuery.refetch();
  };

  const isLoading = performanceQuery.isLoading || cacheQuery.isLoading || swQuery.isLoading;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Performance Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Real-time monitoring of your website's performance, caching, and service worker status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Auto-refresh Controls */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Auto-Refresh</p>
              <p className="text-xs text-muted-foreground">
                {autoRefresh ? `Updates every ${refreshInterval / 1000}s` : "Disabled"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                disabled={!autoRefresh}
                className="text-sm px-2 py-1 border rounded"
              >
                <option value={10000}>10s</option>
                <option value={30000}>30s</option>
                <option value={60000}>1m</option>
                <option value={300000}>5m</option>
              </select>
              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? "On" : "Off"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Performance Metrics Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
          <PerformanceMetricsChart
            data={performanceQuery.data}
            isLoading={performanceQuery.isLoading}
          />
        </div>

        {/* Cache Analytics Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Cache Analytics</h2>
          <CacheAnalyticsChart
            data={cacheQuery.data}
            isLoading={cacheQuery.isLoading}
          />
        </div>

        {/* Service Worker Status Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Service Worker Status</h2>
          <ServiceWorkerStatus
            data={swQuery.data}
            isLoading={swQuery.isLoading}
            isActive={isSwActive}
          />
        </div>

        {/* Summary Stats */}
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <h3 className="font-semibold mb-4">Quick Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Avg Page Load</p>
              <p className="text-lg font-bold">
                {performanceQuery.data
                  ? Math.round(performanceQuery.data.avgLCP)
                  : "-"}
                ms
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Cache Hit Rate</p>
            <p className="text-lg font-bold">
              {cacheQuery.data
                ? Math.round(cacheQuery.data.overallHitRate * 100)
                : "-"}
              %
            </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Service Worker</p>
              <p className="text-lg font-bold">{isSwActive ? "✓ Active" : "⚠ Inactive"}</p>
            </div>
          </div>
        </Card>

        {/* Last Updated */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            Last updated: {new Date().toLocaleTimeString()}
            {autoRefresh && ` • Auto-refresh enabled (${refreshInterval / 1000}s)`}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
