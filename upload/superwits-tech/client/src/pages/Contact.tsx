// ============================================================
// Superwits Tech — Contact Page
// Design: Dark Navy / Amber / Conversion-First
// Phase 5: Formspree integration, success state, SEO, GA4 tracking
// ============================================================
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { WA_LINK, trackWhatsAppClick, trackAuditCtaClick, trackContactFormSubmit } from "@/lib/analytics";
import { CheckCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { QualifyingChatbot } from "@/components/QualifyingChatbot";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    businessType: "",
    website: "",
    email: "",
    whatsapp: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [auditRequestId, setAuditRequestId] = useState<number | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required.";
    if (!formData.businessType) newErrors.businessType = "Please select your business type.";
    if (!formData.website.trim()) {
      newErrors.website = "Website URL is required.";
    } else if (!/^https?:\/\/.+\..+/.test(formData.website.trim())) {
      newErrors.website = "Please enter a valid URL (e.g. https://yoursite.com)";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required.";
    } else if (!/^\+?[0-9\s\-()]{10,}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = "Please enter a valid phone number (e.g. +234 704 738 1879).";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const submitMutation = trpc.auditRequests.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormState("submitting");

    try {
      const result = await submitMutation.mutateAsync({
        name: formData.name,
        businessName: formData.businessName,
        businessType: formData.businessType,
        website: formData.website,
        email: formData.email,
        whatsapp: formData.whatsapp,
      });

      if (result && result.id) {
        setAuditRequestId(result.id);
        setShowChatbot(true);
      }

      setFormState("success");
      trackContactFormSubmit();
      setFormData({ name: "", businessName: "", businessType: "", website: "", email: "", whatsapp: "" });
    } catch {
      setFormState("error");
    }
  };

  const handleWhatsAppClick = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build WhatsApp message with form data
    const sanitizedPhone = formData.whatsapp.replace(/\D/g, '');
    const message = `Hi Marquis,\n\nI'd like to request a free website audit.\n\nName: ${formData.name}\nBusiness: ${formData.businessName}\nType: ${formData.businessType}\nWebsite: ${formData.website}\nEmail: ${formData.email}\n\nLooking forward to your review.`;
    const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;

    // Track and open WhatsApp
    trackWhatsAppClick();
    trackAuditCtaClick("Send via WhatsApp");
    window.open(whatsappUrl, "_blank");
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#0F1F3D",
    border: "1px solid #1A3260",
    borderRadius: "6px",
    color: "#F1F5F9",
    outline: "none",
    boxSizing: "border-box",
  };

  const errorInputStyle: React.CSSProperties = {
    ...inputStyle,
    border: "1px solid #DC2626",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: "#F1F5F9",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <div className="min-h-screen bg-[#07122A] flex flex-col">
      <SEOHead
        title="Contact — Superwits Tech | Request Your Free Website Audit"
        description="Request your free website audit. A 5-minute Loom review showing exactly what is costing you clients. No pitch. No cost. 3 slots per week."
        canonical="https://superwitstech.com/contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://superwitstech.com/" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://superwitstech.com/contact" }
          ]
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            Get Your Free Website Audit
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
            A 5-minute Loom review showing exactly what is costing you clients. No pitch. No cost. 3 slots per week.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#07122A" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* WhatsApp Option — Primary */}
          <div className="mb-16 p-12 rounded-lg" style={{ backgroundColor: "#0F1F3D", border: "2px solid #D97706" }}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginBottom: "16px",
              }}
            >
              Primary Option — WhatsApp
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#94A3B8",
                marginBottom: "24px",
              }}
            >
              Fastest response — usually within a few hours
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { trackWhatsAppClick(); trackAuditCtaClick("Message Me on WhatsApp"); }}
              style={{
                display: "block",
                width: "100%",
                padding: "16px 32px",
                borderRadius: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                backgroundColor: "#D97706",
                color: "#FFFFFF",
                textDecoration: "none",
                textAlign: "center",
                minHeight: "56px",
                lineHeight: "24px",
                transition: "background-color 0.2s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F59E0B")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#D97706")}
            >
              Message Me on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginBottom: "24px",
              }}
            >
              Or send a message
            </h2>

            {/* Success State */}
            {formState === "success" && (
              <div
                className="mb-8 p-6 rounded-lg flex items-start gap-4"
                style={{ backgroundColor: "#0F1F3D", border: "1px solid #4ADE80" }}
              >
                <CheckCircle size={24} style={{ color: "#4ADE80", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#F1F5F9",
                      marginBottom: "8px",
                    }}
                  >
                    Audit request received.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#94A3B8",
                      lineHeight: 1.75,
                    }}
                  >
                    I'll review your website and send you a personalised 5-minute Loom video within 24 hours. No pitch. No commitment.
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {formState === "error" && (
              <div
                className="mb-8 p-6 rounded-lg flex items-start gap-4"
                style={{ backgroundColor: "#0F1F3D", border: "1px solid #DC2626" }}
              >
                <AlertCircle size={24} style={{ color: "#DC2626", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#F1F5F9",
                      marginBottom: "8px",
                    }}
                  >
                    Something went wrong.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#94A3B8",
                    }}
                  >
                    Please try again or message me directly on WhatsApp.
                  </p>
                </div>
              </div>
            )}

            {formState !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Full Name */}
                <div>
                  <label style={labelStyle} htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={errors.name ? errorInputStyle : inputStyle}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#DC2626", marginTop: "6px" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <label style={labelStyle} htmlFor="businessName">Business Name *</label>
                  <input
                    id="businessName"
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    style={errors.businessName ? errorInputStyle : inputStyle}
                    placeholder="e.g., Acme Consulting Ltd"
                    autoComplete="organization"
                  />
                  {errors.businessName && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#DC2626", marginTop: "6px" }}>
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* Business Type */}
                <div>
                  <label style={labelStyle} htmlFor="businessType">Business Type *</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    style={errors.businessType ? errorInputStyle : inputStyle}
                  >
                    <option value="">Select your business type</option>
                    <option value="clinic">Clinic / Wellness</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="coaching">Coaching / Consulting</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.businessType && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#DC2626", marginTop: "6px" }}>
                      {errors.businessType}
                    </p>
                  )}
                </div>

                {/* Website URL */}
                <div>
                  <label style={labelStyle} htmlFor="website">Website URL *</label>
                  <input
                    id="website"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    style={errors.website ? errorInputStyle : inputStyle}
                    placeholder="https://yourwebsite.com"
                    autoComplete="url"
                  />
                  {errors.website && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#DC2626", marginTop: "6px" }}>
                      {errors.website}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle} htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={errors.email ? errorInputStyle : inputStyle}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#DC2626", marginTop: "6px" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label style={labelStyle} htmlFor="whatsapp">WhatsApp Number *</label>
                  <input
                    id="whatsapp"
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    style={errors.whatsapp ? errorInputStyle : inputStyle}
                    placeholder="+234 704 738 1879"
                    autoComplete="tel"
                  />
                  {errors.whatsapp && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#DC2626", marginTop: "6px" }}>
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="px-8 py-4 rounded-md font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      backgroundColor: "#25D366",
                      color: "#FFFFFF",
                      minHeight: "48px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#20BA58")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
                  >
                    Send via WhatsApp
                  </button>

                  {/* Form Submit Button */}
                  <button
                    type="submit"
                    disabled={formState === "submitting" || submitMutation.isPending}
                    className="px-8 py-4 rounded-md font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      backgroundColor: (formState === "submitting" || submitMutation.isPending) ? "#B45309" : "#D97706",
                      color: "#FFFFFF",
                      minHeight: "48px",
                      border: "none",
                      cursor: (formState === "submitting" || submitMutation.isPending) ? "not-allowed" : "pointer",
                      opacity: (formState === "submitting" || submitMutation.isPending) ? 0.8 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (formState !== "submitting" && !submitMutation.isPending) e.currentTarget.style.backgroundColor = "#F59E0B";
                    }}
                    onMouseLeave={(e) => {
                      if (formState !== "submitting" && !submitMutation.isPending) e.currentTarget.style.backgroundColor = "#D97706";
                    }}
                  >
                    {formState === "submitting" || submitMutation.isPending ? "Sending..." : "Request My Free Audit"}
                  </button>
                </div>

                {/* Form Note */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#94A3B8",
                    textAlign: "center",
                  }}
                >
                  ✓ Free audit — no credit card ✓ Results via WhatsApp within 24 hours
                </p>
              </form>
            )}
          </div>

          {/* NAP Block — Name, Address, Phone for local SEO */}
          <div className="mt-12 p-8 rounded-lg" style={{ backgroundColor: "#0F1F3D", border: "1px solid #1A3260" }}>
            <h3
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "2px",
                color: "#D97706",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Contact Details
            </h3>
            <address
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#94A3B8",
                lineHeight: 1.75,
                fontStyle: "normal",
              }}
            >
              <p style={{ marginBottom: "4px", color: "#F1F5F9", fontWeight: 600 }}>Superwits Tech</p>
              <p style={{ marginBottom: "4px" }}>Lagos, Nigeria</p>
              <a
                href="tel:+2347047381879"
                style={{ color: "#D97706", textDecoration: "none", display: "block", marginBottom: "4px" }}
              >
                +234 704 738 1879
              </a>
              <a
                href="mailto:contact@superwitstech.com"
                style={{ color: "#D97706", textDecoration: "none", display: "block", marginBottom: "4px" }}
              >
                contact@superwitstech.com
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#D97706", textDecoration: "none" }}
              >
                WhatsApp: wa.me/2347047381879
              </a>
            </address>
          </div>

          {/* What Happens Next */}
          <div className="mt-16 p-8 rounded-lg" style={{ backgroundColor: "#0F1F3D", border: "1px solid #1A3260" }}>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F1F5F9",
                marginBottom: "16px",
              }}
            >
              What Happens Next
            </h3>
            <ol
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#F1F5F9",
                paddingLeft: "24px",
              }}
            >
              <li style={{ marginBottom: "12px" }}>I review your website before responding.</li>
              <li style={{ marginBottom: "12px" }}>I record a 5-minute Loom video with your top 3 conversion findings.</li>
              <li>I send it to you — specific, actionable, no pitch.</li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />

      {/* Chatbot Modal */}
      {showChatbot && auditRequestId && (
        <QualifyingChatbot
          auditRequestId={auditRequestId}
          onComplete={() => {
            setShowChatbot(false);
            setTimeout(() => {
              setFormState("idle");
              setAuditRequestId(null);
            }, 2000);
          }}
          onClose={() => {
            setShowChatbot(false);
            setFormState("idle");
            setAuditRequestId(null);
          }}
        />
      )}
    </div>
  );
}
