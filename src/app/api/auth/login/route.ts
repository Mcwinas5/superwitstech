import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/constants";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Lisalaura5472?@";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await createSession({
      userId: "admin",
      name: "Admin",
      role: "admin",
    });

    const response = NextResponse.json(
      { success: true, user: { name: "Admin", role: "admin" } },
      { status: 200 }
    );

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Auth/Login] POST error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}