import { describe, it, expect, vi } from "vitest";
import { generateFollowupEmailHTML } from "./sendgrid";

describe("SendGrid Email Templates with Unsubscribe", () => {
  describe("generateFollowupEmailHTML with unsubscribe URL", () => {
    it("should include unsubscribe link in footer for step 1", () => {
      const html = generateFollowupEmailHTML(
        "John Doe",
        1,
        "Website conversion",
        "https://superwitstech.com/unsubscribe/token123"
      );

      expect(html).toContain("Unsubscribe from follow-ups");
      expect(html).toContain("https://superwitstech.com/unsubscribe/token123");
      expect(html).toContain("John Doe");
      expect(html).toContain("Website conversion");
    });

    it("should include unsubscribe link in footer for step 2", () => {
      const html = generateFollowupEmailHTML(
        "Jane Smith",
        2,
        undefined,
        "https://superwitstech.com/unsubscribe/token456"
      );

      expect(html).toContain("Unsubscribe from follow-ups");
      expect(html).toContain("https://superwitstech.com/unsubscribe/token456");
      expect(html).toContain("Jane Smith");
    });

    it("should include unsubscribe link in footer for step 3", () => {
      const html = generateFollowupEmailHTML(
        "Bob Johnson",
        3,
        undefined,
        "https://superwitstech.com/unsubscribe/token789"
      );

      expect(html).toContain("Unsubscribe from follow-ups");
      expect(html).toContain("https://superwitstech.com/unsubscribe/token789");
    });

    it("should include unsubscribe link in footer for step 4", () => {
      const html = generateFollowupEmailHTML(
        "Alice Brown",
        4,
        undefined,
        "https://superwitstech.com/unsubscribe/token999"
      );

      expect(html).toContain("Unsubscribe from follow-ups");
      expect(html).toContain("https://superwitstech.com/unsubscribe/token999");
    });

    it("should include unsubscribe link in footer for step 5", () => {
      const html = generateFollowupEmailHTML(
        "Charlie White",
        5,
        undefined,
        "https://superwitstech.com/unsubscribe/token111"
      );

      expect(html).toContain("Unsubscribe from follow-ups");
      expect(html).toContain("https://superwitstech.com/unsubscribe/token111");
    });

    it("should not include unsubscribe footer when URL is not provided", () => {
      const html = generateFollowupEmailHTML("John Doe", 1, "Challenge");

      expect(html).not.toContain("Unsubscribe from follow-ups");
    });

    it("should not include unsubscribe footer when URL is empty string", () => {
      const html = generateFollowupEmailHTML("John Doe", 1, "Challenge", "");

      expect(html).not.toContain("Unsubscribe from follow-ups");
    });

    it("should include personalization when provided", () => {
      const html = generateFollowupEmailHTML(
        "John Doe",
        1,
        "Low conversion rate",
        "https://superwitstech.com/unsubscribe/token123"
      );

      expect(html).toContain("Low conversion rate");
      expect(html).toContain("biggest challenge");
    });

    it("should include Superwits Tech branding", () => {
      const html = generateFollowupEmailHTML(
        "John Doe",
        1,
        undefined,
        "https://superwitstech.com/unsubscribe/token123"
      );

      expect(html).toContain("Superwits Tech");
      expect(html).toContain("Marquis Festus");
    });

    it("should have valid HTML structure", () => {
      const html = generateFollowupEmailHTML(
        "John Doe",
        1,
        undefined,
        "https://superwitstech.com/unsubscribe/token123"
      );

      expect(html).toContain("<div");
      expect(html).toContain("</div>");
      expect(html).toContain("<h2>");
      expect(html).toContain("</h2>");
      expect(html).toContain("<p>");
      expect(html).toContain("</p>");
    });

    it("should use amber color for unsubscribe link", () => {
      const html = generateFollowupEmailHTML(
        "John Doe",
        1,
        undefined,
        "https://superwitstech.com/unsubscribe/token123"
      );

      expect(html).toContain("#D97706"); // Amber color
    });

    it("should have proper link styling", () => {
      const html = generateFollowupEmailHTML(
        "John Doe",
        1,
        undefined,
        "https://superwitstech.com/unsubscribe/token123"
      );

      expect(html).toContain("text-decoration: none");
      expect(html).toContain("color: #D97706");
    });
  });

  describe("generateFollowupEmailHTML without unsubscribe URL", () => {
    it("should generate valid email for step 1 without unsubscribe", () => {
      const html = generateFollowupEmailHTML("John Doe", 1);

      expect(html).toContain("John Doe");
      expect(html).toContain("Thanks for requesting");
      expect(html).toContain("Marquis Festus");
      expect(html).toContain("Superwits Tech");
    });

    it("should generate valid email for all steps without unsubscribe", () => {
      for (let step = 1; step <= 5; step++) {
        const html = generateFollowupEmailHTML("John Doe", step);
        expect(html).toContain("John Doe");
        expect(html).toContain("Marquis Festus");
      }
    });
  });
});
