import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";

// Inject the slide-in keyframe once into the document <head>
const STYLE_ID = "sw-cookie-anim";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes sw-slide-up {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// ── Types ──────────────────────────────────────────────────────────────────
type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

const STORAGE_KEY = "sw_cookie_consent";

// ── GA4 Consent Mode v2 helper ─────────────────────────────────────────────
// Calls gtag('consent', 'update', ...) to inform GA4 of the user's decision.
// This must be called from the browser context where window.gtag exists.
function applyGa4Consent(accepted: ConsentState) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;

  // Analytics storage — controls GA4 measurement
  gtag("consent", "update", {
    analytics_storage: accepted.analytics ? "granted" : "denied",
  });

  // Ad/marketing storage — controls ad personalisation & remarketing
  gtag("consent", "update", {
    ad_storage: accepted.marketing ? "granted" : "denied",
    ad_user_data: accepted.marketing ? "granted" : "denied",
    ad_personalization: accepted.marketing ? "granted" : "denied",
  });
}

// ── Component ──────────────────────────────────────────────────────────────
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>({
    analytics: true,
    marketing: true,
    functional: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Show after a short delay so the page loads first
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
    // Banner already dismissed — consent was already applied in index.html
    // on page load via the localStorage check there. Nothing more to do.
  }, []);

  const save = (accepted: ConsentState) => {
    // 1. Persist to localStorage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accepted, timestamp: Date.now() })
    );
    // 2. Immediately update GA4 Consent Mode v2
    applyGa4Consent(accepted);
    // 3. Hide the banner
    setVisible(false);
  };

  const acceptAll = () =>
    save({ analytics: true, marketing: true, functional: true });

  const rejectAll = () =>
    save({ analytics: false, marketing: false, functional: false });

  const saveCustom = () => save(prefs);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "#0C1421",
        borderTop: "1px solid #1A3260",
        padding: "20px clamp(16px, 4vw, 40px)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
        animation: "sw-slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      {/* Close button — top-right corner */}
      <button
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissed: true, timestamp: Date.now() }));
          setVisible(false);
        }}
        aria-label="Close cookie consent banner"
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#475569",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          transition: "color 0.2s ease",
          minHeight: "32px",
          minWidth: "32px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#F1F5F9";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#475569";
        }}
      >
        <X size={18} />
      </button>

      {/* Main row */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "16px",
          paddingRight: "32px",
        }}
      >
        {/* Text block */}
        <div style={{ flex: "1 1 480px", minWidth: 0 }}>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#F1F5F9",
              marginBottom: "8px",
            }}
          >
            We respect your privacy
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "#94A3B8",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We use cookies to enhance your experience and analyze site traffic.
            You can accept all, reject all, or customize your preferences.{" "}
            <Link href="/privacy">
              <span
                style={{
                  color: "#D97706",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Learn more
              </span>
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={rejectAll}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#F1F5F9",
              backgroundColor: "transparent",
              border: "1px solid #334155",
              borderRadius: "6px",
              padding: "10px 20px",
              cursor: "pointer",
              minHeight: "44px",
              transition: "border-color 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#94A3B8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#334155";
            }}
          >
            Reject All
          </button>
          <button
            onClick={acceptAll}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#FFFFFF",
              backgroundColor: "#D97706",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              cursor: "pointer",
              minHeight: "44px",
              transition: "background-color 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#F59E0B";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#D97706";
            }}
          >
            Accept All
          </button>
        </div>
      </div>

      {/* Customize Preferences toggle */}
      <div style={{ maxWidth: "1280px", margin: "12px auto 0" }}>
        <button
          onClick={() => setCustomizeOpen((o) => !o)}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#D97706",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          aria-expanded={customizeOpen}
        >
          <span
            style={{
              display: "inline-block",
              transition: "transform 0.2s ease",
              transform: customizeOpen ? "rotate(90deg)" : "rotate(0deg)",
              fontSize: "12px",
            }}
          >
            ▶
          </span>
          Customize Preferences
        </button>

        {/* Expandable preferences panel */}
        {customizeOpen && (
          <div
            style={{
              marginTop: "16px",
              padding: "20px",
              backgroundColor: "#07122A",
              border: "1px solid #1A3260",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Functional — always on */}
            <PreferenceRow
              title="Functional Cookies"
              description="Required for the site to work correctly. Cannot be disabled."
              checked={true}
              disabled
              onChange={() => {}}
            />

            {/* Analytics */}
            <PreferenceRow
              title="Analytics Cookies"
              description="Help us understand how visitors interact with the site (Google Analytics)."
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />

            {/* Marketing */}
            <PreferenceRow
              title="Marketing Cookies"
              description="Used to deliver relevant ads and track campaign performance."
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            />

            <button
              onClick={saveCustom}
              style={{
                alignSelf: "flex-start",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#FFFFFF",
                backgroundColor: "#D97706",
                border: "none",
                borderRadius: "6px",
                padding: "10px 24px",
                cursor: "pointer",
                minHeight: "44px",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#F59E0B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#D97706";
              }}
            >
              Save My Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
function PreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#F1F5F9",
            margin: "0 0 2px",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: "#94A3B8",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
      <ToggleSwitch checked={checked} disabled={disabled} onChange={onChange} />
    </div>
  );
}

function ToggleSwitch({
  checked,
  disabled = false,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      style={{
        position: "relative",
        width: "48px",
        height: "26px",
        borderRadius: "13px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: checked ? "#D97706" : "#334155",
        transition: "background-color 0.2s ease",
        flexShrink: 0,
        opacity: disabled ? 0.6 : 1,
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: checked ? "25px" : "3px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          transition: "left 0.2s ease",
          display: "block",
        }}
      />
    </button>
  );
}
