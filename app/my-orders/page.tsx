"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getOrders, cancelOrder, requestReturn, requestExchange } from "@/lib/utils";
import { useCurrency } from "@/lib/CurrencyContext";
import { useAuth } from "@/lib/AuthContext";
import { Order } from "@/types";
import BrutalButton from "@/components/BrutalButton";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [actionType, setActionType] = useState<"cancel" | "return" | "exchange" | null>(null);
  const [reason, setReason] = useState("");
  const [exchangeProduct, setExchangeProduct] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const allOrders = getOrders();
    // Filter orders by user email if logged in
    const userOrders = user 
      ? allOrders.filter(order => order.email === user.email)
      : allOrders;
    setOrders(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, [user]);

  const openActionModal = (order: Order, action: "cancel" | "return" | "exchange") => {
    setSelectedOrder(order);
    setActionType(action);
    setReason("");
    setExchangeProduct("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setActionType(null);
    setReason("");
    setExchangeProduct("");
  };

  const handleSubmitAction = () => {
    if (!selectedOrder || !reason.trim()) {
      alert("Please provide a reason");
      return;
    }

    let success = false;
    let message = "";

    switch (actionType) {
      case "cancel":
        success = cancelOrder(selectedOrder.id, reason);
        message = success 
          ? "Order cancelled successfully! Refund will be processed in 5-7 business days."
          : "Cannot cancel this order. It may have already shipped.";
        break;
      case "return":
        success = requestReturn(selectedOrder.id, reason);
        message = success
          ? "Return request submitted! We'll send you return instructions via email."
          : "Cannot return this order. Returns are only available within 7 days of delivery.";
        break;
      case "exchange":
        if (!exchangeProduct.trim()) {
          alert("Please specify the product you want to exchange for");
          return;
        }
        success = requestExchange(selectedOrder.id, reason, exchangeProduct);
        message = success
          ? "Exchange request submitted! We'll contact you shortly."
          : "Cannot exchange this order. Exchanges are only available within 7 days of delivery.";
        break;
    }

    alert(message);
    
    if (success) {
      // Refresh orders
      const allOrders = getOrders();
      const userOrders = user 
        ? allOrders.filter(order => order.email === user.email)
        : allOrders;
      setOrders(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    
    closeModal();
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "ordered":
        return "bg-brutal-cyan";
      case "processing":
        return "bg-brutal-yellow";
      case "shipped":
        return "bg-blue-400";
      case "delivered":
        return "bg-green-400";
      case "cancelled":
        return "bg-gray-400";
      case "return-requested":
      case "returned":
        return "bg-orange-400";
      case "exchange-requested":
      case "exchanged":
        return "bg-purple-400";
      default:
        return "bg-white";
    }
  };

  const canCancelOrder = (order: Order) => {
    return order.status === "ordered" || order.status === "processing";
  };

  const canReturnOrder = (order: Order) => {
    if (order.status !== "delivered") return false;
    const deliveryDate = new Date(order.estimatedDelivery);
    const daysSinceDelivery = Math.floor((Date.now() - deliveryDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceDelivery <= 7;
  };

  const canExchangeOrder = (order: Order) => {
    return canReturnOrder(order);
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="border-4 border-black bg-brutal-yellow p-12 shadow-brutal-lg max-w-2xl mx-auto">
          <h1 className="font-brutal text-5xl mb-4">NO ORDERS YET</h1>
          <p className="font-mono text-xl mb-8">
            START YOUR BRUTAL SHOPPING JOURNEY!
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
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="font-brutal text-5xl md:text-7xl mb-8">MY ORDERS</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border-4 border-black bg-white p-6 shadow-brutal"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <h2 className="font-brutal text-2xl mb-2">ORDER #{order.id}</h2>
                  <p className="font-mono text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`border-4 border-black ${getStatusColor(order.status)} px-4 py-2`}>
                  <span className="font-brutal text-sm">
                    {order.status.toUpperCase().replace("-", " ")}
                  </span>
                </div>
              </div>

              <div className="border-t-4 border-black pt-4 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-brutal text-lg mb-2">ITEMS:</p>
                    {order.items.map((item, idx) => (
                      <p key={idx} className="font-mono text-sm">
                        • {item.product.name} × {item.quantity}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="font-brutal text-lg mb-2">DELIVERY:</p>
                    <p className="font-mono text-sm">{order.address}</p>
                    <p className="font-mono text-sm">{order.city}, {order.zipCode}</p>
                  </div>
                </div>
              </div>

              <div className="border-t-4 border-black pt-4 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="font-brutal text-2xl">TOTAL: {formatPrice(order.total)}</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Link href={`/order/${order.id}`}>
                    <BrutalButton>VIEW DETAILS</BrutalButton>
                  </Link>

                  {canCancelOrder(order) && (
                    <button
                      onClick={() => openActionModal(order, "cancel")}
                      className="border-4 border-black bg-brutal-pink text-white px-6 py-3 font-brutal hover:bg-red-600 transition-colors"
                    >
                      CANCEL ORDER
                    </button>
                  )}

                  {canReturnOrder(order) && (
                    <button
                      onClick={() => openActionModal(order, "return")}
                      className="border-4 border-black bg-orange-400 px-6 py-3 font-brutal hover:bg-orange-500 transition-colors"
                    >
                      RETURN
                    </button>
                  )}

                  {canExchangeOrder(order) && (
                    <button
                      onClick={() => openActionModal(order, "exchange")}
                      className="border-4 border-black bg-purple-400 px-6 py-3 font-brutal hover:bg-purple-500 transition-colors"
                    >
                      EXCHANGE
                    </button>
                  )}
                </div>
              </div>

              {order.cancelReason && (
                <div className="mt-4 border-4 border-black bg-gray-100 p-4">
                  <p className="font-brutal text-sm mb-1">CANCELLATION REASON:</p>
                  <p className="font-mono text-sm">{order.cancelReason}</p>
                </div>
              )}

              {order.returnReason && (
                <div className="mt-4 border-4 border-black bg-orange-100 p-4">
                  <p className="font-brutal text-sm mb-1">RETURN REASON:</p>
                  <p className="font-mono text-sm">{order.returnReason}</p>
                </div>
              )}

              {order.exchangeReason && (
                <div className="mt-4 border-4 border-black bg-purple-100 p-4">
                  <p className="font-brutal text-sm mb-1">EXCHANGE REASON:</p>
                  <p className="font-mono text-sm">{order.exchangeReason}</p>
                  <p className="font-brutal text-sm mt-2 mb-1">EXCHANGE FOR:</p>
                  <p className="font-mono text-sm">{order.exchangeProduct}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="border-4 border-black bg-white p-8 shadow-brutal-lg max-w-md w-full">
            <h2 className="font-brutal text-3xl mb-4">
              {actionType === "cancel" && "CANCEL ORDER"}
              {actionType === "return" && "REQUEST RETURN"}
              {actionType === "exchange" && "REQUEST EXCHANGE"}
            </h2>

            <p className="font-mono text-sm mb-4">
              Order ID: {selectedOrder?.id}
            </p>

            <div className="mb-4">
              <label className="font-brutal text-lg mb-2 block">
                REASON {actionType === "exchange" ? "FOR EXCHANGE" : ""}:
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter your reason..."
                className="w-full border-4 border-black p-3 font-mono text-sm focus:outline-none focus:border-brutal-pink"
                rows={4}
                required
              />
            </div>

            {actionType === "exchange" && (
              <div className="mb-4">
                <label className="font-brutal text-lg mb-2 block">
                  EXCHANGE FOR (Product Name):
                </label>
                <input
                  type="text"
                  value={exchangeProduct}
                  onChange={(e) => setExchangeProduct(e.target.value)}
                  placeholder="Enter product name..."
                  className="w-full border-4 border-black p-3 font-mono text-sm focus:outline-none focus:border-brutal-pink"
                  required
                />
              </div>
            )}

            {actionType === "cancel" && (
              <div className="border-4 border-black bg-brutal-yellow p-3 mb-4">
                <p className="font-mono text-xs">
                  ⚠️ Refund will be processed to your original payment method in 5-7 business days.
                </p>
              </div>
            )}

            {(actionType === "return" || actionType === "exchange") && (
              <div className="border-4 border-black bg-brutal-cyan p-3 mb-4">
                <p className="font-mono text-xs">
                  ℹ️ Returns/Exchanges are available within 7 days of delivery.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <BrutalButton onClick={handleSubmitAction} fullWidth>
                SUBMIT
              </BrutalButton>
              <button
                onClick={closeModal}
                className="flex-1 border-4 border-black bg-gray-300 px-6 py-3 font-brutal hover:bg-gray-400 transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
