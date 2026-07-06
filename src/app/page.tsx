"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import CookieConsent from "@/components/layout/CookieConsent";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { WA_LINK } from "@/lib/constants";

/* ────────────────────────────────────────────────
   Shared style helpers
   ──────────────────────────────────────────────── */
const FONTS = {
  syne: "'Syne', sans-serif",
  inter: "'Inter', sans-serif",
  mono: "'DM Mono', monospace",
};

const COLORS = {
  bg: "#07122A",
  card: "#0F1F3D",
  amber: "#D97706",
  amberHover: "#F59E0B",
  text: "#F1F5F9",
  muted: "#94A3B8",
  border: "#1A3260",
  green: "#4ADE80",
  red: "#DC2626",
};

/* ────────────────────────────────────────────────
   Reusable CTA button
   ──────────────────────────────────────────────── */
function WhatsAppCTA({
  children = "Get My Free Website Audit",
  variant = "solid",
  size = "md",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "solid" | "solid-dark" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "10px 20px", fontSize: "14px", minHeight: "44px" },
    md: { padding: "14px 28px", fontSize: "16px", minHeight: "52px" },
    lg: { padding: "18px 36px", fontSize: "18px", minHeight: "60px" },
  };

  const base: React.CSSProperties = {
    ...sizeStyles[size],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "8px",
    fontFamily: FONTS.inter,
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    solid: {
      ...base,
      backgroundColor: COLORS.amber,
      color: "#FFFFFF",
      border: "none",
    },
    "solid-dark": {
      ...base,
      backgroundColor: COLORS.bg,
      color: COLORS.amber,
      border: `1.5px solid ${COLORS.amber}`,
    },
    outline: {
      ...base,
      backgroundColor: "transparent",
      color: COLORS.amber,
      border: `1.5px solid ${COLORS.amber}`,
    },
  };

  const variantClass = `cta-${variant}`;

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantClass} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </a>
  );
}

/* ────────────────────────────────────────────────
   Section wrapper
   ──────────────────────────────────────────────── */
