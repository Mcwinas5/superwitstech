"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type ConsentState = { analytics: boolean; marketing: boolean; functional: boolean };
const STORAGE_KEY = "sw_cookie_consent";

function applyGa4Consent(accepted: ConsentState) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("consent", "update", { analytics_storage: accepted.analytics ? "granted" : "denied" });
  gtag("consent", "update", { ad_storage: accepted.marketing ? "granted" : "denied", ad_user_data: accepted.marketing ? "granted" : "denied", ad_personalization: accepted.marketing ? "granted" : "denied" });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>({ analytics: true, marketing: true, functional: true });

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (accepted: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted, timestamp: Date.now() }));
    applyGa4Consent(accepted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Cookie consent" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999, backgroundColor: "#0C1421", borderTop: "1px solid #1A3260", padding: "20px clamp(16px, 4vw, 40px)", boxShadow: "0 -4px 24px rgba(0,0,0,0.5)", animation: "sw-slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both" }}>
      <button onClick={() => { localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissed: true, timestamp: Date.now() })); setVisible(false); }} aria-label="Close cookie consent banner" className="hover:text-slate-100 transition-colors" style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#475569", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", minHeight: "32px", minWidth: "32px" }}>
        <X size={18} />
      </button>

      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "16px", paddingRight: "32px" }}>
        <div style={{ flex: "1 1 480px", minWidth: 0 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#F1F5F9", marginBottom: "8px" }}>We respect your privacy</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
            We use cookies to enhance your experience and analyze site traffic. You can accept all, reject all, or customize your preferences.{" "}
            <Link href="/privacy" style={{ color: "#D97706", textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}>Learn more</Link>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, flexWrap: "wrap" }}>
          <button onClick={() => save({ analytics: false, marketing: false, functional: false })} className="hover:border-slate-400 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "#F1F5F9", backgroundColor: "transparent", border: "1px solid #334155", borderRadius: "6px", padding: "10px 20px", cursor: "pointer", minHeight: "44px", whiteSpace: "nowrap" }}>Reject All</button>
          <button onClick={() => save({ analytics: true, marketing: true, functional: true })} className="hover:bg-amber-500 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "#FFFFFF", backgroundColor: "#D97706", border: "none", borderRadius: "6px", padding: "10px 20px", cursor: "pointer", minHeight: "44px", whiteSpace: "nowrap" }}>Accept All</button>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "12px auto 0" }}>
        <button onClick={() => setCustomizeOpen((o) => !o)} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "#D97706", background: "none", border: "none", cursor: "pointer", padding: "4px 0", display: "flex", alignItems: "center", gap: "6px" }} aria-expanded={customizeOpen}>
          <span style={{ display: "inline-block", transition: "transform 0.2s ease", transform: customizeOpen ? "rotate(90deg)" : "rotate(0deg)", fontSize: "12px" }}>&#9654;</span>
          Customize Preferences
        </button>
        {customizeOpen && (
          <div style={{ marginTop: "16px", padding: "20px", backgroundColor: "#07122A", border: "1px solid #1A3260", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { title: "Functional Cookies", desc: "Required for the site to work correctly. Cannot be disabled.", checked: true, disabled: true, key: "func" },
              { title: "Analytics Cookies", desc: "Help us understand how visitors interact with the site (Google Analytics).", checked: prefs.analytics, disabled: false, key: "analytics" },
              { title: "Marketing Cookies", desc: "Used to deliver relevant ads and track campaign performance.", checked: prefs.marketing, disabled: false, key: "marketing" },
            ].map((item) => (
              <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "#F1F5F9", margin: "0 0 2px" }}>{item.title}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "13px", color: "#94A3B8", margin: 0 }}>{item.desc}</p>
                </div>
                <button role="switch" aria-checked={item.checked} disabled={item.disabled} onClick={() => !item.disabled && item.key === "analytics" && setPrefs((p) => ({ ...p, analytics: !p.analytics })) || !item.disabled && item.key === "marketing" && setPrefs((p) => ({ ...p, marketing: !p.marketing }))} style={{ position: "relative", width: "48px", height: "26px", borderRadius: "13px", border: "none", cursor: item.disabled ? "not-allowed" : "pointer", backgroundColor: item.checked ? "#D97706" : "#334155", transition: "background-color 0.2s ease", flexShrink: 0, opacity: item.disabled ? 0.6 : 1, padding: 0 }}>
                  <span style={{ position: "absolute", top: "3px", left: item.checked ? "25px" : "3px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#FFFFFF", transition: "left 0.2s ease", display: "block" }} />
                </button>
              </div>
            ))}
            <button onClick={() => save(prefs)} className="hover:bg-amber-500 transition-colors" style={{ alignSelf: "flex-start", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "#FFFFFF", backgroundColor: "#D97706", border: "none", borderRadius: "6px", padding: "10px 24px", cursor: "pointer", minHeight: "44px" }}>Save My Preferences</button>
          </div>
        )}
      </div>
    </div>
  );
}