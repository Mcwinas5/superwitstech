import sgMail from "@sendgrid/mail";
import { ENV } from "./_core/env";

// Initialize SendGrid with API key
sgMail.setApiKey(ENV.sendgridApiKey);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Send an email via SendGrid
 * @param options Email options (to, subject, html, text, replyTo)
 * @returns Promise with send result
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const msg = {
      to: options.to,
      from: ENV.sendgridFromEmail,
      subject: options.subject,
      text: options.text || "",
      html: options.html,
      replyTo: options.replyTo || ENV.sendgridFromEmail,
    };

    const result = await sgMail.send(msg);
    console.log(`[SendGrid] Email sent to ${options.to}:`, result[0].statusCode);
    return result[0].statusCode === 202;
  } catch (error) {
    console.error(`[SendGrid] Failed to send email to ${options.to}:`, error);
    return false;
  }
}

/**
 * Generate personalized follow-up email HTML
 * @param leadName Lead's name for personalization
 * @param step Follow-up step (1-5)
 * @param biggestChallenge Optional biggest challenge from chatbot
 * @param unsubscribeUrl Optional unsubscribe link for email footer
 */
export function generateFollowupEmailHTML(
  leadName: string,
  step: number,
  biggestChallenge?: string,
  unsubscribeUrl?: string
): string {
  /**
   * Build the email footer with unsubscribe link
   */
  const buildFooter = (unsubscribeUrl?: string) => {
    if (!unsubscribeUrl) return "";
    return `
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 32px 0;">
      <p style="font-size: 12px; color: #666; text-align: center;">
        <a href="${unsubscribeUrl}" style="color: #D97706; text-decoration: none;">Unsubscribe from follow-ups</a>
      </p>
    `;
  };

  const templates: Record<number, (name: string, challenge?: string, footer?: string) => string> = {
    1: (name, challenge, footer) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>Thanks for requesting a free conversion audit. I really appreciate it.</p>
        <p>I'm going to review your website and send you a custom 5-minute video within 24 hours with my findings.</p>
        ${challenge ? `<p><strong>I saw you mentioned your biggest challenge is:</strong> "${challenge}"</p><p>I'll specifically address this in your audit.</p>` : ""}
        <p>Talk soon,<br>Marquis Festus<br>Superwits Tech</p>
        ${footer || ""}
      </div>
    `,
    2: (name, _, footer) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>Just a quick follow-up on your audit request.</p>
        <p>I'm still reviewing your website and will have your custom video ready by tomorrow morning.</p>
        <p>In the meantime, if you have any questions, feel free to reply to this email.</p>
        <p>Talk soon,<br>Marquis Festus<br>Superwits Tech</p>
        ${footer || ""}
      </div>
    `,
    3: (name, _, footer) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>Your conversion audit is ready.</p>
        <p>I found 3 specific changes that could increase your client inquiries by 40-60%.</p>
        <p>Reply to this email or click below to schedule a quick call to discuss:</p>
        <p><a href="https://superwitstech.com/contact" style="background-color: #D97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Your Audit</a></p>
        <p>Talk soon,<br>Marquis Festus<br>Superwits Tech</p>
        ${footer || ""}
      </div>
    `,
    4: (name, _, footer) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>I haven't heard from you yet on your audit.</p>
        <p>I understand you might be busy. Just wanted to check in — is there anything holding you back from implementing these changes?</p>
        <p>Reply here or reach out on WhatsApp: <a href="https://wa.me/234704738187">Chat with me</a></p>
        <p>Talk soon,<br>Marquis Festus<br>Superwits Tech</p>
        ${footer || ""}
      </div>
    `,
    5: (name, _, footer) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>Last follow-up from me.</p>
        <p>I know you're probably getting a lot of emails. I just want you to know that if you ever decide to move forward with these changes, I'm here to help.</p>
        <p>Feel free to reach out anytime: <a href="https://wa.me/234704738187">WhatsApp</a> or reply to this email.</p>
        <p>All the best,<br>Marquis Festus<br>Superwits Tech</p>
        ${footer || ""}
      </div>
    `,
  };

  const footer = buildFooter(unsubscribeUrl);
  const template = templates[step] || templates[1];
  return template(leadName, biggestChallenge, footer);
}

/**
 * Validate SendGrid credentials by sending a test email
 */
export async function validateSendGridCredentials(): Promise<boolean> {
  try {
    // Test that we can access the API
    const msg = {
      to: ENV.sendgridFromEmail, // Send to self
      from: ENV.sendgridFromEmail,
      subject: "SendGrid Validation Test",
      html: "<p>This is a test email to validate SendGrid credentials.</p>",
      text: "This is a test email to validate SendGrid credentials.",
    };

    const result = await sgMail.send(msg);
    console.log("[SendGrid] Validation successful. Status:", result[0].statusCode);
    return result[0].statusCode === 202;
  } catch (error) {
    console.error("[SendGrid] Validation failed:", error);
    return false;
  }
}
