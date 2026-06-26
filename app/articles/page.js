// app/articles/page.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Articles.module.css";
import { articlesData, categories } from "./data";
import { FaSearch, FaClock, FaUser, FaTag } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // فیلتر مقالات
  const filteredArticles = articlesData.filter((article) => {
    const matchSearch = article.title
      .includes(searchTerm) ||
      article.excerpt.includes(searchTerm) ||
      article.tags.some(tag => tag.includes(searchTerm));
    
    const matchCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchSearch && matchCategory;
  });

  return (
    <div className={styles.articlesPage}>
      <div className={styles.container}>
        {/* هدر صفحه */}
        <div className={styles.pageHeader}>
          <h1>📚 مجله آموزشی</h1>
          <p>جدیدترین مقالات برنامه‌نویسی، طراحی و فناوری</p>
        </div>

        {/* نوار جستجو و فیلتر */}
        <div className={styles.filterSection}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="جستجوی مقاله..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categories}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`${styles.categoryBtn} ${
                  selectedCategory === cat.id ? styles.active : ""
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* تعداد مقالات */}
        <div className={styles.articleCount}>
          <span>{filteredArticles.length} مقاله</span>
        </div>

        {/* گرید مقالات */}
        <div className={styles.articlesGrid}>
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* اگر مقاله‌ای نبود */}
        {filteredArticles.length === 0 && (
          <div className={styles.noResults}>
            <p>😕 مقاله‌ای با این مشخصات یافت نشد</p>
            <button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}>
              نمایش همه مقالات
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// کامپوننت کارت مقاله
function ArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.slug}`} className={styles.articleCard}>
      <div className={styles.cardImage}>
        <img src={article.image} alt={article.title} />
        <span className={styles.categoryTag}>{article.category}</span>
      </div>
      
      <div className={styles.cardContent}>
        <h3>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        
        <div className={styles.cardMeta}>
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
        </div>

        <div className={styles.cardTags}>
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              <FaTag />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}