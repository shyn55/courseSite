import connectDB from "@/configs/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/auth";

export async function PUT(req) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser(req);

    if (!currentUser || !currentUser.success) {
      return NextResponse.json(
        { success: false, message: "ابتدا لاگین کنید" },
        { status: 401 },
      );
    }

    const { name, email } = await req.json();

    // اعتبارسنجی
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "نام باید حداقل ۲ کاراکتر باشد" },
        { status: 400 },
      );
    }

    // به‌روزرسانی کاربر
    const user = await User.findByIdAndUpdate(
      currentUser.userId,
      {
        name: name.trim(),
        email: email?.trim() || "",
      },
      { new: true, runValidators: true },
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربر پیدا نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "اطلاعات با موفقیت به‌روزرسانی شد",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser(req);

    if (!currentUser || !currentUser.success) {
      return NextResponse.json(
        { success: false, message: "ابتدا لاگین کنید" },
        { status: 401 },
      );
    }

    const user = await User.findById(currentUser.userId).select(
      "-password -__v",
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربر پیدا نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 },
    );
  }
}
