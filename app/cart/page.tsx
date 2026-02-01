"use client";

import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import { useCurrency } from "@/lib/CurrencyContext";
import BrutalButton from "@/components/BrutalButton";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="border-4 border-black bg-brutal-yellow p-12 shadow-brutal-lg max-w-2xl mx-auto">
          <h1 className="font-brutal text-5xl mb-4">YOUR CART IS EMPTY</h1>
          <p className="font-mono text-xl mb-8">
            TIME TO FILL IT WITH BRUTAL BAGS.
          </p>
          <BrutalButton onClick={() => router.push("/products")}>
            SHOP NOW
          </BrutalButton>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-brutal text-5xl md:text-7xl mb-8">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="border-4 border-black bg-white p-6 shadow-brutal"
              >
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 border-4 border-black flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-brutal text-2xl mb-2">
                      {item.product.name}
                    </h3>
                    <p className="font-mono text-sm mb-4 text-gray-600">
                      {item.product.category.toUpperCase()}
                    </p>
                    <p className="font-brutal text-xl mb-4">
                      {formatPrice(item.product.price)}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border-4 border-black">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="px-4 py-2 font-brutal text-xl hover:bg-brutal-yellow"
                        >
                          -
                        </button>
                        <span className="px-6 py-2 font-mono border-x-4 border-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-4 py-2 font-brutal text-xl hover:bg-brutal-yellow"
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="border-4 border-black bg-brutal-pink text-white px-6 py-2 font-brutal hover:bg-red-600"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-brutal text-2xl">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border-4 border-black bg-white p-8 shadow-brutal-lg sticky top-24">
              <h2 className="font-brutal text-3xl mb-6">ORDER SUMMARY</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between font-mono">
                  <span>SUBTOTAL</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>SHIPPING</span>
                  <span>{getCartTotal() > 8000 ? "FREE" : formatPrice(99)}</span>
                </div>
                <div className="border-t-4 border-black pt-4 flex justify-between">
                  <span className="font-brutal text-2xl">TOTAL</span>
                  <span className="font-brutal text-2xl">
                    {formatPrice(getCartTotal() + (getCartTotal() > 8000 ? 0 : 99))}
                  </span>
                </div>
              </div>

              {getCartTotal() < 8000 && (
                <div className="bg-brutal-yellow border-4 border-black p-4 mb-6">
                  <p className="font-mono text-sm">
                    ADD {formatPrice(8000 - getCartTotal())} MORE FOR FREE SHIPPING!
                  </p>
                </div>
              )}

              <BrutalButton
                fullWidth
                onClick={() => router.push("/checkout")}
              >
                PROCEED TO CHECKOUT
              </BrutalButton>

              <button
                onClick={() => router.push("/products")}
                className="w-full mt-4 font-mono text-center hover:text-brutal-pink"
              >
                ← CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
