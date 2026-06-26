// app/(public)/profile/courses/page.js
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function MyCourses() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // اگر کاربر لاگین نیست، به صفحه لاگین هدایت کن
    if (!loading && !user) {
      router.push("/auth");
      return;
    }

    // اگر کاربر لاگین هست، دوره‌ها رو دریافت کن
    if (user) {
      fetchPurchasedCourses();
    }
  }, [user, loading, router]);

  const fetchPurchasedCourses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile/courses");
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "خطا در دریافت دوره‌ها");
      }

      setCourses(data.courses || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // نمایش در حال بارگذاری
  if (loading || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>در حال دریافت دوره‌ها...</p>
      </div>
    );
  }

  // اگر کاربر لاگین نیست
  if (!user) {
    return null;
  }

  return (
    <div style={{ marginTop: "100px" }} className={styles.container}>
      <div className={styles.header}>
        <h1>دوره‌های من</h1>
        <p>دوره‌هایی که خریداری کرده‌اید</p>
        <span className={styles.courseCount}>{courses.length} دوره</span>
      </div>

      {courses.length === 0 ? (
        // حالت خالی
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h2>شما هنوز دوره‌ای خریداری نکرده‌اید</h2>
          <p>برای مشاهده دوره‌های موجود، به صفحه دوره‌ها بروید</p>
          <Link href="/" className={styles.browseBtn}>
            مشاهده دوره‌ها
          </Link>
        </div>
      ) : (
        // نمایش دوره‌ها
        <div className={styles.coursesGrid}>
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

// کامپوننت کارت دوره
function CourseCard({ course }) {
  return (
    <div className={styles.courseCard}>
      <Link href={`/course/${course.slug}`}>
        <div className={styles.cardImage}>
          <Image
            src={course.thumbnail || "/images/default-course.jpg"}
            alt={course.title}
            width={300}
            height={180}
            className={styles.thumbnail}
          />
          <div className={styles.cardBadge}>دوره من</div>
        </div>

        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{course.title}</h3>

          {course.description && (
            <p className={styles.cardDesc}>
              {course.description.slice(0, 80)}...
            </p>
          )}

          <div className={styles.cardMeta}>
            <span className={styles.cardLevel}>
              {course.level || "مقدماتی"}
            </span>
            <span className={styles.cardCategory}>
              {course.category || "عمومی"}
            </span>
          </div>

          <button className={styles.learnBtn}>شروع یادگیری</button>
        </div>
      </Link>
    </div>
  );
}
