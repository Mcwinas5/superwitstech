"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Settings } from "lucide-react";
import { WA_LINK, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: SOCIAL_LINKS.facebook },
    { icon: Twitter, label: "Twitter", href: SOCIAL_LINKS.twitter },
    { icon: Linkedin, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
  ];

  return (
    <footer style={{ backgroundColor: "#0C1421" }}>
      {/* Main Footer */}
      <div className="py-16 md:py-20 border-t" style={{ borderColor: "#1A3260" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <Link href="/">
                  <img
                    src="/logo.png?v=3"
                    alt="Superwits Tech"
                    style={{ height: "36px", width: "auto" }}
                  />
                </Link>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6, marginTop: "8px" }}>
                  Conversion &amp; Credibility Systems for Nigerian Service Businesses
                </p>
              </div>
              <address style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#8B9CB6", lineHeight: 1.7, fontStyle: "normal", marginBottom: "16px" }}>
                <span style={{ display: "block" }}>Superwits Tech</span>
                <span style={{ display: "block" }}>Lagos, Nigeria</span>
                <a href="tel:+2347047381879" className="hover:text-amber-500 transition-colors" style={{ color: "#8B9CB6", textDecoration: "none" }}>+234 704 738 1879</a>
              </address>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="hover:text-amber-500 transition-colors" style={{ color: "#94A3B8" }}>
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "#D97706", textTransform: "uppercase", marginBottom: "16px" }}>Services</h3>
              <ul className="space-y-3">
                {["Conversion Website Build", "Client Acquisition System", "Free Website Audit"].map((item) => (
                  <li key={item}>
                    {item === "Free Website Audit" ? (
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#94A3B8", textDecoration: "none" }}>{item}</a>
                    ) : (
                      <Link href="/services" className="hover:text-slate-100 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#94A3B8", textDecoration: "none" }}>{item}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "#D97706", textTransform: "uppercase", marginBottom: "16px" }}>Company</h3>
              <ul className="space-y-3">
                {[{ label: "About", href: "/about" }, { label: "Results", href: "/results" }, { label: "Contact", href: "/contact" }].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-slate-100 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#94A3B8", textDecoration: "none" }}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "#D97706", textTransform: "uppercase", marginBottom: "16px" }}>Ready to Convert?</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#94A3B8", marginBottom: "16px", lineHeight: 1.6 }}>Free audit. No commitment. Delivered in 48 hours.</p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="cta-solid footer-cta block text-center" style={{ width: "100%", padding: "12px 24px", borderRadius: "6px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, backgroundColor: "#D97706", color: "#FFFFFF", textDecoration: "none", minHeight: "44px", lineHeight: "20px" }}>
                Get My Free Website Audit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-3 border-t" style={{ backgroundColor: "#07122A", borderColor: "#1A3260", minHeight: "48px", display: "flex", alignItems: "center" }}>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#8B9CB6" }}>
            &copy; 2026 Superwits Tech. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <Link href="/admin/dashboard" aria-label="Admin" className="hover:text-amber-500 transition-colors" style={{ color: "#8B9CB6" }}>
              <Settings size={14} />
            </Link>
            <span style={{ color: "#1A3260" }}>|</span>
            <Link href="/privacy" className="hover:text-slate-100 transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#8B9CB6", textDecoration: "none" }}>Privacy Policy</Link>
            <span style={{ color: "#8B9CB6" }}>|</span>
            <Link href="/terms" className="hover:text-slate-100 transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#8B9CB6", textDecoration: "none" }}>Terms of Service</Link>
            <span style={{ color: "#8B9CB6" }}>|</span>
            <button onClick={() => { localStorage.removeItem("sw_cookie_consent"); window.location.reload(); }} style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#8B9CB6", background: "none", border: "none", padding: 0, cursor: "pointer" }} aria-label="Manage cookie preferences">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}