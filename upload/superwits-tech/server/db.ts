import { eq, and, gte, lte, lt, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { auditRequests, type InsertAuditRequest, type AuditRequest } from "../drizzle/schema";
import crypto from 'crypto';

function generateUnsubscribeToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createAuditRequest(data: InsertAuditRequest): Promise<AuditRequest | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Generate unsubscribe token
  const unsubscribeToken = generateUnsubscribeToken();
  const dataWithToken = { ...data, unsubscribeToken };

  await db.insert(auditRequests).values(dataWithToken);
  
  // Fetch the most recently inserted record
  const inserted = await db
    .select()
    .from(auditRequests)
    .where(eq(auditRequests.unsubscribeToken, unsubscribeToken))
    .limit(1);
  
  return inserted[0] || null;
}

export async function getAuditRequests(limit: number = 50, offset: number = 0): Promise<AuditRequest[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const results = await db
    .select()
    .from(auditRequests)
    .orderBy((t) => t.createdAt)
    .limit(limit)
    .offset(offset);

  return results;
}

export async function getAuditRequestCount(): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(auditRequests);
  return result.length;
}

export async function updateAuditRequestStatus(
  id: number,
  status: "new" | "contacted" | "converted" | "rejected"
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(auditRequests)
    .set({ status })
    .where(eq(auditRequests.id, id));
}

/**
 * Get an audit request by unsubscribe token
 */
export async function getAuditRequestByUnsubscribeToken(token: string): Promise<AuditRequest | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(auditRequests)
    .where(eq(auditRequests.unsubscribeToken, token))
    .limit(1);

  return result[0] || null;
}

/**
 * Mark an audit request as unsubscribed
 */
export async function unsubscribeLead(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(auditRequests)
    .set({
      unsubscribed: 1,
      unsubscribedAt: new Date(),
    })
    .where(eq(auditRequests.id, id));
}

/**
 * Get count of unsubscribed leads
 */
export async function getUnsubscribedLeadsCount(): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(auditRequests)
    .where(eq(auditRequests.unsubscribed, 1));

  return result.length;
}

// TODO: add feature queries here as your schema grows.

import { chatbotConversations, chatbotMessages, type InsertChatbotConversation, type InsertChatbotMessage, type ChatbotConversation, type ChatbotMessage } from "../drizzle/schema";

export async function createChatbotConversation(auditRequestId: number): Promise<ChatbotConversation | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const data: InsertChatbotConversation = {
    auditRequestId,
    currentQuestionIndex: 0,
    isComplete: 0,
    responses: "[]",
  };

  await db.insert(chatbotConversations).values(data);
  
  const inserted = await db
    .select()
    .from(chatbotConversations)
    .where(eq(chatbotConversations.auditRequestId, auditRequestId))
    .limit(1);
  
  return inserted[0] || null;
}

export async function getChatbotConversation(auditRequestId: number): Promise<ChatbotConversation | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(chatbotConversations)
    .where(eq(chatbotConversations.auditRequestId, auditRequestId))
    .limit(1);

  return result[0] || null;
}

export async function addChatbotMessage(data: InsertChatbotMessage): Promise<ChatbotMessage | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(chatbotMessages).values(data);
  
  const inserted = await db
    .select()
    .from(chatbotMessages)
    .orderBy((t) => t.createdAt)
    .limit(1);
  
  return inserted[0] || null;
}

export async function getChatbotMessages(conversationId: number): Promise<ChatbotMessage[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const results = await db
    .select()
    .from(chatbotMessages)
    .where(eq(chatbotMessages.conversationId, conversationId))
    .orderBy((t) => t.createdAt);

  return results;
}

export async function updateChatbotConversation(
  conversationId: number,
  data: {
    currentQuestionIndex?: number;
    isComplete?: number;
    responses?: string;
  }
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(chatbotConversations)
    .set(data)
    .where(eq(chatbotConversations.id, conversationId));
}

// Follow-up sequence and communication log queries
import { followupSequences, communicationLogs, type InsertFollowupSequence, type FollowupSequence, type InsertCommunicationLog, type CommunicationLog } from "../drizzle/schema";

