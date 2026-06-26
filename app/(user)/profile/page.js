"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // بررسی اطلاعات کاربر
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
      return;
    }

    if (user) {
      // اگر کاربر اطلاعات کامل داشت
      if (user.name && user.email) {
        setIsComplete(true);
        setFormData({
          name: user.name || "",
          email: user.email || "",
        });
      } else {
        // کاربر جدید (فقط شماره موبایل)
        setIsComplete(false);
      }
    }
  }, [user, loading, router]);

  // هندل تغییرات input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی ساده
    if (!formData.name.trim()) {
      return toast.error("لطفاً نام خود را وارد کنید");
    }

    if (formData.email && !isValidEmail(formData.email)) {
      return toast.error("لطفاً ایمیل معتبر وارد کنید");
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "خطا در ذخیره اطلاعات");
      }

      toast.success("اطلاعات با موفقیت ذخیره شد");
      setIsComplete(true);

      // به‌روزرسانی اطلاعات کاربر (اگر context رو آپدیت کنی)
      // await refetchUser(); // اگر چنین تابعی داری
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // تابع کمکی برای اعتبارسنجی ایمیل
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // نمایش درحال بارگذاری
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  // اگر کاربر لاگین نیست (redirect میشه)
  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h1>پروفایل کاربری</h1>
          <p>اطلاعات حساب کاربری خود را مدیریت کنید</p>
        </div>

        {/* نمایش شماره موبایل (همیشه نمایش داده میشه) */}
        <div className={styles.infoRow}>
          <span className={styles.label}>شماره موبایل:</span>
          <span className={styles.value}>{user.phone || "ثبت نشده"}</span>
        </div>

        {isComplete ? (
          // حالت دوم: کاربر کامل
          <div className={styles.completeInfo}>
            <div className={styles.infoRow}>
              <span className={styles.label}>نام:</span>
              <span className={styles.value}>{user.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>ایمیل:</span>
              <span className={styles.value}>{user.email || "ثبت نشده"}</span>
            </div>

            <button
              className={styles.editBtn}
              onClick={() => setIsComplete(false)}
            >
              ویرایش اطلاعات
            </button>
          </div>
        ) : (
          // حالت اول: کاربر جدید (فرم)
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">نام و نام خانوادگی</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="مثال: علی محمدی"
                required
                className={styles.input}
                dir="rtl"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">ایمیل (اختیاری)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={styles.input}
                dir="ltr"
              />
              <small className={styles.hint}>
                ایمیل برای اطلاع‌رسانی‌ها استفاده می‌شود
              </small>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ذخیره..." : "ذخیره اطلاعات"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
