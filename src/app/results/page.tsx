import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { WA_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Real Results. Real Nigerian Businesses.",
  description:
    "Every case study uses the Before-After-Bridge format. Real clients. Real numbers. Real timeframes. See how Nigerian service businesses increased conversions.",
  openGraph: {
    title: "Real Results — Superwits Tech",
    description:
      "Real case studies from Nigerian clinics, coaches, and e-commerce brands. Real numbers. Real timeframes.",
    url: "https://superwitstech.com/results",
  },
};

const caseStudies = [
  {
    id: 1,
    label: "Case Study #01",
    client: "Aesthetic Clinic Lagos",
    industry: "Aesthetic & Wellness",
    location: "Lagos, Nigeria",
    stage: "3–8 Staff",
    headline: "3 → 18 Weekly Bookings in 30 Days",
    before: `Before working with us, the clinic had a beautifully designed website with professional photography and a detailed services page. But despite spending on social media ads, they were averaging just 3 bookings per week. The site looked premium — it just wasn't built to convert. Visitors would land, scroll through galleries, and leave without making a single inquiry.`,
    challenge: `The core challenge was trust friction. Nigerian patients researching aesthetic procedures need to see social proof before they commit. The clinic's site buried testimonials on a separate page, and there was no clear pathway from "interested" to "booked." The contact form was generic, and WhatsApp — the dominant communication channel in Nigeria — was buried in the footer.`,
    system: `We rebuilt the homepage around a conversion-first architecture. Client testimonials moved above the fold with real photos. We added a prominent before/after results section, a one-click WhatsApp booking button, and a simplified inquiry flow that reduced friction to near zero. Every element was designed to answer the visitor's unspoken question: "Can I trust this clinic with my face?"`,
    after: `Within 30 days, weekly bookings jumped from 3 to 18 — a 500% increase. The clinic's Google Business profile started ranking for local aesthetic treatment searches, and the WhatsApp inquiry channel alone generated 60% of new bookings. The owner reported that the quality of inquiries improved too — patients were arriving pre-sold and ready to book.`,
    keyChange: `Moving real client testimonials (with photos) above the fold. This single change eliminated the trust gap and gave visitors the social proof they needed to take action immediately.`,
  },
  {
    id: 2,
    label: "Case Study #02",
    client: "Business Coach Abuja",
    industry: "Coaching & Consulting",
    location: "Abuja, Nigeria",
    stage: "Solo Founder",
    headline: "0 → First Inquiry in 72 Hours",
    before: `The coach had a website built by a freelancer two years prior. It listed their services, bio, and a blog with occasional posts. In the previous 6 months, the site had generated zero client inquiries. The coach was relying entirely on referrals and word of mouth, which created an unpredictable revenue stream.`,
    challenge: `The website was functioning as a digital brochure — informative but inert. There was no clear value proposition on the homepage. Visitors couldn't quickly understand what outcome they'd get from working with this coach. The call-to-action was a generic "Contact Us" form that felt impersonal and required too much effort from someone who was still in the consideration phase.`,
    system: `We replaced the generic homepage with a specific outcome headline that spoke directly to the ideal client's desired result. We added a simple one-click WhatsApp connection, a client transformation story, and a clear "Work With Me" pathway. The entire page was redesigned to move visitors from curiosity to conversation in under 60 seconds.`,
    after: `The first paid inquiry came through WhatsApp within 72 hours of the new site going live. Within 2 weeks, the coach had booked 4 new clients directly through the website — more than the previous 6 months combined. The coach now has a predictable inbound lead channel for the first time.`,
    keyChange: `Replacing the generic headline with a specific outcome headline: "Helping Nigerian entrepreneurs go from inconsistent revenue to ₦2M+ months." This immediately told visitors whether this coach was for them.`,
  },
  {
    id: 3,
    label: "Case Study #03",
    client: "E-Commerce Brand Nigeria",
    industry: "E-Commerce / Retail",
    location: "Nationwide (Nigeria)",
    stage: "Growing Team",
    headline: "0.8% → 6.2% Conversion Rate in 3 Weeks",
    before: `The brand had invested heavily in a custom Shopify store with a modern design, product videos, and a large social media following. Despite driving thousands of visitors monthly through Instagram and Google Ads, the conversion rate sat at a dismal 0.8%. They were spending more on acquisition than they were earning back from converted customers.`,
    challenge: `The checkout flow was designed for desktop users, but 85% of their traffic came from mobile. The "Add to Cart" button was below the fold on mobile, the checkout form had 7 fields, and there was zero social proof on the product pages. Trust signals — reviews, order counts, delivery guarantees — were completely absent. Nigerian online shoppers are especially cautious about new brands and need reassurance before entering payment details.`,
    system: `We redesigned the mobile experience from the ground up. Sticky "Add to Cart" and "Buy Now" buttons, a streamlined 3-field checkout, and social proof modules on every product page showing recent orders and customer reviews. We added a WhatsApp support button during checkout to handle last-minute objections in real time. Product pages were restructured to lead with benefits and social proof rather than just features.`,
    after: `Conversion rate jumped from 0.8% to 6.2% in just 3 weeks — a 675% improvement. Revenue per visitor nearly tripled. The WhatsApp support channel during checkout alone recovered an estimated 15% of abandoned carts. The brand reported that their ad spend became profitable for the first time, with ROAS improving from 0.8x to 3.2x.`,
    keyChange: `Redesigning the mobile checkout flow (sticky buy buttons + 3-field form) and adding real-time social proof (recent order notifications + customer reviews) on every product page.`,
  },
];

