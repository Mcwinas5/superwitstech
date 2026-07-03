import { getDb } from "./db";
import { followupSequences, communicationLogs, auditRequests, chatbotConversations } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import { sendEmail, generateFollowupEmailHTML } from "./sendgrid";
import { generateUnsubscribeToken, buildUnsubscribeUrl } from "./unsubscribe";
import * as db from "./db";

/**
 * Follow-up sequence configuration
 * Option B: Moderate - 14 days
 */
const FOLLOWUP_SEQUENCE = [
  { step: 1, channel: "email" as const, delayMinutes: 5, name: "Initial Email" },
  { step: 2, channel: "whatsapp" as const, delayMinutes: 12 * 60, name: "WhatsApp Escalation" },
  { step: 3, channel: "email" as const, delayMinutes: 2 * 24 * 60, name: "Follow-up Email #2" },
  { step: 4, channel: "email" as const, delayMinutes: 5 * 24 * 60, name: "Follow-up Email #3" },
  { step: 5, channel: "email" as const, delayMinutes: 9 * 24 * 60, name: "Follow-up Email #4" },
  { step: 6, channel: "email" as const, delayMinutes: 14 * 24 * 60, name: "Final Follow-up Email" },
];

/**
 * Get personalized message based on chatbot responses
 */
async function getPersonalizedMessage(
  auditRequestId: number,
  step: number,
  lead: { name: string; businessName: string }
): Promise<string> {
  // Get chatbot responses if available
  const db = await getDb();
  let personalization = "";

  if (db) {
    try {
      const conversations = await db
        .select()
        .from(chatbotConversations)
        .where(eq(chatbotConversations.auditRequestId, auditRequestId))
        .limit(1);

      const conversation = conversations[0];
      if (conversation && conversation.isComplete) {
        const responses = JSON.parse(conversation.responses);
        const biggestChallenge = responses[0]; // First question: biggest challenge
        if (biggestChallenge) {
          personalization = `\n\nI saw you mentioned "${biggestChallenge}" as your biggest challenge. That's exactly what we solve.`;
        }
      }
    } catch (e) {
      // Silently fail if responses can't be parsed
    }
  }

  // Message templates by step
  const templates: Record<number, string> = {
    1: `Hi ${lead.name},

Thanks for requesting a free website audit for ${lead.businessName}. I'll review your site and send you a custom 5-minute video within 24 hours showing exactly what's working and what's costing you clients.${personalization}

Talk soon,
Marquis
Superwits Tech`,

    3: `Hi ${lead.name},

Just checking in on your audit request for ${lead.businessName}. If you haven't seen my video yet, I'd love to know if there's anything specific you'd like me to focus on.

Ready to turn your website into a client-getting machine?

Marquis
Superwits Tech`,

    4: `Hi ${lead.name},

Most websites are built to look good, not to convert. That's why ${lead.businessName} is probably leaving money on the table.

My audit shows exactly where you're losing clients and how to fix it in days, not months.

Let's talk: [Your WhatsApp]

Marquis
Superwits Tech`,

    5: `Hi ${lead.name},

Last message: I've helped clinics, coaches, and e-commerce brands go from 0 to 15+ client inquiries per week with conversion-focused websites.

If you're serious about growth, let's schedule a 15-minute call.

Marquis
Superwits Tech`,

    6: `Hi ${lead.name},

I'm closing my audit queue for the next 30 days. If you want a spot, reply by end of day tomorrow.

Otherwise, I'll reach out in a month.

Marquis
Superwits Tech`,
  };

  return templates[step] || templates[1];
}

/**
 * Create initial follow-up sequence for a new lead
 */
export async function createFollowupSequence(auditRequestId: number): Promise<void> {
  try {
    const database = await getDb();
    if (!database) {
      console.error("Database not available");
      return;
    }

    // Get lead details
    const leads = await database
      .select()
      .from(auditRequests)
      .where(eq(auditRequests.id, auditRequestId))
      .limit(1);

    const lead = leads[0];
    if (!lead) {
      console.error(`Lead not found: ${auditRequestId}`);
      return;
    }

    // Generate unsubscribe token if not already present
    if (!lead.unsubscribeToken) {
      const token = generateUnsubscribeToken();
      await database
        .update(auditRequests)
        .set({ unsubscribeToken: token })
        .where(eq(auditRequests.id, auditRequestId));
    }

    // Create follow-up entries for each step
    for (const config of FOLLOWUP_SEQUENCE) {
      const scheduledAt = new Date(Date.now() + config.delayMinutes * 60 * 1000);

      await database.insert(followupSequences).values({
        auditRequestId,
        step: config.step,
        channel: config.channel,
        scheduledAt,
        status: "pending",
      });
    }

    console.log(`Created follow-up sequence for lead ${auditRequestId}`);
  } catch (error) {
    console.error("Error creating follow-up sequence:", error);
    throw error;
  }
}

/**
 * Send email follow-up
 */
