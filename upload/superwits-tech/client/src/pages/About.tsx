import { WA_LINK, trackWhatsAppClick, trackAuditCtaClick } from "@/lib/analytics";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#07122A] flex flex-col">
      <SEOHead
        title="About — Superwits Tech | Marquis Festus, Client Acquisition Systems Builder"
        description="Marquis Festus builds Conversion & Credibility Systems for Nigerian service businesses. Learn about the 7 Pillars Framework and what makes Superwits Tech different."
        canonical="https://superwitstech.com/about"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Marquis Festus",
            "jobTitle": "Client Acquisition Systems Builder",
            "worksFor": { "@type": "Organization", "name": "Superwits Tech" },
            "url": "https://superwitstech.com/about",
            "sameAs": [
              "https://www.linkedin.com/in/marquisfestus",
              "https://twitter.com/MarquisBuilds",
              "https://www.facebook.com/marquis.festus"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://superwitstech.com/" },
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://superwitstech.com/about" }
            ]
          }
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#F1F5F9",
            }}
            className="mb-8 md:text-5xl text-4xl"
          >
            If Your Website Isn't Generating Consistent Client Inquiries, It's Not a Website Problem. It's a Strategy Problem.
          </h1>
        </div>
      </section>

      {/* Section 1 — The Problem */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#0C1421" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "36px",
              fontWeight: 700,
              color: "#F1F5F9",
              marginBottom: "24px",
            }}
            className="md:text-4xl text-3xl"
          >
            The Problem I Solve
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#F1F5F9",
            }}
          >
            Most Nigerian service businesses — clinics, coaches, consultants, e-commerce founders — have a digital presence that looks acceptable but converts at 1% or less. Traffic arrives. Nothing happens. Potential clients leave for a competitor who looks more credible.
          </p>
        </div>
      </section>

      {/* Section 2 — Who I Am */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "#F1F5F9",
                  marginBottom: "24px",
                }}
                className="md:text-4xl text-3xl"
              >
                Who I Am
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "#F1F5F9",
                  marginBottom: "20px",
                }}
              >
                I'm Marquis Festus — Client Acquisition Systems Builder and Vibe-Coder at Superwits Tech. I build Conversion & Credibility Systems for Nigerian service businesses that turn strangers into paying clients.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "#F1F5F9",
                }}
              >
                Not just websites. Client acquisition infrastructure — built using AI tools (Lovable, Claude, Supabase), governed by the SuperwitSites 7 Pillars conversion framework, and delivered in days, not months.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden" style={{ minHeight: "384px" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663436896831/TXsqXLVXpGbQzymBp4kwfQ/marquis-about_5fc19d8d.jpeg"
                alt="Marquis Festus — Founder of Superwits Tech, Conversion & Credibility Systems Builder"
                loading="lazy"
                width="895"
                height="476"
                style={{ width: "100%", height: "100%", minHeight: "384px", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — What Makes This Different */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#0C1421" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "36px",
              fontWeight: 700,
              color: "#F1F5F9",
              marginBottom: "24px",
            }}
            className="md:text-4xl text-3xl"
          >
            What Makes This Different
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#F1F5F9",
            }}
          >
            Every build is governed by one question: will this increase conversions? Not: does this look good? The result is a system designed to produce a measurable outcome — consistent, predictable client inquiries — not just a professional digital presence.
          </p>
        </div>
      </section>

      {/* Section 4 — By The Numbers */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "36px",
              fontWeight: 700,
              color: "#F1F5F9",
              marginBottom: "48px",
              textAlign: "center",
            }}
            className="md:text-4xl text-3xl"
          >
            By The Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { value: "6–15%", label: "Conversion rate target on every project" },
              { value: "Days", label: "Not months — average build delivery" },
              { value: "3 Niches", label: "Clinics · Coaches · E-commerce" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-8 rounded-lg"
                style={{
                  backgroundColor: "#0F1F3D",
                  border: "1px solid #1A3260",
                  borderLeft: "3px solid #D97706",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "48px",
                    fontWeight: 800,
                    color: "#D97706",
                    marginBottom: "12px",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#94A3B8",
                  }}
                >
                  {stat.label}
                </p>
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
            Let's Build Your System
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
