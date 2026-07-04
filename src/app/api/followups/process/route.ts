import { NextResponse } from "next/server";
import { processPendingFollowups } from "@/lib/followup";

export async function POST() {
  try {
    await processPendingFollowups();
    return NextResponse.json({ processed: true });
  } catch (error) {
    console.error("[Followups/Process] POST error:", error);
    return NextResponse.json({ error: "Failed to process follow-ups" }, { status: 500 });
  }
}