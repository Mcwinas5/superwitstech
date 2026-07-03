import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, double, bigint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const auditRequests = mysqlTable("auditRequests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  businessName: varchar("businessName", { length: 255 }).notNull(),
  businessType: varchar("businessType", { length: 100 }).notNull(),
  website: varchar("website", { length: 500 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull(),
  status: mysqlEnum("status", ["new", "contacted", "converted", "rejected"]).default("new").notNull(),
  notes: text("notes"),
  /** Whether the lead has unsubscribed from follow-ups */
  unsubscribed: int("unsubscribed").default(0).notNull(),
  /** Timestamp when the lead unsubscribed */
  unsubscribedAt: timestamp("unsubscribedAt"),
  /** Unique token for unsubscribe link (prevents unauthorized unsubscribes) */
  unsubscribeToken: varchar("unsubscribeToken", { length: 64 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AuditRequest = typeof auditRequests.$inferSelect;
export type InsertAuditRequest = typeof auditRequests.$inferInsert;

/**
 * Chatbot conversations linked to audit requests
 * Stores the conversation flow and user responses to qualifying questions
 */
export const chatbotConversations = mysqlTable("chatbotConversations", {
  id: int("id").autoincrement().primaryKey(),
  auditRequestId: int("auditRequestId").notNull(),
  /** Current question index (0-4 for 5 questions) */
  currentQuestionIndex: int("currentQuestionIndex").default(0).notNull(),
  /** Whether the conversation is complete */
  isComplete: int("isComplete").default(0).notNull(),
  /** JSON array of responses to each question */
  responses: text("responses").notNull().default("[]"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatbotConversation = typeof chatbotConversations.$inferSelect;
export type InsertChatbotConversation = typeof chatbotConversations.$inferInsert;

/**
 * Individual chatbot messages for conversation history
 * Stores both bot messages and user responses
 */
export const chatbotMessages = mysqlTable("chatbotMessages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  /** 'bot' or 'user' */
  sender: mysqlEnum("sender", ["bot", "user"]).notNull(),
  /** The message content */
  message: text("message").notNull(),
  /** For bot messages: the question index (0-4). For user responses: the answer index */
  questionIndex: int("questionIndex"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatbotMessage = typeof chatbotMessages.$inferSelect;
export type InsertChatbotMessage = typeof chatbotMessages.$inferInsert;
/**
 * Follow-up sequence tracking for automated lead nurturing
 * Tracks which follow-ups have been sent and their status
 */
export const followupSequences = mysqlTable("followupSequences", {
  id: int("id").autoincrement().primaryKey(),
  auditRequestId: int("auditRequestId").notNull(),
  /** Sequence step: 1 (immediate email), 2 (day 2 email), 3 (day 5 email), 4 (day 9 email), 5 (day 14 email), 6 (WhatsApp escalation) */
  step: int("step").notNull(),
  /** 'pending', 'sent', 'failed' */
  status: mysqlEnum("status", ["pending", "sent", "failed"]).default("pending").notNull(),
  /** Channel: 'email' or 'whatsapp' */
  channel: mysqlEnum("channel", ["email", "whatsapp"]).notNull(),
  /** Scheduled time for this follow-up */
  scheduledAt: timestamp("scheduledAt").notNull(),
  /** When it was actually sent */
  sentAt: timestamp("sentAt"),
  /** Error message if failed */
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FollowupSequence = typeof followupSequences.$inferSelect;
export type InsertFollowupSequence = typeof followupSequences.$inferInsert;

/**
 * Email and message logs for audit trail
 * Tracks all outgoing communications to leads
 */
export const communicationLogs = mysqlTable("communicationLogs", {
  id: int("id").autoincrement().primaryKey(),
  auditRequestId: int("auditRequestId").notNull(),
  followupSequenceId: int("followupSequenceId"),
  /** 'email' or 'whatsapp' */
  type: mysqlEnum("type", ["email", "whatsapp"]).notNull(),
  /** Recipient email or phone */
  recipient: varchar("recipient", { length: 320 }).notNull(),
  /** Subject for emails, message preview for WhatsApp */
  subject: varchar("subject", { length: 255 }).notNull(),
  /** Full message body */
  body: text("body").notNull(),
  /** 'sent', 'failed', 'bounced' */
  status: mysqlEnum("status", ["sent", "failed", "bounced"]).notNull(),
  /** Error details if failed */
  errorDetails: text("errorDetails"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CommunicationLog = typeof communicationLogs.$inferSelect;
export type InsertCommunicationLog = typeof communicationLogs.$inferInsert;


/**
 * Performance Metrics Table
 * Tracks page load performance metrics for monitoring and optimization
 */
export const performanceMetrics = mysqlTable("performanceMetrics", {
  id: int("id").autoincrement().primaryKey(),
  /** Type of metric: TTFB, FCP, LCP, CLS, etc. */
  metricType: varchar("metricType", { length: 50 }).notNull(),
  /** Metric value in milliseconds or unitless (for CLS) */
  value: double("value").notNull(),
  /** User agent to track browser/device type */
  userAgent: text("userAgent"),
  /** URL path where metric was recorded */
  pathname: varchar("pathname", { length: 500 }),
  /** Whether this was a first visit or repeat visit */
  visitType: mysqlEnum("visitType", ["first", "repeat"]).notNull(),
  /** Whether service worker was active */
  serviceWorkerActive: int("serviceWorkerActive").default(0).notNull(),
  /** Geographic location (if available) */
  country: varchar("country", { length: 100 }),
  /** Connection type (4g, 3g, slow-2g, etc.) */
  connectionType: varchar("connectionType", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PerformanceMetric = typeof performanceMetrics.$inferSelect;
export type InsertPerformanceMetric = typeof performanceMetrics.$inferInsert;

/**
 * Cache Analytics Table
 * Tracks cache hit/miss rates and cache size metrics
 */
export const cacheAnalytics = mysqlTable("cacheAnalytics", {
  id: int("id").autoincrement().primaryKey(),
  /** Name of the cache (static, dynamic, api) */
  cacheName: varchar("cacheName", { length: 50 }).notNull(),
  /** Number of cache hits in this period */
  hitCount: int("hitCount").default(0).notNull(),
  /** Number of cache misses in this period */
  missCount: int("missCount").default(0).notNull(),
  /** Total size of cached items in bytes */
  totalSize: bigint("totalSize", { mode: "number" }).default(0).notNull(),
  /** Number of cached items */
  itemCount: int("itemCount").default(0).notNull(),
  /** User agent/browser */
  userAgent: text("userAgent"),
  /** Cache hit rate percentage (0-100) */
  hitRate: double("hitRate").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CacheAnalytic = typeof cacheAnalytics.$inferSelect;
export type InsertCacheAnalytic = typeof cacheAnalytics.$inferInsert;

/**
 * Service Worker Events Table
 * Tracks service worker activation, updates, and lifecycle events
 */
export const serviceWorkerEvents = mysqlTable("serviceWorkerEvents", {
  id: int("id").autoincrement().primaryKey(),
  /** Type of event: install, activate, update, error, etc. */
  eventType: varchar("eventType", { length: 50 }).notNull(),
  /** Status of the event: success, pending, failed */
  status: mysqlEnum("status", ["success", "pending", "failed"]).default("success").notNull(),
  /** Error message if status is failed */
  errorMessage: text("errorMessage"),
  /** User agent */
  userAgent: text("userAgent"),
  /** Service worker version */
  swVersion: varchar("swVersion", { length: 50 }),
  /** Number of cached items at time of event */
  cachedItemCount: int("cachedItemCount").default(0),
  /** Total cache size at time of event */
  cacheSize: bigint("cacheSize", { mode: "number" }).default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ServiceWorkerEvent = typeof serviceWorkerEvents.$inferSelect;
export type InsertServiceWorkerEvent = typeof serviceWorkerEvents.$inferInsert;


/**
 * Form Submissions Tracking Table
 * Tracks all form submissions for conversion analysis and performance correlation
 */
export const formSubmissions = mysqlTable("formSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  /** Email of the person who submitted the form */
  email: varchar("email", { length: 320 }).notNull(),
  /** Type of form: audit, contact, newsletter, etc. */
  formType: varchar("formType", { length: 50 }).notNull().default("audit"),
  /** Page load time in milliseconds when form was displayed */
  pageLoadTime: int("pageLoadTime"),
  /** Whether service worker was active when form was submitted */
  serviceWorkerActive: int("serviceWorkerActive").default(0).notNull(),
  /** Time from page load to form submission in milliseconds */
  timeToSubmission: int("timeToSubmission"),
  /** User agent */
  userAgent: text("userAgent"),
  /** URL path where form was submitted */
  pathname: varchar("pathname", { length: 500 }),
  /** Geographic location (if available) */
  country: varchar("country", { length: 100 }),
  /** Connection type (4g, 3g, slow-2g, etc.) */
  connectionType: varchar("connectionType", { length: 50 }),
  /** First Contentful Paint time */
  fcp: int("fcp"),
  /** Largest Contentful Paint time */
  lcp: int("lcp"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FormSubmission = typeof formSubmissions.$inferSelect;
export type InsertFormSubmission = typeof formSubmissions.$inferInsert;

/**
 * Conversion Metrics Table
 * Daily aggregated conversion metrics for trend analysis
 */
export const conversionMetrics = mysqlTable("conversionMetrics", {
  id: int("id").autoincrement().primaryKey(),
  /** Date for this metric (YYYY-MM-DD) */
  date: varchar("date", { length: 10 }).notNull().unique(),
  /** Total number of form submissions on this date */
  submissionCount: int("submissionCount").default(0).notNull(),
  /** Average page load time in milliseconds */
  avgPageLoadTime: int("avgPageLoadTime"),
  /** Average time from page load to submission */
  avgTimeToSubmission: int("avgTimeToSubmission"),
  /** Percentage of visitors who submitted the form */
  conversionRate: double("conversionRate").default(0).notNull(),
  /** Average LCP time for submissions */
  avgLcp: int("avgLcp"),
  /** Percentage of submissions with service worker active */
  serviceWorkerActivePercentage: double("serviceWorkerActivePercentage").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ConversionMetric = typeof conversionMetrics.$inferSelect;
export type InsertConversionMetric = typeof conversionMetrics.$inferInsert;

/**
 * Performance Correlation Table
 * Analyzes correlation between performance metrics and conversion rates
 */
export const performanceCorrelation = mysqlTable("performanceCorrelation", {
  id: int("id").autoincrement().primaryKey(),
  /** Date for this analysis */
  date: varchar("date", { length: 10 }).notNull(),
  /** Load time range (e.g., "0-2s", "2-4s", "4+s") */
  loadTimeRange: varchar("loadTimeRange", { length: 50 }).notNull(),
  /** Number of submissions in this load time range */
  submissionCount: int("submissionCount").default(0).notNull(),
  /** Conversion rate for this load time range */
  conversionRate: double("conversionRate").default(0).notNull(),
  /** Average time to submission for this range */
  avgTimeToSubmission: int("avgTimeToSubmission"),
  /** Bounce rate for this load time range */
  bounceRate: double("bounceRate").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PerformanceCorrelation = typeof performanceCorrelation.$inferSelect;
export type InsertPerformanceCorrelation = typeof performanceCorrelation.$inferInsert;
