import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { createChatbotConversation, getChatbotConversation, addChatbotMessage, getChatbotMessages, updateChatbotConversation } from "./db";

// Note: These tests are skipped because the chatbot tables need to be created in the database first
// Run: CREATE TABLE IF NOT EXISTS `chatbotConversations` and `chatbotMessages` before enabling these tests
describe.skip("Chatbot Database Functions", () => {
  let conversationId: number | null = null;
  const testAuditRequestId = 999; // Use a test ID

  beforeAll(async () => {
    // Create a test conversation
    const conversation = await createChatbotConversation(testAuditRequestId);
    if (conversation) {
      conversationId = conversation.id;
    }
  });

  afterAll(async () => {
    // Cleanup would happen here if we had a delete function
  });

  it("should create a chatbot conversation", async () => {
    const conversation = await createChatbotConversation(testAuditRequestId);
    expect(conversation).toBeDefined();
    expect(conversation?.auditRequestId).toBe(testAuditRequestId);
    expect(conversation?.currentQuestionIndex).toBe(0);
    expect(conversation?.isComplete).toBe(0);
  });

  it("should retrieve a chatbot conversation by audit request ID", async () => {
    const conversation = await getChatbotConversation(testAuditRequestId);
    expect(conversation).toBeDefined();
    expect(conversation?.auditRequestId).toBe(testAuditRequestId);
  });

  it("should add a user message to the conversation", async () => {
    if (!conversationId) throw new Error("Conversation ID not set");

    const message = await addChatbotMessage({
      conversationId,
      sender: "user",
      message: "Test response to question 1",
      questionIndex: 0,
    });

    expect(message).toBeDefined();
    expect(message?.sender).toBe("user");
    expect(message?.message).toBe("Test response to question 1");
  });

  it("should retrieve all messages for a conversation", async () => {
    if (!conversationId) throw new Error("Conversation ID not set");

    const messages = await getChatbotMessages(conversationId);
    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length).toBeGreaterThan(0);
  });

  it("should update conversation progress", async () => {
    if (!conversationId) throw new Error("Conversation ID not set");

    const responses = ["Response 1", "Response 2"];
    await updateChatbotConversation(conversationId, {
      currentQuestionIndex: 2,
      responses: JSON.stringify(responses),
    });

    const updated = await getChatbotConversation(testAuditRequestId);
    expect(updated?.currentQuestionIndex).toBe(2);
    expect(updated?.responses).toBe(JSON.stringify(responses));
  });

  it("should mark conversation as complete", async () => {
    if (!conversationId) throw new Error("Conversation ID not set");

    await updateChatbotConversation(conversationId, {
      isComplete: 1,
    });

    const updated = await getChatbotConversation(testAuditRequestId);
    expect(updated?.isComplete).toBe(1);
  });
});
