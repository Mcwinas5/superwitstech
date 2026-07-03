import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Auth/Logout] POST error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}