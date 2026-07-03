import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { WA_LINK, trackWhatsAppClick, trackAuditCtaClick } from "@/lib/analytics";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  const navLinks = [
    { label: "Services", path: "/services" },
    { label: "Results", path: "/results" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "#07122A",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1A3260" : "none",
        height: undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ height: "clamp(64px, 10vw, 72px)" }}>
          {/* Logo — Link renders its own <a>, do NOT nest another <a> inside */}
          <Link href="/">
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(16px, 4vw, 20px)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "#F1F5F9" }}>Superwits</span>
              <span style={{ color: "#D97706" }}> tech</span>
            </span>
          </Link>

          {/* Desktop Nav Links — Link renders its own <a>, children must NOT be <a> */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: isActive(link.path) ? "#F1F5F9" : "#94A3B8",
                    textDecoration: isActive(link.path) ? "underline" : "none",
                    textDecorationColor: isActive(link.path) ? "#D97706" : "transparent",
                    textDecorationThickness: "2px",
                    textUnderlineOffset: "6px",
                    transition: "color 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1F5F9")}
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = isActive(link.path) ? "#F1F5F9" : "#94A3B8")
                  }
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA or User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: userMenuOpen ? "#1A3260" : "transparent",
                    color: "#F1F5F9",
                    border: "1px solid #1A3260",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {user.name || "User"}
                  <ChevronDown size={16} />
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50"
                    style={{
                      backgroundColor: "#0F1F3D",
                      border: "1px solid #1A3260",
                    }}
                  >
                    <Link href="/admin/dashboard">
                      <span
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm rounded-t-lg transition-colors"
                        style={{
                          color: "#F1F5F9",
                          fontFamily: "'Inter', sans-serif",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#1A3260")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                      >
                        Dashboard
                      </span>
                    </Link>
                    <Link href="/admin/analytics">
                      <span
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm transition-colors"
                        style={{
                          color: "#F1F5F9",
                          fontFamily: "'Inter', sans-serif",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#1A3260")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                      >
                        Analytics
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm rounded-b-lg transition-colors"
                      style={{
                        color: "#F1F5F9",
                        fontFamily: "'Inter', sans-serif",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#1A3260")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { trackWhatsAppClick(); trackAuditCtaClick("Get Free Audit"); }}
                style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  borderRadius: "6px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  backgroundColor: "#D97706",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  minHeight: "40px",
                  lineHeight: "24px",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F59E0B")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#D97706")}
              >
                Get Free Audit
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              style={{ color: "#D97706", background: "none", border: "none", minWidth: "48px", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#07122A" }}
        >
          {/* Close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-4 p-2"
            style={{ color: "#D97706", background: "none", border: "none" }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center space-y-8 w-full px-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: isActive(link.path) ? "#D97706" : "#94A3B8",
                    cursor: "pointer",
                    display: "block",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}

            {/* Mobile CTA — plain <a> only */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { trackWhatsAppClick(); trackAuditCtaClick("Get My Free Website Audit"); }}
              style={{
                display: "block",
                width: "100%",
                maxWidth: "100%",
                padding: "16px 24px",
                borderRadius: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                backgroundColor: "#D97706",
                color: "#FFFFFF",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "16px",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F59E0B")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#D97706")}
            >
              Get My Free Website Audit
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
