"use client";
import { useEffect, useState } from "react";
import styles from "@/components/sections/home/LastCourses.module.css";
import CourseCard from "@/components/ui/CourseCard";
import Header from "@/components/layout/Header";
import { FaSpinner, FaBookOpen, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function LastCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLatestCourses = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        console.error("Error fetching latest courses:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCourses();
  }, []);

  return (
    <>
      <Header />
      <div className="container section" style={{ paddingTop: "150px" }}>
        <div className="sectionHeader">
          <div className="sectionTitleWrapper">
            <div className="sectionIcon">
              <FaBookOpen />
            </div>
            <div>
              <h2 className="sectionTitle">دوره‌های آموزشی</h2>
              <p className="sectionSubtitle">
                جدیدترین و محبوب‌ترین دوره‌های آموزشی
              </p>
            </div>
          </div>
         
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}>
              <FaSpinner className={styles.spin} />
            </div>
            <p className={styles.loadingText}>در حال بارگذاری دوره‌ها...</p>
            <div className={styles.loadingCards}>
              {[...Array(4)].map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonText}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>😕</div>
            <h3 className={styles.errorTitle}>خطا در بارگذاری</h3>
            <p className={styles.errorText}>
              متاسفانه در دریافت اطلاعات دوره‌ها مشکلی پیش آمد
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              تلاش مجدد
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className={styles.emptyContainer}>
            <div className={styles.emptyIcon}>📚</div>
            <h3 className={styles.emptyTitle}>دوره‌ای یافت نشد</h3>
            <p className={styles.emptyText}>
              در حال حاضر هیچ دوره آموزشی منتشر نشده است
            </p>
          </div>
        ) : (
          <>
            <div className={styles.coursesStats}>
              <span>{courses.length} دوره آموزشی</span>
            </div>
            <div className={styles.lastCourses}>
              {courses.map((course, index) => (
                <div 
                  key={course._id} 
                  className={styles.courseItem}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer/>
    </>
  );
}