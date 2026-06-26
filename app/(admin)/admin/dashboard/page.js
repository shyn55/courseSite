"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";
import styles from "./AdminPage.module.css";

export default function AdminPage() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample stats data
  const stats = [
    { label: "کاربران کل", value: "1,284", icon: "👥" },
    { label: "فروش امروز", value: "۱۲,۴۵۰,۰۰۰", icon: "💰" },
    { label: "سفارشات جدید", value: "۲۴", icon: "📦" },
    { label: "بازدید امروز", value: "۴۵۶", icon: "👀" },
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navBrand}>
          <span className={styles.brandIcon}>🛡️</span>
          <span className={styles.brandText}>پنل مدیریت</span>
        </div>
        <div className={styles.navActions}>
          <Link href="/" className={styles.navLink}>
            <span>🏠</span> صفحه اصلی
          </Link>
          <button onClick={logout} className={styles.logoutBtn}>
            <span>🚪</span> خروج
          </button>
        </div>
      </nav>

      <div className={styles.content}>
       
        <main className={styles.main}>
          <header className={styles.pageHeader}>
            <h1>داشبورد مدیریت</h1>
            <p className={styles.welcomeText}>خوش آمدید! امروز چه کاری می‌خواهید انجام دهید؟</p>
          </header>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue}>{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.dashboardGrid}>
            <div className={styles.dashboardCard}>
              <h3>📈 فعالیت‌های اخیر</h3>
              <ul className={styles.activityList}>
                <li>
                  <span className={styles.activityTime}>دقیقه پیش</span>
                  <span className={styles.activityText}>کاربر جدید ثبت نام کرد</span>
                </li>
                <li>
                  <span className={styles.activityTime}>۵ دقیقه پیش</span>
                  <span className={styles.activityText}>سفارش جدید ثبت شد #۱۲۳۴</span>
                </li>
                <li>
                  <span className={styles.activityTime}>۱۵ دقیقه پیش</span>
                  <span className={styles.activityText}>محصول جدید اضافه شد</span>
                </li>
                <li>
                  <span className={styles.activityTime}>۳۰ دقیقه پیش</span>
                  <span className={styles.activityText}>پرداخت موفق #۵۶۷۸</span>
                </li>
              </ul>
            </div>

           
          </div>
        </main>
      </div>
    </div>
  );
}