"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";

const QUALIFYING_QUESTIONS = [
  {
    index: 0,
    question: "What's your biggest challenge with your current website?",
    placeholder: "e.g., Not getting enough inquiries, poor mobile experience, outdated design...",
    type: "textarea" as const,
  },
  {
    index: 1,
    question: "How many clients do you get per month currently?",
    placeholder: "e.g., 5, 10, 20...",
    type: "input" as const,
  },
  {
    index: 2,
    question: "What's your budget for a conversion-focused website rebuild?",
    placeholder: "e.g., $500-$1000, $1000-$5000, $5000+...",
    type: "input" as const,
  },
  {
    index: 3,
    question: "When would you like to launch?",
    placeholder: "e.g., ASAP, within 2 weeks, within a month...",
    type: "input" as const,
  },
  {
    index: 4,
    question: "Are you ready to implement changes if we identify the problem?",
    placeholder: "Yes or No",
    type: "input" as const,
  },
];

interface QualifyingChatbotProps {
  auditRequestId: string;
  onComplete?: () => void;
  onClose?: () => void;
}

export function QualifyingChatbot({
  auditRequestId,
  onComplete,
  onClose,
}: QualifyingChatbotProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ sender: "bot" | "user"; text: string }>
  >([
    {
      sender: "bot",
      text: "Hi! \u{1F44B} Thanks for requesting a free website audit. I have a few quick questions to help Marquis prepare the best review for you. Let's start!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationReady, setConversationReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation on mount
  useEffect(() => {
    fetch("/api/chatbot/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auditRequestId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create conversation");
        return res.json();
      })
      .then(() => {
        setConversationReady(true);
        const firstQuestion = QUALIFYING_QUESTIONS[0];
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: firstQuestion.question,
          },
        ]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Sorry, something went wrong initializing the conversation. Please try again later.",
          },
        ]);
      });
  }, [auditRequestId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmitResponse = async () => {
    if (!currentInput.trim() || isLoading) return;

    setIsLoading(true);

    // Add user response to messages
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentInput,
      },
    ]);

    const responseText = currentInput;
    setCurrentInput("");

    try {
      const res = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditRequestId,
          questionIndex: currentQuestionIndex,
          response: responseText,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      await res.json();

      if (currentQuestionIndex < QUALIFYING_QUESTIONS.length - 1) {
        // Show next question
        const nextQuestion = QUALIFYING_QUESTIONS[currentQuestionIndex + 1];
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: nextQuestion.question,
          },
        ]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Conversation complete
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Perfect! \u{1F389} Thanks for answering all the questions. Marquis will review your audit request and send you detailed findings within 24 hours. Check your email and WhatsApp for updates!",
          },
        ]);
        setTimeout(() => {
          onComplete?.();
        }, 2000);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion = QUALIFYING_QUESTIONS[currentQuestionIndex];
  const isComplete = currentQuestionIndex >= QUALIFYING_QUESTIONS.length;

  return (
    <div
      className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-32px)] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 z-50"
      style={{ height: "600px" }}
    >
      {/* Header */}
      <div
        className="text-white p-4 rounded-t-lg flex justify-between items-center"
        style={{
          background: "linear-gradient(to right, #0A0E27, #0C1421)",
        }}
      >
        <div>
          <h3 className="font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            Superwits Tech Audit
          </h3>
          <p className="text-xs" style={{ color: "#A8B2C7" }}>
            {Math.min(currentQuestionIndex + 1, QUALIFYING_QUESTIONS.length)} of{" "}
            {QUALIFYING_QUESTIONS.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 p-1 rounded transition-colors"
          style={{ color: "#F5F5F0", background: "none", border: "none" }}
          aria-label="Close chatbot"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: "#F9FAFB" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
          >
            <div
              className="max-w-xs px-4 py-2 rounded-lg"
              style={
                msg.sender === "bot"
                  ? {
                      backgroundColor: "#FFFFFF",
                      color: "#111827",
                      border: "1px solid #E5E7EB",
                    }
                  : {
                      backgroundColor: "#D4A017",
                      color: "#0A1128",
                      border: "none",
                    }
              }
            >
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {/* Loading dots */}
        {isLoading && (
          <div className="flex justify-start">
            <div
              className="px-4 py-2 rounded-lg"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
              }}
            >
              <div className="flex space-x-1.5 items-center" style={{ height: "20px" }}>
                <div
                  className="rounded-full animate-bounce"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#9CA3AF",
                    animationDelay: "0ms",
                  }}
                />
                <div
                  className="rounded-full animate-bounce"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#9CA3AF",
                    animationDelay: "150ms",
                  }}
                />
                <div
                  className="rounded-full animate-bounce"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#9CA3AF",
                    animationDelay: "300ms",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!isComplete && (
        <div
          className="p-4 bg-white rounded-b-lg"
          style={{ borderTop: "1px solid #E5E7EB" }}
        >
          {currentQuestion?.type === "textarea" ? (
            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={currentQuestion?.placeholder}
              disabled={isLoading || !conversationReady}
              className="mb-3 w-full resize-none"
              style={{
                minHeight: "80px",
                padding: "10px 14px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#111827",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#D4A017")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          ) : (
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={currentQuestion?.placeholder}
              disabled={isLoading || !conversationReady}
              className="mb-3 w-full"
              style={{
                padding: "10px 14px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#111827",
                outline: "none",
                minHeight: "42px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#D4A017")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading && conversationReady) {
                  e.preventDefault();
                  handleSubmitResponse();
                }
              }}
            />
          )}
          <button
            onClick={handleSubmitResponse}
            disabled={!currentInput.trim() || isLoading || !conversationReady}
            className="w-full flex items-center justify-center gap-2 text-white font-semibold rounded-lg transition-colors"
            style={{
              padding: "10px 20px",
              backgroundColor:
                !currentInput.trim() || isLoading || !conversationReady ? "#92400E" : "#D4A017",
              border: "none",
              cursor:
                !currentInput.trim() || isLoading || !conversationReady ? "not-allowed" : "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              minHeight: "42px",
            }}
          >
            <Send size={16} />
            {currentQuestionIndex === QUALIFYING_QUESTIONS.length - 1 ? "Complete" : "Next"}
          </button>
        </div>
      )}

      {isComplete && (
        <div
          className="p-4 bg-white rounded-b-lg text-center"
          style={{ borderTop: "1px solid #E5E7EB" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#6B7280",
              marginBottom: "12px",
            }}
          >
            Conversation complete!
          </p>
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors"
            style={{
              padding: "10px 20px",
              backgroundColor: "#D4A017",
              color: "#0A1128",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              minHeight: "42px",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}