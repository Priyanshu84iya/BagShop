import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/CartContext";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "Pryvento - Brutalism E-Commerce",
  description: "Bold bags for bold people. Brutalism meets e-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
