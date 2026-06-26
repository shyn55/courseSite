import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";

export async function POST() {
  const cookieStore = await cookies();

  try {
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Refresh token not provided" },
        { status: 401 },
      );
    }

    // Refresh Token Validation ======================================================
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      // اگر توکن نامعتبر یا منقضی بود، کوکی رو پاک کن
      cookieStore.delete("refreshToken", { path: "/" });
      cookieStore.delete("accessToken", { path: "/" });
      return NextResponse.json(
        { success: false, message: "Invalid or expired refresh token" },
        { status: 401 },
      );
    }

    await connectToDB();

    const user = await User.findById(payload.userId);
    if (!user) {
      cookieStore.delete("accessToken", { path: "/" });
      cookieStore.delete("refreshToken", { path: "/" });
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // generate new accessToken ==========================================================
    const newAccessToken = jwt.sign(
      {
        userId: user._id,
        phone: user.phone,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    const response = NextResponse.json({
      success: true,
      message: "accessToken Refreshed Successfully",
      user: {
        id: user._id.toString(),
        phone: user.phone,
        role: user.role || "user",
      },
    });
    // access token set
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 دقیقه
      path: "/",
    });

    return response;
  } catch (err) {
    cookieStore.delete("accessToken", { path: "/" });
    cookieStore.delete("refreshToken", { path: "/" });

    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}