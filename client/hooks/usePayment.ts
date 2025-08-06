import { useState } from 'react';
import { paymentService } from '@/services';
import { 
  InitiatePaymentRequest, 
  PaymentStatusResponse,
  PaymentCallbackRequest 
} from '@/types/payment';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (paymentData: InitiatePaymentRequest) => {
    try {
      setIsProcessing(true);
      setError(null);
      const response = await paymentService.initiatePayment(paymentData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate payment');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const initiateOrderPayment = async (orderId: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      const response = await paymentService.initiateOrderPayment(orderId);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate order payment');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const processOrderPayment = async (orderId: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      await paymentService.processOrderPayment(orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process payment');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const checkPaymentStatus = async (transactionId: string): Promise<PaymentStatusResponse> => {
    try {
      setError(null);
      const response = await paymentService.getPaymentStatus(transactionId);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check payment status');
      throw err;
    }
  };

  const handlePaymentCallback = async (
    type: 'success' | 'fail' | 'cancel' | 'ipn',
    callbackData: PaymentCallbackRequest
  ) => {
    try {
      setError(null);
      switch (type) {
        case 'success':
          await paymentService.handlePaymentSuccess(callbackData);
          break;
        case 'fail':
          await paymentService.handlePaymentFailure(callbackData);
          break;
        case 'cancel':
          await paymentService.handlePaymentCancel(callbackData);
          break;
        case 'ipn':
          await paymentService.handlePaymentIPN(callbackData);
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to handle payment callback');
      throw err;
    }
  };

  const getOrderPayments = async (orderId: string) => {
    try {
      setError(null);
      const payments = await paymentService.getOrderPayments(orderId);
      return payments;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get order payments');
      throw err;
    }
  };

  const isOrderPaymentCompleted = async (orderId: string): Promise<boolean> => {
    try {
      setError(null);
      const isCompleted = await paymentService.isPaymentCompleted(orderId);
      return isCompleted;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check payment completion');
      return false;
    }
  };

  const getTestConfig = async () => {
    try {
      setError(null);
      const config = await paymentService.getTestConfig();
      return config;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get test config');
      throw err;
    }
  };

  return {
    isProcessing,
    error,
    initiatePayment,
    initiateOrderPayment,
    processOrderPayment,
    checkPaymentStatus,
    handlePaymentCallback,
    getOrderPayments,
    isOrderPaymentCompleted,
    getTestConfig,
  };
};