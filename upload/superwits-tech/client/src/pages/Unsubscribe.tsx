import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Unsubscribe() {
  const [, params] = useRoute("/unsubscribe/:token");
  const token = params?.token as string | undefined;
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState<string>("");

  const unsubscribeMutation = trpc.auditRequests.unsubscribe.useMutation();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const handleUnsubscribe = async () => {
      try {
        const result = await unsubscribeMutation.mutateAsync({ token });
        setEmail(result.email);
        setStatus("success");
      } catch (error) {
        console.error("Unsubscribe failed:", error);
        setStatus("error");
      }
    };

    handleUnsubscribe();
  }, [token, unsubscribeMutation]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#07122A" }}
    >
      <div
        className="max-w-md w-full rounded-lg p-8 text-center"
        style={{ backgroundColor: "#0C1421", border: "1px solid #1A3260" }}
      >
        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin" style={{ color: "#D97706" }} />
            <h1 className="text-2xl font-bold mb-2" style={{ color: "#F1F5F9" }}>
              Processing...
            </h1>
            <p style={{ color: "#B8C5D6" }}>
              We're unsubscribing you from our follow-up emails.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "#10B981" }} />
            <h1 className="text-2xl font-bold mb-2" style={{ color: "#F1F5F9" }}>
              Unsubscribed Successfully
            </h1>
            <p style={{ color: "#B8C5D6" }} className="mb-4">
              We've unsubscribed <strong>{email}</strong> from our follow-up emails.
            </p>
            <p style={{ color: "#9CA3AF", fontSize: "14px" }}>
              You won't receive any more automated emails from us. If you change your mind, you can always contact us directly.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "#EF4444" }} />
            <h1 className="text-2xl font-bold mb-2" style={{ color: "#F1F5F9" }}>
              Unsubscribe Failed
            </h1>
            <p style={{ color: "#B8C5D6" }} className="mb-4">
              We couldn't process your unsubscribe request. The link may have expired or be invalid.
            </p>
            <p style={{ color: "#9CA3AF", fontSize: "14px" }}>
              If you'd like to opt out, please contact us directly at{" "}
              <a
                href="mailto:contact@superwitstech.com"
                style={{ color: "#D97706", textDecoration: "underline" }}
              >
                contact@superwitstech.com
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