export default function ResultsPage() {
  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#0A0E27" }}>
        {/* Hero */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Real Results. Real Nigerian Businesses.</h1>
            <p
              className="mx-auto max-w-2xl"
              style={{ color: "#A8B2C7", fontSize: "18px", lineHeight: 1.75 }}
            >
              Every case study uses the Before-After-Bridge format. Real clients.
              Real numbers. Real timeframes.
            </p>
          </div>
        </section>

        {/* Case Studies */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {caseStudies.map((study, index) => (
              <article
                key={study.id}
                style={{
                  borderTop:
                    index > 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
                  paddingTop: index > 0 ? "64px" : "0",
                }}
              >
                {/* Badge + Client Name */}
                <div className="mb-6">
                  <span
                    className="inline-block rounded px-3 py-1 mb-3"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      backgroundColor: "#1A1508",
                      color: "#D4A017",
                      border: "1px solid #D4A017",
                    }}
                  >
                    {study.label}
                  </span>
                  <h2 style={{ fontSize: "28px", fontWeight: 700 }}>
                    {study.client}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "16px",
                      color: "#4ADE80",
                      marginTop: "8px",
                      fontWeight: 500,
                    }}
                  >
                    {study.headline}
                  </p>
                </div>

                {/* Metadata - 3 cols */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                  style={{ color: "#A8B2C7", fontSize: "14px" }}
                >
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        color: "#D4A017",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Industry
                    </span>
                    {study.industry}
                  </div>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        color: "#D4A017",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Location
                    </span>
                    {study.location}
                  </div>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        color: "#D4A017",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Business Stage
                    </span>
                    {study.stage}
                  </div>
                </div>

                {/* Before */}
                <div className="mb-6">
                  <h3
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#A8B2C7",
                      marginBottom: "8px",
                    }}
                  >
                    Before
                  </h3>
                  <p style={{ color: "#CBD5E1", lineHeight: 1.8, fontSize: "15px" }}>
                    {study.before}
                  </p>
                </div>

                {/* The Challenge */}
                <div className="mb-6">
                  <h3
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#A8B2C7",
                      marginBottom: "8px",
                    }}
                  >
                    The Challenge
                  </h3>
                  <p style={{ color: "#CBD5E1", lineHeight: 1.8, fontSize: "15px" }}>
                    {study.challenge}
                  </p>
                </div>

                {/* The System */}
                <div className="mb-6">
                  <h3
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#A8B2C7",
                      marginBottom: "8px",
                    }}
                  >
                    The System
                  </h3>
                  <p style={{ color: "#CBD5E1", lineHeight: 1.8, fontSize: "15px" }}>
                    {study.system}
                  </p>
                </div>

                {/* After - Green Card */}
                <div
                  className="rounded-lg p-6 mb-6"
                  style={{ backgroundColor: "#052E16", border: "1px solid #166534" }}
                >
                  <h3
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#4ADE80",
                      marginBottom: "8px",
                    }}
                  >
                    After
                  </h3>
                  <p style={{ color: "#F5F5F0", lineHeight: 1.8, fontSize: "15px" }}>
                    {study.after}
                  </p>
                </div>

                {/* Key Change - Amber Left Border */}
                <div
                  className="rounded-r-lg p-5"
                  style={{
                    backgroundColor: "#1A1508",
                    borderLeft: "4px solid #D4A017",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#D4A017",
                      marginBottom: "6px",
                    }}
                  >
                    Key Change
                  </h4>
                  <p style={{ color: "#F5F5F0", lineHeight: 1.7, fontSize: "15px" }}>
                    {study.keyChange}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="py-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Want Results Like These?</h2>
            <p className="mb-8" style={{ color: "#A8B2C7" }}>
              Every engagement starts with a free website audit. I&apos;ll send you
              a personalised 5-minute Loom video identifying your biggest
              conversion blockers within 24 hours.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="about-cta-btn"
            >
              Get Your Free Website Audit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}