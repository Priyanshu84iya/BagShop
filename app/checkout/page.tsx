"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useCurrency } from "@/lib/CurrencyContext";
import BrutalInput from "@/components/BrutalInput";
import BrutalButton from "@/components/BrutalButton";
import { useRouter } from "next/navigation";
import {
  generateOrderId,
  saveOrder,
  getEstimatedDeliveryDate,
} from "@/lib/utils";
import { detectLocation } from "@/lib/geolocation";

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutoDetectLocation = async () => {
    setIsDetectingLocation(true);
    
    const location = await detectLocation();
    
    if (location) {
      setFormData({
        ...formData,
        address: location.address,
        city: location.city,
        zipCode: location.postalCode,
      });
    }
    
    setIsDetectingLocation(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderId = generateOrderId();
    const order = {
      id: orderId,
      items: cart,
      total: getCartTotal() + (getCartTotal() > 100 ? 0 : 9.99),
      customerName: formData.customerName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      cardNumber: formData.cardNumber,
      status: "ordered" as const,
      createdAt: new Date().toISOString(),
      estimatedDelivery: getEstimatedDeliveryDate(),
    };

    saveOrder(order);
    clearCart();

    // Redirect to order confirmation
    router.push(`/order/${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="border-4 border-black bg-brutal-yellow p-12 shadow-brutal-lg max-w-2xl mx-auto">
          <h1 className="font-brutal text-5xl mb-4">CART IS EMPTY</h1>
          <p className="font-mono text-xl mb-8">
            ADD SOME BRUTAL BAGS BEFORE CHECKOUT.
          </p>
          <BrutalButton onClick={() => router.push("/products")}>
            SHOP NOW
          </BrutalButton>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 8000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="font-brutal text-5xl md:text-7xl mb-8">CHECKOUT</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Information */}
              <div className="border-4 border-black bg-white p-8 shadow-brutal">
                <h2 className="font-brutal text-3xl mb-6">
                  CUSTOMER INFORMATION
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="font-brutal text-lg mb-2 block">
                      FULL NAME
                    </label>
                    <BrutalInput
                      name="customerName"
                      type="text"
                      placeholder="JOHN DOE"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-brutal text-lg mb-2 block">
                      EMAIL
                    </label>
                    <BrutalInput
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-4 border-black bg-white p-8 shadow-brutal">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-brutal text-3xl">SHIPPING ADDRESS</h2>
                  <button
                    type="button"
                    onClick={handleAutoDetectLocation}
                    disabled={isDetectingLocation}
                    className="border-4 border-black bg-brutal-cyan px-4 py-2 font-brutal text-sm hover:bg-brutal-yellow transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isDetectingLocation ? (
                      <>
                        <span className="inline-block animate-spin">⟳</span>
                        DETECTING...
                      </>
                    ) : (
                      <>
                        <span>📍</span>
                        AUTO DETECT
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="font-brutal text-lg mb-2 block">
                      STREET ADDRESS
                    </label>
                    <BrutalInput
                      name="address"
                      type="text"
                      placeholder="123 BRUTAL ST"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-brutal text-lg mb-2 block">
                        CITY
                      </label>
                      <BrutalInput
                        name="city"
                        type="text"
                        placeholder="NEW YORK"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="font-brutal text-lg mb-2 block">
                        ZIP CODE
                      </label>
                      <BrutalInput
                        name="zipCode"
                        type="text"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-4 border-black bg-white p-8 shadow-brutal">
                <h2 className="font-brutal text-3xl mb-6">
                  PAYMENT INFORMATION
                </h2>
                <div className="bg-brutal-cyan border-4 border-black p-4 mb-6">
                  <p className="font-mono text-sm">
                    🔒 THIS IS A DEMO. USE TEST CARD: 4242 4242 4242 4242
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="font-brutal text-lg mb-2 block">
                      CARD NUMBER
                    </label>
                    <BrutalInput
                      name="cardNumber"
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-brutal text-lg mb-2 block">
                        EXPIRY
                      </label>
                      <BrutalInput
                        name="cardExpiry"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="font-brutal text-lg mb-2 block">
                        CVV
                      </label>
                      <BrutalInput
                        name="cardCVV"
                        type="text"
                        placeholder="123"
                        value={formData.cardCVV}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border-4 border-black bg-white p-8 shadow-brutal-lg sticky top-24">
                <h2 className="font-brutal text-3xl mb-6">ORDER SUMMARY</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="font-mono text-sm">
                      <div className="flex justify-between">
                        <span>
                          {item.product.name} × {item.quantity}
                        </span>
                        <span>{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-4 border-black pt-4 space-y-2 mb-6">
                  <div className="flex justify-between font-mono">
                    <span>SUBTOTAL</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>SHIPPING</span>
                    <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t-4 border-black pt-4 flex justify-between">
                    <span className="font-brutal text-2xl">TOTAL</span>
                    <span className="font-brutal text-2xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <BrutalButton
                  type="submit"
                  fullWidth
                  disabled={isProcessing}
                >
                  {isProcessing ? "PROCESSING..." : "PLACE ORDER"}
                </BrutalButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
