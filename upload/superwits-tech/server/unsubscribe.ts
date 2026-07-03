import { randomBytes } from "crypto";

/**
 * Generate a secure unsubscribe token for a lead
 * Uses 32 random bytes encoded as hex for a 64-character token
 */
export function generateUnsubscribeToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Build the unsubscribe URL for email footer
 * @param token - The unsubscribe token
 * @param baseUrl - The base URL of the application (e.g., https://superwitstech.com)
 */
export function buildUnsubscribeUrl(token: string, baseUrl: string = ""): string {
  const base = baseUrl || "https://superwitstech.com";
  return `${base}/unsubscribe/${token}`;
}
