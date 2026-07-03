import { db } from "@/lib/db";
import { generateUnsubscribeToken, buildUnsubscribeUrl, sendEmail, generateFollowupEmailHTML } from "@/lib/email";

const FOLLOWUP_SEQUENCE = [
  { step: 1, channel: "email" as const, delayMinutes: 5, name: "Initial Email" },
  { step: 2, channel: "whatsapp" as const, delayMinutes: 12 * 60, name: "WhatsApp Escalation" },
  { step: 3, channel: "email" as const, delayMinutes: 2 * 24 * 60, name: "Follow-up #2" },
  { step: 4, channel: "email" as const, delayMinutes: 5 * 24 * 60, name: "Follow-up #3" },
  { step: 5, channel: "email" as const, delayMinutes: 9 * 24 * 60, name: "Follow-up #4" },
  { step: 6, channel: "email" as const, delayMinutes: 14 * 24 * 60, name: "Final Follow-up" },
];

function getMessageTemplates(name: string, businessName: string, personalization: string): Record<number, string> {
  return {
    1: `Thanks for requesting a free website audit for ${businessName}. I'll review your site and send you a custom 5-minute video within 24 hours showing exactly what's working and what's costing you clients.${personalization}\n\nTalk soon,\nMarquis\nSuperwits Tech`,
    3: `Just checking in on your audit request for ${businessName}. If you haven't seen my video yet, I'd love to know if there's anything specific you'd like me to focus on.\n\nReady to turn your website into a client-getting machine?\n\nMarquis\nSuperwits Tech`,
    4: `Most websites are built to look good, not to convert. That's why ${businessName} is probably leaving money on the table.\n\nMy audit shows exactly where you're losing clients and how to fix it in days, not months.\n\nLet's talk on WhatsApp.\n\nMarquis\nSuperwits Tech`,
    5: `Last message: I've helped clinics, coaches, and e-commerce brands go from 0 to 15+ client inquiries per week with conversion-focused websites.\n\nIf you're serious about growth, let's schedule a 15-minute call.\n\nMarquis\nSuperwits Tech`,
    6: `I'm closing my audit queue for the next 30 days. If you want a spot, reply by end of day tomorrow.\n\nOtherwise, I'll reach out in a month.\n\nMarquis\nSuperwits Tech`,
  };
}

export async function createFollowupSequence(auditRequestId: string): Promise<void> {
  const lead = await db.auditRequest.findUnique({ where: { id: auditRequestId } });
  if (!lead) return;

  const token = lead.unsubscribeToken || generateUnsubscribeToken();
  if (!lead.unsubscribeToken) {
    await db.auditRequest.update({ where: { id: auditRequestId }, data: { unsubscribeToken: token } });
  }

  for (const config of FOLLOWUP_SEQUENCE) {
    const scheduledAt = new Date(Date.now() + config.delayMinutes * 60 * 1000);
    await db.followupSequence.create({
      data: { auditRequestId, step: config.step, channel: config.channel, scheduledAt, status: "pending" },
    });
  }
}

export async function processPendingFollowups(): Promise<void> {
  const now = new Date();
  const pendingFollowups = await db.followupSequence.findMany({ where: { status: "pending" } });

  for (const followup of pendingFollowups) {
    if (new Date(followup.scheduledAt) > now) continue;

    const lead = await db.auditRequest.findUnique({ where: { id: followup.auditRequestId } });
    if (!lead || lead.unsubscribed) continue;

    let personalization = "";
    try {
      const conversation = await db.chatbotConversation.findFirst({ where: { auditRequestId: followup.auditRequestId, isComplete: true } });
      if (conversation) {
        const responses = JSON.parse(conversation.responses);
        if (responses[0]) personalization = `\n\nI saw you mentioned "${responses[0]}" as your biggest challenge. That's exactly what we solve.`;
      }
    } catch {}

    const templates = getMessageTemplates(lead.name, lead.businessName, personalization);
    const message = templates[followup.step] || templates[1];

    const unsubscribeUrl = lead.unsubscribeToken ? buildUnsubscribeUrl(lead.unsubscribeToken) : undefined;

    if (followup.channel === "email") {
      const htmlContent = generateFollowupEmailHTML(lead.name, followup.step, message, unsubscribeUrl);
      const emailSent = await sendEmail({
        to: lead.email,
        subject: `Superwits Tech - Website Audit for ${lead.businessName}`,
        html: htmlContent,
        text: message,
      });

      await db.followupSequence.update({
        where: { id: followup.id },
        data: { status: emailSent ? "sent" : "failed", sentAt: emailSent ? new Date() : undefined, errorMessage: emailSent ? undefined : "SendGrid failed" },
      });

      await db.communicationLog.create({
        data: {
          auditRequestId: followup.auditRequestId,
          followupSequenceId: followup.id,
          type: "email",
          recipient: lead.email,
          subject: `Superwits Tech - Website Audit for ${lead.businessName}`,
          body: message,
          status: emailSent ? "sent" : "failed",
        },
      });
    } else {
      await db.followupSequence.update({
        where: { id: followup.id },
        data: { status: "sent", sentAt: new Date() },
      });
      await db.communicationLog.create({
        data: {
          auditRequestId: followup.auditRequestId,
          followupSequenceId: followup.id,
          type: "whatsapp",
          recipient: lead.whatsapp,
          subject: "WhatsApp Message",
          body: message,
          status: "sent",
        },
      });
    }
  }
}