export async function createFollowupSequenceEntry(data: InsertFollowupSequence): Promise<FollowupSequence | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(followupSequences).values(data);
  
  const inserted = await db
    .select()
    .from(followupSequences)
    .where(eq(followupSequences.auditRequestId, data.auditRequestId))
    .orderBy((t) => t.createdAt)
    .limit(1);
  
  return inserted[0] || null;
}

export async function getPendingFollowups(): Promise<FollowupSequence[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const results = await db
    .select()
    .from(followupSequences)
    .where(eq(followupSequences.status, "pending"))
    .orderBy((t) => t.scheduledAt);

  return results;
}

export async function updateFollowupStatus(
  id: number,
  status: "pending" | "sent" | "failed",
  sentAt?: Date,
  errorMessage?: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(followupSequences)
    .set({
      status,
      sentAt: sentAt || undefined,
      errorMessage: errorMessage || undefined,
    })
    .where(eq(followupSequences.id, id));
}

export async function createCommunicationLog(data: InsertCommunicationLog): Promise<CommunicationLog | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(communicationLogs).values(data);
  
  const inserted = await db
    .select()
    .from(communicationLogs)
    .orderBy((t) => t.createdAt)
    .limit(1);
  
  return inserted[0] || null;
}

export async function getCommunicationLogs(auditRequestId: number): Promise<CommunicationLog[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const results = await db
    .select()
    .from(communicationLogs)
    .where(eq(communicationLogs.auditRequestId, auditRequestId))
    .orderBy((t) => t.createdAt);

  return results;
}


// Analytics queries
import { performanceMetrics, cacheAnalytics, serviceWorkerEvents, type InsertPerformanceMetric, type PerformanceMetric, type InsertCacheAnalytic, type CacheAnalytic, type InsertServiceWorkerEvent, type ServiceWorkerEvent } from "../drizzle/schema";

export async function recordPerformanceMetric(data: InsertPerformanceMetric): Promise<PerformanceMetric | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot record performance metric: database not available");
    return null;
  }

  try {
    await db.insert(performanceMetrics).values(data);
    
    const inserted = await db
      .select()
      .from(performanceMetrics)
      .orderBy((t) => t.createdAt)
      .limit(1);
    
    return inserted[0] || null;
  } catch (error) {
    console.error("[Database] Failed to record performance metric:", error);
    return null;
  }
}

export async function getPerformanceMetricsSummary(hours: number = 24): Promise<{
  avgTTFB: number;
  avgFCP: number;
  avgLCP: number;
  avgCLS: number;
  firstVisitCount: number;
  repeatVisitCount: number;
  swActiveCount: number;
}> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  
  const metrics = await db
    .select()
    .from(performanceMetrics)
    .where(gt(performanceMetrics.createdAt, cutoffTime));

  const summary = {
    avgTTFB: 0,
    avgFCP: 0,
    avgLCP: 0,
    avgCLS: 0,
    firstVisitCount: 0,
    repeatVisitCount: 0,
    swActiveCount: 0,
  };

  const ttfbValues: number[] = [];
  const fcpValues: number[] = [];
  const lcpValues: number[] = [];
  const clsValues: number[] = [];

  for (const metric of metrics) {
    if (metric.visitType === 'first') summary.firstVisitCount++;
    else summary.repeatVisitCount++;

    if (metric.serviceWorkerActive) summary.swActiveCount++;

    if (metric.metricType === 'TTFB') ttfbValues.push(metric.value);
    else if (metric.metricType === 'FCP') fcpValues.push(metric.value);
    else if (metric.metricType === 'LCP') lcpValues.push(metric.value);
    else if (metric.metricType === 'CLS') clsValues.push(metric.value);
  }

  summary.avgTTFB = ttfbValues.length > 0 ? ttfbValues.reduce((a, b) => a + b, 0) / ttfbValues.length : 0;
  summary.avgFCP = fcpValues.length > 0 ? fcpValues.reduce((a, b) => a + b, 0) / fcpValues.length : 0;
  summary.avgLCP = lcpValues.length > 0 ? lcpValues.reduce((a, b) => a + b, 0) / lcpValues.length : 0;
  summary.avgCLS = clsValues.length > 0 ? clsValues.reduce((a, b) => a + b, 0) / clsValues.length : 0;

  return summary;
}

