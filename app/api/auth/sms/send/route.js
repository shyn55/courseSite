import connectToDB from "@/configs/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

// تابع اعتبارسنجی شماره موبایل
const validatePhoneNumber = (phone) => /^09\d{9}$/.test(phone);

export async function POST(req) {
  try {
    const { phone } = await req.json();

    // اعتبارسنجی شماره موبایل
    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 },
      );
    }

    if (!validatePhoneNumber(phone)) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number format" },
        { status: 400 },
      );
    }

    await connectToDB();

    // جلوگیری از اسپم: بررسی OTP فعال
    const user = await User.findOne({ phone });
    if (user && user.otp.expiresAt > new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP already sent. Please wait before requesting again.",
        },
        { status: 429 },
      );
    }

    // تولید OTP جدید
    const otpCode = Math.floor(Math.random() * 90000) + 10000;
    const expiresAt = new Date().getTime() + 120 * 1000; // OTP بعد از 120 ثانیه منقضی می‌شود

    // ارسال OTP از طریق FarazSMS
    const res = await fetch("https://api.iranpayamak.com/ws/v1/sms/pattern", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Api-Key": process.env.FARAZSMS_API_KEY,
      },
      body: JSON.stringify({
        code: process.env.FARAZSMS_PATTERN_CODE,
        recipient: phone,
        line_number: "90008361",
        number_format: "english",
        attributes: {
          code: otpCode.toString(),
        },
      }),
    });

    const smsData = await res.json();

    console.log("SMS STATUS:", res.status);
    console.log("SMS RESPONSE:", smsData);

    if (res.ok) {
      // ذخیره OTP در مدل User
      if (user) {
        user.otp.code = otpCode;
        user.otp.expiresAt = new Date(expiresAt);
        await user.save();
      } else {
        // اگر کاربر جدید باشد
        await User.create({
          phone,
          otp: { code: otpCode, expiresAt: new Date(expiresAt) },
        });
      }

      return NextResponse.json(
        { success: true, message: "OTP sent successfully" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to send OTP" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Error sending OTP:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