function Section({
  id,
  children,
  style,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${className}`}
      style={{ backgroundColor: COLORS.bg, ...style }}
    >
      {children}
    </section>
  );
}

/* ────────────────────────────────────────────────
   FAQ Accordion Item
   ──────────────────────────────────────────────── */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (isOpen && bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className={`faq-item${isOpen ? " faq-item--open" : ""}`}
      style={{
        backgroundColor: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="faq-trigger"
        style={{
          fontFamily: FONTS.syne,
          fontWeight: 600,
          fontSize: "16px",
          color: COLORS.text,
          padding: "20px 24px",
          cursor: "pointer",
          border: "none",
          background: "none",
          width: "100%",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {question}
        <span
          className="faq-icon"
          aria-hidden="true"
          style={{
            fontFamily: FONTS.mono,
            fontSize: "20px",
            color: COLORS.amber,
            flexShrink: 0,
            display: "inline-block",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>
      <div
        ref={bodyRef}
        className="faq-body"
        style={{
          maxHeight: isOpen ? height : 0,
          overflow: "hidden",
          transition: reduced
            ? "none"
            : isOpen
              ? "max-height 320ms cubic-bezier(0.4, 0, 0.2, 1)"
              : "max-height 260ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            borderTop: `1px solid ${COLORS.border}`,
            padding: "20px 24px",
          }}
        >
          <p
            className="faq-answer"
            style={{
              fontFamily: FONTS.inter,
              fontSize: "15px",
              color: COLORS.muted,
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────── */
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = useCallback((idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Superwits Tech",
            url: "https://superwitstech.com",
            logo: "https://superwitstech.com/logo.png",
            description:
              "Conversion & Credibility Systems for Nigerian Service Businesses. We build websites that turn visitors into clients.",
            founder: {
              "@type": "Person",
              name: "Marquis Festus",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lagos",
              addressCountry: "NG",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+234-704-738-1879",
              contactType: "customer service",
              availableLanguage: ["English"],
            },
            sameAs: [
              "https://www.facebook.com/marquis.festus",
              "https://www.twitter.com/MarquisBuilds",
              "https://www.linkedin.com/in/marquis-festus/",
              "https://www.instagram.com/marquisbuilds",
            ],
            areaServed: "Nigeria",
            serviceType: [
              "Website Design",
              "Conversion Optimization",
              "Client Acquisition Systems",
              "Website Audit",
            ],
          }),
        }}
      />

      {/* ── Navigation ── */}
      <Navigation />

      <main>
        {/* ══════════════════════════════════════════
            1. HERO SECTION
            ══════════════════════════════════════════ */}
        <section
          className="hero-section flex items-center"
          style={{
            backgroundColor: COLORS.bg,
            minHeight: "90vh",
            paddingTop: "80px",
            paddingBottom: "24px",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative" style={{ zIndex: 1 }}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-4 items-stretch">
              {/* Left Column */}
              <div className="flex flex-col justify-center">
                {/* Eyebrow Copy */}
                <span
                  style={{
                    fontFamily: FONTS.inter,
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    color: "#1E6FFF",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "14px",
                  }}
                >
                  FOR NIGERIAN CLINICS, COACHES &amp; E-COMMERCE BRANDS
                </span>

                {/* Headline */}
                <h1
                  style={{
                    fontFamily: FONTS.syne,
                    fontWeight: 800,
                    fontSize: "clamp(28px, 4.4vw, 40px)",
                    lineHeight: 1.15,
                    color: COLORS.text,
                    marginBottom: "24px",
                  }}
                >
                  Your Website Should Be Bringing You Clients.{" "}
                  <span style={{ color: COLORS.amber }}>Right Now, It Is Not.</span>
                </h1>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: FONTS.inter,
                    fontSize: "clamp(16px, 2vw, 18px)",
                    lineHeight: 1.75,
                    color: COLORS.muted,
                    marginBottom: "32px",
                    maxWidth: "540px",
                  }}
                >
                  Your next client is already searching — and landing on a competitor's site. Conversion &amp; Credibility Systems fix that. Built for Nigerian clinics, coaches, and e-commerce brands. Delivered in days, not months.
                </p>

                {/* Proof line */}
                <p
                  style={{
                    fontFamily: FONTS.inter,
                    fontSize: "13px",
                    fontStyle: "italic",
                    color: "rgba(241,245,249,0.65)",
                    borderLeft: "2px solid #F0B429",
                    paddingLeft: "10px",
                    margin: "20px 0 24px 0",
                    maxWidth: "480px",
                  }}
                >
                  A Lagos clinic went from 3 to 18 weekly bookings after a rebuild. Same traffic. Zero ad spend.
                </p>

                {/* Fear-buster micro-copy — above CTA */}
                <p
                  style={{
                    fontFamily: FONTS.inter,
                    fontSize: "14px",
                    color: COLORS.muted,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ color: COLORS.green }}>✓</span> Free
                  <span style={{ color: COLORS.green }}>✓</span> No Commitment
                  <span style={{ color: COLORS.green }}>✓</span> 5-Minute Video
                </p>

                {/* CTA */}
                <div style={{ marginBottom: "28px" }}>
                  <WhatsAppCTA size="lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="20"
                      height="20"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Get My Free Website Audit
                  </WhatsAppCTA>
                </div>

                {/* Trust Badges */}
                <div
                  className="flex flex-wrap gap-3"
                  style={{ marginBottom: "20px" }}
                >
                  {["Built with AI", "Delivered in Days", "Designed to Convert"].map(
                    (badge) => (
                      <span
                        key={badge}
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: "12px",
                          fontWeight: 500,
                          letterSpacing: "0.5px",
                          color: COLORS.amber,
                          backgroundColor: "rgba(217,119,6,0.12)",
                          border: `1px solid rgba(217,119,6,0.25)`,
                          borderRadius: "6px",
                          padding: "6px 14px",
                        }}
                      >
                        {badge}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Right Column — Hero Image */}
              <div
                className="hero-image-frame"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <img
                  src="/hero-image.png"
                  alt="Superwits Tech — Conversion & Credibility Systems for Nigerian Service Businesses"
                  className="hero-portrait"
                  loading="eager"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "53% 40%",
                    transform: "scale(1.1)",
                    transformOrigin: "53% 28%",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Section separator ── */}
        <div className="section-separator" aria-hidden="true"></div>

        {/* ══════════════════════════════════════════
            2. SOCIAL PROOF BAR
            ══════════════════════════════════════════ */}
        <section style={{ backgroundColor: COLORS.card, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-10 md:pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  stat: "6–15%",
                  _delay: "0",
                  label: "Conversion Rate Target",
                  description: "We aim for 6–15% — not the 1% industry average.",
                },
                {
                  stat: "Days",
                  _delay: "80",
                  label: "Delivery Time",
                  description: "AI-accelerated builds delivered in days, not weeks.",
                },
                {
                  stat: "3 Niches",
                  _delay: "160",
                  label: "Specialised Focus",
                  description: "Clinics · Coaches · E-commerce",
                },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="reveal"
                  data-delay={item._delay}
                  style={{
                    backgroundColor: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderLeft: `3px solid ${COLORS.amber}`,
                    borderRadius: "8px",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.syne,
                      fontWeight: 800,
                      fontSize: "clamp(32px, 5vw, 44px)",
                      color: COLORS.amber,
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      marginBottom: "8px",
                    }}
                  >
                    {item.stat}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color: COLORS.amber,
                      marginBottom: "6px",
                    }}
                  >
                    {item.label}
                  </div>
                  <p
                    style={{
                      fontFamily: FONTS.inter,
                      fontSize: "14px",
                      color: COLORS.muted,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section separator ── */}
        <div className="section-separator" aria-hidden="true"></div>

        {/* ══════════════════════════════════════════
            3. PROBLEM SECTION
            ══════════════════════════════════════════ */}
        <Section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Headline */}
            <h2
              className="reveal"
              style={{
                fontFamily: FONTS.syne,
                fontWeight: 700,
                fontSize: "clamp(22px, 4.5vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: COLORS.text,
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              The Problem Is Not Your Product.{" "}
              <span style={{ color: COLORS.amber }}>
                It Is Your Digital Presence.
              </span>
            </h2>

            <p
              style={{
                fontFamily: FONTS.inter,
                fontSize: "18px",
                color: COLORS.muted,
                textAlign: "center",
                lineHeight: 1.75,
                maxWidth: "680px",
                margin: "0 auto 40px",
              }}
            >
              Most Nigerian service businesses have websites that look fine but
              convert below <strong style={{ color: COLORS.text }}>1%</strong>.
              That means for every 100 people who visit, fewer than 1 becomes a
              client. The product is good. The messaging is not.
            </p>

            {/* Three paragraphs */}
            <div
              className="space-y-6 mb-12"
              style={{ maxWidth: "680px", margin: "0 auto 40px" }}
            >
              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "16px",
                  color: COLORS.muted,
                  lineHeight: 1.75,
                }}
              >
                You invested in a website. You were told it would bring leads.
                Months later, you are still relying on word of mouth and
                referrals while your competitors — with worse services — rank
                higher, look more credible, and close more clients online.
              </p>
              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "16px",
                  color: COLORS.muted,
                  lineHeight: 1.75,
                }}
              >
                The real issue is not aesthetics. It is architecture. Your
                website is not built to guide a visitor from curiosity to
                conviction to action. It is a brochure, not a system.
              </p>
              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "16px",
                  color: COLORS.muted,
                  lineHeight: 1.75,
                }}
              >
                Nigerian service businesses — clinics, coaches, e-commerce
                brands — lose millions of naira every month to websites that
                do not convert. We fix that.
              </p>
            </div>

            {/* Pain Point Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Vague Headlines",
                  description:
                    "Your headline says what you do, not why the visitor should care. They leave in 5 seconds.",
                },
                {
                  title: "Invisible Proof",
                  description:
                    "No testimonials, no case studies, no data. Visitors have no reason to trust you over the next option.",
                },
                {
                  title: "Competing CTAs",
                  description:
                    '"Call us", "Subscribe", "Follow us", "Learn more" — all fighting for attention. Nothing gets clicked.',
                },
              ].map((pain, idx) => (
                <div
                  key={pain.title}
                  className="reveal"
                  data-delay={String(idx * 80)}
                  style={{
                    backgroundColor: COLORS.card,
                    border: `1.5px solid ${COLORS.red}`,
                    borderRadius: "10px",
                    padding: "28px 24px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.syne,
                      fontWeight: 700,
                      fontSize: "18px",
                      color: COLORS.red,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      marginBottom: "10px",
                    }}
                  >
                    {pain.title}
                  </div>
                  <p
                    style={{
                      fontFamily: FONTS.inter,
                      fontSize: "15px",
                      color: COLORS.muted,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {pain.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <WhatsAppCTA>Get My Free Website Audit</WhatsAppCTA>
            </div>
          </div>
        </Section>

        {/* ── Section separator ── */}
        <div className="section-separator" aria-hidden="true"></div>

        {/* ══════════════════════════════════════════
            4. SYSTEM EXPLANATION
            ══════════════════════════════════════════ */}
        <Section
          style={{ backgroundColor: COLORS.card, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="reveal"
              style={{
                fontFamily: FONTS.syne,
                fontWeight: 700,
                fontSize: "clamp(22px, 4.5vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: COLORS.text,
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              The Superwits Tech System:{" "}
              <span style={{ color: COLORS.amber }}>
                Conversion Architecture That Works
              </span>
            </h2>

            <p
              style={{
                fontFamily: FONTS.inter,
                fontSize: "18px",
                color: COLORS.muted,
                textAlign: "center",
                lineHeight: 1.75,
                maxWidth: "680px",
                margin: "0 auto 40px",
              }}
            >
              Every visitor who lands on your website is asking three questions —
              in this exact order. Your site must answer each one clearly before
              they move to the next.
            </p>

            <div className="space-y-8" style={{ maxWidth: "640px", margin: "0 auto" }}>
              {[
                {
                  number: "01",
                  question: "What do you do, and is it for me?",
                  answer:
                    "In under 5 seconds, a visitor must know exactly what you offer and who it is for. Your headline, sub-headline, and above-the-fold content must be laser-specific.",
                },
                {
                  number: "02",
                  question: "Can I trust you?",
                  answer:
                    "Social proof, case studies, professional design, and clear credentials answer this. We build credibility layers into every section of the page.",
                },
                {
                  number: "03",
                  question: "What do I do next?",
                  answer:
                    "One clear action per page. No confusion, no competing buttons. We design a single, obvious next step that moves the visitor toward becoming a client.",
                },
              ].map((item, idx) => (
                <div
                  key={item.number}
                  className="reveal flex gap-6 items-start"
                  data-delay={String(idx * 80)}
                >
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: "14px",
                      fontWeight: 500,
                      color: COLORS.amber,
                      flexShrink: 0,
                      marginTop: "4px",
                      minWidth: "32px",
                    }}
                  >
                    {item.number}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: FONTS.syne,
                        fontWeight: 700,
                        fontSize: "20px",
                        color: COLORS.text,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                        marginBottom: "8px",
                      }}
                    >
                      {item.question}
                    </h3>
                    <p
                      style={{
                        fontFamily: FONTS.inter,
                        fontSize: "16px",
                        color: COLORS.muted,
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            5. HOW IT WORKS
            ══════════════════════════════════════════ */}
        <Section id="how-it-works">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="reveal"
              style={{
                fontFamily: FONTS.syne,
                fontWeight: 700,
                fontSize: "clamp(22px, 4.5vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: COLORS.text,
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              How It Works
            </h2>
            <p
              style={{
                fontFamily: FONTS.inter,
                fontSize: "18px",
                color: COLORS.muted,
                textAlign: "center",
                lineHeight: 1.75,
                maxWidth: "560px",
                margin: "0 auto 48px",
              }}
            >
              Three simple steps. No upfront payment. No commitment. Just
              results.
            </p>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mb-12">
              {[
                {
                  step: 1,
                  title: "Audit",
                  description:
                    "Free 5-minute Loom video reviewing your current site, identifying conversion leaks, and showing you exactly what to fix.",
                },
                {
                  step: 2,
                  title: "Strategy",
                  description:
                    "We align on ONE clear conversion goal for your site — whether that is bookings, inquiries, or purchases.",
                },
                {
                  step: 3,
                  title: "Build & Launch",
                  description:
                    "Your conversion system is built and launched in days, not weeks. AI-accelerated, human-directed.",
                },
              ].map((item, idx) => (
                <div key={item.step} className="reveal relative flex flex-col items-center text-center px-4" data-delay={String(idx * 80)}>
                  {/* Dashed connector (desktop only, between items) */}
                  {idx < 2 && (
                    <div
                      className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)]"
                      style={{
                        borderTop: "2px dashed #1A3260",
                        height: 0,
                      }}
                    />
                  )}

                  {/* Number circle */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: COLORS.amber,
                      color: "#FFFFFF",
                      fontFamily: FONTS.syne,
                      fontWeight: 800,
                      fontSize: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {item.step}
                  </div>

                  <h3
                    style={{
                      fontFamily: FONTS.syne,
                      fontWeight: 700,
                      fontSize: "22px",
                      color: COLORS.text,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      marginBottom: "10px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONTS.inter,
                      fontSize: "15px",
                      color: COLORS.muted,
                      lineHeight: 1.7,
                      margin: 0,
                      maxWidth: "300px",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <WhatsAppCTA>Get My Free Website Audit</WhatsAppCTA>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            6. CASE STUDIES
            ══════════════════════════════════════════ */}
        <Section
          id="case-studies"
          style={{
            backgroundColor: COLORS.card,
            borderTop: `1px solid ${COLORS.border}`,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: COLORS.amber,
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Real Results
              </span>
              <h2
                className="reveal"
                style={{
                  fontFamily: FONTS.syne,
                  fontWeight: 700,
                  fontSize: "clamp(22px, 4.5vw, 36px)",
                  lineHeight: 1.15,
                letterSpacing: "-0.02em",
                  color: COLORS.text,
                  marginBottom: "12px",
                }}
              >
                Before &amp; After: What Our Systems Actually Do
              </h2>
              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "16px",
                  color: COLORS.muted,
                  lineHeight: 1.75,
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                These are real outcomes from real Nigerian businesses. No
                inflated numbers, no cherry-picked metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: "Project: Aesthetic Clinic \u00b7 Lagos, Nigeria",
                  before: "3",
                  beforeLabel: "weekly bookings",
                  after: "18",
                  afterLabel: "weekly bookings",
                  description:
                    "A complete website rebuild focused on trust signals and a single booking CTA.",
                  quote: "\u201cWe went from chasing referrals to waking up to booking requests.\u201d \u2014 Clinic Director",
                },
                {
                  label: "Project: Business Coach \u00b7 Abuja, Nigeria",
                  before: "0",
                  beforeLabel: "inquiries (ever)",
                  after: "First inquiry",
                  afterLabel: "in 72 hours",
                  description:
                    "From invisible online presence to generating qualified leads in under 3 days.",
                  quote: "\u201cThe first inbound inquiry came in 72 hours after launch.\u201d \u2014 Business Coach, Abuja",
                },
                {
                  label: "Project: E-Commerce Brand \u00b7 Nigeria",
                  before: "0.8%",
                  beforeLabel: "conversion rate",
                  after: "6.2%",
                  afterLabel: "conversion rate",
                  description:
                    "Conversion architecture overhaul turned a struggling store into a revenue engine.",
                  quote: "\u201cSame traffic, same ads \u2014 6.2% conversion rate in three weeks.\u201d \u2014 Founder",
                },
              ].map((cs, idx) => (
                <div
                  key={cs.label}
                  className="reveal"
                  data-delay={String(idx * 80)}
                  style={{
                    backgroundColor: COLORS.bg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "10px",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Label badge */}
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      backgroundColor: COLORS.amber,
                      color: "#FFFFFF",
                      borderRadius: "4px",
                      padding: "4px 12px",
                      display: "inline-block",
                      width: "fit-content",
                      marginBottom: "24px",
                    }}
                  >
                    {cs.label}
                  </span>

                  {/* Before / After */}
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <div
                        style={{
                          fontFamily: FONTS.syne,
                          fontWeight: 800,
                          fontSize: "28px",
                          color: COLORS.red,
                          lineHeight: 1,
                        }}
                      >
                        {cs.before}
                      </div>
                      <div
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: "11px",
                          color: COLORS.muted,
                          marginTop: "4px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {cs.beforeLabel}
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: "18px",
                        color: COLORS.border,
                      }}
                    >
                      →
                    </span>

                    <div>
                      <div
                        style={{
                          fontFamily: FONTS.syne,
                          fontWeight: 800,
                          fontSize: "28px",
                          color: COLORS.green,
                          lineHeight: 1,
                        }}
                      >
                        {cs.after}
                      </div>
                      <div
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: "11px",
                          color: COLORS.muted,
                          marginTop: "4px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {cs.afterLabel}
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: FONTS.inter,
                      fontSize: "15px",
                      color: COLORS.muted,
                      lineHeight: 1.6,
                      margin: "0 auto 20px 0",
                      flex: 1,
                    }}
                  >
                    {cs.description}
                  </p>

                  {cs.quote && (
                    <p
                      style={{
                        fontFamily: FONTS.inter,
                        fontSize: "12px",
                        fontStyle: "italic",
                        color: COLORS.muted,
                        lineHeight: 1.5,
                        margin: "0 0 16px 0",
                      }}
                    >
                      {cs.quote}
                    </p>
                  )}

                  <WhatsAppCTA variant="outline" size="sm">
                    Get Similar Results
                  </WhatsAppCTA>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            7. SERVICES OVERVIEW
            ══════════════════════════════════════════ */}
        <Section id="services">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: COLORS.amber,
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                What We Offer
              </span>
              <h2
                className="reveal"
                style={{
                  fontFamily: FONTS.syne,
                  fontWeight: 700,
                  fontSize: "clamp(22px, 4.5vw, 36px)",
                  lineHeight: 1.15,
                letterSpacing: "-0.02em",
                  color: COLORS.text,
                  marginBottom: "12px",
                }}
              >
                Services Built for Conversion
              </h2>
              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "16px",
                  color: COLORS.muted,
                  lineHeight: 1.75,
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                Every service is designed with one goal: turn your website into a
                client-getting machine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Conversion Website Build",
                  description:
                    "A complete website designed and built around ONE conversion goal. Every section, every word, every element exists to move visitors toward action.",
                  featured: false,
                  cta: "Rebuild My Site for Conversion",
                },
                {
                  title: "Client Acquisition System",
                  description:
                    "A full-funnel system — landing page, lead magnet, follow-up automation, and conversion tracking. Not just a website. A machine.",
                  featured: true,
                  cta: "Build My Client Acquisition System",
                },
                {
                  title: "Website Audit & Strategy",
                  description:
                    "A 5-minute Loom video reviewing your current site, identifying the 3 biggest conversion leaks, and giving you an action plan.",
                  featured: false,
                  cta: "Get My Free Audit",
                },
              ].map((svc, idx) => (
                <div
                  key={svc.title}
                  className="reveal"
                  data-delay={String(idx * 80)}
                  style={{
                    backgroundColor: svc.featured ? COLORS.amber : COLORS.card,
                    border: svc.featured
                      ? `2px solid ${COLORS.amber}`
                      : `1px solid ${COLORS.border}`,
                    borderRadius: "12px",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {svc.featured && (
                    <span
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        backgroundColor: COLORS.bg,
                        color: COLORS.amber,
                        borderRadius: "4px",
                        padding: "4px 12px",
                        display: "inline-block",
                        width: "fit-content",
                        marginBottom: "20px",
                      }}
                    >
                      Most Popular
                    </span>
                  )}

                  <h3
                    style={{
                      fontFamily: FONTS.syne,
                      fontWeight: 700,
                      fontSize: "22px",
                      color: svc.featured ? COLORS.bg : COLORS.text,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      marginBottom: "12px",
                    }}
                  >
                    {svc.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: FONTS.inter,
                      fontSize: "15px",
                      color: svc.featured
                        ? "rgba(7,18,42,0.75)"
                        : COLORS.muted,
                      lineHeight: 1.7,
                      margin: "0 0 24px 0",
                      flex: 1,
                    }}
                  >
                    {svc.description}
                  </p>

                  <WhatsAppCTA
                    variant={svc.featured ? "solid-dark" : "outline"}
                    size="sm"
                  >
                    {svc.cta}
                  </WhatsAppCTA>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            8. WHY SUPERWITS TECH
            ══════════════════════════════════════════ */}
        <Section
          style={{
            backgroundColor: COLORS.card,
            borderTop: `1px solid ${COLORS.border}`,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="reveal"
                style={{
                  fontFamily: FONTS.syne,
                  fontWeight: 700,
                  fontSize: "clamp(22px, 4.5vw, 36px)",
                  lineHeight: 1.15,
                letterSpacing: "-0.02em",
                  color: COLORS.text,
                  marginBottom: "12px",
                }}
              >
                Why Superwits Tech?
              </h2>
              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "16px",
                  color: COLORS.muted,
                  lineHeight: 1.75,
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                Six reasons Nigerian businesses choose us over traditional web
                designers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: "Conversion-First, Not Design-First",
                  description:
                    "We do not start with colors and fonts. We start with your conversion goal and build every element around it.",
                },
                {
                  title: "Built with AI — Delivered in Days",
                  description:
                    "We use AI to accelerate development without sacrificing quality. What takes others weeks, we deliver in days.",
                },
                {
                  title: "Nigerian Context. International Standard.",
                  description:
                    "We understand the Nigerian market — trust signals, payment preferences, mobile-first behaviour — and apply global conversion best practices.",
                },
                {
                  title: "The 7 Pillars Framework",
                  description:
                    "Every website we build follows our proprietary 7 Pillars of Conversion Architecture. No guesswork. No shortcuts.",
                },
                {
                  title: "Proof-Led, Not Promise-Led",
                  description:
                    "We show you real case studies, real numbers, and real outcomes before you commit to anything.",
                },
                {
                  title: "One Goal Per Page",
                  description:
                    "No competing CTAs. No confusion. Every page has a single, measurable objective that drives the visitor toward becoming a client.",
                },
              ].map((diff, idx) => {
                const pairDelay = Math.floor(idx / 2) * 80;
                const inPairDelay = (idx % 2) * 80;
                return (
                <div
                  key={diff.title}
                  className="reveal"
                  data-delay={String(pairDelay + inPairDelay)}
                  style={{
                    backgroundColor: COLORS.bg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "10px",
                    padding: "24px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: FONTS.syne,
                      fontWeight: 700,
                      fontSize: "18px",
                      color: COLORS.text,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      marginBottom: "8px",
                    }}
                  >
                    {diff.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONTS.inter,
                      fontSize: "15px",
                      color: COLORS.muted,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {diff.description}
                  </p>
                </div>
              );
              })}
            </div>

            {/* Mid-page CTA */}
            <div className="text-center">
              <p
                style={{
                  fontFamily: FONTS.syne,
                  fontWeight: 700,
                  fontSize: "clamp(18px, 3vw, 24px)",
                  color: COLORS.amber,
                  marginBottom: "20px",
                }}
              >
                Which One Is Costing You Clients Right Now?
              </p>
              <WhatsAppCTA>Get My Free Website Audit</WhatsAppCTA>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            9. FAQ ACCORDION
            ══════════════════════════════════════════ */}
        <Section>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                style={{
                  fontFamily: FONTS.syne,
                  fontWeight: 700,
                  fontSize: "clamp(22px, 4.5vw, 36px)",
                  lineHeight: 1.15,
                letterSpacing: "-0.02em",
                  color: COLORS.text,
                  marginBottom: "12px",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "16px",
                  color: COLORS.muted,
                  lineHeight: 1.75,
                }}
              >
                Honest answers to the questions we hear most.
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {[
                {
                  q: "I've paid for websites before and they didn't work. Why will this be different?",
                  a: "Because we do not build 'websites' — we build conversion systems. Every page has a single goal, backed by our 7 Pillars Framework. We measure success by clients acquired, not pages delivered. Plus, we start with a free audit so you can see the problems before spending a naira.",
                },
                {
                  q: "How much does it cost?",
                  a: "The free audit is, well, free \u2014 no strings attached. For full builds, pricing depends on the scope and your conversion goals. We will give you a clear quote during the strategy call with no hidden fees. Think of it this way: what is one new client worth to your business?",
                },
                {
                  q: "How long does it take?",
                  a: "AI-accelerated builds are delivered in days, not weeks. A typical Conversion Website Build takes 5\u201310 business days. A Client Acquisition System may take 2\u20133 weeks including follow-up automation setup.",
                },
                {
                  q: "My clients don't really use the internet...",
                  a: "They do \u2014 more than you think. Over 60% of Nigerians are online, and mobile internet usage is among the highest in Africa. Your ideal clients are searching Google right now for the service you offer. If they find your competitor first, they call your competitor.",
                },
                {
                  q: "Can you work with businesses outside Nigeria?",
                  a: "Yes. While our expertise is rooted in the Nigerian market, our conversion framework is universal. We have worked with businesses across West Africa and the diaspora.",
                },
                {
                  q: "What if I already have a website?",
                  a: "Perfect \u2014 that is exactly what our free audit is for. We will review your existing site, identify the conversion leaks, and show you exactly what to fix. If a rebuild makes sense, we will tell you. If a few tweaks will do it, we will tell you that too.",
                },
                {
                  q: "What do I need to provide?",
                  a: "Very little. We handle the strategy, design, copywriting, and development. You just need to share your brand assets (logo, colours if you have them), access to your domain/hosting if applicable, and 30 minutes for a strategy call. That is it.",
                },
              ].map((faq, idx) => (
                <FaqItem
                  key={faq.q}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === idx}
                  onToggle={() => toggleFaq(idx)}
                />
              ))}
            </div>

            {/* CTA after FAQ */}
            <div className="text-center">
              <WhatsAppCTA>Still Have Questions? Ask on WhatsApp</WhatsAppCTA>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            10. FINAL CTA
            ══════════════════════════════════════════ */}
        <Section>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              style={{
                backgroundColor: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "16px",
                padding: "clamp(32px, 6vw, 56px) clamp(24px, 5vw, 48px)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: COLORS.amber,
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                FREE — NO COMMITMENT
              </span>

              <h2
                className="reveal"
                style={{
                  fontFamily: FONTS.syne,
                  fontWeight: 800,
                  fontSize: "clamp(24px, 5vw, 40px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: COLORS.text,
                  marginBottom: "16px",
                }}
              >
                Get Your Free Website Audit
              </h2>

              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "17px",
                  color: COLORS.muted,
                  lineHeight: 1.75,
                  maxWidth: "480px",
                  margin: "0 auto 28px",
                }}
              >
                A free 5-minute Loom video showing exactly what is costing you clients — and the one change that would make the biggest difference. No pitch. No cost. Delivered within 48 hours.
              </p>

              <WhatsAppCTA size="lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get My Free Website Audit
              </WhatsAppCTA>

              <p
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: "13px",
                  color: COLORS.muted,
                  lineHeight: 1.6,
                  marginTop: "16px",
                  fontStyle: "italic",
                }}
              >
                P.S. If your current website converts below 3%, you are leaving
                money on the table every single day. Let us show you exactly
                where.
              </p>
            </div>
          </div>
        </Section>
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Floating WhatsApp Button (renders conditionally) ── */}
      <FloatingWhatsAppButton />

      {/* ── Cookie Consent (renders conditionally) ── */}
      <CookieConsent />
      <ScrollReveal />
    </>
  );
}