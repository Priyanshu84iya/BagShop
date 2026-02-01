export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  status: "ordered" | "processing" | "shipped" | "delivered" | "cancelled" | "return-requested" | "returned" | "exchange-requested" | "exchanged";
  createdAt: string;
  estimatedDelivery: string;
  cancelledAt?: string;
  cancelReason?: string;
  returnRequestedAt?: string;
  returnReason?: string;
  exchangeRequestedAt?: string;
  exchangeReason?: string;
  exchangeProduct?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}
