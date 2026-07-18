"use client";

import { useState, useEffect } from "react";
import { WA_LINK } from "@/lib/constants";

export default function FloatingWhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    const handleScroll = () => { if (window.scrollY > 200) setVisible(true); };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", handleScroll); };
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 100, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
      {hovered && (
        <div style={{ backgroundColor: "var(--sw-surface)", border: "1px solid var(--sw-border)", borderRadius: "6px", padding: "8px 14px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "var(--sw-text)", whiteSpace: "nowrap", boxShadow: "0 4px 16px var(--sw-overlay)", animation: "fadeInUp 0.15s ease" }}>
          Chat on WhatsApp
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={() => setDismissed(true)} aria-label="Dismiss WhatsApp button" className="hover:bg-blue-800 transition-colors" style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--sw-dismiss-bg)", border: "1px solid var(--sw-dismiss-border)", color: "var(--sw-text-tertiary)", fontSize: "14px", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>&times;</button>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", inset: "-4px", borderRadius: "50%", border: "2px solid #D4A017", animation: "whatsappPulse 2s ease-out infinite", pointerEvents: "none" }} />
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat with Superwits Tech on WhatsApp" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="transition-all duration-200" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "50%", backgroundColor: hovered ? "#E8B30E" : "#D4A017", boxShadow: "0 4px 20px rgba(212, 160, 23, 0.45)", transform: hovered ? "scale(1.08)" : "scale(1)", textDecoration: "none", flexShrink: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A1128" width="28" height="28" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}