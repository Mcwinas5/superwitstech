import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

interface PerformanceSummary {
  avgTTFB: number;
  avgFCP: number;
  avgLCP: number;
  avgCLS: number;
  firstVisitCount: number;
  repeatVisitCount: number;
  swActiveCount: number;
}

interface PerformanceMetricsChartProps {
  data?: PerformanceSummary;
  isLoading?: boolean;
}

export function PerformanceMetricsChart({
  data,
  isLoading = false,
}: PerformanceMetricsChartProps) {
  const metrics = useMemo(() => {
    if (!data) return [];

    return [
      {
        label: "TTFB",
        value: Math.round(data.avgTTFB),
        unit: "ms",
        target: 600,
        status: data.avgTTFB <= 600 ? "good" : data.avgTTFB <= 1200 ? "fair" : "poor",
      },
      {
        label: "FCP",
        value: Math.round(data.avgFCP),
        unit: "ms",
        target: 1800,
        status: data.avgFCP <= 1800 ? "good" : data.avgFCP <= 3000 ? "fair" : "poor",
      },
      {
        label: "LCP",
        value: Math.round(data.avgLCP),
        unit: "ms",
        target: 2500,
        status: data.avgLCP <= 2500 ? "good" : data.avgLCP <= 4000 ? "fair" : "poor",
      },
      {
        label: "CLS",
        value: (data.avgCLS || 0).toFixed(3),
        unit: "",
        target: 0.1,
        status: data.avgCLS <= 0.1 ? "good" : data.avgCLS <= 0.25 ? "fair" : "poor",
      },
    ];
  }, [data]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-50 border-green-200";
      case "fair":
        return "bg-yellow-50 border-yellow-200";
      case "poor":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-800";
      case "fair":
        return "bg-yellow-100 text-yellow-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            className={`p-4 border-2 transition-colors ${getStatusColor(metric.status)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm">{metric.label}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold">{metric.value}</span>
              <span className="text-sm text-muted-foreground">{metric.unit}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Target: {metric.target}{metric.unit}
            </p>
          </Card>
        ))}
      </div>

      {data && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Visit Distribution</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-muted-foreground mb-1">First Visits</p>
              <p className="text-2xl font-bold text-blue-600">{data.firstVisitCount}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-muted-foreground mb-1">Repeat Visits</p>
              <p className="text-2xl font-bold text-purple-600">{data.repeatVisitCount}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-muted-foreground mb-1">SW Active</p>
              <p className="text-2xl font-bold text-green-600">{data.swActiveCount}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
