import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, XCircle, MessageCircle, Download, Search, X, Eye, AlertCircle } from "lucide-react";
import { exportAuditRequestsAsCSV } from "@/lib/csvExport";
import { ChatbotResponsesModal } from "@/components/ChatbotResponsesModal";


type AuditRequestStatus = "new" | "contacted" | "converted" | "rejected";

const statusConfig: Record<AuditRequestStatus, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: "New", color: "#3B82F6", icon: <Clock size={16} /> },
  contacted: { label: "Contacted", color: "#F59E0B", icon: <MessageCircle size={16} /> },
  converted: { label: "Converted", color: "#10B981", icon: <CheckCircle size={16} /> },
  rejected: { label: "Rejected", color: "#EF4444", icon: <XCircle size={16} /> },
};

const unsubscribedConfig = { label: "Unsubscribed", color: "#8B5CF6", icon: <AlertCircle size={16} /> };

export default function AdminDashboard() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const pageSize = 20;

  const { data, isLoading, refetch } = trpc.auditRequests.getAll.useQuery();

  const updateStatusMutation = trpc.auditRequests.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // Only allow admins to view this page
  if (user && user.role !== "admin") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You do not have permission to view this page.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleStatusChange = (id: number, newStatus: AuditRequestStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const requests = data?.requests || [];
  const totalCount = requests.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Filter requests based on search query
  const filteredRequests = useMemo(() => {
    if (!searchQuery.trim()) return requests;

    const query = searchQuery.toLowerCase();
    return requests.filter((request: any) =>
      request.name.toLowerCase().includes(query) ||
      request.email.toLowerCase().includes(query) ||
      request.businessName.toLowerCase().includes(query) ||
      request.whatsapp.toLowerCase().includes(query)
    );
  }, [requests, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setPage(0);
  };

  const handleExportCSV = () => {
    // Export filtered results if search is active, otherwise export all
    const dataToExport = searchQuery.trim() ? filteredRequests : data?.requests;
    if (dataToExport && dataToExport.length > 0) {
      const filename = `audit-requests-${new Date().toISOString().split('T')[0]}.csv`;
      exportAuditRequestsAsCSV(dataToExport, filename);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-8 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Audit Requests</h1>
            <p className="text-muted-foreground mt-2">
              Manage incoming website audit requests from potential clients.
            </p>
          </div>
          <Button
            onClick={handleExportCSV}
            disabled={!data?.requests || data.requests.length === 0 || isLoading}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export CSV
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                }}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {filteredRequests.length} result{filteredRequests.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { label: "Total Requests", value: totalCount },
            { label: "New", value: requests.filter((r: any) => r.status === "new").length },
            { label: "Contacted", value: requests.filter((r: any) => r.status === "contacted").length },
            { label: "Converted", value: requests.filter((r: any) => r.status === "converted").length },
            { label: "Do Not Contact", value: requests.filter((r: any) => r.unsubscribed === 1).length },
          ].map((stat: any) => (
            <Card key={stat.label} className="p-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Requests Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Business</th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">WhatsApp</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                  <th className="px-6 py-3 text-left font-semibold">Subscription</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                      {searchQuery ? "No results found. Try adjusting your search." : "No audit requests yet."}
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request: any) => (
                    <tr key={request.id} className={`border-b hover:bg-muted/50 transition-colors ${request.unsubscribed === 1 ? "opacity-60" : ""}`}>
                      <td className="px-6 py-4 font-medium">{request.name}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{request.businessName}</p>
                          <p className="text-xs text-muted-foreground">{request.businessType}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${request.email}`} className="text-blue-600 hover:underline">
                          {request.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`https://wa.me/${request.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline"
                        >
                          {request.whatsapp}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: statusConfig[request.status as AuditRequestStatus].color + "20",
                            color: statusConfig[request.status as AuditRequestStatus].color,
                          }}
                        >
                          {statusConfig[request.status as AuditRequestStatus].icon}
                          {statusConfig[request.status as AuditRequestStatus].label}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {request.unsubscribed === 1 ? (
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              backgroundColor: unsubscribedConfig.color + "20",
                              color: unsubscribedConfig.color,
                            }}
                            title={`Unsubscribed on ${request.unsubscribedAt ? new Date(request.unsubscribedAt).toLocaleDateString() : "unknown date"}`}
                          >
                            {unsubscribedConfig.icon}
                            Do Not Contact
                          </div>
                        ) : (
                          <span className="text-xs text-green-600 font-semibold">✓ Active</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <select
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value as AuditRequestStatus)}
                            disabled={updateStatusMutation.isPending}
                            className="text-xs px-2 py-1 rounded border bg-background"
                          >
                            {(Object.keys(statusConfig) as AuditRequestStatus[]).map((status) => (
                              <option key={status} value={status}>
                                {statusConfig[status].label}
                              </option>
                            ))}
                          </select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedRequestId(request.id);
                              setShowChatbotModal(true);
                            }}
                            title="View chatbot responses"
                          >
                            <Eye size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page === totalPages - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
        {/* Chatbot Responses Modal */}
        {selectedRequestId && (
          <ChatbotResponsesModal
            auditRequestId={selectedRequestId}
            open={showChatbotModal}
            onOpenChange={setShowChatbotModal}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
