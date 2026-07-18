"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { WA_LINK } from "@/lib/constants";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

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
        backgroundColor: "var(--sw-bg)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--sw-border)" : "none",
      }}
    >
      <style>{`.nav-logo-wrap{display:flex;align-items:center}.nav-logo-img{height:56px!important;width:auto!important;max-width:none!important}@media(max-width:767px){.nav-logo-img{height:40px!important}}`}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ height: "clamp(64px, 10vw, 72px)" }}>
          {/* Logo */}
          <Link href="/" className="nav-logo-wrap">
            <img
              src="/logo.png?v=3"
              alt="Superwits Tech"
              className="nav-logo-img"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="transition-colors duration-200"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: isActive(link.path) ? "var(--sw-text)" : "var(--sw-text-muted)",
                  textDecoration: isActive(link.path) ? "underline" : "none",
                  textDecorationColor: "#D4A017",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "6px",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--sw-text)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = isActive(link.path) ? "var(--sw-text)" : "var(--sw-text-muted)")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop: Theme Toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-solid nav-cta"
              style={{
                display: "inline-block",
                padding: "8px 20px",
                borderRadius: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor: "#D4A017",
                color: "#0A1128",
                textDecoration: "none",
                minHeight: "40px",
                lineHeight: "24px",
              }}
            >
              Get Free Audit
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{ width: "36px", height: "36px", minWidth: "36px", minHeight: "36px" }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              style={{ color: "var(--sw-gold-text)", background: "none", border: "none", minWidth: "48px", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
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
          style={{ backgroundColor: "var(--sw-bg)" }}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-4 p-2"
            style={{ color: "var(--sw-gold-text)", background: "none", border: "none" }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center space-y-8 w-full px-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: isActive(link.path) ? "var(--sw-gold-text)" : "var(--sw-text-muted)",
                  cursor: "pointer",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "100%",
                padding: "16px 24px",
                borderRadius: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                backgroundColor: "#D4A017",
                color: "#0A1128",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "16px",
                transition: "background-color 0.2s ease",
              }}
            >
              Get My Free Website Audit
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}