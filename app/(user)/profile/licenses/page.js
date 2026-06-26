// app/(public)/profile/licenses/page.js
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Licenses() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
      return;
    }
  }, [user, loading, router]);

  // نمایش در حال بارگذاری
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  // اگر کاربر لاگین نیست
  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>لایسنس‌های من</h1>
        <p>کلیدهای فعال‌سازی دوره‌های خریداری شده</p>
      </div>

      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔑</div>
        <h2>شما هنوز لایسنس خریداری نکرده‌اید</h2>
        <p>با خرید دوره‌های آموزشی، لایسنس فعال‌سازی برای شما صادر می‌شود</p>
        <Link href="/" className={styles.browseBtn}>
          مشاهده دوره‌ها
        </Link>
      </div>
    </div>
  );
}
