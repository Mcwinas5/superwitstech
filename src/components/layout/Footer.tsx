"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Settings } from "lucide-react";
import { WA_LINK, SOCIAL_LINKS } from "@/lib/constants";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();
  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: SOCIAL_LINKS.facebook },
    { icon: Twitter, label: "Twitter", href: SOCIAL_LINKS.twitter },
    { icon: Linkedin, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
  ];

  return (
    <footer style={{ backgroundColor: "var(--sw-bg-secondary)" }}>
      {/* Main Footer */}
      <div className="py-16 md:py-20 border-t" style={{ borderColor: "var(--sw-border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <Link href="/">
                  <img
                    src={theme === "light" ? "/logo-dark.png" : "/logo.png?v=3"}
                    alt="Superwits Tech"
                    style={{ height: "36px", width: "auto" }}
                  />
                </Link>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--sw-text-muted)", lineHeight: 1.6, marginTop: "8px" }}>
                  Conversion &amp; Credibility Systems for Nigerian Service Businesses
                </p>
              </div>
              <address style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--sw-text-tertiary)", lineHeight: 1.7, fontStyle: "normal", marginBottom: "16px" }}>
                <span style={{ display: "block" }}>Superwits Tech</span>
                <span style={{ display: "block" }}>Lagos, Nigeria</span>
                <a href="tel:+2347047381879" style={{ color: "var(--sw-text-tertiary)", textDecoration: "none", transition: "color 200ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-gold-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-text-tertiary)")}>+234 704 738 1879</a>
              </address>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} style={{ color: "var(--sw-text-muted)", transition: "color 200ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-gold-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-text-muted)")}>
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "var(--sw-gold-text)", textTransform: "uppercase", marginBottom: "16px" }}>Services</h3>
              <ul className="space-y-3">
                {["Conversion Website Build", "Client Acquisition System", "Free Website Audit"].map((item) => (
                  <li key={item}>
                    {item === "Free Website Audit" ? (
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--sw-text-muted)", textDecoration: "none", transition: "color 200ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-text-muted)")}>{item}</a>
                    ) : (
                      <Link href="/services" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--sw-text-muted)", textDecoration: "none", transition: "color 200ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-text-muted)")}>{item}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "var(--sw-gold-text)", textTransform: "uppercase", marginBottom: "16px" }}>Company</h3>
              <ul className="space-y-3">
                {[{ label: "About", href: "/about" }, { label: "Results", href: "/results" }, { label: "Contact", href: "/contact" }].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--sw-text-muted)", textDecoration: "none", transition: "color 200ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-text-muted)")}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "var(--sw-gold-text)", textTransform: "uppercase", marginBottom: "16px" }}>Ready to Convert?</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--sw-text-muted)", marginBottom: "16px", lineHeight: 1.6 }}>Free audit. No commitment. Delivered in 48 hours.</p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="cta-solid footer-cta block text-center" style={{ width: "100%", padding: "12px 24px", borderRadius: "16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, backgroundColor: "#D4A017", color: "#0A1128", textDecoration: "none", minHeight: "44px", lineHeight: "20px" }}>
                Get My Free Website Audit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-3 border-t" style={{ backgroundColor: "var(--sw-bg)", borderColor: "var(--sw-border)", minHeight: "48px", display: "flex", alignItems: "center" }}>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--sw-text-tertiary)" }}>
            &copy; 2026 Superwits Tech. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <Link href="/admin/dashboard" aria-label="Admin" style={{ color: "var(--sw-text-tertiary)", transition: "color 200ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-gold-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-text-tertiary)")}>
              <Settings size={14} />
            </Link>
            <span style={{ color: "var(--sw-border)" }}>|</span>
            <Link href="/privacy" style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--sw-text-tertiary)", textDecoration: "none", transition: "color 200ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-text-tertiary)")}>Privacy Policy</Link>
            <span style={{ color: "var(--sw-text-tertiary)" }}>|</span>
            <Link href="/terms" style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--sw-text-tertiary)", textDecoration: "none", transition: "color 200ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-text-tertiary)")}>Terms of Service</Link>
            <span style={{ color: "var(--sw-text-tertiary)" }}>|</span>
            <button onClick={() => { localStorage.removeItem("sw_cookie_consent"); window.location.reload(); }} style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--sw-text-tertiary)", background: "none", border: "none", padding: 0, cursor: "pointer" }} aria-label="Manage cookie preferences">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}