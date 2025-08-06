import { apiClient } from '@/lib/api';
import { 
  Payment, 
  InitiatePaymentRequest, 
  InitiatePaymentResponse,
  PaymentStatusResponse,
  PaymentCallbackRequest,
  PaymentTestConfig 
} from '@/types/payment';

class PaymentService {
  // Initiate payment for a specific order
  async initiateOrderPayment(orderId: string): Promise<InitiatePaymentResponse> {
    try {
      const response = await apiClient.post<InitiatePaymentResponse>(
        `/orders/${orderId}/payment`
      );
      return response;
    } catch (error) {
      console.error('Failed to initiate order payment:', error);
      throw error;
    }
  }

  // Initiate a general payment
  async initiatePayment(paymentData: InitiatePaymentRequest): Promise<InitiatePaymentResponse> {
    try {
      const response = await apiClient.post<InitiatePaymentResponse>(
        '/payments/initiate', 
        paymentData
      );
      return response;
    } catch (error) {
      console.error('Failed to initiate payment:', error);
      throw error;
    }
  }

  // Handle payment success callback
  async handlePaymentSuccess(callbackData: PaymentCallbackRequest): Promise<void> {
    try {
      await apiClient.post('/payments/success', callbackData, false);
    } catch (error) {
      console.error('Failed to handle payment success:', error);
      throw error;
    }
  }

  // Handle payment failure callback
  async handlePaymentFailure(callbackData: PaymentCallbackRequest): Promise<void> {
    try {
      await apiClient.post('/payments/fail', callbackData, false);
    } catch (error) {
      console.error('Failed to handle payment failure:', error);
      throw error;
    }
  }

  // Handle payment cancellation callback
  async handlePaymentCancel(callbackData: PaymentCallbackRequest): Promise<void> {
    try {
      await apiClient.post('/payments/cancel', callbackData, false);
    } catch (error) {
      console.error('Failed to handle payment cancellation:', error);
      throw error;
    }
  }

  // Handle Instant Payment Notification (IPN)
  async handlePaymentIPN(ipnData: PaymentCallbackRequest): Promise<void> {
    try {
      await apiClient.post('/payments/ipn', ipnData, false);
    } catch (error) {
      console.error('Failed to handle payment IPN:', error);
      throw error;
    }
  }

  // Get payment status by transaction ID
  async getPaymentStatus(transactionId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await apiClient.get<PaymentStatusResponse>(
        `/payments/status/${transactionId}`, 
        false
      );
      return response;
    } catch (error) {
      console.error('Failed to get payment status:', error);
      throw error;
    }
  }

  // Get payments for a specific order
  async getOrderPayments(orderId: string): Promise<Payment[]> {
    try {
      const response = await apiClient.get<Payment[]>(`/payments/order/${orderId}`);
      return response;
    } catch (error) {
      console.error('Failed to get order payments:', error);
      throw error;
    }
  }

  // Get payment test configuration
  async getTestConfig(): Promise<PaymentTestConfig> {
    try {
      const response = await apiClient.get<PaymentTestConfig>('/payments/test/config', false);
      return response;
    } catch (error) {
      console.error('Failed to get payment test config:', error);
      throw error;
    }
  }

  // Helper method to redirect user to payment gateway
  redirectToPayment(paymentUrl: string): void {
    if (typeof window !== 'undefined') {
      window.location.href = paymentUrl;
    }
  }

  // Helper method to check if payment is completed
  async isPaymentCompleted(orderId: string): Promise<boolean> {
    try {
      const payments = await this.getOrderPayments(orderId);
      return payments.some(payment => payment.status === 'COMPLETED');
    } catch (error) {
      console.error('Failed to check payment completion:', error);
      return false;
    }
  }

  // Process payment for an order (combines initiate and redirect)
  async processOrderPayment(orderId: string): Promise<void> {
    try {
      const paymentResponse = await this.initiateOrderPayment(orderId);
      this.redirectToPayment(paymentResponse.paymentUrl);
    } catch (error) {
      console.error('Failed to process order payment:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const paymentService = new PaymentService();