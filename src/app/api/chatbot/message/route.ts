import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const QUESTIONS = [
  "What's your biggest challenge with your current website?",
  "How many clients do you get per month currently?",
  "What's your budget for a conversion-focused website rebuild?",
  "When would you like to launch?",
  "Are you ready to implement changes if we identify the problem?",
];

const COMPLETION_MESSAGE =
  "Thanks for answering all the questions. Marquis will review your audit request and send you detailed findings within 24 hours.";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { auditRequestId, questionIndex, response } = body;

    if (!auditRequestId || questionIndex === undefined || !response) {
      return NextResponse.json(
        { error: "auditRequestId, questionIndex, and response are required" },
        { status: 400 }
      );
    }

    if (typeof questionIndex !== "number" || questionIndex < 0 || questionIndex > 4) {
      return NextResponse.json(
        { error: "questionIndex must be between 0 and 4" },
        { status: 400 }
      );
    }

    const auditRequest = await db.auditRequest.findUnique({ where: { id: auditRequestId } });
    if (!auditRequest) {
      return NextResponse.json({ error: "Audit request not found" }, { status: 404 });
    }

    // Find or create conversation
    let conversation = await db.chatbotConversation.findFirst({
      where: { auditRequestId },
    });

    if (!conversation) {
      conversation = await db.chatbotConversation.create({
        data: {
          auditRequestId,
          currentQuestionIndex: 0,
          isComplete: false,
          responses: "[]",
        },
      });
    }

    // Store user message
    await db.chatbotMessage.create({
      data: {
        conversationId: conversation.id,
        sender: "user",
        message: response,
        questionIndex,
      },
    });

    // Determine bot response
    const isLastQuestion = questionIndex === 4;
    const botMessage = isLastQuestion ? COMPLETION_MESSAGE : QUESTIONS[questionIndex + 1];

    // Store bot message
    await db.chatbotMessage.create({
      data: {
        conversationId: conversation.id,
        sender: "bot",
        message: botMessage,
        questionIndex: isLastQuestion ? questionIndex : questionIndex + 1,
      },
    });

    // Update conversation state
    const currentResponses = JSON.parse(conversation.responses) as string[];
    currentResponses[questionIndex] = response;

    const updatedConversation = await db.chatbotConversation.update({
      where: { id: conversation.id },
      data: {
        currentQuestionIndex: isLastQuestion ? questionIndex : questionIndex + 1,
        isComplete: isLastQuestion,
        responses: JSON.stringify(currentResponses),
      },
    });

    return NextResponse.json(updatedConversation);
  } catch (error) {
    console.error("[Chatbot/Message] POST error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}