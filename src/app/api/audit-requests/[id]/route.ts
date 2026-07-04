import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const VALID_STATUSES = ["new", "contacted", "converted", "rejected"] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const existing = await db.auditRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Audit request not found" }, { status: 404 });
    }

    const updated = await db.auditRequest.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined && { notes }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("[AuditRequests] PATCH error:", error);
    return NextResponse.json({ error: "Failed to update audit request" }, { status: 500 });
  }
}