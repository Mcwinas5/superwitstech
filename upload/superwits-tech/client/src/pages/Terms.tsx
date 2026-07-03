import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#07122A] flex flex-col">
      <SEOHead
        title="Terms of Service — Superwits Tech"
        description="Read the Superwits Tech Terms of Service. Understand your rights and obligations when using our conversion and credibility system services."
        canonical="https://superwitstech.com/terms"
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
            Terms of Service
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
              1. Agreement to Terms
            </h2>
            <p style={{ marginBottom: "16px" }}>
              By accessing and using the Superwits Tech website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
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
              2. Use License
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Permission is granted to temporarily download one copy of the materials (information or software) on Superwits Tech's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul style={{ marginBottom: "16px", paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>Modify or copy the materials</li>
              <li style={{ marginBottom: "8px" }}>Use the materials for any commercial purpose or for any public display</li>
              <li style={{ marginBottom: "8px" }}>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li style={{ marginBottom: "8px" }}>Remove any copyright or other proprietary notations from the materials</li>
              <li style={{ marginBottom: "8px" }}>Transfer the materials to another person or "mirror" the materials on any other server</li>
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
              3. Disclaimer
            </h2>
            <p style={{ marginBottom: "16px" }}>
              The materials on Superwits Tech's website are provided on an 'as is' basis. Superwits Tech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
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
              4. Limitations
            </h2>
            <p style={{ marginBottom: "16px" }}>
              In no event shall Superwits Tech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Superwits Tech's website, even if Superwits Tech or an authorized representative has been notified orally or in writing of the possibility of such damage.
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
              5. Accuracy of Materials
            </h2>
            <p style={{ marginBottom: "16px" }}>
              The materials appearing on Superwits Tech's website could include technical, typographical, or photographic errors. Superwits Tech does not warrant that any of the materials on its website are accurate, complete, or current. Superwits Tech may make changes to the materials contained on its website at any time without notice.
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
              6. Service Scope
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Superwits Tech provides website audit, strategy consultation, and website development services. The scope of each project is defined during the initial consultation and strategy phase. Changes to scope may affect delivery timelines and pricing.
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
              7. Payment Terms
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Payment terms for services will be discussed and agreed upon during the initial consultation. Pricing will be confirmed in writing before work begins. Invoices are due upon receipt unless otherwise agreed in writing.
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
              8. No Guarantee of Results
            </h2>
            <p style={{ marginBottom: "16px" }}>
              While Superwits Tech uses proven conversion frameworks and best practices, results depend on proper implementation, client cooperation, and external factors beyond our control. We do not guarantee specific conversion rates, traffic increases, or revenue improvements. Results vary based on industry, competition, and implementation quality.
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
              9. Intellectual Property Rights
            </h2>
            <p style={{ marginBottom: "16px" }}>
              All content, design, code, and materials created by Superwits Tech for your project are owned by you upon full payment. Superwits Tech retains the right to use the project as a case study and portfolio example with your permission.
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
              10. Limitation of Liability
            </h2>
            <p style={{ marginBottom: "16px" }}>
              In no case shall Superwits Tech, its owners, employees, or agents be liable to you for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use of or inability to use the website or services, or for any other claim related to the services provided.
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
              11. Revisions and Errata
            </h2>
            <p style={{ marginBottom: "16px" }}>
              The materials appearing on Superwits Tech's website and in service descriptions could include technical, typographical, or photographic errors. Superwits Tech does not warrant that any of the materials on its website are accurate, complete, or current. Superwits Tech may make changes to the materials contained on its website at any time without notice.
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
              12. Links
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Superwits Tech has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Superwits Tech of the site. Use of any such linked website is at the user's own risk.
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
              13. Modifications
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Superwits Tech may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
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
              14. Governing Law
            </h2>
            <p style={{ marginBottom: "16px" }}>
              These terms and conditions are governed by and construed in accordance with the laws of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
              15. Contact Information
            </h2>
            <p style={{ marginBottom: "8px" }}>
              If you have any questions about these Terms of Service, please contact us:
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
