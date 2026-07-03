import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

/**
 * Service Worker Update Notification
 * Shows when a new version of the app is available
 */
export function ServiceWorkerUpdateNotification() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      console.log('[Update Notification] New version available');
      setShowUpdate(true);
    };

    window.addEventListener('sw-updated', handleUpdate);
    return () => window.removeEventListener('sw-updated', handleUpdate);
  }, []);

  const handleRefresh = () => {
    console.log('[Update Notification] User clicked refresh');
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-5">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">✨ New version available!</p>
              <p className="text-xs text-amber-100 mt-1">
                Refresh to get the latest updates and improvements.
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-amber-100 hover:text-white transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              onClick={handleRefresh}
              className="flex-1 bg-white text-amber-600 hover:bg-amber-50 h-8 text-xs font-semibold"
            >
              Refresh Now
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="flex-1 border-amber-200 text-white hover:bg-amber-600 h-8 text-xs font-semibold"
            >
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
