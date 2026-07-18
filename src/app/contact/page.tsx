"use client";

import { useState, FormEvent } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const WA_LINK =
  "https://wa.me/2347047381879?text=Hi+Marquis%2C+I%27d+like+to+request+a+free+website+audit.";

interface FormData {
  fullName: string;
  businessName: string;
  businessType: string;
  websiteUrl: string;
  email: string;
  whatsappNumber: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  fullName: "",
  businessName: "",
  businessType: "",
  websiteUrl: "",
  email: "",
  whatsappNumber: "",
};

const businessTypes = [
  { value: "", label: "Select your business type" },
  { value: "clinic-wellness", label: "Clinic / Wellness" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "coaching-consulting", label: "Coaching / Consulting" },
  { value: "other", label: "Other" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "16px",
  backgroundColor: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#F5F5F0",
  fontFamily: "'Inter', sans-serif",
  fontSize: "15px",
  outline: "none",
  minHeight: "48px",
  transition: "border-color 0.2s ease",
};

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: "#DC2626",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "#F5F5F0",
  marginBottom: "6px",
};

const errorTextStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  color: "#DC2626",
  marginTop: "4px",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required.";
    }
    if (!formData.businessType) {
      newErrors.businessType = "Please select your business type.";
    }
    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = "Website URL is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmitViaAPI = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/audit-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      // Silently fail — WhatsApp fallback always available
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitViaWhatsApp = () => {
    const message = [
      `Hi Marquis, I'd like to request a free website audit.`,
      ``,
      `*Full Name:* ${formData.fullName}`,
      `*Business Name:* ${formData.businessName}`,
      `*Business Type:* ${formData.businessType}`,
      `*Website:* ${formData.websiteUrl}`,
      `*Email:* ${formData.email}`,
      `*WhatsApp:* ${formData.whatsappNumber}`,
    ].join("\n");

    window.open(
      `https://wa.me/2347047381879?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleSubmitViaAPI();
    }
  };

  const onWhatsAppSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      handleSubmitViaWhatsApp();
    }
  };

  if (submitted) {
    return (
      <>
        <Navigation />
        <main style={{ backgroundColor: "#0A0E27" }}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div
                className="rounded-lg p-8 text-center"
                style={{
                  backgroundColor: "#052E16",
                  border: "1px solid #166534",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#4ADE80",
                    marginBottom: "12px",
                  }}
                >
                  ✓ Audit Request Received
                </p>
                <h2 className="mb-4" style={{ fontSize: "28px" }}>
                  I&apos;ll Be In Touch Soon
                </h2>
                <p style={{ color: "#CBD5E1", fontSize: "16px", lineHeight: 1.7 }}>
                  Audit request received. I&apos;ll review your website and send you a
                  personalised 5-minute Loom video within 24 hours.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#0A0E27" }}>
        {/* Hero */}
        <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-4">Get Your Free Website Audit</h1>
            <p
              className="mx-auto max-w-2xl"
              style={{ color: "#A8B2C7", fontSize: "18px", lineHeight: 1.75 }}
            >
              I&apos;ll review your website, identify the top 3 conversion blockers,
              and send you a personalised 5-minute Loom video within 24 hours.
            </p>
          </div>
        </section>

        {/* WhatsApp Primary Card */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-lg p-8 text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "2px solid #D4A017",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#D4A017",
                  marginBottom: "12px",
                }}
              >
                Fastest Option
              </p>
              <h2 className="mb-3" style={{ fontSize: "24px" }}>
                Message Me Directly on WhatsApp
              </h2>
              <p
                className="mb-6"
                style={{
                  color: "#A8B2C7",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Skip the form. Start a conversation. I typically respond within
                the hour during business hours.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md transition-colors"
                style={{
                  padding: "16px 40px",
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  textDecoration: "none",
                  minHeight: "56px",
                  lineHeight: "24px",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#128C7E")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#25D366")
                }
              >
                Message Me on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-lg p-6 md:p-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <h2 className="mb-2 text-left" style={{ fontSize: "24px" }}>
                Request Your Free Audit
              </h2>
              <p
                className="mb-8 text-left"
                style={{
                  color: "#A8B2C7",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Fill in the details below and I&apos;ll get back to you within 24
                hours with your personalised audit video.
              </p>

              <form onSubmit={onSubmit} noValidate>
                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" style={labelStyle}>
                      Full Name <span style={{ color: "#D4A017" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Chidinma Okafor"
                      style={errors.fullName ? inputErrorStyle : inputStyle}
                      required
                      aria-invalid={!!errors.fullName}
                      aria-describedby={
                        errors.fullName ? "fullName-error" : undefined
                      }
                    />
                    {errors.fullName && (
                      <p id="fullName-error" style={errorTextStyle}>
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Business Name */}
                  <div>
                    <label htmlFor="businessName" style={labelStyle}>
                      Business Name <span style={{ color: "#D4A017" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Glow Aesthetics Clinic"
                      style={errors.businessName ? inputErrorStyle : inputStyle}
                      required
                      aria-invalid={!!errors.businessName}
                      aria-describedby={
                        errors.businessName ? "businessName-error" : undefined
                      }
                    />
                    {errors.businessName && (
                      <p id="businessName-error" style={errorTextStyle}>
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  {/* Business Type */}
                  <div>
                    <label htmlFor="businessType" style={labelStyle}>
                      Business Type <span style={{ color: "#D4A017" }}>*</span>
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      style={errors.businessType ? inputErrorStyle : inputStyle}
                      required
                      aria-invalid={!!errors.businessType}
                      aria-describedby={
                        errors.businessType ? "businessType-error" : undefined
                      }
                    >
                      {businessTypes.map((bt) => (
                        <option key={bt.value} value={bt.value}>
                          {bt.label}
                        </option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <p id="businessType-error" style={errorTextStyle}>
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  {/* Website URL */}
                  <div>
                    <label htmlFor="websiteUrl" style={labelStyle}>
                      Website URL <span style={{ color: "#D4A017" }}>*</span>
                    </label>
                    <input
                      type="url"
                      id="websiteUrl"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="e.g. https://yourwebsite.com"
                      style={errors.websiteUrl ? inputErrorStyle : inputStyle}
                      required
                      aria-invalid={!!errors.websiteUrl}
                      aria-describedby={
                        errors.websiteUrl ? "websiteUrl-error" : undefined
                      }
                    />
                    {errors.websiteUrl && (
                      <p id="websiteUrl-error" style={errorTextStyle}>
                        {errors.websiteUrl}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" style={labelStyle}>
                      Email <span style={{ color: "#D4A017" }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. you@yourbusiness.com"
                      style={errors.email ? inputErrorStyle : inputStyle}
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p id="email-error" style={errorTextStyle}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label htmlFor="whatsappNumber" style={labelStyle}>
                      WhatsApp Number <span style={{ color: "#D4A017" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      placeholder="e.g. 08012345678"
                      style={
                        errors.whatsappNumber ? inputErrorStyle : inputStyle
                      }
                      required
                      aria-invalid={!!errors.whatsappNumber}
                      aria-describedby={
                        errors.whatsappNumber
                          ? "whatsappNumber-error"
                          : undefined
                      }
                    />
                    {errors.whatsappNumber && (
                      <p id="whatsappNumber-error" style={errorTextStyle}>
                        {errors.whatsappNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    type="button"
                    onClick={onWhatsAppSubmit}
                    className="flex-1 rounded-md transition-colors flex items-center justify-center"
                    style={{
                      padding: "14px 24px",
                      backgroundColor: "#25D366",
                      color: "#FFFFFF",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      minHeight: "48px",
                      lineHeight: "20px",
                    }}
                    disabled={isSubmitting}
                  >
                    Send via WhatsApp
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-md transition-colors flex items-center justify-center"
                    style={{
                      padding: "14px 24px",
                      backgroundColor: "#D4A017",
                      color: "#0A1128",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      minHeight: "48px",
                      lineHeight: "20px",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Request My Free Audit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* What Happens Next */}
        <section
          className="pb-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-10 text-center">What Happens Next</h2>
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "I Review Your Website",
                  description:
                    "Within 24 hours of receiving your request, I'll audit your website — navigation flow, trust signals, call-to-action placement, mobile experience, and conversion path.",
                },
                {
                  step: "2",
                  title: "You Receive a Personalised Loom Video",
                  description:
                    "I'll record a 5-minute video walking through your site's top 3 conversion blockers and exactly how to fix each one. No jargon, no pitch — just actionable insight.",
                },
                {
                  step: "3",
                  title: "You Decide What's Next",
                  description:
                    "No commitment. No pressure. If you want to implement the fixes yourself, go ahead. If you'd rather have me build the system, we can talk about it on WhatsApp.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#D4A017",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "#0A1128",
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3
                      className="mb-2"
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#F5F5F0",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        color: "#A8B2C7",
                        fontSize: "15px",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NAP Block */}
        <section
          className="pb-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-lg p-6 md:p-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <h2
                className="mb-4"
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#F5F5F0",
                }}
              >
                Contact Information
              </h2>
              <address
                className="space-y-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "normal",
                  color: "#A8B2C7",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                <p>
                  <strong style={{ color: "#F5F5F0" }}>Superwits Tech</strong>
                </p>
                <p>Lagos, Nigeria</p>
                <p>
                  <a
                    href="tel:+2347047381879"
                    style={{ color: "#D4A017", textDecoration: "none" }}
                  >
                    +234 704 738 1879
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:contact@superwitstech.com"
                    style={{ color: "#D4A017", textDecoration: "none" }}
                  >
                    contact@superwitstech.com
                  </a>
                </p>
              </address>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}