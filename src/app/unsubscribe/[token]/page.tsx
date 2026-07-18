import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

interface UnsubscribePageProps {
  params: Promise<{ token: string }>;
}

export default async function UnsubscribePage({ params }: UnsubscribePageProps) {
  const { token } = await params;

  const request = await db.auditRequest.findUnique({
    where: { unsubscribeToken: token },
  });

  let status: "success" | "already" | "error" = "error";
  let requestName = "";

  if (request) {
    requestName = request.name;
    if (request.unsubscribed) {
      status = "already";
    } else {
      await db.auditRequest.update({
        where: { id: request.id },
        data: {
          unsubscribed: true,
          unsubscribedAt: new Date(),
        },
      });
      status = "success";
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0A0E27" }}
    >
      <div
        className="w-full max-w-md text-center"
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "12px",
          padding: "40px 32px",
        }}
      >
        {status === "success" && (
          <>
            <div
              className="mx-auto mb-6 flex items-center justify-center"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#052E16",
              }}
            >
              <CheckCircle2 size={32} style={{ color: "#4ADE80" }} />
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "24px",
                color: "#F5F5F0",
                marginBottom: "12px",
              }}
            >
              Unsubscribed Successfully
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "#A8B2C7",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              {requestName}, you have been unsubscribed from all future communications from Superwits
              Tech. We will no longer send you follow-up emails or messages.
            </p>
          </>
        )}

        {status === "already" && (
          <>
            <div
              className="mx-auto mb-6 flex items-center justify-center"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#1A1206",
              }}
            >
              <Info size={32} style={{ color: "#F59E0B" }} />
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "24px",
                color: "#F5F5F0",
                marginBottom: "12px",
              }}
            >
              Already Unsubscribed
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "#A8B2C7",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              {requestName}, your email address is already on our unsubscribe list. You will not
              receive any further communications from us.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div
              className="mx-auto mb-6 flex items-center justify-center"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#3B0A0A",
              }}
            >
              <AlertCircle size={32} style={{ color: "#F87171" }} />
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "24px",
                color: "#F5F5F0",
                marginBottom: "12px",
              }}
            >
              Invalid Link
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "#A8B2C7",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              This unsubscribe link is invalid or has expired. If you believe this is an error,
              please contact us directly.
            </p>
          </>
        )}

        <Link
          href="/"
          className="about-cta-btn"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}