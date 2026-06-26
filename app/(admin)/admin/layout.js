import styles from "./layout.module.css";
import Sidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminLayout}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={styles.contentContainer}>
        {children}
        {/* این بخش برای بارگذاری محتوای متغیر از صفحات مختلف استفاده می‌شود */}
      </div>
    </div>
  );
}