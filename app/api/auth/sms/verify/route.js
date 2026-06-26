import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/configs/db";

export async function POST(req) {
  try {
    const { phone, otpCode } = await req.json();
    //بررسی otp وجود شماره موبایل و کد
    if (!phone || !otpCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number and OTP code required",
        },
        { status: 400 },
      );
    }
    await connectDB();
    //پیدا کردن کاربر براساس شماره موبایل
    const user = await User.findOne({ phone }).select(
      "name phone email role purchaseCourses otp",
    );
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }
    //تاریخ انقضا otp
    const { otp } = user;
    if (!otp || otp.code !== otpCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP code",
        },
        { status: 401 },
      );
    }
    const currentTime = new Date().getTime();
    const isExpired = currentTime > otp.expiresAt;
    if (isExpired) {
      user.otp = null;
      await user.save();
      return NextResponse.json(
        {
          success: false,
          message: "OTP code is expired",
        },
        { status: 410 },
      );
    }
    //access token , refresh token
    const accessPayload = {
      userId: user._id.toString(),
      phone: user.phone,
      role: user.role,
    };
    const accessToken = jwt.sign(
      accessPayload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "45m" }, // 45 minutse
    );
    const refreshToken = jwt.sign(
      accessPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }, // 7 day
    );
    user.refreshToken = refreshToken;
    user.otp = null;
    user.isVerified = true;
    user.lastLoginAt = new Date();
    await user.save();

    //ذخیره در کوکی ها
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 45 * 60, //45 min
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, //7 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return NextResponse.json(
      {
        success: true,
        message: "OTP code is accepted",
        redirectTo: user.role === "admin" ? "/admin/dashboard" : "/profile",
        user: {
          id: user._id.toString(),
          phone: user.phone,
          name: user.name,
          role: user.role,
          purchasedCourses: user.purchasedCourses || [],
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error verifing OTP:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 },
    );
  }
}
