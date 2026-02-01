"use client";

import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BrutalButton from "@/components/BrutalButton";
import { useCart } from "@/lib/CartContext";
import { useCurrency } from "@/lib/CurrencyContext";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    // Show welcome message for new/returning users
    const hasSeenWelcome = sessionStorage.getItem("pryvento-welcome-shown");
    if (user && !hasSeenWelcome) {
      setShowWelcome(true);
      sessionStorage.setItem("pryvento-welcome-shown", "true");
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
    }
  }, [user]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    // Optional: Show notification
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      {/* Welcome Message */}
      {isHydrated && showWelcome && user && (
        <div className="fixed top-24 right-4 z-50 border-4 border-black bg-brutal-yellow p-6 shadow-brutal-lg animate-slide-in max-w-sm">
          <button
            onClick={() => setShowWelcome(false)}
            className="absolute top-2 right-2 font-brutal text-2xl hover:text-brutal-pink"
          >
            ×
          </button>
          <h3 className="font-brutal text-2xl mb-2">WELCOME BACK!</h3>
          <p className="font-mono">
            HEY {user.name.toUpperCase()}, READY TO SHOP BRUTALLY?
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section className="border-b-4 border-black bg-brutal-yellow py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="font-brutal text-6xl md:text-8xl mb-6 leading-tight">
              BAGS THAT
              <br />
              DON&apos;T APOLOGIZE
            </h1>
            <p className="font-mono text-xl md:text-2xl mb-8 max-w-2xl">
              MADE IN INDIA. BRUTAL DESIGN. UNCOMPROMISING QUALITY.
              <br />
              CARRY YOUR WORLD WITH ATTITUDE.
            </p>
            <div className="flex gap-4 flex-wrap">
              <BrutalButton onClick={() => router.push("/products")}>
                SHOP NOW
              </BrutalButton>
              <BrutalButton variant="secondary" onClick={() => router.push("/about")}>
                LEARN MORE
              </BrutalButton>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-brutal text-4xl md:text-6xl">FEATURED BAGS</h2>
            <Link
              href="/products"
              className="font-mono text-lg hover:text-brutal-pink transition-colors uppercase"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="border-y-4 border-black bg-brutal-cyan py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-4 border-black bg-white p-8 shadow-brutal">
              <h3 className="font-brutal text-3xl mb-4">FREE SHIPPING</h3>
              <p className="font-mono">
                ON ALL ORDERS OVER {formatPrice(8000)}. NO TRICKS. NO FINE PRINT.
              </p>
            </div>
            <div className="border-4 border-black bg-white p-8 shadow-brutal">
              <h3 className="font-brutal text-3xl mb-4">LIFETIME WARRANTY</h3>
              <p className="font-mono">
                BUILT TO LAST. BUILT TO SURVIVE. BUILT BRUTAL.
              </p>
            </div>
            <div className="border-4 border-black bg-white p-8 shadow-brutal">
              <h3 className="font-brutal text-3xl mb-4">30-DAY RETURNS</h3>
              <p className="font-mono">
                NOT SATISFIED? SEND IT BACK. NO QUESTIONS ASKED.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-brutal text-5xl md:text-7xl mb-6 text-brutal-yellow">
            READY TO GO BRUTAL?
          </h2>
          <p className="font-mono text-xl mb-8 max-w-2xl mx-auto">
            JOIN THOUSANDS WHO&apos;VE CHOSEN BAGS WITH ATTITUDE.
          </p>
          <BrutalButton onClick={() => router.push("/products")}>
            EXPLORE COLLECTION
          </BrutalButton>
        </div>
      </section>
    </div>
  );
}
