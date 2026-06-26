import Header from "@/components/layout/Header";
import styles from "./layout.module.css";
import Sidebar from "@/components/layout/UserSidebar";

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.userLayout}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
        <div className={styles.contentContainer}>
          {children}
          {/* این بخش برای بارگذاری محتوای متغیر از صفحات مختلف استفاده می‌شود */}
        </div>
      </div>
    </>
  );
}
