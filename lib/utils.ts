import { Order, ContactForm } from "@/types";

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `BRU-${timestamp}-${random}`.toUpperCase();
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem("bagshop-orders", JSON.stringify(orders));
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const orders = localStorage.getItem("bagshop-orders");
  return orders ? JSON.parse(orders) : [];
}

export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find((order) => order.id === id);
}

export function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): void {
  const orders = getOrders();
  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order
  );
  localStorage.setItem("bagshop-orders", JSON.stringify(updatedOrders));
}

export function cancelOrder(orderId: string, reason: string): boolean {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  
  // Can only cancel if order is in 'ordered' or 'processing' status
  if (!order || (order.status !== 'ordered' && order.status !== 'processing')) {
    return false;
  }
  
  const updatedOrders = orders.map((o) =>
    o.id === orderId
      ? { ...o, status: 'cancelled' as const, cancelledAt: new Date().toISOString(), cancelReason: reason }
      : o
  );
  localStorage.setItem("bagshop-orders", JSON.stringify(updatedOrders));
  return true;
}

export function requestReturn(orderId: string, reason: string): boolean {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  
  // Can only return if order is delivered
  if (!order || order.status !== 'delivered') {
    return false;
  }
  
  // Check if within 7 days of delivery
  const deliveryDate = new Date(order.estimatedDelivery);
  const daysSinceDelivery = Math.floor((Date.now() - deliveryDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceDelivery > 7) {
    return false;
  }
  
  const updatedOrders = orders.map((o) =>
    o.id === orderId
      ? { ...o, status: 'return-requested' as const, returnRequestedAt: new Date().toISOString(), returnReason: reason }
      : o
  );
  localStorage.setItem("bagshop-orders", JSON.stringify(updatedOrders));
  return true;
}

export function requestExchange(orderId: string, reason: string, productName: string): boolean {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  
  // Can only exchange if order is delivered
  if (!order || order.status !== 'delivered') {
    return false;
  }
  
  // Check if within 7 days of delivery
  const deliveryDate = new Date(order.estimatedDelivery);
  const daysSinceDelivery = Math.floor((Date.now() - deliveryDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceDelivery > 7) {
    return false;
  }
  
  const updatedOrders = orders.map((o) =>
    o.id === orderId
      ? { ...o, status: 'exchange-requested' as const, exchangeRequestedAt: new Date().toISOString(), exchangeReason: reason, exchangeProduct: productName }
      : o
  );
  localStorage.setItem("bagshop-orders", JSON.stringify(updatedOrders));
  return true;
}

export function saveContactForm(form: ContactForm): void {
  const forms = getContactForms();
  forms.push(form);
  localStorage.setItem("bagshop-contact-forms", JSON.stringify(forms));
}

export function getContactForms(): ContactForm[] {
  if (typeof window === "undefined") return [];
  const forms = localStorage.getItem("bagshop-contact-forms");
  return forms ? JSON.parse(forms) : [];
}

// Legacy function - use useCurrency().formatPrice() instead
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getEstimatedDeliveryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7); // 7 days from now
  return date.toISOString();
}

export function maskCardNumber(cardNumber: string): string {
  return `**** **** **** ${cardNumber.slice(-4)}`;
}
