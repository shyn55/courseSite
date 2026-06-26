"use client";
import Link from "next/link";
import styles from "./Header.module.css";

// icons
import { FaHome, FaMicrophone } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { MdArticle, MdFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { LuUserRound } from "react-icons/lu";
import { PiCaretLeft } from "react-icons/pi";
import { FiBox } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CardContext";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const { cartCount } = useCart();
  console.log(user); // اینجا
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Link href="/">
          <img src="/logo2.png" alt="logo" />
        </Link>
        <ul>
          <li>
            <Link href="/">
              <FaHome />
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link href="/courses">
              <IoSchool />
              <span>دوره های آموزشی</span>
            </Link>
          </li>
          <li>
            <Link href="/articles">
              <MdArticle />
              <span>مقاله ها</span>
            </Link>
          </li>
        </ul>

        <div>
          {loading ? (
            <div className={styles.skeletonAvatar}></div>
          ) : user ? (
            <div className={`${styles.cardIconWrapper} ${styles.userIcon}`}>
              <LuUserRound />
              <UserProfileMenu user={user} logout={logout} />
            </div>
          ) : (
            <Link href="/auth">
              <button className={styles.authBtn}> ورود | ثبت نام </button>
            </Link>
          )}
          <Link href="/cart">
            <div
              className={`${styles.cardIconWrapper} ${styles.cartIconWrapper}`}
            >
              {cartCount > 0 && (
                <div className={styles.cartCount}>{cartCount}</div>
              )}
              <SlBasket />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

function UserProfileMenu({ logout, user }) {
  return (
    <div className={styles.userProfileMenu}>
      <ul>
        <li>
          <Link href={user?.role === "admin" ? "/admin/dashboard" : "/profile"}>
            <div className={styles.item}>
              <p>
                <FaRegCircleUser />
                <span>پروفایل</span>
              </p>
              <PiCaretLeft className={styles.caretLeft} />
            </div>
          </Link>
        </li>

        <li>
          <Link href="/profile/courses">
            <div className={styles.item}>
              <p>
                <MdFavoriteBorder />
                <span>دوره های من</span>
              </p>
              <PiCaretLeft className={styles.caretLeft} />
            </div>
          </Link>
        </li>

        <li>
          <Link href="/profile/licenses">
            <div className={styles.item}>
              <p>
                <FiBox />
                <span>لایسنس های من</span>
              </p>
              <PiCaretLeft className={styles.caretLeft} />
            </div>
          </Link>
        </li>

        <li onClick={logout}>
          <div className={styles.item}>
            <p>
              <RiLogoutBoxRLine />
              <span>خروج از حساب کاربری</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
