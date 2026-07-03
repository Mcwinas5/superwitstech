/**
 * Scheduled job to process pending follow-ups
 * Runs every 5 minutes to check for due follow-ups and send them
 * 
 * This job is triggered by Manus Heartbeat scheduler
 */

import { processPendingFollowups } from "../followup";

export async function processFollowupsJob() {
  try {
    console.log("[Follow-up Job] Starting follow-up processing...");
    await processPendingFollowups();
    console.log("[Follow-up Job] Follow-up processing completed");
  } catch (error) {
    console.error("[Follow-up Job] Error:", error);
    throw error;
  }
}

// Export for Heartbeat scheduler
export default processFollowupsJob;
