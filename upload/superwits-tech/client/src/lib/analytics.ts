// ============================================================
// Superwits Tech — Analytics & Tracking Utilities
// Design: Dark Navy / Amber / Conversion-First
// ============================================================

// Full WhatsApp CTA link with pre-filled message
export const WA_LINK =
  "https://wa.me/2347047381879?text=Hi%20Marquis%2C%20I%27d%20like%20a%20free%20website%20audit.%0A%0AMy%20business%3A%20%5Btype%20your%20business%20name%5D%0AMy%20website%3A%20%5Bpaste%20your%20URL%5D%0AMy%20biggest%20challenge%3A%20%5Bdescribe%20in%20one%20line%5D";

// Declare gtag on window so TypeScript doesn't complain
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

// EVENT 1 — audit_cta_click
export function trackAuditCtaClick(label: string) {
  gtag("event", "audit_cta_click", {
    event_category: "CTA",
    event_label: label,
  });
}

// EVENT 2 — whatsapp_click
export function trackWhatsAppClick() {
  gtag("event", "whatsapp_click", {
    event_category: "Contact",
    event_label: "WhatsApp",
  });
}

// EVENT 3 — contact_form_submit
export function trackContactFormSubmit() {
  gtag("event", "contact_form_submit", {
    event_category: "Lead",
    event_label: "Contact Form",
  });
}

// EVENT 4 — services_page_view
export function trackServicesPageView() {
  gtag("event", "services_page_view", {
    event_category: "Engagement",
    event_label: "Services Page",
  });
}

// EVENT 5 — case_study_view
export function trackCaseStudyView() {
  gtag("event", "case_study_view", {
    event_category: "Engagement",
    event_label: "Case Studies Page",
  });
}

// EVENT 6 — whatsapp_float_click
export function trackFloatClick() {
  gtag("event", "whatsapp_float_click", {
    event_category: "engagement",
    event_label: "floating_whatsapp_button",
  });
}


/**
 * Build a WhatsApp URL with a pre-filled message from contact form data
 * Sanitizes phone number and encodes message for URL safety
 */
export function buildWhatsAppUrl(formData: {
  name: string;
  businessName: string;
  businessType: string;
  website: string;
  email: string;
  whatsapp: string;
}): string {
  // Sanitize phone number: remove all non-digits
  const sanitizedPhone = formData.whatsapp.replace(/\D/g, '');
  
  // Build message with form data
  const message = `Hi Marquis,\n\nI'd like to request a free website audit.\n\nName: ${formData.name}\nBusiness: ${formData.businessName}\nType: ${formData.businessType}\nWebsite: ${formData.website}\nEmail: ${formData.email}\n\nLooking forward to your review.`;
  
  // Return WhatsApp URL with encoded message
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}
