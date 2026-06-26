// components/sections/home/Hero.jsx
"use client";
import styles from "./Hero.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  FaGraduationCap,
  FaShieldAlt,
  FaTasks,
  FaHeadset,
} from "react-icons/fa";
import heroImage from "@/public/images/articles/landing.svg"; // مسیر عکس خود را تنظیم کنید

export default function Hero() {
  const features = [
    {
      icon: <FaGraduationCap />,
      title: "بیش از 80 دوره آموزشی",
      description: "در زمینه‌های مختلف برنامه‌نویسی",
    },
    {
      icon: <FaShieldAlt />,
      title: "ضمانت بازگشت وجه",
      description: "تا ۷ روز ضمانت کامل",
    },
    {
      icon: <FaTasks />,
      title: "یادگیری با تمرین و آزمون",
      description: "پروژه‌محور و عملی",
    },
    {
      icon: <FaHeadset />,
      title: "پشتیبانی ۲۴ ساعته",
      description: "تیم پشتیبانی حرفه‌ای",
    },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <h1 className={styles.mainTitle}>
              داستان برنامه‌ نویس شدنت
              <br />
              از اینجا شروع میشه
            </h1>

            <p className={styles.subTitle}>
              یادگیری برنامه‌نویسی آرزو نیست، فقط نیاز هست که
              <br />
              تلاش و تمرین داشته باشید، بقیه‌اش با من
            </p>

            <Link href="/courses" className={styles.ctaButton}>
              <span>شروع یادگیری</span>
              <svg
                className={styles.arrowIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>

            <div className={styles.features}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={styles.featureItem}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureInfo}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={heroImage}
                alt="برنامه‌نویسی با راکت"
                width={600}
                height={500}
                priority
                className={styles.heroImage}
              />
              <div className={styles.floatingBadge1}>
                <span>🚀</span>
                <span>یادگیری سریع</span>
              </div>
              <div className={styles.floatingBadge2}>
                <span>⭐</span>
                <span>۴.۹/۵</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