export async function recordCacheAnalytic(data: InsertCacheAnalytic): Promise<CacheAnalytic | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot record cache analytic: database not available");
    return null;
  }

  try {
    await db.insert(cacheAnalytics).values(data);
    
    const inserted = await db
      .select()
      .from(cacheAnalytics)
      .orderBy((t) => t.createdAt)
      .limit(1);
    
    return inserted[0] || null;
  } catch (error) {
    console.error("[Database] Failed to record cache analytic:", error);
    return null;
  }
}

export async function getCacheAnalyticsSummary(hours: number = 24): Promise<{
  totalHits: number;
  totalMisses: number;
  overallHitRate: number;
  totalCacheSize: number;
  staticCacheHitRate: number;
  dynamicCacheHitRate: number;
  apiCacheHitRate: number;
}> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  
  const analytics = await db
    .select()
    .from(cacheAnalytics)
    .where(gt(cacheAnalytics.createdAt, cutoffTime));

  let totalHits = 0;
  let totalMisses = 0;
  let totalCacheSize = 0;
  let staticHits = 0, staticMisses = 0;
  let dynamicHits = 0, dynamicMisses = 0;
  let apiHits = 0, apiMisses = 0;

  for (const analytic of analytics) {
    totalHits += analytic.hitCount;
    totalMisses += analytic.missCount;
    totalCacheSize += analytic.totalSize;

    if (analytic.cacheName === 'static') {
      staticHits += analytic.hitCount;
      staticMisses += analytic.missCount;
    } else if (analytic.cacheName === 'dynamic') {
      dynamicHits += analytic.hitCount;
      dynamicMisses += analytic.missCount;
    } else if (analytic.cacheName === 'api') {
      apiHits += analytic.hitCount;
      apiMisses += analytic.missCount;
    }
  }

  const overallHitRate = totalHits + totalMisses > 0 ? (totalHits / (totalHits + totalMisses)) * 100 : 0;
  const staticCacheHitRate = staticHits + staticMisses > 0 ? (staticHits / (staticHits + staticMisses)) * 100 : 0;
  const dynamicCacheHitRate = dynamicHits + dynamicMisses > 0 ? (dynamicHits / (dynamicHits + dynamicMisses)) * 100 : 0;
  const apiCacheHitRate = apiHits + apiMisses > 0 ? (apiHits / (apiHits + apiMisses)) * 100 : 0;

  return {
    totalHits,
    totalMisses,
    overallHitRate,
    totalCacheSize,
    staticCacheHitRate,
    dynamicCacheHitRate,
    apiCacheHitRate,
  };
}

export async function recordServiceWorkerEvent(data: InsertServiceWorkerEvent): Promise<ServiceWorkerEvent | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot record service worker event: database not available");
    return null;
  }

  try {
    await db.insert(serviceWorkerEvents).values(data);
    
    const inserted = await db
      .select()
      .from(serviceWorkerEvents)
      .orderBy((t) => t.createdAt)
      .limit(1);
    
    return inserted[0] || null;
  } catch (error) {
    console.error("[Database] Failed to record service worker event:", error);
    return null;
  }
}

export async function getServiceWorkerEventsSummary(hours: number = 24): Promise<{
  totalEvents: number;
  installCount: number;
  activateCount: number;
  updateCount: number;
  errorCount: number;
  successRate: number;
  avgCacheSize: number;
}> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  
  const events = await db
    .select()
    .from(serviceWorkerEvents)
    .where(gt(serviceWorkerEvents.createdAt, cutoffTime));

  let installCount = 0;
  let activateCount = 0;
  let updateCount = 0;
  let errorCount = 0;
  let successCount = 0;
  let totalCacheSize = 0;

  for (const event of events) {
    if (event.eventType === 'install') installCount++;
    else if (event.eventType === 'activate') activateCount++;
    else if (event.eventType === 'update') updateCount++;
    else if (event.eventType === 'error') errorCount++;

    if (event.status === 'success') successCount++;
    if (event.cacheSize) totalCacheSize += event.cacheSize;
  }

  const successRate = events.length > 0 ? (successCount / events.length) * 100 : 0;
  const avgCacheSize = events.length > 0 ? totalCacheSize / events.length : 0;

  return {
    totalEvents: events.length,
    installCount,
    activateCount,
    updateCount,
    errorCount,
    successRate,
    avgCacheSize,
  };
}


