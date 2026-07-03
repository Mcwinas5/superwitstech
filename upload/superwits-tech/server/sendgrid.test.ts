import { describe, it, expect, vi } from "vitest";
import { validateSendGridCredentials, generateFollowupEmailHTML } from "./sendgrid";

// Mock SendGrid
vi.mock("@sendgrid/mail", () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn().mockResolvedValue([{ statusCode: 202 }]),
  },
}));

describe("SendGrid Integration", () => {
  describe("validateSendGridCredentials", () => {
    it("should validate SendGrid credentials successfully", async () => {
      const result = await validateSendGridCredentials();
      expect(result).toBe(true);
    });
  });

  describe("generateFollowupEmailHTML", () => {
    it("should generate step 1 email with personalization", () => {
      const html = generateFollowupEmailHTML("John", 1, "Low conversion rate");
      expect(html).toContain("Hi John");
      expect(html).toContain("Low conversion rate");
      expect(html).toContain("custom 5-minute video");
    });

    it("should generate step 2 email", () => {
      const html = generateFollowupEmailHTML("Jane", 2);
      expect(html).toContain("Hi Jane");
      expect(html).toContain("follow-up");
    });

    it("should generate step 3 email", () => {
      const html = generateFollowupEmailHTML("Bob", 3);
      expect(html).toContain("Hi Bob");
      expect(html).toContain("audit is ready");
    });

    it("should generate step 4 email", () => {
      const html = generateFollowupEmailHTML("Alice", 4);
      expect(html).toContain("Hi Alice");
      expect(html).toContain("haven't heard");
    });

    it("should generate step 5 email", () => {
      const html = generateFollowupEmailHTML("Charlie", 5);
      expect(html).toContain("Hi Charlie");
      expect(html).toContain("Last follow-up");
    });

    it("should handle missing challenge gracefully", () => {
      const html = generateFollowupEmailHTML("Test", 1);
      expect(html).toContain("Hi Test");
      expect(html).not.toContain("undefined");
    });
  });
});
