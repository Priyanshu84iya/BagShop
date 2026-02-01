"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/CartContext";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", "backpacks", "totes", "messenger", "clutches", "duffle", "sling", "shoulder", "weekender"];

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-brutal text-5xl md:text-7xl mb-8">ALL PRODUCTS</h1>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`
                border-4 border-black px-6 py-3 font-mono uppercase
                transition-all
                ${
                  filter === category
                    ? "bg-brutal-pink text-white"
                    : "bg-white hover:bg-brutal-yellow"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-brutal text-3xl">NO PRODUCTS FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
}
