import { WA_LINK, trackWhatsAppClick, trackAuditCtaClick } from "@/lib/analytics";
import SEOHead from "@/components/SEOHead";
import { ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const services = [
    {
      title: "Conversion Website Build",
      who: "Service businesses with an existing site that isn't converting",
      includes: [
        "Full homepage rebuild around ONE conversion goal",
        "Conversion-focused copy written from audience research",
        "Before/after case study section with real client results",
        "Mobile-first design with 320px, 768px, 1440px breakpoints",
        "WhatsApp and contact form integration",
        "GA4 analytics with custom conversion events",
        "SEO meta tags, Open Graph, and schema markup",
      ],
      delivery: "7–10 days from strategy sign-off",
      featured: false,
    },
    {
      title: "Client Acquisition System",
      who: "Businesses with no website or a non-functional one",
      badge: "Most Comprehensive",
      includes: [
        "Everything in Conversion Website Build, plus:",
        "Booking system integration",
        "WhatsApp inquiry automation flow",
        "Google Business Profile optimisation",
        "Email capture and follow-up sequence setup",
        "30-day post-launch conversion monitoring",
      ],
      delivery: "10–14 days from strategy sign-off",
      featured: true,
    },
    {
      title: "Website Audit & Strategy",
      who: "Businesses unsure where their site is leaking clients",
      includes: [
        "5-minute personalised Loom video review",
        "Top 3 conversion blockers identified",
        "Specific, actionable fix for each blocker",
        "Priority order for implementation",
      ],
      delivery: "Within 24 hours of request",
      cost: "Free. No commitment. No pitch.",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#07122A] flex flex-col">
      <SEOHead
        title="Services — Superwits Tech | Conversion Website Build & Client Acquisition Systems"
        description="Three conversion-focused services for Nigerian service businesses: Conversion Website Build, Client Acquisition System, and Free Website Audit. Built with AI. Delivered in days."
        canonical="https://superwitstech.com/services"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Conversion Website Build",
            "provider": { "@type": "Organization", "name": "Superwits Tech" },
            "description": "A complete website rebuild around one conversion goal — designed to turn visitors into client inquiries for Nigerian service businesses.",
            "areaServed": ["Nigeria", "United Kingdom", "United States", "Canada", "Australia"],
            "audience": { "@type": "Audience", "audienceType": "Nigerian service businesses — clinics, coaches, consultants, e-commerce" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Client Acquisition System",
            "provider": { "@type": "Organization", "name": "Superwits Tech" },
            "description": "A complete client acquisition infrastructure — website, lead capture, WhatsApp integration, and conversion tracking — built for Nigerian service businesses.",
            "areaServed": ["Nigeria", "United Kingdom", "United States", "Canada", "Australia"],
            "audience": { "@type": "Audience", "audienceType": "Nigerian service businesses — clinics, coaches, consultants, e-commerce" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Website Audit & Strategy",
            "provider": { "@type": "Organization", "name": "Superwits Tech" },
            "description": "A free conversion audit identifying exactly why your current website is not generating client inquiries, with a clear action plan.",
            "areaServed": ["Nigeria", "United Kingdom", "United States", "Canada", "Australia"],
            "audience": { "@type": "Audience", "audienceType": "Nigerian service businesses — clinics, coaches, consultants, e-commerce" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://superwitstech.com/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://superwitstech.com/services" }
            ]
          }
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#F1F5F9",
            }}
            className="mb-6 md:text-5xl text-4xl"
          >
            Conversion & Credibility Systems for Nigerian Service Businesses
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#94A3B8",
            }}
            className="text-lg"
          >
            Every service is built around one question: will this turn more visitors into paying clients?
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`rounded-lg transition-transform ${
                  service.featured ? "md:scale-105" : ""
                }`}
                style={{
                  backgroundColor: service.featured ? "#D97706" : "#0F1F3D",
                  border: service.featured ? "none" : "1px solid #1A3260",
                  padding: "32px 28px",
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
                      marginBottom: "16px",
                    }}
                  >
                    {service.badge}
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: service.featured ? "#FFFFFF" : "#F1F5F9",
                    marginBottom: "12px",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: service.featured ? "#F1F5F9" : "#94A3B8",
                    marginBottom: "20px",
                  }}
                >
                  {service.who}
                </p>

                {/* Includes List */}
                <div className="mb-6 pb-6 border-b" style={{ borderColor: service.featured ? "rgba(255,255,255,0.2)" : "#1A3260" }}>
                  <ul className="space-y-3">
                    {service.includes.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: service.featured ? "#F1F5F9" : "#F1F5F9",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <ChevronRight
                          size={16}
                          style={{
                            color: service.featured ? "#FFFFFF" : "#D97706",
                            marginRight: "8px",
                            marginTop: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Delivery Time */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: service.featured ? "#F1F5F9" : "#94A3B8",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Delivery:</span> {service.delivery}
                </p>

                {service.cost && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: service.featured ? "#F1F5F9" : "#4ADE80",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Cost:</span> {service.cost}
                  </p>
                )}

                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={() => { trackWhatsAppClick(); trackAuditCtaClick("Get My Free Website Audit"); }}>
                  <button
                    className="w-full px-6 py-3 rounded-md font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      backgroundColor: service.featured ? "#FFFFFF" : "#D97706",
                      color: service.featured ? "#D97706" : "#FFFFFF",
                      minHeight: "48px",
                      border: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (service.featured) {
                        e.currentTarget.style.backgroundColor = "#F1F5F9";
                      } else {
                        e.currentTarget.style.backgroundColor = "#F59E0B";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (service.featured) {
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                      } else {
                        e.currentTarget.style.backgroundColor = "#D97706";
                      }
                    }}
                  >
                    Get My Free Website Audit
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#0C1421", borderTop: "1px solid #1A3260" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "36px",
              fontWeight: 700,
              color: "#D97706",
              marginBottom: "24px",
            }}
            className="md:text-4xl text-3xl"
          >
            Ready to Build Your System?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#F1F5F9",
              marginBottom: "32px",
            }}
          >
            Start with a free website audit. I'll show you exactly what's costing you clients.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Get My Free Website Audit — Chat on WhatsApp" onClick={() => { trackWhatsAppClick(); trackAuditCtaClick("Get My Free Website Audit"); }}>
            <button
              className="px-8 py-4 rounded-md font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                backgroundColor: "#D97706",
                color: "#FFFFFF",
                minHeight: "48px",
                minWidth: "200px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
            >
              Get My Free Website Audit
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
