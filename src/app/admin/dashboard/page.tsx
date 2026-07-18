"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Download,
  Loader2,
  BarChart3,
  Users,
  UserCheck,
  UserPlus,
  Ban,
  AlertCircle,
} from "lucide-react";

interface AuditRequest {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  website: string;
  email: string;
  whatsapp: string;
  status: string;
  notes: string | null;
  unsubscribed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FetchResponse {
  items: AuditRequest[];
  total: number;
  page: number;
  limit: number;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  new: { label: "New", bg: "#1E3A5F", color: "#60A5FA" },
  contacted: { label: "Contacted", bg: "#422006", color: "#F59E0B" },
  converted: { label: "Converted", bg: "#052E16", color: "#4ADE80" },
  rejected: { label: "Do Not Contact", bg: "#3B0A0A", color: "#F87171" },
};

const VALID_STATUSES = ["new", "contacted", "converted", "rejected"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<AuditRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const fetchData = useCallback(async (query = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: "1", limit: "50" });
      if (query) params.set("search", query);
      const res = await fetch(`/api/audit-requests?${params}`);
      if (res.status === 401 || res.status === 403) {
        router.push("/admin");
        return;
      }
      if (!res.ok) {
        setData([]);
        setTotal(0);
        return;
      }
      const json: FetchResponse = await res.json();
      setData(json.items);
      setTotal(json.total);
    } catch {
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "admin") {
          router.push("/admin");
          return;
        }
        fetchData();
      })
      .catch(() => {
        router.push("/admin");
      });
  }, [router, fetchData]);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearch(value);
      fetchData(value);
    }, 400);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setStatusUpdating(id);
    try {
      const res = await fetch(`/api/audit-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setData((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch {
      /* ignore */
    } finally {
      setStatusUpdating(null);
    }
  };

  const handleExportCSV = () => {
    if (!data.length) return;
    const headers = ["Name", "Business", "Business Type", "Email", "WhatsApp", "Website", "Status", "Date"];
    const rows = data.map((r) => [
      r.name,
      r.businessName,
      r.businessType,
      r.email,
      r.whatsapp,
      r.website,
      r.status,
      new Date(r.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: total,
    new: data.filter((r) => r.status === "new").length,
    contacted: data.filter((r) => r.status === "contacted").length,
    converted: data.filter((r) => r.status === "converted").length,
    rejected: data.filter((r) => r.status === "rejected").length,
  };

  const statCards = [
    { label: "Total Requests", value: stats.total, icon: BarChart3, color: "#D4A017", bg: "#1C1306" },
    { label: "New", value: stats.new, icon: Users, color: "#60A5FA", bg: "#0C1E3D" },
    { label: "Contacted", value: stats.contacted, icon: UserCheck, color: "#F59E0B", bg: "#1A1206" },
    { label: "Converted", value: stats.converted, icon: UserPlus, color: "#4ADE80", bg: "#052E16" },
    { label: "Do Not Contact", value: stats.rejected, icon: Ban, color: "#F87171", bg: "#3B0A0A" },
  ];

  return (
    <div style={{ backgroundColor: "#0A0E27", minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: "#0C1421",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          padding: "16px 24px",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 transition-colors"
              style={{ color: "#A8B2C7", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F5F5F0")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A8B2C7")}
            >
              <ArrowLeft size={18} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Home</span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2 transition-colors"
              style={{ color: "#A8B2C7", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F5F5F0")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A8B2C7")}
            >
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Analytics</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "18px",
              }}
            >
              <span style={{ color: "#F5F5F0" }}>Superwits</span>
              <span style={{ color: "#D4A017" }}> tech</span>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                style={{
                  backgroundColor: card.bg,
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={18} style={{ color: card.color }} />
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: card.color,
                    }}
                  >
                    {card.value}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    color: "#A8B2C7",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {card.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Search + Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#A8B2C7",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search by name, email, or business..."
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px 10px 40px",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                color: "#F5F5F0",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                outline: "none",
                minHeight: "42px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#D4A017")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
            />
          </div>
          <button
            onClick={handleExportCSV}
            disabled={!data.length}
            style={{
              padding: "10px 20px",
              backgroundColor: data.length ? "#D4A017" : "#422006",
              color: "#0A1128",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: data.length ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minHeight: "42px",
              whiteSpace: "nowrap",
            }}
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin" style={{ color: "#D4A017" }} />
          </div>
        ) : !data.length ? (
          <div
            className="flex flex-col items-center justify-center py-20"
            style={{ color: "#A8B2C7" }}
          >
            <AlertCircle size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>
              No audit requests found
            </p>
          </div>
        ) : (
          <div
            className="overflow-x-auto"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px",
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#0C1421",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}
                >
                  {["Name", "Business", "Email", "WhatsApp", "Status", "Date", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#A8B2C7",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          borderBottom: "1px solid rgba(255,255,255,0.12)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => {
                  const cfg = STATUS_CONFIG[row.status] || STATUS_CONFIG.new;
                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.12)",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor = "#142647")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.06)")
                      }
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontFamily: "'Inter', sans-serif",
                          color: "#F5F5F0",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.name}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "#F5F5F0",
                            marginBottom: "4px",
                          }}
                        >
                          {row.businessName}
                        </div>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            backgroundColor: "rgba(255,255,255,0.12)",
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "10px",
                            color: "#A8B2C7",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {row.businessType}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <a
                          href={`mailto:${row.email}`}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "#60A5FA",
                            textDecoration: "none",
                            fontSize: "13px",
                          }}
                        >
                          {row.email}
                        </a>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <a
                          href={`https://wa.me/${row.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "#4ADE80",
                            textDecoration: "none",
                            fontSize: "13px",
                          }}
                        >
                          {row.whatsapp}
                        </a>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "999px",
                            backgroundColor: cfg.bg,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: cfg.color,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {cfg.label}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontFamily: "'Inter', sans-serif",
                          color: "#A8B2C7",
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(row.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {statusUpdating === row.id ? (
                          <Loader2 size={14} className="animate-spin" style={{ color: "#D4A017" }} />
                        ) : (
                          <select
                            value={row.status}
                            onChange={(e) => handleStatusChange(row.id, e.target.value)}
                            aria-label={`Change status for ${row.name}`}
                            style={{
                              padding: "6px 10px",
                              backgroundColor: "#0A0E27",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: "6px",
                              color: "#F5F5F0",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "13px",
                              cursor: "pointer",
                              outline: "none",
                              minHeight: "36px",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#D4A017")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                          >
                            {VALID_STATUSES.map((s) => {
                              const sCfg = STATUS_CONFIG[s];
                              return (
                                <option key={s} value={s}>
                                  {sCfg?.label || s}
                                </option>
                              );
                            })}
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}