"use client";

import { getOrderById, formatDate } from "@/lib/utils";
import { useCurrency } from "@/lib/CurrencyContext";
import BrutalButton from "@/components/BrutalButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = getOrderById(params.orderId);
  const { formatPrice } = useCurrency();
  const router = useRouter();

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="border-4 border-black bg-brutal-pink text-white p-12 shadow-brutal-lg max-w-2xl mx-auto">
          <h1 className="font-brutal text-5xl mb-4">ORDER NOT FOUND</h1>
          <p className="font-mono text-xl mb-8">
            THIS ORDER DOESN&apos;T EXIST IN OUR SYSTEM.
          </p>
          <BrutalButton onClick={() => router.push("/")}>
            GO HOME
          </BrutalButton>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Message */}
        <div className="border-4 border-black bg-brutal-yellow p-12 shadow-brutal-lg mb-8 text-center">
          <h1 className="font-brutal text-5xl md:text-7xl mb-4">
            ORDER CONFIRMED!
          </h1>
          <p className="font-mono text-xl mb-2">
            YOUR ORDER HAS BEEN BRUTALLY PROCESSED.
          </p>
          <p className="font-mono">
            ORDER ID: <strong className="font-brutal">{order.id}</strong>
          </p>
        </div>

        {/* Order Details */}
        <div className="border-4 border-black bg-white p-8 shadow-brutal mb-8">
          <h2 className="font-brutal text-3xl mb-6">ORDER DETAILS</h2>

          <div className="grid grid-cols-2 gap-4 mb-6 font-mono">
            <div>
              <p className="text-gray-600 mb-1">ORDER DATE</p>
              <p className="font-bold">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">ESTIMATED DELIVERY</p>
              <p className="font-bold">{formatDate(order.estimatedDelivery)}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">CUSTOMER</p>
              <p className="font-bold">{order.customerName}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">EMAIL</p>
              <p className="font-bold">{order.email}</p>
            </div>
          </div>

          <div className="border-t-4 border-black pt-6">
            <h3 className="font-brutal text-2xl mb-4">SHIPPING ADDRESS</h3>
            <p className="font-mono">
              {order.address}
              <br />
              {order.city}, {order.zipCode}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="border-4 border-black bg-white p-8 shadow-brutal mb-8">
          <h2 className="font-brutal text-3xl mb-6">ITEMS ORDERED</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center border-b-2 border-gray-200 pb-4 last:border-0"
              >
                <div>
                  <p className="font-brutal text-xl">{item.product.name}</p>
                  <p className="font-mono text-sm text-gray-600">
                    QUANTITY: {item.quantity}
                  </p>
                </div>
                <p className="font-brutal text-xl">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t-4 border-black pt-6 mt-6">
            <div className="flex justify-between font-brutal text-2xl">
              <span>TOTAL PAID</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href={`/tracking?order=${order.id}`}>
            <BrutalButton fullWidth variant="primary">
              TRACK YOUR ORDER
            </BrutalButton>
          </Link>
          <Link href="/my-orders">
            <BrutalButton fullWidth variant="secondary">
              VIEW ALL ORDERS
            </BrutalButton>
          </Link>
        </div>

        {/* Confirmation Email Notice */}
        <div className="border-4 border-black bg-brutal-cyan p-6 mt-8">
          <p className="font-mono text-center">
            📧 A CONFIRMATION EMAIL HAS BEEN SENT TO{" "}
            <strong>{order.email}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
