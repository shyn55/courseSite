// app/articles/[slug]/page.jsx
"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./ArticleDetail.module.css";
import { articlesData } from "../data";
import { FaArrowRight, FaClock, FaUser, FaCalendar, FaTag, FaShare } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { toast } from "react-hot-toast";

export default function ArticleDetail() {
  const { slug } = useParams();
  const router = useRouter();

  // پیدا کردن مقاله
  const article = articlesData.find((a) => a.slug === slug);

  // اگر مقاله وجود نداشت
  if (!article) {
    return (
      <div className={styles.notFound}>
        <h2>مقاله‌ای یافت نشد</h2>
        <Link href="/articles" className={styles.backBtn}>
          <FaArrowRight />
          بازگشت به مقالات
        </Link>
      </div>
    );
  }

  // مقالات مرتبط (غیر از مقاله فعلی)
  const relatedArticles = articlesData
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("لینک مقاله کپی شد!");
    }
  };

  return (
    <div className={styles.articleDetail}>
      <div className={styles.container}>
        {/* هدر جزئیات */}
        <div className={styles.detailHeader}>
          <div className={styles.breadcrumb}>
            <Link href="/">خانه</Link>
            <span>/</span>
            <Link href="/articles">مقالات</Link>
            <span>/</span>
            <span className={styles.current}>{article.title}</span>
          </div>

          <h1>{article.title}</h1>

          <div className={styles.detailMeta}>
            <span>
              <FaUser />
              {article.author}
            </span>
            <span>
              <MdDateRange />
              {article.date}
            </span>
            <span>
              <FaClock />
              {article.readTime}
            </span>
            <span className={styles.category}>
              #{article.category}
            </span>
          </div>

          <button onClick={handleShare} className={styles.shareBtn}>
            <FaShare />
            اشتراک‌گذاری
          </button>
        </div>

        {/* تصویر اصلی */}
        <div className={styles.heroImage}>
          <img src={article.image} alt={article.title} />
        </div>

        {/* محتوای مقاله */}
        <div className={styles.contentWrapper}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* تگ‌ها */}
          <div className={styles.tags}>
            <h4>برچسب‌ها:</h4>
            <div className={styles.tagList}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  <FaTag />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* مقالات مرتبط */}
        {relatedArticles.length > 0 && (
          <div className={styles.relatedArticles}>
            <h3>مقالات مرتبط</h3>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/articles/${related.slug}`}
                  className={styles.relatedCard}
                >
                  <img src={related.image} alt={related.title} />
                  <h4>{related.title}</h4>
                  <p>{related.excerpt.substring(0, 60)}...</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* دکمه بازگشت */}
        <div className={styles.backWrapper}>
          <Link href="/articles" className={styles.backToArticles}>
            <FaArrowRight />
            بازگشت به همه مقالات
          </Link>
        </div>
      </div>
    </div>
  );
}