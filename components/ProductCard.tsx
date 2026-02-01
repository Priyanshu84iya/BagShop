"use client";

import Image from "next/image";
import { Product } from "@/types";
import BrutalCard from "./BrutalCard";
import BrutalButton from "./BrutalButton";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/lib/CurrencyContext";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  return (
    <BrutalCard className="p-0 overflow-hidden">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/products/${product.id}`)}
      >
        <div className="relative h-64 border-b-4 border-black bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="font-brutal text-2xl mb-2">{product.name}</h3>
          <p className="font-mono text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-brutal text-2xl">{formatPrice(product.price)}</span>
            <span className="font-mono text-sm">
              STOCK: {product.stock}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <BrutalButton
          fullWidth
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
        >
          ADD TO CART
        </BrutalButton>
      </div>
    </BrutalCard>
  );
}
