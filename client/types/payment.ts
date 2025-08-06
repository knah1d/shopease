// Payment related types
export interface Payment {
  id: string;
  orderId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  gatewayResponse?: any;
  createdAt: string;
  updatedAt: string;
}

export interface InitiatePaymentRequest {
  orderId: string;
  amount: number;
  currency?: string;
  paymentMethod?: string;
}

export interface InitiatePaymentResponse {
  paymentUrl: string;
  transactionId: string;
  sessionKey?: string;
}

export interface PaymentStatusResponse {
  transactionId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  orderId: string;
  paymentMethod: string;
  gatewayResponse?: any;
}

export interface PaymentCallbackRequest {
  transactionId: string;
  status: string;
  amount?: number;
  orderId?: string;
  gatewayResponse?: any;
}

export interface PaymentTestConfig {
  testMode: boolean;
  storeId: string;
  storePassword: string;
  gatewayUrl: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}