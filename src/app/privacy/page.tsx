import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Superwits Tech. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy — Superwits Tech",
    description: "Privacy Policy for Superwits Tech services.",
    url: "https://superwitstech.com/privacy",
  },
};

const sections = [
  {
    title: "1. Introduction",
    content: `Superwits Tech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website superwitstech.com (the "Site"), use our services, or communicate with us. Please read this policy carefully. By accessing or using the Site, you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy.`,
  },
  {
    title: "2. Information We Collect",
    content: null,
    subsections: [
      {
        subtitle: "2.1 Personal Information",
        text: `When you request a free website audit, contact us, or engage our services, we may collect personal information that you voluntarily provide, including: your full name, business name, business type, website URL, email address, and WhatsApp phone number. We only collect information that is necessary to provide our services and communicate with you effectively.`,
      },
      {
        subtitle: "2.2 Automatically Collected Information",
        text: `When you visit the Site, we may automatically collect certain information about your device and browsing activity. This includes: your IP address, browser type and version, operating system, referring URLs, pages viewed and time spent on pages, links clicked, and the date and time of your visit. We collect this information through Google Analytics 4 and standard web analytics technologies.`,
      },
      {
        subtitle: "2.3 Communication Information",
        text: `If you communicate with us via WhatsApp, email, or our contact form, we may collect and record the content of those communications, your contact information, and any files or attachments you share with us. This information is stored solely for the purpose of responding to your inquiry and providing our services.`,
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect for the following purposes: to provide and deliver the services you request, including website audits, website builds, and client acquisition systems; to communicate with you about your inquiry, project status, or account; to send you your personalised audit video and related recommendations; to improve our website, services, and client experience; to analyse website usage patterns and optimise our conversion strategies; to comply with legal obligations and protect our legal rights; and to send you relevant updates about our services, only where you have consented to receive such communications.`,
  },
  {
    title: "4. Google Analytics 4",
    content: `We use Google Analytics 4 ("GA4") to collect and analyse website usage data. GA4 uses cookies and similar technologies to gather information about how visitors interact with the Site. This data is aggregated and anonymised, and it helps us understand website traffic, user behaviour, and conversion patterns. We implement GA4 with Consent Mode v2, which means analytics data is only collected after you provide consent through our cookie consent banner. You can opt out of GA4 tracking by using the Google Analytics opt-out browser add-on or by adjusting your cookie preferences using our cookie settings tool. For more information about how Google uses your data, please visit Google's Privacy & Terms page.`,
  },
  {
    title: "5. WhatsApp Communication",
    content: `We use WhatsApp as a primary communication channel for client inquiries and project discussions. When you message us on WhatsApp, your phone number, message content, and any media shared are processed by WhatsApp (Meta Platforms, Inc.) under their own privacy policy. We do not store WhatsApp conversations on our servers beyond what is necessary to provide our services. We encourage you to review WhatsApp's privacy practices. We will never share your WhatsApp number with third parties for marketing purposes. You can stop WhatsApp communications at any time by sending a clear opt-out message.`,
  },
  {
    title: "6. Data Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances: with service providers who assist us in operating the Site and providing our services (such as hosting providers, email services, and analytics tools), subject to confidentiality agreements; when required by law, regulation, legal process, or governmental request; to protect the rights, property, or safety of Superwits Tech, our clients, or the public; and with your explicit written consent for any other purpose. All third-party service providers are obligated to handle your data in accordance with applicable privacy laws and only for the purposes we have specified.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Specifically: inquiry and audit request data is retained for up to 24 months after your last interaction with us; project-related data (contracts, deliverables, communications) is retained for the duration of the project plus 36 months; analytics data collected via GA4 is retained for up to 26 months in accordance with Google's data retention settings. When data is no longer needed, it is securely deleted or anonymised.`,
  },
  {
    title: "8. Your Rights",
    content: `You have the following rights regarding your personal information: the right to access — you may request a copy of the personal data we hold about you; the right to rectification — you may request that we correct any inaccurate or incomplete data; the right to erasure — you may request that we delete your personal data, subject to legal retention requirements; the right to restrict processing — you may request that we limit how we use your data; the right to data portability — you may request your data in a structured, commonly used format; and the right to withdraw consent — you may withdraw your consent for any consent-based processing at any time. To exercise any of these rights, please contact us at contact@superwitstech.com. We will respond to your request within 30 days.`,
  },
  {
    title: "9. Security",
    content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include: SSL/TLS encryption for all data transmitted through the Site; secure access controls and authentication for our systems; regular security reviews and updates; and secure data storage with appropriate access restrictions. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee its absolute security.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us: Superwits Tech, Lagos, Nigeria. Email: contact@superwitstech.com. Phone: +234 704 738 1879. We will endeavour to respond to all privacy-related inquiries within 5 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#0A0E27" }}>
        {/* Hero */}
        <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="mb-4">Privacy Policy</h1>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px",
                color: "#A8B2C7",
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
                    color: "#F5F5F0",
                  }}
                >
                  {section.title}
                </h2>

                {section.content && (
                  <p
                    style={{
                      color: "#CBD5E1",
                      fontSize: "15px",
                      lineHeight: 1.85,
                    }}
                  >
                    {section.content}
                  </p>
                )}

                {section.subsections &&
                  section.subsections.map((sub) => (
                    <div key={sub.subtitle} className="mb-6">
                      <h3
                        className="mb-3"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#F5F5F0",
                        }}
                      >
                        {sub.subtitle}
                      </h3>
                      <p
                        style={{
                          color: "#CBD5E1",
                          fontSize: "15px",
                          lineHeight: 1.85,
                        }}
                      >
                        {sub.text}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}