"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";

export default function AdminAnalyticsPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "admin") {
          router.push("/admin");
        }
      })
      .catch(() => {
        router.push("/admin");
      });
  }, [router]);

  return (
    <div style={{ backgroundColor: "#07122A", minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: "#0C1421",
          borderBottom: "1px solid #1A3260",
          padding: "16px 24px",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 transition-colors"
              style={{ color: "#94A3B8", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
            >
              <ArrowLeft size={18} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "18px",
              }}
            >
              <span style={{ color: "#F1F5F9" }}>Superwits</span>
              <span style={{ color: "#D97706" }}> tech</span>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-6 flex items-center justify-center"
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              backgroundColor: "#1C1306",
              border: "1px solid #1A3260",
            }}
          >
            <BarChart3 size={32} style={{ color: "#D97706" }} />
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 5vw, 36px)",
              color: "#F1F5F9",
              marginBottom: "16px",
            }}
          >
            Performance Analytics
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              color: "#94A3B8",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            Analytics dashboard is being rebuilt. Check back soon.
          </p>
        </div>
      </main>
    </div>
  );
}