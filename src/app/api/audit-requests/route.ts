import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));
    const search = searchParams.get("search")?.trim() || "";

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { businessName: { contains: search } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      db.auditRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.auditRequest.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("[AuditRequests] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch audit requests" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, businessName, businessType, websiteUrl, email, whatsappNumber } = body;

    if (!fullName || !businessName || !businessType || !websiteUrl || !email || !whatsappNumber) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    await db.auditRequest.create({
      data: {
        name: String(fullName).trim(),
        businessName: String(businessName).trim(),
        businessType: String(businessType).trim(),
        website: String(websiteUrl).trim(),
        email: String(email).trim(),
        whatsapp: String(whatsappNumber).trim(),
        unsubscribeToken: randomUUID(),
      },
    });

    return NextResponse.json(
      { success: true, message: "Audit request received." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us on WhatsApp." },
      { status: 500 }
    );
  }
}