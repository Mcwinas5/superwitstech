"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#07122A" }}
    >
      <div
        className="w-full max-w-sm"
        style={{
          backgroundColor: "#0F1F3D",
          border: "1px solid #1A3260",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "22px",
            }}
          >
            <span style={{ color: "#F1F5F9" }}>Superwits</span>
            <span style={{ color: "#D97706" }}> tech</span>
          </span>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "2px",
              color: "#94A3B8",
              marginTop: "8px",
              textTransform: "uppercase",
            }}
          >
            Admin Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "1.5px",
              color: "#94A3B8",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "#0F1F3D",
              border: "1px solid #1A3260",
              borderRadius: "8px",
              color: "#F1F5F9",
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
              minHeight: "44px",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#D97706")}
            onBlur={(e) => (e.target.style.borderColor = "#1A3260")}
          />

          {error && (
            <p
              style={{
                color: "#EF4444",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                marginTop: "12px",
              }}
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: loading || !password.trim() ? "#92400E" : "#D97706",
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: loading || !password.trim() ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              minHeight: "44px",
            }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}