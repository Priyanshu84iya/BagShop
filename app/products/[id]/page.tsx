"use client";

import { use } from "react";
import Image from "next/image";
import { getProductById } from "@/data/products";
import BrutalButton from "@/components/BrutalButton";
import { useCart } from "@/lib/CartContext";
import { useCurrency } from "@/lib/CurrencyContext";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-brutal text-5xl mb-4">PRODUCT NOT FOUND</h1>
        <BrutalButton onClick={() => router.push("/products")}>
          BACK TO PRODUCTS
        </BrutalButton>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="font-mono mb-8 hover:text-brutal-pink"
        >
          ← BACK
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="border-4 border-black shadow-brutal-lg">
            <div className="relative h-96 lg:h-[600px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-brutal text-4xl md:text-6xl mb-4">
              {product.name}
            </h1>
            <p className="font-brutal text-3xl mb-6">{formatPrice(product.price)}</p>

            <div className="border-4 border-black bg-brutal-yellow p-4 mb-6">
              <p className="font-mono">
                <strong>STOCK:</strong> {product.stock} UNITS AVAILABLE
              </p>
              <p className="font-mono">
                <strong>CATEGORY:</strong> {product.category.toUpperCase()}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="font-brutal text-2xl mb-4">DESCRIPTION</h2>
              <p className="font-mono text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="font-brutal text-2xl mb-4">FEATURES</h2>
              <ul className="font-mono space-y-2">
                <li>→ PREMIUM MATERIALS</li>
                <li>→ REINFORCED STITCHING</li>
                <li>→ WATER RESISTANT</li>
                <li>→ LIFETIME WARRANTY</li>
                <li>→ BRUTALLY DESIGNED</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <BrutalButton
                fullWidth
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
              </BrutalButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
