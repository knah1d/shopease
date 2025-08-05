package com.example.shopease.order.interfaces.controllers;

import com.example.shopease.order.application.services.OrderPaymentService;
import com.example.shopease.payment.application.dto.PaymentInitiationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class OrderPaymentController {
    
    private final OrderPaymentService orderPaymentService;
    
    @PostMapping("/{orderId}/payment")
    public ResponseEntity<PaymentInitiationResponse> initiateOrderPayment(
            @PathVariable Long orderId,
            @RequestBody PaymentRequest request) {
        
        log.info("Initiating payment for order: {}", orderId);
        
        try {
            PaymentInitiationResponse response = orderPaymentService.initiateOrderPayment(
                    orderId,
                    request.getAmount(),
                    request.getCustomerName(),
                    request.getCustomerEmail(),
                    request.getCustomerPhone()
            );
            
            if (response.isSuccessful()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            log.error("Error initiating payment for order: {}", orderId, e);
            
            PaymentInitiationResponse errorResponse = PaymentInitiationResponse.builder()
                    .status("FAILED")
                    .failedreason("Payment initiation failed: " + e.getMessage())
                    .orderId(orderId)
                    .build();
            
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    public static class PaymentRequest {
        private BigDecimal amount;
        private String customerName;
        private String customerEmail;
        private String customerPhone;
        
        // Getters and setters
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        
        public String getCustomerName() { return customerName; }
        public void setCustomerName(String customerName) { this.customerName = customerName; }
        
        public String getCustomerEmail() { return customerEmail; }
        public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
        
        public String getCustomerPhone() { return customerPhone; }
        public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    }
}
