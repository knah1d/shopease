// Order related types
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: ShippingAddress;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}