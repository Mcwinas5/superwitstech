import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { WA_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conversion & Credibility Systems for Nigerian Service Businesses",
  description:
    "Every service is built around one question: will this turn more visitors into paying clients? Conversion website builds, client acquisition systems, and free website audits for Nigerian businesses.",
  openGraph: {
    title: "Conversion & Credibility Systems — Superwits Tech",
    description:
      "Turn more visitors into paying clients. Conversion website builds, client acquisition systems, and free audits.",
    url: "https://superwitstech.com/services",
  },
};

const services = [
  {
    title: "Conversion Website Build",
    description:
      "A complete website rebuild engineered to convert visitors into inquiries — not just look pretty.",
    cardStyle: { backgroundColor: "var(--sw-surface)", border: "1px solid var(--sw-border)", borderRadius: "16px", boxShadow: "0 8px 32px var(--sw-shadow-card), inset 0 1px 0 var(--sw-inset-highlight)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" },
    bullets: [
      "Homepage rebuild focused on conversion flow",
      "Conversion copy that speaks to your ideal client's pain points",
      "Before/After section to build instant credibility",
      "Mobile-first design (80%+ of Nigerian traffic is mobile)",
      "WhatsApp integration for instant inquiry",
      "Google Analytics 4 setup for data-driven decisions",
      "Technical SEO foundation for organic visibility",
    ],
    delivery: "7–10 days",
    featured: false,
  },
  {
    title: "Client Acquisition System",
    description:
      "The full system. Everything in the Conversion Build plus automated lead capture, Google Business optimisation, and 30 days of monitoring.",
    cardStyle: { backgroundColor: "#1A1508", border: "1px solid #D4A017", borderRadius: "16px", boxShadow: "0 8px 32px var(--sw-shadow-card), inset 0 1px 0 var(--sw-inset-highlight)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" },
    badge: "Most Comprehensive",
    bullets: [
      "Everything in the Conversion Website Build",
      "Booking system integrated into your site",
      "WhatsApp automation for instant follow-up",
      "Google Business Profile optimisation",
      "Email capture with automated nurture sequence",
      "30-day post-launch monitoring & optimisation",
      "Conversion rate tracking dashboard",
    ],
    delivery: "10–14 days",
    featured: true,
  },
  {
    title: "Website Audit & Strategy",
    description:
      "A personalised 5-minute Loom video walking through your site's biggest conversion killers and exactly how to fix them.",
    cardStyle: { backgroundColor: "var(--sw-surface)", border: "1px solid var(--sw-border)", borderRadius: "16px", boxShadow: "0 8px 32px var(--sw-shadow-card), inset 0 1px 0 var(--sw-inset-highlight)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" },
    bullets: [
      "Personalised 5-minute Loom video audit",
      "Top 3 conversion blockers identified",
      "Actionable fixes you can implement immediately",
      "Priority recommendations ranked by impact",
      "No jargon — plain language you can act on",
    ],
    delivery: "Within 24 hours",
    cost: "Free. No commitment. No pitch.",
    featured: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "var(--sw-bg)" }}>
        {/* Hero */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">
              Conversion &amp; Credibility Systems for Nigerian Service
              Businesses
            </h1>
            <p
              className="mx-auto max-w-2xl"
              style={{ color: "var(--sw-text-muted)", fontSize: "18px", lineHeight: 1.75 }}
            >
              Every service is built around one question: will this turn more
              visitors into paying clients?
            </p>
          </div>
        </section>

        {/* Service Cards */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-lg p-6 lg:p-8 flex flex-col"
                  style={{
                    ...service.cardStyle,
                    transform: service.featured ? "scale(1.05)" : "none",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {/* Badge */}
                  {service.badge && (
                    <span
                      className="inline-block self-start rounded px-3 py-1 mb-4"
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        backgroundColor: "#D4A017",
                        color: "#0A1128",
                      }}
                    >
                      {service.badge}
                    </span>
                  )}

                  <h2 className="mb-3" style={{ fontSize: "24px", fontWeight: 700 }}>
                    {service.title}
                  </h2>
                  <p
                    className="mb-6"
                    style={{
                      color: "var(--sw-text-muted)",
                      fontSize: "15px",
                      lineHeight: 1.7,
                    }}
                  >
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          style={{
                            color: "var(--sw-gold-text)",
                            fontSize: "16px",
                            marginTop: "2px",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          style={{
                            color: "var(--sw-text)",
                            fontSize: "14px",
                            lineHeight: 1.6,
                          }}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Cost (Audit only) */}
                  {service.cost && (
                    <p
                      className="mb-4"
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "13px",
                        color: "#4ADE80",
                      }}
                    >
                      {service.cost}
                    </p>
                  )}

                  {/* Delivery */}
                  <p
                    className="mb-6"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12px",
                      color: "var(--sw-text-tertiary)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Delivery: {service.delivery}
                  </p>

                  {/* CTA */}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-cta-btn"
                  >
                    {service.cost ? "Get My Free Audit" : "Get Started on WhatsApp"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="py-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid var(--sw-border)" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Not Sure Which Service Fits?</h2>
            <p className="mb-8" style={{ color: "var(--sw-text-muted)" }}>
              Start with the free audit. I&apos;ll review your site, identify the
              biggest conversion blockers, and send you a personalised 5-minute
              Loom video within 24 hours.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="about-cta-btn"
            >
              Request Your Free Website Audit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}