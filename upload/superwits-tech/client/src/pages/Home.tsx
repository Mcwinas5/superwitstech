import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { WA_LINK, trackAuditCtaClick, trackWhatsAppClick } from "@/lib/analytics";

/* ─────────────────────────────────────────────────────────────
   Superwits Tech — Home Page
   Design: Dark Navy (#07122A) | Amber (#D97706) | Syne/Inter/DM Mono
   Phase 6: All mobile fixes applied — 320px / 768px / 1440px
───────────────────────────────────────────────────────────── */

const WA_CLICK = () => { trackWhatsAppClick(); trackAuditCtaClick("Get My Free Website Audit"); };

/* Shared button styles */
const primaryBtn: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  backgroundColor: "#D97706",
  color: "#FFFFFF",
  minHeight: "48px",
  width: "100%",
  display: "block",
  padding: "12px 32px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

const outlineBtn: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  borderColor: "#D97706",
  color: "#D97706",
  backgroundColor: "transparent",
  minHeight: "48px",
  width: "100%",
  display: "block",
  padding: "12px 32px",
  borderRadius: "6px",
  border: "2px solid #D97706",
  cursor: "pointer",
};

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "I've paid for websites before and they didn't work. Why will this be different?",
      answer: "Most websites are built to look good — not to convert. Every Superwits Tech build is governed by a conversion framework: one goal, clear proof, specific CTA. The measure is conversion rate, not aesthetics."
    },
    {
      question: "How much does it cost?",
      answer: "Every project is scoped after the free audit. Most builds complete within a range accessible to Nigerian SMEs. The audit is always free — no commitment, no pitch."
    },
    {
      question: "How long does it take?",
      answer: "Most builds deliver within 5–10 days from strategy sign-off. Not weeks. Not months. Days."
    },
    {
      question: "My clients don't really use the internet to find businesses like mine.",
      answer: "Your next client is searching online right now. Whether they find you — and whether your site convinces them you are the right choice — is what this system determines."
    },
    {
      question: "Can you work with businesses outside Nigeria?",
      answer: "Yes. Active clients in Nigeria, UK, US, and Canada. The system works for any service business regardless of location."
    },
    {
      question: "What if I already have a website?",
      answer: "Start with the free audit. In most cases, a conversion rebuild is faster and more cost-effective than patching an existing site. The audit will tell you exactly which path makes sense."
    },
    {
      question: "What do I need to provide?",
      answer: "Your goals, your audience, and your client results. Everything else — strategy, copy, design, and build — is handled."
    }
  ];

  const caseStudies = [
    {
      label: "Aesthetic Clinic — Lagos",
      before: "3 weekly bookings. All via WhatsApp referrals. No functioning website.",
      after: "18 patient bookings per week within 30 days of launch.",
      bridge: "New conversion-focused website with booking integration and proof above the fold."
    },
    {
      label: "Business Coach — Abuja",
      before: "Website live for 2 years. Zero inbound inquiries. All clients from word of mouth.",
      after: "First inbound discovery call booked within 72 hours of relaunch.",
      bridge: "Headline rewritten to name specific outcome. Case studies moved above the fold. Single CTA."
    },
    {
      label: "E-Commerce Brand — Nigeria",
      before: "Traffic from paid ads. Conversion rate: 0.8%. Monthly ad spend wasted.",
      after: "Conversion rate: 6.2% within 3 weeks of conversion rebuild.",
      bridge: "Product page restructure: outcome-led copy, social proof above fold, mobile checkout fix."
    }
  ];

  const services = [
    {
      title: "Conversion Website Build",
      who: "For businesses with an existing site that isn't converting",
      description: "A complete rebuild around one conversion goal — designed to turn visitors into client inquiries. Every section earns its place.",
      cta: "Get My Free Website Audit",
      ctaLink: WA_LINK,
      featured: false
    },
    {
      title: "Client Acquisition System",
      who: "For businesses with no website or a non-functional one",
      description: "Full system: website + booking integration + WhatsApp flow + proof architecture — built in days, not months.",
      cta: "Get My Free Website Audit",
      ctaLink: WA_LINK,
      featured: true,
      badge: "Most Popular"
    },
    {
      title: "Website Audit & Strategy",
      who: "For businesses unsure where their site is leaking clients",
      description: "A specific, actionable 5-minute Loom review identifying the top 3 conversion blockers. Free. No pitch.",
      cta: "Get My Free Website Audit",
      ctaLink: WA_LINK,
      featured: false
    }
  ];

  const differentiators = [
    {
      title: "Conversion-First, Not Design-First",
      description: "Every decision is measured against one question: will this increase conversions? Not: does this look good?"
    },
    {
      title: "Built with AI — Delivered in Days",
      description: "Using Manus AI and modern vibe-coding tools, full systems deliver in days, not months."
    },
    {
      title: "Nigerian Context. International Standard.",
      description: "Built for Nigerian service businesses. Designed to attract UK, US, Canadian, and Australian clients."
    },
    {
      title: "The 7 Pillars Framework",
      description: "Every project is governed by a proven conversion architecture. No guesswork. No assumptions. No wasted builds."
    },
    {
      title: "Proof-Led, Not Promise-Led",
      description: "Before/after results with specific numbers. No fabricated testimonials. No vague claims."
    },
    {
      title: "One Goal Per Page",
      description: "No competing CTAs. No confused visitors. One clear action. Every time."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07122A] flex flex-col" style={{ overflowX: "hidden" }}>
      <SEOHead
        title="Superwits Tech — Conversion Systems for Nigerian Businesses"
        description="I build Conversion & Credibility Systems for Nigerian service businesses. Turn strangers into clients. Free website audit — 3 slots per week."
        canonical="https://superwitstech.com/"
      />
      <Navigation />

      {/* ── SECTION 2 — HERO ── */}
      <section
        className="py-16 md:py-24 lg:py-32"
        style={{
          background: "linear-gradient(135deg, #07122A 0%, #0C1421 100%)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Mobile: single column (headline → sub → CTAs → badges → image) */}
          {/* Desktop: two columns side by side */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-center gap-8">

            {/* Left: Copy */}
            <div>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: "#F1F5F9",
                }}
                className="text-4xl sm:text-5xl lg:text-6xl mb-6"
              >
                Your Website Should Be Bringing You Clients.{" "}
                <span style={{ color: "#D97706" }}>Right Now, It Is Not.</span>
              </h1>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "#B8C5D6",  /* upgraded from #94A3B8 for WCAG AA */
                }}
                className="text-base sm:text-lg md:text-xl mb-8"
              >
                I build Conversion &amp; Credibility Systems for Nigerian service businesses — designed to turn strangers into paying clients. Built with AI. Delivered in days, not months.
              </p>

              {/* CTA */}
              <div className="flex flex-col mb-8">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={WA_CLICK}>
                  <button
                    className="rounded-md font-semibold transition-all duration-200 w-full sm:w-auto"
                    style={{
                      ...primaryBtn,
                      width: undefined,
                      padding: "14px 32px",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
                  >
                    Get My Free Website Audit
                  </button>
                </a>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px", textAlign: "center" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>
              </div>

              {/* Trust Badges — wrapping pill row */}
              <div className="flex flex-wrap gap-2">
                {["Built with AI", "Delivered in Days", "Designed to Convert"].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "2px",
                      backgroundColor: "#0F1F3D",
                      border: "1px solid #1A3260",
                      color: "#F59E0B",
                      padding: "8px 16px",
                      borderRadius: "100px",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="rounded-lg overflow-hidden" style={{ minHeight: "280px", height: "clamp(280px, 40vw, 480px)" }}>
              <img
                src="/manus-storage/marquis-hero-v2_6d9450f0.png"
                alt="Marquis Festus — Founder, Superwits Tech — Conversion Systems for Nigerian Service Businesses"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="2048"
                height="1143"
                className="hero-image"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% top", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — SOCIAL PROOF BAR ── */}
      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: "#0C1421", borderTop: "1px solid #1A3260", borderBottom: "1px solid #1A3260" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "#F1F5F9",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Trusted by Nigerian Service Businesses
          </p>
          {/* Mobile: single column | 768px: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: "6–15%", label: "Conversion rate target on every project" },
              { value: "Days", label: "Not months — average delivery time" },
              { value: "3 Niches", label: "Clinics · Coaches · E-commerce" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center rounded-lg"
                style={{
                  backgroundColor: "#0F1F3D",
                  border: "1px solid #1A3260",
                  borderLeft: "3px solid #D97706",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(32px, 8vw, 48px)",
                    fontWeight: 800,
                    color: "#D97706",
                    marginBottom: "8px",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#B8C5D6",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — PROBLEM SECTION ── */}
      <section className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: "#0C1421" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              color: "#F1F5F9",
              marginBottom: "24px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            The Problem Is Not Your Product. It Is Your Digital Presence.
          </h2>
          {[
            "Every Monday morning, potential clients open their laptops. They think about a problem they need to solve. They search online. They find your competitors — who look more credible, more specific, and more trustworthy than your website suggests you are.",
            "They do not call you. They do not even know you exist.",
            "This is not a traffic problem. It is a conversion problem. And it is fixable — without a redesign, without months of development, and without a six-figure budget."
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#F1F5F9",
                marginBottom: i < 2 ? "24px" : "40px",
              }}
            >
              {text}
            </p>
          ))}

          {/* Pain Point Cards — single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
            {[
              {
                title: "Your headline talks about you, not them",
                desc: "Visitors leave in 3 seconds because the page doesn't answer their first question: Is this for me?",
              },
              {
                title: "Your proof is vague or invisible",
                desc: "Trusted by hundreds of clients builds zero trust. Reduced staff turnover by 40% in 6 months converts.",
              },
              {
                title: "Too many CTAs competing for attention",
                desc: "6 options = zero decisions. Every page needs one clear, obvious next step.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#0F1F3D",
                  border: "1px solid #DC2626",
                  borderLeft: "3px solid #DC2626",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#F1F5F9",
                    marginBottom: "10px",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#B8C5D6",
                    lineHeight: 1.6,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA — full width on mobile */}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={WA_CLICK}>
            <button
              className="rounded-md font-semibold transition-all duration-200 w-full md:w-auto md:px-10"
              style={primaryBtn}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
            >
              Get My Free Website Audit
            </button>
          </a>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px", textAlign: "center" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>
        </div>
      </section>

      {/* ── SECTION 5 — SYSTEM EXPLANATION ── */}
      <section className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              color: "#F1F5F9",
              marginBottom: "24px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            The Superwits Tech System: Conversion Architecture That Works
          </h2>
          {[
            "Most websites are built to look good. Every Superwits Tech build is governed by one question: will this increase conversions?",
            "The result is not just a website. It is a client acquisition system — built to answer the three questions every potential client is silently asking:"
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#F1F5F9",
                marginBottom: "24px",
              }}
            >
              {text}
            </p>
          ))}
          <div style={{ marginBottom: "24px" }}>
            {[
              "→ Is this for someone like me?",
              "→ Has this person solved my exact problem before?",
              "→ What is the specific, low-risk next step I can take right now?"
            ].map((q, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "#F1F5F9",
                  marginBottom: "12px",
                }}
              >
                {q}
              </p>
            ))}
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#F1F5F9",
            }}
          >
            When a website answers all three clearly, inquiry volume changes. Revenue changes. The business changes.
          </p>
        </div>
      </section>

      {/* ── SECTION 6 — HOW IT WORKS ── */}
      <section id="how-it-works" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              color: "#F1F5F9",
              textAlign: "center",
              marginBottom: "40px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            How It Works
          </h2>

          {/* Steps — single column on mobile, 3 cols on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 relative">
            {/* Connector line — desktop only */}
            <div
              className="hidden md:block absolute top-10 left-0 right-0 h-0.5 z-0"
              style={{
                backgroundImage: "repeating-linear-gradient(to right, #D97706 0, #D97706 20px, transparent 20px, transparent 40px)",
              }}
            />

            {[
              {
                step: 1,
                title: "Audit",
                desc: "Get your free 5-minute Loom review. I identify the top 3 conversion leaks on your website — specific, actionable, no fluff.",
              },
              {
                step: 2,
                title: "Strategy",
                desc: "We align on your ONE conversion goal, your audience, and the system architecture that will move visitors to clients.",
              },
              {
                step: 3,
                title: "Build & Launch",
                desc: "I build your Conversion & Credibility System in days — not months. You go live with a website that works as your best salesperson.",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative z-10">
                {/* Step Circle */}
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "#D97706", color: "#FFFFFF" }}
                >
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(20px, 5vw, 32px)",
                      fontWeight: 800,
                    }}
                  >
                    {item.step}
                  </span>
                </div>

                {/* Card */}
                <div
                  style={{
                    backgroundColor: "#0F1F3D",
                    border: "1px solid #1A3260",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#D97706",
                      marginBottom: "10px",
                    }}
                  >
                    Step {item.step} — {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: "#F1F5F9",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA — full width on mobile */}
          <div className="text-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block md:inline-block" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={WA_CLICK}>
              <button
                className="rounded-md font-semibold transition-all duration-200 w-full md:w-auto md:px-10"
                style={primaryBtn}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
              >
                Get My Free Website Audit
              </button>
            </a>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — CASE STUDIES ── */}
      <section id="case-studies" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: "#0C1421" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              color: "#F1F5F9",
              textAlign: "center",
              marginBottom: "40px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            Real Results. Real Nigerian Businesses.
          </h2>

          {/* Case Study Cards — single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#0F1F3D",
                  border: "1px solid #1A3260",
                  borderLeft: "3px solid #D97706",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "2px",
                    backgroundColor: "#D97706",
                    color: "#FFFFFF",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    display: "inline-block",
                    marginBottom: "16px",
                  }}
                >
                  {study.label}
                </span>

                <div className="mb-4">
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 500, color: "#B8C5D6", marginBottom: "6px", letterSpacing: "1px", textTransform: "uppercase" }}>
                    Before
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 400, color: "#F1F5F9", lineHeight: 1.6 }}>
                    {study.before}
                  </p>
                </div>

                <div className="mb-4">
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 500, color: "#B8C5D6", marginBottom: "6px", letterSpacing: "1px", textTransform: "uppercase" }}>
                    After
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#4ADE80", lineHeight: 1.6 }}>
                    {study.after}
                  </p>
                </div>

                <div className="mb-5 pb-5" style={{ borderBottom: "1px solid #1A3260" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 400, color: "#B8C5D6", lineHeight: 1.6 }}>
                    {study.bridge}
                  </p>
                </div>

                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={WA_CLICK}>
                  <button
                    className="w-full rounded-md font-semibold transition-all duration-200"
                    style={outlineBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#D97706";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#D97706";
                    }}
                  >
                    Get My Free Website Audit
                  </button>
                </a>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px", textAlign: "center" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>
              </div>
            ))}
          </div>

          {/* CTA — full width on mobile */}
          <div className="text-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block md:inline-block" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={WA_CLICK}>
              <button
                className="rounded-md font-semibold transition-all duration-200 w-full md:w-auto md:px-10"
                style={primaryBtn}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
              >
                Get My Free Website Audit
              </button>
            </a>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 8 — SERVICES OVERVIEW ── */}
      <section id="services" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              color: "#F1F5F9",
              textAlign: "center",
              marginBottom: "40px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            What I Build
          </h2>

          {/* Service Cards — single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
            {services.map((service, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: service.featured ? "#D97706" : "#0F1F3D",
                  border: service.featured ? "2px solid #F59E0B" : "1px solid #1A3260",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                {service.badge && (
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "2px",
                      backgroundColor: "#FFFFFF",
                      color: "#D97706",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginBottom: "14px",
                    }}
                  >
                    {service.badge}
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: service.featured ? "#FFFFFF" : "#F1F5F9",
                    marginBottom: "8px",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: service.featured ? "#F1F5F9" : "#B8C5D6",
                    marginBottom: "12px",
                  }}
                >
                  {service.who}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: service.featured ? "#F1F5F9" : "#F1F5F9",
                    marginBottom: "20px",
                  }}
                >
                  {service.description}
                </p>
                <a
                  href={service.ctaLink}
                  target={service.ctaLink.startsWith("http") ? "_blank" : undefined}
                  rel={service.ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                  aria-label={`${service.cta} — ${service.title}`}
                  onClick={service.ctaLink === WA_LINK ? WA_CLICK : undefined}
                >
                  <button
                    className="w-full rounded-md font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      backgroundColor: service.featured ? "#FFFFFF" : "#D97706",
                      color: service.featured ? "#D97706" : "#FFFFFF",
                      minHeight: "48px",
                      border: "none",
                      padding: "12px 24px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = service.featured ? "#F1F5F9" : "#F59E0B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = service.featured ? "#FFFFFF" : "#D97706";
                    }}
                  >
                    {service.cta}
                  </button>
                </a>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px", textAlign: "center" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9 — WHY SUPERWITS.TECH ── */}
      <section className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: "#0C1421" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              color: "#F1F5F9",
              textAlign: "center",
              marginBottom: "40px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            Why Superwits Tech — Not a Generic Agency
          </h2>

          {/* 2-column on md+, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {differentiators.map((diff, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#0F1F3D",
                  border: "1px solid #1A3260",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#F1F5F9",
                    marginBottom: "10px",
                  }}
                >
                  {diff.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#F1F5F9",
                    lineHeight: 1.7,
                  }}
                >
                  {diff.description}
                </p>
              </div>
            ))}
          </div>

          {/* FIX 03 — CRO: Mid-page CTA re-engagement after differentiators */}
          <div style={{ marginTop: "56px", borderTop: "1px solid #1A3260", paddingTop: "48px", textAlign: "center" }}>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(20px, 3vw, 24px)",
                color: "#F1F5F9",
                marginBottom: "28px",
              }}
            >
              Which One Is Costing You Clients Right Now?
            </h3>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block md:inline-block" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={WA_CLICK}>
              <button
                className="rounded-md font-semibold transition-all duration-200 w-full md:w-auto md:px-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  backgroundColor: "#D97706",
                  color: "#FFFFFF",
                  minHeight: "48px",
                  border: "none",
                  padding: "12px 32px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
              >
                Get My Free Website Audit
              </button>
            </a>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 10 — FAQ ACCORDION ── */}
      <section className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              color: "#F1F5F9",
              textAlign: "center",
              marginBottom: "40px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            Questions You Are Probably Asking
          </h2>

          {/* FAQ Accordion — full width, text wraps correctly */}
          <div className="space-y-3 mb-10">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden"
                style={{
                  backgroundColor: "#0F1F3D",
                  border: "1px solid #1A3260",
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left font-semibold flex justify-between items-start gap-3 transition"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#F1F5F9",
                    backgroundColor: "#0F1F3D",
                    minHeight: "48px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1A3260")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0F1F3D")}
                >
                  <span style={{ flex: 1, wordBreak: "break-word" }}>{item.question}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      color: "#D97706",
                      transform: openFaqIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div
                    className="px-5 py-4 border-t"
                    style={{
                      backgroundColor: "#0C1421",
                      borderColor: "#1A3260",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#B8C5D6",
                      lineHeight: 1.75,
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA — full width on mobile */}
          <div className="text-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block md:inline-block" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={WA_CLICK}>
              <button
                className="rounded-md font-semibold transition-all duration-200 w-full md:w-auto md:px-10"
                style={primaryBtn}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
              >
                Get My Free Website Audit
              </button>
            </a>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 11 — FINAL CTA ── */}
      <section className="py-16 md:py-24 lg:py-32 mx-3 md:mx-auto mb-8 md:mb-12 rounded-2xl" style={{ backgroundColor: "#0F1F3D", border: "1px solid #1A3260", maxWidth: "900px" }}>
        <div className="px-5 md:px-12 text-center">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              color: "#D97706",
              marginBottom: "20px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            3 Website Audit Slots Open This Week
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#F1F5F9",
              marginBottom: "28px",
            }}
          >
            A free 5-minute Loom video showing exactly what is costing you clients — and the one change that would make the biggest difference. No pitch. No cost. First come, first served.
          </p>

          {/* Large CTA Button — full width on mobile */}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block mb-3" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={WA_CLICK}>
            <button
              className="w-full md:w-auto md:px-16 rounded-md font-bold transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                backgroundColor: "#D97706",
                color: "#FFFFFF",
                minHeight: "56px",
                border: "none",
                padding: "14px 32px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
            >
              Get My Free Website Audit
            </button>
          </a>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginBottom: "20px" }}>✓ Free ✓ No Commitment ✓ 5-Minute Video</p>

          {/* Risk Reversal */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "#F1F5F9",
              marginBottom: "28px",
            }}
          >
            Free. No commitment. No sales call unless you request one.
          </p>

          {/* P.S. */}
          <div
            className="p-5 rounded-lg text-left"
            style={{
              backgroundColor: "#07122A",
              border: "1px solid #1A3260",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#F1F5F9",
                lineHeight: 1.75,
              }}
            >
              <span style={{ fontWeight: 600 }}>P.S.</span> — If your website is currently converting below 3% of visitors into inquiries, the audit will show you why. Most fixes take an afternoon. The difference in client volume is immediate.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
