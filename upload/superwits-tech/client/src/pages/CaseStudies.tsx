import { WA_LINK, trackWhatsAppClick, trackAuditCtaClick } from "@/lib/analytics";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CaseStudies() {
  const caseStudies = [
    {
      label: "Aesthetic Clinic — Lagos",
      industry: "Aesthetic & Wellness",
      location: "Lagos, Nigeria",
      stage: "3–8 staff, generating revenue mainly via WhatsApp referrals",
      before: "3 weekly bookings. All via WhatsApp referrals. No functioning website.",
      challenge: "Patients found the clinic on Instagram but didn't convert to online bookings. The website looked outdated and didn't communicate the clinic's professionalism or service range.",
      system: "New conversion-focused website with: clear service categorisation, before/after treatment gallery, patient testimonials above the fold, direct booking integration, and WhatsApp CTA prominently placed.",
      after: "18 patient bookings per week within 30 days of launch.",
      keyChange: "Moving patient testimonials and before/after photos above the fold. Visitors immediately saw proof of quality.",
    },
    {
      label: "Business Coach — Abuja",
      industry: "Coaching & Consulting",
      location: "Abuja, Nigeria",
      stage: "Solo founder, 2 years in business",
      before: "Website live for 2 years. Zero inbound inquiries. All clients from word of mouth.",
      challenge: "The website talked about coaching in general, not the specific outcome the coach delivered. Visitors didn't understand if the service was for them.",
      system: "Complete headline rewrite to name the specific outcome: 'Help Nigerian Coaches Build 6-Figure Practices.' Case studies moved above the fold with specific numbers. Single CTA per page.",
      after: "First inbound discovery call booked within 72 hours of relaunch.",
      keyChange: "Specific outcome-led headline. Generic 'coaching' messaging converted zero. Specific 'build 6-figure practices' messaging converted immediately.",
    },
    {
      label: "E-Commerce Brand — Nigeria",
      industry: "E-Commerce & Retail",
      location: "Nigeria (national delivery)",
      stage: "Established brand, running paid ads",
      before: "Traffic from paid ads. Conversion rate: 0.8%. Monthly ad spend wasted.",
      challenge: "High traffic but extremely low conversion. Visitors arrived but didn't understand the value proposition or trust the brand enough to purchase.",
      system: "Product page restructure: outcome-led copy (not feature-led), social proof and customer reviews above the fold, mobile checkout optimisation, trust badges, and clear return policy.",
      after: "Conversion rate: 6.2% within 3 weeks of conversion rebuild.",
      keyChange: "Mobile checkout fix + social proof above the fold. The ad traffic was good; the website wasn't converting it.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07122A] flex flex-col">
      <SEOHead
        title="Results — Superwits Tech | Real Results from Real Nigerian Businesses"
        description="Case studies showing before/after conversion results for Nigerian clinics, coaches, and e-commerce brands. Real numbers. Real businesses."
        canonical="https://superwitstech.com/results"
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://superwitstech.com/" },
            { "@type": "ListItem", "position": 2, "name": "Results", "item": "https://superwitstech.com/results" }
          ]
        }}
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
            Real Results. Real Nigerian Businesses.
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
            Every case study uses the Before-After-Bridge format. Real clients. Real numbers. Real timeframes.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {caseStudies.map((study, idx) => (
            <div key={idx} className="border-b pb-24" style={{ borderColor: "#1A3260" }}>
              {/* Header */}
              <div className="mb-12">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#94A3B8",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Industry
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#F1F5F9",
                      }}
                    >
                      {study.industry}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#94A3B8",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Location
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#F1F5F9",
                      }}
                    >
                      {study.location}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#94A3B8",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Business Stage
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#F1F5F9",
                      }}
                    >
                      {study.stage}
                    </p>
                  </div>
                </div>
              </div>

              {/* Before */}
              <div className="mb-12">
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#F1F5F9",
                    marginBottom: "12px",
                  }}
                >
                  Before
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: "#F1F5F9",
                  }}
                >
                  {study.before}
                </p>
              </div>

              {/* Challenge */}
              <div className="mb-12">
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#F1F5F9",
                    marginBottom: "12px",
                  }}
                >
                  The Challenge
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: "#94A3B8",
                  }}
                >
                  {study.challenge}
                </p>
              </div>

              {/* System */}
              <div className="mb-12">
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#F1F5F9",
                    marginBottom: "12px",
                  }}
                >
                  The System
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: "#F1F5F9",
                  }}
                >
                  {study.system}
                </p>
              </div>

              {/* After */}
              <div className="mb-12 p-8 rounded-lg" style={{ backgroundColor: "#0F1F3D", border: "1px solid #1A3260" }}>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#4ADE80",
                    marginBottom: "12px",
                  }}
                >
                  After
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: 1.75,
                    color: "#4ADE80",
                  }}
                >
                  {study.after}
                </p>
              </div>

              {/* Key Change */}
              <div className="p-8 rounded-lg" style={{ backgroundColor: "#0F1F3D", border: "1px solid #D97706", borderLeft: "3px solid #D97706" }}>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#D97706",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Key Change
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: "#F1F5F9",
                  }}
                >
                  {study.keyChange}
                </p>
              </div>
            </div>
          ))}
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
            Ready for Your Own Results?
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
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Get My Free Website Audit — Chat on WhatsApp">
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
