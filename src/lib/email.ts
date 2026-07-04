import sgMail from "@sendgrid/mail";
import { BUSINESS_NAME, SITE_URL } from "./constants";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("[SendGrid] No API key configured. Email not sent.");
    return false;
  }

  try {
    await sgMail.send({
      to,
      from: {
        email: process.env.EMAIL_FROM || "contact@superwitstech.com",
        name: BUSINESS_NAME,
      },
      subject,
      html,
      text,
    });
    return true;
  } catch (error) {
    console.error("[SendGrid] Error sending email:", error);
    return false;
  }
}

export function generateFollowupEmailHTML(
  name: string,
  step: number,
  customMessage: string,
  unsubscribeUrl?: string
): string {
  const subjectLines: Record<number, string> = {
    1: "Your Free Website Audit is on its way",
    3: "Quick check-in on your website audit",
    4: "Is your website costing you clients?",
    5: "Last chance this month — free audit",
    6: "Closing audit queue soon",
  };

  const subject = subjectLines[step] || "Update from Superwits Tech";

  const footerLinks = unsubscribeUrl
    ? `<p style="font-size:12px;color:#94A3B8;margin-top:24px;">
         <a href="${unsubscribeUrl}" style="color:#D97706;">Unsubscribe</a> from these emails.
       </p>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#07122A;font-family:Inter,sans-serif;">
  <div style="max-width:600px;margin:40px auto;padding:32px;background-color:#0F1F3D;border:1px solid #1A3260;border-radius:8px;">
    <p style="font-family:Syne,sans-serif;font-size:20px;font-weight:800;color:#F1F5F9;margin-bottom:4px;">
      <span style="color:#F1F5F9;">Superwits</span><span style="color:#D97706;"> tech</span>
    </p>
    <p style="font-size:14px;color:#94A3B8;margin-bottom:24px;">${subject}</p>
    <div style="font-size:16px;color:#F1F5F9;line-height:1.75;">
      <p>Hi ${name},</p>
      ${customMessage.split("\n").map((line) => `<p>${line || "&nbsp;"}</p>`).join("")}
      <p style="margin-top:24px;">Marquis<br><span style="color:#94A3B8;">${BUSINESS_NAME}</span></p>
    </div>
    <div style="margin-top:32px;padding-top:24px;border-top:1px solid #1A3260;text-align:center;">
      <a href="${SITE_URL}" style="color:#D97706;font-size:13px;">superwitstech.com</a>
    </div>
    ${footerLinks}
  </div>
</body>
</html>`;
}

export function generateUnsubscribeToken(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export function buildUnsubscribeUrl(token: string): string {
  return `${SITE_URL}/unsubscribe/${token}`;
}