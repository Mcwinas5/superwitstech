import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { WA_LINK, trackWhatsAppClick, trackAuditCtaClick } from "@/lib/analytics";

const linkStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  color: "#94A3B8",
  transition: "color 0.2s ease",
  cursor: "pointer",
  display: "block",
};

const legalLinkStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: "11px",
  fontWeight: 400,
  color: "#8B9CB6",  /* upgraded from #475569 — passes WCAG AA on #07122A dark navy */
  transition: "color 0.2s ease",
  cursor: "pointer",
};

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/marquis.festus" },
    { icon: Twitter, label: "Twitter", href: "https://www.twitter.com/MarquisBuilds" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/marquis-festus/" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/marquisbuilds" },
  ];

  return (
    <footer style={{ backgroundColor: "#0C1421", marginBottom: 0, paddingBottom: 0 }}>
      {/* Main Footer */}
      <div
        className="py-16 md:py-20 border-t"
        style={{ borderColor: "#1A3260", paddingLeft: "clamp(16px, 4vw, 24px)", paddingRight: "clamp(16px, 4vw, 24px)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">

            {/* Column 1 — Brand */}
            <div>
              <div className="mb-6">
                <Link href="/">
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "20px",
                      fontWeight: 800,
                      marginBottom: "8px",
                      cursor: "pointer",
                      display: "inline-block",
                    }}
                  >
                    <span style={{ color: "#F1F5F9" }}>Superwits</span>
                    <span style={{ color: "#D97706" }}> tech</span>
                  </span>
                </Link>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#94A3B8",
                    lineHeight: 1.6,
                  }}
                >
                  Conversion & Credibility Systems for Nigerian Service Businesses
                </p>
              </div>

              {/* NAP Block — Name, Address, Phone for local SEO */}
              <address
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#8B9CB6",  /* upgraded from #475569 for WCAG AA contrast */
                  lineHeight: 1.7,
                  fontStyle: "normal",
                  marginBottom: "16px",
                }}
              >
                <span style={{ display: "block" }}>Superwits Tech</span>
                <span style={{ display: "block" }}>Lagos, Nigeria</span>
                <a
                   href="tel:+2347047381879"
                  style={{ color: "#8B9CB6", textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D97706")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B9CB6")}
                >
                  +234 704 738 1879
                </a>
              </address>

              {/* Social Icons — plain <a> only, no nesting */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      style={{ color: "#94A3B8", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D97706")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2 — Services */}
            <div>
              <h3
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  color: "#D97706",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  {/* Link renders its own <a> — children must NOT be <a> */}
                  <Link href="/services">
                    <span
                      style={linkStyle}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                    >
                      Conversion Website Build
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <span
                      style={linkStyle}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                    >
                      Client Acquisition System
                    </span>
                  </Link>
                </li>
                <li>
                  {/* External link — plain <a> only */}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { trackWhatsAppClick(); trackAuditCtaClick("Free Website Audit"); }}
                    style={linkStyle}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                  >
                    Free Website Audit
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 — Company */}
            <div>
              <h3
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  color: "#D97706",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about">
                    <span
                      style={linkStyle}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                    >
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/results">
                    <span
                      style={linkStyle}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                    >
                      Results
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span
                      style={linkStyle}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                    >
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 — Get Started */}
            <div>
              <h3
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  color: "#D97706",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Ready to Convert?
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#94A3B8",
                  marginBottom: "16px",
                  lineHeight: 1.6,
                }}
              >
                3 free audit slots available this week.
              </p>
              {/* CTA — plain <a> styled as button, no nested <button> inside <a> */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { trackWhatsAppClick(); trackAuditCtaClick("Get My Free Website Audit"); }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  backgroundColor: "#D97706",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  textAlign: "center",
                  minHeight: "44px",
                  lineHeight: "20px",
                  transition: "background-color 0.2s ease",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F59E0B")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#D97706")}
              >
                Get My Free Website Audit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div
        className="py-3 border-t"
        style={{
          backgroundColor: "#07122A",
          borderColor: "#1A3260",
          paddingLeft: "clamp(16px, 4vw, 24px)",
          paddingRight: "clamp(16px, 4vw, 24px)",
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              fontWeight: 400,
              color: "#8B9CB6",
            }}
          >
            © 2026 Superwits Tech. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* Legal links — Link renders <a>, children must NOT be <a> */}
            <Link href="/privacy">
              <span
                style={legalLinkStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B9CB6")}
              >
                Privacy Policy
              </span>
            </Link>
            <span style={{ color: "#8B9CB6" }}>|</span>
            <Link href="/terms">
              <span
                style={legalLinkStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B9CB6")}
              >
                Terms of Service
              </span>
            </Link>
            <span style={{ color: "#8B9CB6" }}>|</span>
            <button
              onClick={() => {
                localStorage.removeItem("sw_cookie_consent");
                window.location.reload();
              }}
              style={{
                ...legalLinkStyle,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B9CB6")}
              aria-label="Manage cookie preferences"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
