import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { auditRequestId } = body;

    if (!auditRequestId) {
      return NextResponse.json({ error: "auditRequestId is required" }, { status: 400 });
    }

    const auditRequest = await db.auditRequest.findUnique({ where: { id: auditRequestId } });
    if (!auditRequest) {
      return NextResponse.json({ error: "Audit request not found" }, { status: 404 });
    }

    const conversation = await db.chatbotConversation.create({
      data: {
        auditRequestId,
        currentQuestionIndex: 0,
        isComplete: false,
        responses: "[]",
      },
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error("[Chatbot/Conversation] POST error:", error);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}