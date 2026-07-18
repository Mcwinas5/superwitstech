import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Superwits Tech. Read the terms governing your use of our website and services.",
  openGraph: {
    title: "Terms of Service — Superwits Tech",
    description: "Terms of Service for Superwits Tech services.",
    url: "https://superwitstech.com/terms",
  },
};

const sections = [
  {
    title: "1. Agreement to Terms",
    content: `By accessing or using the website superwitstech.com (the "Site") and any services provided by Superwits Tech ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Site or our services. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Site following any changes constitutes acceptance of those changes. It is your responsibility to review these Terms periodically.`,
  },
  {
    title: "2. Use License",
    content: `Permission is granted to temporarily access and use the Site for personal or commercial inquiry purposes related to our services. This license does not include: modifying or copying our materials; using any data mining, robots, or similar data gathering and extraction tools; downloading (other than page caching) any portion of the Site or any information contained therein, except as expressly permitted on the Site; using the Site or its content for any commercial purpose not related to engaging our services; or attempting to interfere with the proper working of the Site. This license shall automatically terminate if you violate any of these restrictions and may be terminated by Superwits Tech at any time.`,
  },
  {
    title: "3. Disclaimer",
    content: `The information on this Site is provided for general informational and marketing purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Site for any purpose. Case studies and results presented on the Site are based on past client experiences and individual results may vary. They should not be interpreted as a guarantee of similar results for your business.`,
  },
  {
    title: "4. Limitations",
    content: `In no event shall Superwits Tech, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from: your access to or use of (or inability to access or use) the Site; any conduct or content of any third party on the Site; any content obtained from the Site; and unauthorised access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.`,
  },
  {
    title: "5. Accuracy of Information",
    content: `We are not responsible for any inaccuracies, errors, or omissions in the content of the Site. The information on the Site is provided "as is" without any representations or warranties, express or implied. Superwits Tech makes no warranties in relation to this website or the information and materials provided on this website. Pricing, service descriptions, and delivery timelines displayed on the Site are subject to change without prior notice. Confirmed pricing and timelines will be provided in individual project proposals or contracts.`,
  },
  {
    title: "6. Scope of Services",
    content: `Superwits Tech provides website design, development, conversion optimisation, and client acquisition system building services for Nigerian service businesses. The specific scope, deliverables, timeline, and costs for any project will be outlined in a separate project proposal or service agreement. The descriptions of services on this Site are for informational purposes and do not constitute a binding offer. Commencement of any paid service requires mutual agreement on scope and terms, typically via WhatsApp communication or email confirmation.`,
  },
  {
    title: "7. Payment Terms",
    content: `Payment terms for specific projects will be outlined in the applicable project proposal or service agreement. Unless otherwise stated: a deposit may be required before work commences; the balance is due upon project completion and delivery; and late payments may incur a pause in services until the outstanding balance is settled. All prices are quoted in Nigerian Naira (₦) unless otherwise specified. Superwits Tech reserves the right to adjust pricing for future projects. All payments are non-refundable once work has commenced, except as required by applicable Nigerian consumer protection law.`,
  },
  {
    title: "8. No Guarantee of Results",
    content: `While Superwits Tech employs conversion optimisation strategies and best practices, we do not guarantee specific business outcomes, including but not limited to: specific conversion rates, inquiry volumes, revenue increases, search engine rankings, or return on investment. Website performance depends on numerous factors outside our control, including but not limited to: your product or service quality, market conditions, competition, pricing, advertising spend, and customer service. We commit to applying our expertise and best practices to every project, but individual business results will vary.`,
  },
  {
    title: "9. Intellectual Property Rights",
    content: `The Site, its original content, features, and functionality are owned by Superwits Tech and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Upon full payment, the client receives ownership of the final website deliverables (design, code, and content created specifically for the client). Superwits Tech retains the right to use the project in our portfolio, case studies, and marketing materials unless a written confidentiality agreement is in place. Third-party tools, plugins, and platforms (e.g., WordPress, Shopify, Google Analytics) remain subject to their respective terms of service and licensing agreements.`,
  },
  {
    title: "10. Limitation of Liability",
    content: `To the fullest extent permitted by applicable Nigerian law, Superwits Tech's total aggregate liability arising out of or related to these Terms or our services shall not exceed the total amount paid by the client to Superwits Tech in the twelve (12) months preceding the claim. This limitation applies regardless of the legal theory on which the claim is based, whether in contract, tort (including negligence), strict liability, or any other theory, even if Superwits Tech has been advised of the possibility of such damages.`,
  },
  {
    title: "11. Revisions and Errata",
    content: `The materials on the Site may contain technical inaccuracies or typographical errors. Superwits Tech reserves the right to make changes, corrections, improvements, and modifications to the information, content, materials, and services on the Site at any time without prior notice. Changes to published case studies, pricing, service descriptions, or other content are made in our sole discretion and do not obligate us to apply the same changes to prior engagements.`,
  },
  {
    title: "12. Links",
    content: `The Site may contain links to third-party websites or services that are not owned or controlled by Superwits Tech. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit. The inclusion of any link does not imply our endorsement, sponsorship, or recommendation of the linked website or service.`,
  },
  {
    title: "13. Modifications",
    content: `Superwits Tech reserves the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use the Site after those revisions become effective, you agree to be bound by the revised Terms.`,
  },
  {
    title: "14. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions. Any disputes arising out of or related to these Terms or our services shall be resolved in the courts of Lagos State, Nigeria. Both parties agree to submit to the personal jurisdiction of such courts and waive any objection to venue in such courts. Before initiating any legal proceedings, the parties agree to attempt good-faith resolution of any dispute through direct communication via email or WhatsApp.`,
  },
  {
    title: "15. Contact Information",
    content: `If you have any questions about these Terms of Service, please contact us: Superwits Tech, Lagos, Nigeria. Email: contact@superwitstech.com. Phone: +234 704 738 1879. For the fastest response regarding project inquiries, we recommend reaching out via WhatsApp.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "var(--sw-bg)" }}>
        {/* Hero */}
        <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="mb-4">Terms of Service</h1>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px",
                color: "var(--sw-text-muted)",
                letterSpacing: "0.5px",
              }}
            >
              Last updated: April 2, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  className="mb-4"
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--sw-text)",
                  }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    color: "var(--sw-text-body)",
                    fontSize: "15px",
                    lineHeight: 1.85,
                  }}
                >
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}