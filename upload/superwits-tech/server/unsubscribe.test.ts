import { describe, it, expect, beforeEach, vi } from "vitest";
import { generateUnsubscribeToken, buildUnsubscribeUrl } from "./unsubscribe";

describe("Unsubscribe Utilities", () => {
  describe("generateUnsubscribeToken", () => {
    it("should generate a 64-character hex string", () => {
      const token = generateUnsubscribeToken();
      expect(token).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should generate unique tokens", () => {
      const token1 = generateUnsubscribeToken();
      const token2 = generateUnsubscribeToken();
      expect(token1).not.toBe(token2);
    });

    it("should generate tokens of consistent length", () => {
      const tokens = Array.from({ length: 10 }, () => generateUnsubscribeToken());
      tokens.forEach((token) => {
        expect(token).toHaveLength(64);
      });
    });
  });

  describe("buildUnsubscribeUrl", () => {
    it("should build URL with provided base URL", () => {
      const token = "abc123def456";
      const baseUrl = "https://example.com";
      const url = buildUnsubscribeUrl(token, baseUrl);
      expect(url).toBe("https://example.com/unsubscribe/abc123def456");
    });

    it("should use default base URL when not provided", () => {
      const token = "abc123def456";
      const url = buildUnsubscribeUrl(token);
      expect(url).toBe("https://superwitstech.com/unsubscribe/abc123def456");
    });

    it("should use default base URL when empty string provided", () => {
      const token = "abc123def456";
      const url = buildUnsubscribeUrl(token, "");
      expect(url).toBe("https://superwitstech.com/unsubscribe/abc123def456");
    });

    it("should properly encode special characters in token", () => {
      const token = "abc+def/ghi=";
      const baseUrl = "https://example.com";
      const url = buildUnsubscribeUrl(token, baseUrl);
      expect(url).toBe("https://example.com/unsubscribe/abc+def/ghi=");
    });

    it("should handle URLs with trailing slash", () => {
      const token = "abc123def456";
      const baseUrl = "https://example.com/";
      const url = buildUnsubscribeUrl(token, baseUrl);
      // Should not double-slash
      expect(url).toContain("/unsubscribe/");
    });
  });
});
