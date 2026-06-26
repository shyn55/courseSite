import Link from "next/link";
import styles from "./CourseCard.module.css";

import { FaUserGraduate } from "react-icons/fa6";

export default function CourseCard({ course }) {
  return (
    <div className={styles.courseCard}>
      <Link href={`/course/${course.slug}`}>
        <div className={styles.courseImg}>
          <img src={course.thumbnail} />
        </div>
      </Link>
      <div className={styles.courseDetails}>
        <div className={styles.courseTitle}>
          <Link href={`/course/${course.slug}`}>
            <h2>{course.title}</h2>
          </Link>
        </div>
        <div className={styles.courseDesc}>
          توی این دوره آموزشی قراره به زبان خیلی ساده این تکنولوژی رو با مثال های خیلی
          زیاد و به صورت پروژه محور بهتون آموزش بدم
        </div>
        <div className="courseTeacher">مدرس : شایان میرداودی</div>
      </div>
      <div className={styles.courseFooter}>
        <div className={styles.courseStudentCount}>
          <FaUserGraduate />
          <span>{course.studentsCount}</span>
        </div>
        <div className={styles.coursePrice}>
          <span>
            {course.isFree ? (
              "رایگان"
            ) : course.discountPrice ? (
              <div className={styles.discountPrice}>
                <del>{course.price.toLocaleString()} </del>
                {`${course.discountPrice.toLocaleString()} تومان`}
              </div>
            ) : (
              <span
                className={styles.normalPrice}
              >{` ${course.price.toLocaleString()} تومان`}</span>
            )}
          </span>
        </div>
      </div>
      {course.discountPrice && !course.isFree && (
        <div className={styles.discountPercent}>
          {getDiscountPercent(course.price, course.discountPrice)}%
        </div>
      )}
    </div>
  );
}
function getDiscountPercent(price, discountPrice) {
  return Math.round(((price - discountPrice) / price) * 100);
}
