package com.example.shopease.order.application.services;

import com.example.shopease.payment.application.dto.PaymentInitiationRequest;
import com.example.shopease.payment.application.dto.PaymentInitiationResponse;
import com.example.shopease.payment.application.services.SSLCommerzService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderPaymentService {
    
    private final SSLCommerzService sslCommerzService;
    
    public PaymentInitiationResponse initiateOrderPayment(Long orderId, BigDecimal amount, 
                                                        String customerName, String customerEmail, 
                                                        String customerPhone) {
        
        log.info("Initiating payment for order: {} with amount: {}", orderId, amount);
        
        PaymentInitiationRequest request = PaymentInitiationRequest.builder()
                .orderId(orderId)
                .amount(amount)
                .customerName(customerName)
                .customerEmail(customerEmail)
                .customerPhone(customerPhone)
                .productName("Order #" + orderId)
                .build();
        
        return sslCommerzService.initiatePayment(request);
    }
    
    public boolean validateOrderPayment(String transactionId) {
        // This would be called when payment status changes
        // You might want to update order status based on payment status
        log.info("Validating payment for transaction: {}", transactionId);
        
        try {
            // Get payment details and update order accordingly
            return true; // Implementation depends on your business logic
        } catch (Exception e) {
            log.error("Error validating payment for transaction: {}", transactionId, e);
            return false;
        }
    }
}