async function sendEmailFollowup(
  auditRequestId: number,
  step: number,
  lead: { name: string; email: string; businessName: string; unsubscribeToken?: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const database = await getDb();
    if (!database) {
      return { success: false, error: "Database not available" };
    }

    const message = await getPersonalizedMessage(auditRequestId, step, lead);

    // Log the communication
    await database.insert(communicationLogs).values({
      auditRequestId,
      type: "email",
      recipient: lead.email,
      subject: `Superwits Tech - Website Audit for ${lead.businessName}`,
      body: message,
      status: "sent",
    });

    // Build unsubscribe URL if token is available
    let unsubscribeUrl: string | undefined;
    if (lead.unsubscribeToken) {
      unsubscribeUrl = buildUnsubscribeUrl(lead.unsubscribeToken);
    }

    // Send via SendGrid
    const htmlContent = generateFollowupEmailHTML(lead.name, step, "", unsubscribeUrl);
    const emailSent = await sendEmail({
      to: lead.email,
      subject: `Superwits Tech - Website Audit for ${lead.businessName}`,
      html: htmlContent,
      text: message,
    });

    if (!emailSent) {
      throw new Error("SendGrid failed to send email");
    }

    console.log(`Email sent to ${lead.email} via SendGrid`);

    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending email:", errorMsg);

    const database = await getDb();
    if (database) {
      await database.insert(communicationLogs).values({
        auditRequestId,
        type: "email",
        recipient: lead.email,
        subject: `Superwits Tech - Website Audit for ${lead.businessName}`,
        body: "",
        status: "failed",
        errorDetails: errorMsg,
      });
    }

    return { success: false, error: errorMsg };
  }
}

/**
 * Send WhatsApp follow-up
 */
async function sendWhatsappFollowup(
  auditRequestId: number,
  step: number,
  lead: { name: string; whatsapp: string; businessName: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDb();
    if (!db) {
      return { success: false, error: "Database not available" };
    }

    const message = await getPersonalizedMessage(auditRequestId, step, lead);

    // Log the communication
    await db.insert(communicationLogs).values({
      auditRequestId,
      type: "whatsapp",
      recipient: lead.whatsapp,
      subject: "WhatsApp Message",
      body: message,
      status: "sent",
    });

    // In production, integrate with WhatsApp Business API
    // For now, just log it
    console.log(`WhatsApp sent to ${lead.whatsapp}: ${message.substring(0, 50)}...`);

    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending WhatsApp:", errorMsg);

    const db = await getDb();
    if (db) {
      await db.insert(communicationLogs).values({
        auditRequestId,
        type: "whatsapp",
        recipient: lead.whatsapp,
        subject: "WhatsApp Message",
        body: "",
        status: "failed",
        errorDetails: errorMsg,
      });
    }

    return { success: false, error: errorMsg };
  }
}

/**
 * Process pending follow-ups (called by scheduled job)
 */
export async function processPendingFollowups(): Promise<void> {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database not available");
      return;
    }

    const now = new Date();

    // Get all pending follow-ups that are due
    const pendingFollowups = await db
      .select()
      .from(followupSequences)
      .where(eq(followupSequences.status, "pending"));

    for (const followup of pendingFollowups) {
      // Check if scheduled time has passed
      if (new Date(followup.scheduledAt) > now) {
        continue;
      }

      // Get lead details
      const leads = await db
        .select()
        .from(auditRequests)
        .where(eq(auditRequests.id, followup.auditRequestId))
        .limit(1);

      const lead = leads[0];
      if (!lead) {
        console.error(`Lead not found: ${followup.auditRequestId}`);
        continue;
      }

      // Skip if lead has unsubscribed
      if (lead.unsubscribed === 1) {
        console.log(`Lead ${followup.auditRequestId} has unsubscribed, skipping follow-up`);
        await db
          .update(followupSequences)
          .set({
            status: "sent",
            sentAt: new Date(),
          })
          .where(eq(followupSequences.id, followup.id));
        continue;
      }

      // Send follow-up based on channel
      let result;
      if (followup.channel === "email") {
        result = await sendEmailFollowup(followup.auditRequestId, followup.step, {
          name: lead.name,
          email: lead.email,
          businessName: lead.businessName,
          unsubscribeToken: lead.unsubscribeToken || undefined,
        });
      } else {
        result = await sendWhatsappFollowup(followup.auditRequestId, followup.step, {
          name: lead.name,
          whatsapp: lead.whatsapp,
          businessName: lead.businessName,
        });
      }

      // Update follow-up status
      if (result.success) {
        await db
          .update(followupSequences)
          .set({
            status: "sent",
            sentAt: new Date(),
          })
          .where(eq(followupSequences.id, followup.id));
      } else {
        await db
          .update(followupSequences)
          .set({
            status: "failed",
            errorMessage: result.error,
          })
          .where(eq(followupSequences.id, followup.id));
      }
    }

    console.log(`Processed ${pendingFollowups.length} pending follow-ups`);
  } catch (error) {
    console.error("Error processing follow-ups:", error);
    await notifyOwner({
      title: "Follow-up Processing Error",
      content: `Error processing automated follow-ups: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
}
