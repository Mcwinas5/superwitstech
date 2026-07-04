import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { WA_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — Marquis Festus, Client Acquisition Systems Builder",
  description:
    "Marquis Festus builds Conversion & Credibility Systems for Nigerian service businesses. If your website isn't generating consistent client inquiries, it's not a website problem — it's a strategy problem.",
  openGraph: {
    title: "About — Superwits Tech",
    description:
      "Marquis Festus — Client Acquisition Systems Builder for Nigerian service businesses.",
    url: "https://superwitstech.com/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marquis Festus",
  jobTitle: "Client Acquisition Systems Builder",
  worksFor: {
    "@type": "Organization",
    name: "Superwits Tech",
    url: "https://superwitstech.com",
  },
  url: "https://superwitstech.com/about",
  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436896831/TXsqXLVXpGbQzymBp4kwfQ/marquis-about_5fc19d8d.jpeg",
  description:
    "Marquis Festus builds Conversion & Credibility Systems for Nigerian service businesses. Specialising in clinics, coaches, and e-commerce brands.",
  sameAs: [
    "https://www.facebook.com/marquis.festus",
    "https://www.twitter.com/MarquisBuilds",
    "https://www.linkedin.com/in/marquis-festus/",
    "https://www.instagram.com/marquisbuilds",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
};

const stats = [
  {
    value: "6–15%",
    label: "Average Conversion Rate Lift",
    description: "Across client websites after implementation",
  },
  {
    value: "Days",
    label: "10–14",
    description: "From kickoff to live. Not weeks. Not months.",
  },
  {
    value: "3 Niches",
    label: "Clinics • Coaches • E-Commerce",
    description: "Deep expertise in Nigerian service verticals",
  },
];

const differences = [
  {
    heading: "Measurable Outcomes Over Aesthetics",
    description:
      "I don't design websites to win awards. I design them to generate inquiries, bookings, and revenue. Every element is measured against one metric: did it move the conversion rate?",
  },
  {
    heading: "Nigerian Market Specificity",
    description:
      "WhatsApp is the dominant communication channel. Mobile traffic is 80%+. Trust signals matter more than features. I build for the Nigerian buyer, not a hypothetical global user.",
  },
  {
    heading: "AI-Powered Speed",
    description:
      "I leverage AI tools to build faster without sacrificing quality. What traditionally takes agencies 4–8 weeks, I deliver in 7–14 days.",
  },
  {
    heading: "Before/After Accountability",
    description:
      "Every case study on this site uses real numbers from real Nigerian businesses. No vague testimonials. No inflated metrics. Just documented results.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main style={{ backgroundColor: "#07122A" }}>
        {/* Hero */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6" style={{ fontSize: "clamp(28px, 6vw, 44px)" }}>
              If Your Website Isn&apos;t Generating Consistent Client Inquiries,
              It&apos;s Not a Website Problem. It&apos;s a Strategy Problem.
            </h1>
          </div>
        </section>

        {/* The Problem I Solve */}
        <section
          className="pb-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid #1A3260" }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6">The Problem I Solve</h2>
            <div className="space-y-4">
              <p style={{ color: "#CBD5E1", fontSize: "17px", lineHeight: 1.8 }}>
                The average Nigerian service business website converts at less than
                1%. That means for every 100 visitors, fewer than 1 takes action.
              </p>
              <p style={{ color: "#CBD5E1", fontSize: "17px", lineHeight: 1.8 }}>
                These aren&apos;t bad businesses. They have great services, happy
                clients, and strong reputations offline. But their websites were
                built to look professional — not to generate leads.
              </p>
              <p style={{ color: "#CBD5E1", fontSize: "17px", lineHeight: 1.8 }}>
                I fix that. I rebuild websites around conversion architecture:
                clear value propositions, trust signals above the fold, frictionless
                inquiry paths, and WhatsApp integration for instant connection. The
                result? Measurable increases in inquiries, bookings, and revenue.
              </p>
            </div>
          </div>
        </section>

        {/* Who I Am */}
        <section
          className="pb-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid #1A3260" }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-10 text-center">Who I Am</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Bio */}
              <div>
                <p
                  className="mb-6"
                  style={{ color: "#F1F5F9", fontSize: "17px", lineHeight: 1.85 }}
                >
                  <strong style={{ color: "#F1F5F9" }}>Marquis Festus</strong> —
                  Client Acquisition Systems Builder and Vibe-Coder at Superwits
                  Tech. I build Conversion &amp; Credibility Systems for Nigerian
                  service businesses.
                </p>
                <p
                  className="mb-6"
                  style={{ color: "#CBD5E1", fontSize: "16px", lineHeight: 1.8 }}
                >
                  I specialise in three niches: aesthetic clinics and wellness
                  centres, business coaches and consultants, and e-commerce brands.
                  These businesses share a common problem — they have great services
                  but underperforming websites that fail to convert visitors into
                  paying clients.
                </p>
                <p
                  className="mb-6"
                  style={{ color: "#CBD5E1", fontSize: "16px", lineHeight: 1.8 }}
                >
                  My approach is different from traditional web designers. I don&apos;t
                  start with wireframes or mood boards. I start with your conversion
                  data (or lack of it), identify the specific blockers preventing
                  inquiries, and build a system designed to turn visitors into
                  conversations.
                </p>
                <p
                  style={{ color: "#CBD5E1", fontSize: "16px", lineHeight: 1.8 }}
                >
                  Every engagement starts with a free audit. I record a personalised
                  5-minute Loom video walking through your site&apos;s biggest
                  conversion killers. No commitment. No pitch. Just actionable
                  insight.
                </p>
              </div>

              {/* Image */}
              <div
                className="rounded-lg overflow-hidden"
                style={{ minHeight: "384px", position: "relative" }}
              >
                <Image
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663436896831/TXsqXLVXpGbQzymBp4kwfQ/marquis-about_5fc19d8d.jpeg"
                  alt="Marquis Festus — Client Acquisition Systems Builder at Superwits Tech"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What Makes This Different */}
        <section
          className="pb-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid #1A3260" }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-10 text-center">What Makes This Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {differences.map((item) => (
                <div
                  key={item.heading}
                  className="rounded-lg p-6"
                  style={{ backgroundColor: "#0F1F3D", border: "1px solid #1A3260" }}
                >
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#F1F5F9",
                    }}
                  >
                    {item.heading}
                  </h3>
                  <p
                    style={{
                      color: "#94A3B8",
                      fontSize: "15px",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* By The Numbers */}
        <section
          className="pb-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid #1A3260" }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-10 text-center">By The Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg p-6 text-center"
                  style={{
                    backgroundColor: "#0F1F3D",
                    border: "1px solid #1A3260",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "42px",
                      fontWeight: 800,
                      color: "#D97706",
                      lineHeight: 1.2,
                      marginBottom: "12px",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#F1F5F9",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      color: "#94A3B8",
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="py-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid #1A3260" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Let&apos;s See What&apos;s Blocking Your Conversions</h2>
            <p className="mb-8" style={{ color: "#94A3B8" }}>
              Start with a free audit. I&apos;ll review your website and send you a
              personalised 5-minute Loom video with your top 3 conversion blockers
              and how to fix them.
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