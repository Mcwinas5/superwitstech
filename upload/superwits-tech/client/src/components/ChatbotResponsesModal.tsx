import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface ChatbotResponsesModalProps {
  auditRequestId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatbotResponsesModal({
  auditRequestId,
  open,
  onOpenChange,
}: ChatbotResponsesModalProps) {
  const { data, isLoading } = trpc.chatbot.getConversation.useQuery(
    { auditRequestId },
    { enabled: open }
  );

  if (!data) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chatbot Responses</DialogTitle>
          </DialogHeader>
          <div className="p-6 text-center text-gray-500">
            {isLoading ? "Loading responses..." : "No chatbot responses found"}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const isComplete = data.isComplete === 1;
  const userMessages = data.messages?.filter((m: any) => m.sender === 'user') || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Chatbot Responses</DialogTitle>
            {isComplete ? (
              <Badge className="bg-green-600">Completed</Badge>
            ) : (
              <Badge className="bg-yellow-600">In Progress</Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 p-4">
          {/* Completion Status */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            {isComplete ? (
              <CheckCircle2 className="text-green-600" size={20} />
            ) : (
              <Clock className="text-yellow-600" size={20} />
            )}
            <div>
              <p className="font-semibold text-sm">
                {isComplete ? "Qualification Complete" : "Qualification In Progress"}
              </p>
            </div>
          </div>

          {/* User Responses */}
          <div className="space-y-4">
            {userMessages.map((item: any, index: any) => (
              <div key={index} className="border-l-4 border-amber-500 pl-4 py-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Q{index + 1}: {item.question}
                </p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Summary for Sales */}
          {data.isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-green-900 mb-2">Lead Summary</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ Completed all 5 qualifying questions</li>
                <li>✓ Ready for follow-up and proposal</li>
                <li>✓ Responses saved for reference</li>
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
