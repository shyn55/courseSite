"use client";
import Link from "next/link";
import styles from "./AdminSidebar.module.css";

// icons
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUsers, FaComments } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function UserSidebar() {
  const pathname = usePathname();

  const { logout } = useAuth();
  return (
    <div style={{ marginTop: "100px" }} className={styles.sidebar}>
      <h2 className={styles.logo}>
        <Link href="/">Shayan Coding</Link>
      </h2>

      <ul>
        <li className={pathname === "/profile" ? styles.active : ""}>
          <Link href="/profile">
            <MdDashboard />
            <span>پروفایل من</span>
          </Link>
        </li>

        <li className={pathname === "/profile/courses" ? styles.active : ""}>
          <Link href="/profile/courses">
            <FaUsers />
            <span>دوره های من</span>
          </Link>
        </li>

        <li className={pathname === "/profile/licenses" ? styles.active : ""}>
          <Link href="/profile/licenses">
            <FaComments />
            <span>لایسنس ها</span>
          </Link>
        </li>

        <li className={styles.logoutItem}>
          <button onClick={logout} className={styles.logoutBtn}>
            <MdLogout />
            <span>خروج</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