import { formSubmissions, conversionMetrics, performanceCorrelation, type InsertFormSubmission, type InsertConversionMetric, type InsertPerformanceCorrelation } from "../drizzle/schema";

export async function recordFormSubmission(data: InsertFormSubmission): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(formSubmissions).values(data);
}

export async function getFormSubmissionCount(dateFrom?: Date, dateTo?: Date): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const conditions = [];
  if (dateFrom) {
    conditions.push(gte(formSubmissions.createdAt, dateFrom));
  }
  if (dateTo) {
    conditions.push(lte(formSubmissions.createdAt, dateTo));
  }

  if (conditions.length > 0) {
    const result = await db.select().from(formSubmissions).where(and(...conditions));
    return result.length;
  } else {
    const result = await db.select().from(formSubmissions);
    return result.length;
  }
}

export async function getConversionMetrics(date: string): Promise<any> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(conversionMetrics)
    .where(eq(conversionMetrics.date, date))
    .limit(1);

  return result[0] || null;
}

export async function upsertConversionMetrics(data: InsertConversionMetric): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(conversionMetrics).values(data).onDuplicateKeyUpdate({
    set: {
      submissionCount: data.submissionCount,
      avgPageLoadTime: data.avgPageLoadTime,
      avgTimeToSubmission: data.avgTimeToSubmission,
      conversionRate: data.conversionRate,
      avgLcp: data.avgLcp,
      serviceWorkerActivePercentage: data.serviceWorkerActivePercentage,
      updatedAt: new Date(),
    },
  });
}

export async function getPerformanceCorrelationData(date: string): Promise<any[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db
    .select()
    .from(performanceCorrelation)
    .where(eq(performanceCorrelation.date, date));
}

export async function recordPerformanceCorrelation(data: InsertPerformanceCorrelation): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(performanceCorrelation).values(data);
}

export async function getFormSubmissionsByLoadTimeRange(
  dateFrom: Date,
  dateTo: Date,
  loadTimeMin: number,
  loadTimeMax: number
): Promise<any[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db
    .select()
    .from(formSubmissions)
    .where(
      and(
        gte(formSubmissions.createdAt, dateFrom),
        lte(formSubmissions.createdAt, dateTo),
        gte(formSubmissions.pageLoadTime, loadTimeMin),
        lte(formSubmissions.pageLoadTime, loadTimeMax)
      )
    );
}

export async function getAverageMetricsForDate(date: string): Promise<any> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const dateStart = new Date(date);
  const dateEnd = new Date(date);
  dateEnd.setDate(dateEnd.getDate() + 1);

  const submissions = await db
    .select()
    .from(formSubmissions)
    .where(
      and(
        gte(formSubmissions.createdAt, dateStart),
        lt(formSubmissions.createdAt, dateEnd)
      )
    );

  if (submissions.length === 0) {
    return null;
  }

  const avgPageLoadTime = submissions.reduce((sum, s) => sum + (s.pageLoadTime || 0), 0) / submissions.length;
  const avgTimeToSubmission = submissions.reduce((sum, s) => sum + (s.timeToSubmission || 0), 0) / submissions.length;
  const avgLcp = submissions.reduce((sum, s) => sum + (s.lcp || 0), 0) / submissions.length;
  const swActiveCount = submissions.filter((s) => s.serviceWorkerActive).length;
  const swActivePercentage = (swActiveCount / submissions.length) * 100;

  return {
    submissionCount: submissions.length,
    avgPageLoadTime: Math.round(avgPageLoadTime),
    avgTimeToSubmission: Math.round(avgTimeToSubmission),
    avgLcp: Math.round(avgLcp),
    serviceWorkerActivePercentage: Math.round(swActivePercentage),
  };
}
