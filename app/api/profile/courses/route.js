// app/api/profile/courses/route.js
import connectDB from "@/configs/db";
import User from "@/models/User";
import Course from "@/models/Course";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/auth";

export async function GET(req) {
  try {
    await connectDB();

    // دریافت کاربر فعلی
    const currentUser = await getCurrentUser(req);

    if (!currentUser || !currentUser.success) {
      return NextResponse.json(
        { success: false, message: "ابتدا لاگین کنید" },
        { status: 401 },
      );
    }

    // پیدا کردن کاربر با دوره‌های خریداری شده
    const user = await User.findById(currentUser.userId).select(
      "purchasedCourses",
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربر پیدا نشد" },
        { status: 404 },
      );
    }

    // اگر دوره‌ای خریداری نشده
    if (!user.purchasedCourses || user.purchasedCourses.length === 0) {
      return NextResponse.json({
        success: true,
        courses: [],
        count: 0,
      });
    }

    // دریافت اطلاعات کامل دوره‌ها
    const courses = await Course.find({
      _id: { $in: user.purchasedCourses },
    });

    return NextResponse.json({
      success: true,
      courses: courses,
      count: courses.length,
    });
  } catch (error) {
    console.error("Error in /api/profile/courses:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "خطای سرور",
      },
      { status: 500 },
    );
  }
}
