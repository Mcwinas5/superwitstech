import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";

/**
 * Qualifying questions based on 7 Pillars Framework
 * Each question gathers specific information to qualify the lead
 */
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
  auditRequestId: number;
  onComplete?: () => void;
  onClose?: () => void;
}

export function QualifyingChatbot({
  auditRequestId,
  onComplete,
  onClose,
}: QualifyingChatbotProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Hi! 👋 Thanks for requesting a free website audit. I have a few quick questions to help Marquis prepare the best review for you. Let's start!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const createConversation = trpc.chatbot.createConversation.useMutation();
  const sendMessage = trpc.chatbot.sendMessage.useMutation();

  // Initialize conversation on mount
  useEffect(() => {
    createConversation.mutate(
      { auditRequestId },
      {
        onSuccess: () => {
          // Add first question to messages
          const firstQuestion = QUALIFYING_QUESTIONS[0];
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: firstQuestion.question,
            },
          ]);
        },
      }
    );
  }, [auditRequestId]);

  const handleSubmitResponse = async () => {
    if (!currentInput.trim()) return;

    setIsLoading(true);

    // Add user response to messages
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentInput,
      },
    ]);

    const newResponses = [...responses, currentInput];
    setResponses(newResponses);

    // Send message to backend
    sendMessage.mutate(
      {
        auditRequestId,
        questionIndex: currentQuestionIndex,
        response: currentInput,
      },
      {
        onSuccess: () => {
          setCurrentInput("");

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
                text: "Perfect! 🎉 Thanks for answering all the questions. Marquis will review your audit request and send you detailed findings within 24 hours. Check your email and WhatsApp for updates!",
              },
            ]);
            setTimeout(() => {
              onComplete?.();
            }, 2000);
          }
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Sorry, something went wrong. Please try again.",
            },
          ]);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const currentQuestion = QUALIFYING_QUESTIONS[currentQuestionIndex];
  const isComplete = currentQuestionIndex >= QUALIFYING_QUESTIONS.length;

  return (
    <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-32px)] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#07122A] to-[#0C1421] text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Superwits Tech Audit</h3>
          <p className="text-xs text-gray-300">
            {currentQuestionIndex + 1} of {QUALIFYING_QUESTIONS.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 p-1 rounded transition-colors"
          aria-label="Close chatbot"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "bot"
                  ? "bg-white text-gray-900 border border-gray-200"
                  : "bg-[#D97706] text-white"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {!isComplete && (
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
          {currentQuestion?.type === "textarea" ? (
            <Textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={currentQuestion?.placeholder}
              className="mb-3 min-h-20 resize-none"
              disabled={isLoading}
            />
          ) : (
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={currentQuestion?.placeholder}
              className="mb-3"
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSubmitResponse();
                }
              }}
            />
          )}
          <Button
            onClick={handleSubmitResponse}
            disabled={!currentInput.trim() || isLoading}
            className="w-full bg-[#D97706] hover:bg-[#F59E0B] text-white"
          >
            <Send size={16} className="mr-2" />
            {currentQuestionIndex === QUALIFYING_QUESTIONS.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      )}

      {isComplete && (
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg text-center">
          <p className="text-sm text-gray-600 mb-3">Conversation complete!</p>
          <Button
            onClick={onClose}
            className="w-full bg-[#D97706] hover:bg-[#F59E0B] text-white"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
