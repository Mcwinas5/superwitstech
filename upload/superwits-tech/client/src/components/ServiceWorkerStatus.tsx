import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface ServiceWorkerEventsSummary {
  totalEvents: number;
  installCount: number;
  activateCount: number;
  updateCount: number;
  errorCount: number;
  lastEventTime?: Date;
}

interface ServiceWorkerStatusProps {
  data?: ServiceWorkerEventsSummary;
  isLoading?: boolean;
  isActive?: boolean;
}

export function ServiceWorkerStatus({
  data,
  isLoading = false,
  isActive = false,
}: ServiceWorkerStatusProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      </Card>
    );
  }

  const getStatusColor = () => {
    if (!isActive) return "bg-gray-50 border-gray-200";
    if (data && data.errorCount > 0) return "bg-red-50 border-red-200";
    return "bg-green-50 border-green-200";
  };

  const getStatusIcon = () => {
    if (!isActive) return <Clock className="text-gray-500" size={24} />;
    if (data && data.errorCount > 0) return <AlertCircle className="text-red-500" size={24} />;
    return <CheckCircle2 className="text-green-500" size={24} />;
  };

  const getStatusText = () => {
    if (!isActive) return "Inactive";
    if (data && data.errorCount > 0) return "Active with Errors";
    return "Active & Healthy";
  };

  return (
    <div className="space-y-4">
      {/* Main Status Card */}
      <Card className={`p-6 border-2 transition-colors ${getStatusColor()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getStatusIcon()}
            <div>
              <h3 className="font-semibold text-lg">Service Worker</h3>
              <p className="text-sm text-muted-foreground">{getStatusText()}</p>
            </div>
          </div>
          <Badge
            className={
              !isActive
                ? "bg-gray-200 text-gray-800"
                : data && data.errorCount > 0
                  ? "bg-red-200 text-red-800"
                  : "bg-green-200 text-green-800"
            }
          >
            {isActive ? "Running" : "Not Active"}
          </Badge>
        </div>
      </Card>

      {/* Events Timeline */}
      {data && (
        <>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Service Worker Events</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium">Install Events</span>
                <span className="text-lg font-bold text-blue-600">{data.installCount}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-sm font-medium">Activation Events</span>
                <span className="text-lg font-bold text-green-600">{data.activateCount}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-sm font-medium">Update Events</span>
                <span className="text-lg font-bold text-purple-600">{data.updateCount}</span>
              </div>

              {data.errorCount > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-sm font-medium">Error Events</span>
                  <span className="text-lg font-bold text-red-600">{data.errorCount}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Events</p>
                <p className="text-2xl font-bold">{data.totalEvents}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Error Rate</p>
                <p className="text-2xl font-bold">
                  {data.totalEvents > 0
                    ? Math.round((data.errorCount / data.totalEvents) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
            {data.lastEventTime && (
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Last event: {new Date(data.lastEventTime).toLocaleString()}
              </p>
            )}
          </Card>

          {/* Health Check */}
          <Card className={`p-6 ${isActive && data.errorCount === 0 ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
            <h3 className="font-semibold mb-3">Health Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                {isActive ? (
                  <CheckCircle2 className="text-green-600" size={16} />
                ) : (
                  <AlertCircle className="text-yellow-600" size={16} />
                )}
                <span>Service Worker: {isActive ? "✓ Active" : "⚠ Inactive"}</span>
              </div>
              <div className="flex items-center gap-2">
                {data.errorCount === 0 ? (
                  <CheckCircle2 className="text-green-600" size={16} />
                ) : (
                  <AlertCircle className="text-red-600" size={16} />
                )}
                <span>Errors: {data.errorCount === 0 ? "✓ None" : `⚠ ${data.errorCount} detected`}</span>
              </div>
              <div className="flex items-center gap-2">
                {data.activateCount > 0 ? (
                  <CheckCircle2 className="text-green-600" size={16} />
                ) : (
                  <AlertCircle className="text-yellow-600" size={16} />
                )}
                <span>Activation: {data.activateCount > 0 ? "✓ Successful" : "⚠ Pending"}</span>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
