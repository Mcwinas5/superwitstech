import { z } from "zod";
import { eq } from 'drizzle-orm';
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import * as db from "./db";
import { chatbotConversations, chatbotMessages } from "../drizzle/schema";
import { createFollowupSequence } from "./followup";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chatbot: router({
    createConversation: publicProcedure
      .input(
        z.object({
          auditRequestId: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        const conversation = await db.createChatbotConversation(input.auditRequestId);
        return conversation;
      }),

    sendMessage: publicProcedure
      .input(
        z.object({
          auditRequestId: z.number(),
          questionIndex: z.number(),
          response: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const conversation = await db.getChatbotConversation(input.auditRequestId);
        if (!conversation) {
          throw new Error("Conversation not found");
        }

        const messages = await db.getChatbotMessages(conversation.id);
        const lastMessage = messages[messages.length - 1];

        if (lastMessage && lastMessage.sender === "user") {
          throw new Error("Waiting for bot response");
        }

        await db.addChatbotMessage({
          conversationId: conversation.id,
          sender: "user",
          message: input.response,
        });

        return { success: true };
      }),

    getConversation: publicProcedure
      .input(
        z.object({
          auditRequestId: z.number(),
        })
      )
      .query(async ({ input }) => {
        const conversation = await db.getChatbotConversation(input.auditRequestId);
        if (!conversation) {
          return null;
        }

        const messages = await db.getChatbotMessages(conversation.id);
        return { ...conversation, messages };
      }),
  }),

  auditRequests: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          businessName: z.string().min(1, "Business name is required"),
          businessType: z.string().min(1, "Business type is required"),
          website: z.string().url("Invalid website URL"),
          email: z.string().email("Invalid email"),
          whatsapp: z.string().min(1, "WhatsApp number is required"),
        })
      )
      .mutation(async ({ input }) => {
        const result = await db.createAuditRequest(input);
        if (result) {
          await createFollowupSequence(result.id);
        }
        return result;
      }),

    getAll: adminProcedure.query(async () => {
      const requests = await db.getAuditRequests(1000);
      const unsubscribedCount = await db.getUnsubscribedLeadsCount();
      return { requests, unsubscribedCount };
    }),

    updateStatus: adminProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "contacted", "converted", "rejected"]),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateAuditRequestStatus(input.id, input.status);
        return { success: true };
      }),

    unsubscribe: publicProcedure
      .input(
        z.object({
          token: z.string().min(1, "Token is required"),
        })
      )
      .mutation(async ({ input }) => {
        const lead = await db.getAuditRequestByUnsubscribeToken(input.token);
        if (!lead) {
          throw new Error("Invalid unsubscribe token");
        }

        await db.unsubscribeLead(lead.id);
        return { success: true, email: lead.email };
      }),
  }),

  analytics: router({
    recordPerformanceMetric: publicProcedure
      .input(
        z.object({
          metricType: z.enum(['TTFB', 'FCP', 'LCP', 'CLS', 'FID', 'INP']),
          value: z.number(),
          visitType: z.enum(['first', 'repeat']),
          serviceWorkerActive: z.number(),
          userAgent: z.string(),
          pathname: z.string(),
          country: z.string().optional(),
          connectionType: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const metric = await db.recordPerformanceMetric({
          metricType: input.metricType,
          value: input.value,
          visitType: input.visitType,
          serviceWorkerActive: input.serviceWorkerActive ? 1 : 0,
          userAgent: input.userAgent,
          pathname: input.pathname,
          country: input.country,
          connectionType: input.connectionType,
        });
        return { success: !!metric };
      }),

    recordCacheAnalytic: publicProcedure
      .input(
        z.object({
          cacheName: z.enum(['static', 'dynamic', 'api']),
          hitCount: z.number(),
          missCount: z.number(),
          totalSize: z.number(),
          itemCount: z.number(),
          hitRate: z.number(),
          userAgent: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const analytic = await db.recordCacheAnalytic(input);
        return { success: !!analytic };
      }),

    recordServiceWorkerEvent: publicProcedure
      .input(
        z.object({
          eventType: z.enum(['install', 'activate', 'update', 'error', 'fetch']),
          status: z.enum(['success', 'pending', 'failed']),
          errorMessage: z.string().optional(),
          userAgent: z.string(),
          swVersion: z.string().optional(),
          cachedItemCount: z.number().optional(),
          cacheSize: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const event = await db.recordServiceWorkerEvent(input);
        return { success: !!event };
      }),

    getPerformanceSummary: adminProcedure
      .input(
        z.object({
          hours: z.number().default(24),
        })
      )
      .query(async ({ input }) => {
        return await db.getPerformanceMetricsSummary(input.hours);
      }),

    getCacheAnalyticsSummary: adminProcedure
      .input(
        z.object({
          hours: z.number().default(24),
        })
      )
      .query(async ({ input }) => {
        return await db.getCacheAnalyticsSummary(input.hours);
      }),

    getServiceWorkerEventsSummary: adminProcedure
      .input(
        z.object({
          hours: z.number().default(24),
        })
      )
      .query(async ({ input }) => {
        return await db.getServiceWorkerEventsSummary(input.hours);
      }),
  }),

  formSubmissions: router({
    recordSubmission: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          formType: z.enum(['audit', 'contact', 'newsletter']),
          pageLoadTime: z.number().optional(),
          serviceWorkerActive: z.number(),
          timeToSubmission: z.number().optional(),
          userAgent: z.string().optional(),
          pathname: z.string().optional(),
          country: z.string().optional(),
          connectionType: z.string().optional(),
          fcp: z.number().optional(),
          lcp: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.recordFormSubmission(input);
        return { success: true };
      }),

    getSubmissionCount: adminProcedure
      .input(
        z.object({
          dateFrom: z.date().optional(),
          dateTo: z.date().optional(),
        })
      )
      .query(async ({ input }) => {
        return await db.getFormSubmissionCount(input.dateFrom, input.dateTo);
      }),
  }),
});

export type AppRouter = typeof appRouter;
