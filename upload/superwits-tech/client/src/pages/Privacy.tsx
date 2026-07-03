import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#07122A] flex flex-col">
      <SEOHead
        title="Privacy Policy — Superwits Tech"
        description="How Superwits Tech collects, uses, and protects your personal data. Read our full privacy policy."
        canonical="https://superwitstech.com/privacy"
      />
      <Navigation />

      {/* Content */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "48px",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#F1F5F9",
              marginBottom: "12px",
            }}
            className="md:text-5xl text-4xl"
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#94A3B8",
              marginBottom: "32px",
            }}
          >
            Last updated: April 2, 2026
          </p>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#F1F5F9",
            }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              1. Introduction
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Superwits Tech ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              2. Information We Collect
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We may collect information about you in a variety of ways. The information we may collect on the site includes:
            </p>
            <ul style={{ marginBottom: "16px", paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Personal Data:</strong> Name, email address, phone number, business name, website URL, and business type (collected through contact forms and WhatsApp inquiries).
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Automatic Data:</strong> Browser type, IP address, pages visited, time spent on pages, referring URL, and device information (collected via Google Analytics 4).
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Communication Data:</strong> Messages sent via WhatsApp, contact forms, and email correspondence.
              </li>
            </ul>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              3. How We Use Your Information
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We use the information we collect in the following ways:
            </p>
            <ul style={{ marginBottom: "16px", paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>To provide and improve our services</li>
              <li style={{ marginBottom: "8px" }}>To respond to your inquiries and requests</li>
              <li style={{ marginBottom: "8px" }}>To send you audit reports and recommendations</li>
              <li style={{ marginBottom: "8px" }}>To analyze website usage and improve user experience</li>
              <li style={{ marginBottom: "8px" }}>To comply with legal obligations</li>
            </ul>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              4. Google Analytics 4
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Our website uses Google Analytics 4 to collect and analyze visitor behavior. Google Analytics uses cookies and similar technologies to track your interactions with our site. The data collected is used to understand user behavior, improve our website, and measure the effectiveness of our services. You can opt out of Google Analytics by using the Google Analytics Opt-out Browser Add-on.
            </p>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              5. WhatsApp Communication
            </h2>
            <p style={{ marginBottom: "16px" }}>
              When you contact us via WhatsApp, we collect your phone number and message content. This information is used solely to respond to your inquiry and provide the requested audit or service. We do not share your WhatsApp information with third parties without your consent.
            </p>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              6. Data Sharing and Disclosure
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul style={{ marginBottom: "16px", paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>With your explicit consent</li>
              <li style={{ marginBottom: "8px" }}>To comply with legal requirements or court orders</li>
              <li style={{ marginBottom: "8px" }}>To protect our rights, privacy, safety, or property</li>
            </ul>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              7. Data Retention
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. You may request deletion of your data at any time by contacting us.
            </p>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              8. Your Rights
            </h2>
            <p style={{ marginBottom: "16px" }}>
              You have the right to:
            </p>
            <ul style={{ marginBottom: "16px", paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>Access the personal data we hold about you</li>
              <li style={{ marginBottom: "8px" }}>Request correction of inaccurate data</li>
              <li style={{ marginBottom: "8px" }}>Request deletion of your data</li>
              <li style={{ marginBottom: "8px" }}>Opt out of marketing communications</li>
            </ul>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              9. Security
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              10. Contact Us
            </h2>
            <p style={{ marginBottom: "16px" }}>
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Business Name:</strong> Superwits Tech
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Owner:</strong> Marquis Festus
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Contact:</strong> Via WhatsApp at https://wa.me/2347047381879 or through our contact form
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
