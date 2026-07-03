import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";

interface CacheAnalyticsSummary {
  totalHits: number;
  totalMisses: number;
  overallHitRate: number;
  totalCacheSize: number;
  staticCacheHitRate: number;
  dynamicCacheHitRate: number;
  apiCacheHitRate: number;
}

interface CacheAnalyticsChartProps {
  data?: CacheAnalyticsSummary;
  isLoading?: boolean;
}

export function CacheAnalyticsChart({
  data,
  isLoading = false,
}: CacheAnalyticsChartProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No cache data available yet</p>
      </Card>
    );
  }

  const hitRatePercentage = Math.round(data.overallHitRate * 100);
  const totalRequests = data.totalHits + data.totalMisses;
  const cacheSizeMB = (data.totalCacheSize / 1024 / 1024).toFixed(2);

  return (
    <div className="space-y-4">
      {/* Main Hit Rate Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Cache Hit Rate</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600">{hitRatePercentage}%</span>
              <span className="text-sm text-blue-700">
                {data.totalHits} hits / {totalRequests} total
              </span>
            </div>
          </div>
          {hitRatePercentage >= 80 ? (
            <TrendingUp className="text-green-600" size={40} />
          ) : (
            <TrendingDown className="text-orange-600" size={40} />
          )}
        </div>
      </Card>

      {/* Cache Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-sm text-muted-foreground mb-1">Cache Hits</p>
          <p className="text-2xl font-bold text-green-600">{data.totalHits}</p>
          <p className="text-xs text-muted-foreground mt-2">Served from cache</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-orange-500">
          <p className="text-sm text-muted-foreground mb-1">Cache Misses</p>
          <p className="text-2xl font-bold text-orange-600">{data.totalMisses}</p>
          <p className="text-xs text-muted-foreground mt-2">Fetched from network</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-500">
          <p className="text-sm text-muted-foreground mb-1">Cache Size</p>
          <p className="text-2xl font-bold text-purple-600">{cacheSizeMB} MB</p>
          <p className="text-xs text-muted-foreground mt-2">Total cached data</p>
        </Card>
      </div>

      {/* Cache Type Breakdown */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Cache Hit Rate by Type</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Static Assets</span>
              <span className="text-sm font-bold text-blue-600">{Math.round(data.staticCacheHitRate * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${Math.min(data.staticCacheHitRate * 100, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">API Responses</span>
              <span className="text-sm font-bold text-purple-600">{Math.round(data.apiCacheHitRate * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${Math.min(data.apiCacheHitRate * 100, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Dynamic Content</span>
              <span className="text-sm font-bold text-green-600">{Math.round(data.dynamicCacheHitRate * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${Math.min(data.dynamicCacheHitRate * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Impact */}
      <Card className="p-6 bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-900 mb-3">Performance Impact</h3>
        <div className="space-y-2 text-sm text-green-800">
          <p>
            ✓ <strong>{hitRatePercentage}%</strong> of requests served from cache
          </p>
          <p>
            ✓ Estimated <strong>~{Math.round(hitRatePercentage * 0.68)}% faster</strong> repeat visits
          </p>
          <p>
            ✓ <strong>{data.totalHits}</strong> network requests saved
          </p>
        </div>
      </Card>
    </div>
  );
}
