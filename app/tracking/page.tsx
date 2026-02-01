"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrutalInput from "@/components/BrutalInput";
import BrutalButton from "@/components/BrutalButton";
import { getOrderById, formatDate } from "@/lib/utils";
import { useCurrency } from "@/lib/CurrencyContext";
import { Order } from "@/types";

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const orderParam = searchParams.get("order");
    if (orderParam) {
      setOrderId(orderParam);
      handleTrack(orderParam);
    }
  }, [searchParams]);

  const handleTrack = (id?: string) => {
    const trackingId = id || orderId;
    const foundOrder = getOrderById(trackingId);

    if (foundOrder) {
      setOrder(foundOrder);
      setNotFound(false);
    } else {
      setOrder(null);
      setNotFound(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack();
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "ordered":
        return "bg-brutal-yellow";
      case "processing":
        return "bg-brutal-cyan";
      case "shipped":
        return "bg-brutal-pink";
      case "delivered":
        return "bg-green-400";
      default:
        return "bg-gray-300";
    }
  };

  const statuses: Order["status"][] = [
    "ordered",
    "processing",
    "shipped",
    "delivered",
  ];

  const getStatusIndex = (status: Order["status"]) => {
    return statuses.indexOf(status);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-brutal text-5xl md:text-7xl mb-8">
          TRACK YOUR ORDER
        </h1>

        {/* Tracking Form */}
        <div className="border-4 border-black bg-white p-8 shadow-brutal mb-8">
          <h2 className="font-brutal text-3xl mb-6">ENTER ORDER ID</h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1">
              <BrutalInput
                type="text"
                placeholder="BRU-XXXXXX-XXXXX"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <BrutalButton type="submit">TRACK</BrutalButton>
          </form>
        </div>

        {/* Not Found Message */}
        {notFound && (
          <div className="border-4 border-black bg-brutal-pink text-white p-8 shadow-brutal text-center">
            <h3 className="font-brutal text-3xl mb-2">ORDER NOT FOUND</h3>
            <p className="font-mono">
              WE COULDN&apos;T FIND AN ORDER WITH THAT ID.
              <br />
              PLEASE CHECK AND TRY AGAIN.
            </p>
          </div>
        )}

        {/* Order Tracking Info */}
        {order && (
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="border-4 border-black bg-brutal-yellow p-8 shadow-brutal">
              <h3 className="font-brutal text-3xl mb-4">ORDER: {order.id}</h3>
              <div className="grid grid-cols-2 gap-4 font-mono">
                <div>
                  <p className="text-sm mb-1">CUSTOMER</p>
                  <p className="font-bold">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm mb-1">ORDER DATE</p>
                  <p className="font-bold">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm mb-1">TOTAL</p>
                  <p className="font-bold">{formatPrice(order.total)}</p>
                </div>
                <div>
                  <p className="text-sm mb-1">ESTIMATED DELIVERY</p>
                  <p className="font-bold">{formatDate(order.estimatedDelivery)}</p>
                </div>
              </div>
            </div>

            {/* Tracking Status */}
            <div className="border-4 border-black bg-white p-8 shadow-brutal">
              <h3 className="font-brutal text-3xl mb-8">DELIVERY STATUS</h3>

              <div className="relative">
                {/* Progress Bar Background */}
                <div className="absolute top-8 left-0 right-0 h-2 bg-gray-200 border-2 border-black" />
                
                {/* Progress Bar Fill */}
                <div
                  className="absolute top-8 left-0 h-2 bg-brutal-pink border-2 border-black transition-all duration-500"
                  style={{
                    width: `${(getStatusIndex(order.status) / (statuses.length - 1)) * 100}%`,
                  }}
                />

                {/* Status Steps */}
                <div className="relative flex justify-between">
                  {statuses.map((status, index) => {
                    const isComplete = getStatusIndex(order.status) >= index;
                    const isCurrent = order.status === status;

                    return (
                      <div key={status} className="flex flex-col items-center">
                        <div
                          className={`
                            w-16 h-16 border-4 border-black flex items-center justify-center
                            font-brutal text-2xl transition-all
                            ${isComplete ? getStatusColor(status) : "bg-white"}
                            ${isCurrent ? "shadow-brutal scale-110" : ""}
                          `}
                        >
                          {isComplete ? "✓" : index + 1}
                        </div>
                        <p className="font-brutal mt-4 text-center uppercase text-sm">
                          {status}
                        </p>
                        {isCurrent && (
                          <p className="font-mono text-xs mt-2 bg-brutal-yellow px-2 py-1 border-2 border-black">
                            CURRENT
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-4 border-black bg-white p-8 shadow-brutal">
              <h3 className="font-brutal text-3xl mb-6">ITEMS IN THIS ORDER</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center border-b-2 border-gray-200 pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-brutal text-xl">{item.product.name}</p>
                      <p className="font-mono text-sm text-gray-600">
                        QTY: {item.quantity} × {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <p className="font-brutal text-xl">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-4 border-black bg-brutal-cyan p-8 shadow-brutal">
              <h3 className="font-brutal text-2xl mb-4">SHIPPING TO</h3>
              <p className="font-mono">
                {order.address}
                <br />
                {order.city}, {order.zipCode}
              </p>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!order && !notFound && (
          <div className="border-4 border-black bg-white p-8 shadow-brutal">
            <h3 className="font-brutal text-2xl mb-4">NEED HELP?</h3>
            <p className="font-mono mb-4">
              YOUR ORDER ID WAS SENT TO YOUR EMAIL AFTER CHECKOUT.
              <br />
              IT LOOKS LIKE: BRU-XXXXXX-XXXXX
            </p>
            <p className="font-mono">
              STILL CAN&apos;T FIND IT?{" "}
              <a href="/contact" className="underline hover:text-brutal-pink">
                CONTACT US
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
