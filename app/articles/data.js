// app/articles/data.js
export const articlesData = [
  {
    id: 1,
    slug: "react-hooks-complete-guide",
    title: "راهنمای کامل React Hooks",
    excerpt: "همه چیز درباره useState، useEffect، useContext و ...",
    category: "react",
    author: "علی محمدی",
    date: "۲۰ تیر ۱۴۰۳",
    readTime: "۱۲ دقیقه",
    image: "/images/articles/react-hooks.jpg",
    tags: ["React", "Hooks", "جاوااسکریپت"],
    content: `
      <h2>مقدمه</h2>
      <p>React Hooks یکی از مهم‌ترین قابلیت‌هایی است که در نسخه ۱۶.۸ به React اضافه شد و انقلابی در نحوه نوشتن کامپوننت‌ها ایجاد کرد. در این مقاله به بررسی کامل تمام هوک‌های پرکاربرد React می‌پردازیم.</p>
      
      <h3>useState</h3>
      <p>useState به شما اجازه می‌دهد تا state را در کامپوننت‌های تابعی مدیریت کنید. این هوک یک آرایه با دو عنصر برمی‌گرداند: مقدار فعلی state و تابعی برای به‌روزرسانی آن.</p>
      <pre><code>
const [count, setCount] = useState(0);
// استفاده:
setCount(count + 1);
      </code></pre>

      <h3>useEffect</h3>
      <p>useEffect برای انجام عملیات جانبی مانند فراخوانی API، اشتراک‌گذاری رویدادها و ... استفاده می‌شود.</p>
      <pre><code>
useEffect(() => {
  // کد اجرا می‌شود
  return () => {
    // پاک‌سازی (cleanup)
  };
}, [dependencies]);
      </code></pre>

      <h2>نتیجه‌گیری</h2>
      <p>Hooks روش برنامه‌نویسی در React را متحول کرده و کدها را خواناتر و مدیریت‌پذیرتر کرده است. تسلط بر این مفاهیم برای هر توسعه‌دهنده React ضروری است.</p>
    `,
  },
  {
    id: 2,
    slug: "nextjs-app-router-tutorial",
    title: "آموزش App Router در Next.js 14",
    excerpt: "آشنایی با ساختار جدید Next.js و مزایای App Router",
    category: "nextjs",
    author: "سارا احمدی",
    date: "۱۵ تیر ۱۴۰۳",
    readTime: "۱۸ دقیقه",
    image: "/images/articles/nextjs-app-router.jpg",
    tags: ["Next.js", "React", "App Router", "سرور کامپوننت"],
    content: `
      <h2>معرفی App Router</h2>
      <p>Next.js 14 با معرفی App Router تحول بزرگی در ساخت اپلیکیشن‌های React ایجاد کرده است. این معماری جدید امکان استفاده از Server Components، Streaming و Layoutهای تو در تو را فراهم می‌کند.</p>
      
      <h3>ساختار پوشه‌ها</h3>
      <p>در App Router، هر پوشه یک مسیر (route) را مشخص می‌کند و فایل‌های page.js و layout.js نقش کلیدی دارند.</p>
      <pre><code>
app/
  layout.js     # روت لایه اصلی
  page.js       # صفحه اصلی
  about/
    page.js     # مسیر /about
  blog/
    [slug]/
      page.js   # مسیر داینامیک /blog/...
      </code></pre>

      <h3>Server vs Client Components</h3>
      <p>یکی از مهم‌ترین ویژگی‌های App Router، تفکیک Server و Client Components است. با استفاده از 'use client' می‌توانید کامپوننت‌های سمت کلاینت را مشخص کنید.</p>
      
      <h2>جمع‌بندی</h2>
      <p>App Router یک گام بزرگ به جلو در توسعه Next.js است و با یادگیری آن می‌توانید اپلیکیشن‌های سریع‌تر و بهینه‌تری بسازید.</p>
    `,
  },
  {
    id: 3,
    slug: "typescript-advanced-patterns",
    title: "الگوهای پیشرفته در TypeScript",
    excerpt: "آموزش مفاهیم پیشرفته TypeScript برای توسعه‌دهندگان حرفه‌ای",
    category: "typescript",
    author: "رضا کریمی",
    date: "۱۰ تیر ۱۴۰۳",
    readTime: "۱۵ دقیقه",
    image: "/images/articles/typescript-patterns.jpg",
    tags: ["TypeScript", "جاوااسکریپت", "برنامه‌نویسی"],
    content: `
      <h2>مقدمه</h2>
      <p>TypeScript به عنوان یک زبان برنامه‌نویسی قدرتمند، قابلیت‌های پیشرفته‌ای برای توسعه‌دهندگان فراهم کرده است. در این مقاله به بررسی الگوهای پیشرفته TypeScript می‌پردازیم.</p>
      
      <h3>Generic Types</h3>
      <p>Generics به شما امکان می‌دهند کدهای قابل استفاده مجدد بنویسید:</p>
      <pre><code>
function identity<T>(arg: T): T {
  return arg;
}

// استفاده:
const num = identity<number>(10);
      </code></pre>

      <h3>Utility Types</h3>
      <p>TypeScript ابزارهای مفیدی برای کار با تایپ‌ها ارائه می‌دهد:</p>
      <pre><code>
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// فقط برخی از فیلدها را انتخاب کنید
type PublicUser = Omit<User, 'password'>;
      </code></pre>

      <h2>نتیجه‌گیری</h2>
      <p>استفاده از این الگوها به شما کمک می‌کند کدهای امن‌تر و با کیفیت‌تری بنویسید.</p>
    `,
  },
  {
    id: 4,
    slug: "javascript-performance-optimization",
    title: "بهینه‌سازی عملکرد در جاوااسکریپت",
    excerpt: "تکنیک‌های افزایش سرعت و کارایی کدهای جاوااسکریپت",
    category: "javascript",
    author: "مریم حسینی",
    date: "۵ تیر ۱۴۰۳",
    readTime: "۱۰ دقیقه",
    image: "/images/articles/js-performance.jpg",
    tags: ["جاوااسکریپت", "بهینه‌سازی", "برنامه‌نویسی"],
    content: `
      <h2>اهمیت بهینه‌سازی</h2>
      <p>در دنیای امروز، سرعت و کارایی برنامه‌ها یکی از مهم‌ترین عوامل موفقیت است. در این مقاله به تکنیک‌های بهینه‌سازی کدهای جاوااسکریپت می‌پردازیم.</p>
      
      <h3>Debouncing و Throttling</h3>
      <p>این دو تکنیک برای کنترل تعداد دفعات اجرای توابع در رویدادهای مکرر استفاده می‌شوند:</p>
      <pre><code>
// Debounce - اجرا بعد از توقف
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle - اجرا با فاصله زمانی
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
      </code></pre>

      <h3>Lazy Loading</h3>
      <p>بارگذاری تاخیری یکی از بهترین روش‌ها برای بهبود سرعت بارگذاری اولیه صفحه است.</p>
      
      <h2>نکات پایانی</h2>
      <p>با استفاده از این تکنیک‌ها می‌توانید برنامه‌های سریع‌تر و پاسخ‌دهنده‌تری بسازید.</p>
    `,
  },
  {
    id: 5,
    slug: "python-data-science-basics",
    title: "مبانی علم داده با پایتون",
    excerpt:
      "آشنایی با ابزارهای علم داده در پایتون: Pandas، NumPy و Matplotlib",
    category: "python",
    author: "امیر رضایی",
    date: "۱ تیر ۱۴۰۳",
    readTime: "۲۰ دقیقه",
    image: "/images/articles/python-data-science.jpg",
    tags: ["پایتون", "علم داده", "تحلیل داده"],
    content: `
      <h2>معرفی علم داده</h2>
      <p>علم داده یکی از پرطرفدارترین حوزه‌های برنامه‌نویسی است که با استفاده از پایتون می‌توانید به راحتی وارد آن شوید.</p>
      
      <h3>Pandas</h3>
      <p>کتابخانه Pandas برای تحلیل و پردازش داده‌ها استفاده می‌شود:</p>
      <pre><code>
import pandas as pd

# خواندن داده از فایل CSV
df = pd.read_csv('data.csv')

# نمایش ۵ ردیف اول
print(df.head())
      </code></pre>

      <h3>Matplotlib</h3>
      <p>این کتابخانه برای مصورسازی داده‌ها بسیار قدرتمند است:</p>
      
      <h2>جمع‌بندی</h2>
      <p>با این ابزارها می‌توانید تحلیل‌های قدرتمندی روی داده‌های خود انجام دهید.</p>
    `,
  },
];

export const categories = [
  { id: "all", label: "همه" },
  { id: "react", label: "ری‌اکت" },
  { id: "nextjs", label: "نکست" },
  { id: "typescript", label: "تایپ‌اسکریپت" },
  { id: "javascript", label: "جاوااسکریپت" },
  { id: "python", label: "پایتون" },
];
