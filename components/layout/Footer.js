// components/Footer.jsx
"use client";
import Link from "next/link";
import styles from "./Footer.module.css";
import {
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* بخش اول: لوگو و توضیحات */}
        <div className={styles.footerSection}>
          <div className={styles.brand}>
            <img src="/logo2.png" alt="logo" className={styles.logo} />
            <h3>آکادمی آموزشی</h3>
          </div>
          <p className={styles.description}>
            بزرگترین پلتفرم آموزش آنلاین با بیش از ۱۰۰۰ دوره تخصصی و محتوای
            باکیفیت
          </p>
          <div className={styles.socialLinks}>
            <a href="#" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" aria-label="Telegram">
              <FaTelegram />
            </a>
            <a href="#" target="_blank" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="#" target="_blank" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* بخش دوم: لینک‌های سریع */}
        <div className={styles.footerSection}>
          <h4>دسترسی سریع</h4>
          <ul>
            <li>
              <Link href="/courses">دوره‌های آموزشی</Link>
            </li>
            <li>
              <Link href="/articles">مقاله‌ها</Link>
            </li>
            <li>
              <Link href="/about">درباره ما</Link>
            </li>
            <li>
              <Link href="/contact">تماس با ما</Link>
            </li>
          </ul>
        </div>

        {/* بخش سوم: دسته‌بندی دوره‌ها */}
        <div className={styles.footerSection}>
          <h4>دسته‌بندی دوره‌ها</h4>
          <ul>
            <li>
              <Link href="/courses?category=programming">برنامه‌نویسی</Link>
            </li>
            <li>
              <Link href="/courses?category=design">طراحی گرافیک</Link>
            </li>
            <li>
              <Link href="/courses?category=marketing">بازاریابی دیجیتال</Link>
            </li>
            <li>
              <Link href="/courses?category=ai">هوش مصنوعی</Link>
            </li>
            <li>
              <Link href="/courses?category=language">زبان‌های خارجی</Link>
            </li>
          </ul>
        </div>

        {/* بخش چهارم: اطلاعات تماس */}
        <div className={styles.footerSection}>
          <h4>تماس با ما</h4>
          <ul className={styles.contactInfo}>
            <li>
              <MdPhone />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </li>
            <li>
              <MdEmail />
              <span>info@academy.com</span>
            </li>
            <li>
              <MdLocationOn />
              <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
            </li>
          </ul>
        </div>
      </div>

      {/* خط جداکننده و کپی‌رایت */}
      <div className={styles.footerBottom}>
        <div className={styles.divider}></div>
        <div className={styles.bottomContent}>
          <p>© {currentYear} آکادمی آموزشی. تمامی حقوق محفوظ است.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">حریم خصوصی</Link>
            <span className={styles.separator}>|</span>
            <Link href="/terms">قوانین و مقررات</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
