import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/contexts/CardContext";
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
