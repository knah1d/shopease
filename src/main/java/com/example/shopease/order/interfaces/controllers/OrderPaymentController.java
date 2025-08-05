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
            @PathVariable String orderId,
            @RequestBody PaymentRequest request) {
        
        log.info("Initiating payment for order: {}", orderId);
        
        // Convert orderId to Long if it's numeric, otherwise use a hash or generate a numeric ID
        Long orderIdLong;
        try {
            orderIdLong = Long.parseLong(orderId);
        } catch (NumberFormatException e) {
            // If orderId is not numeric (like UUID), generate a hash-based numeric ID
            orderIdLong = Math.abs((long) orderId.hashCode());
            log.info("Converting UUID orderId {} to numeric ID: {}", orderId, orderIdLong);
        }
        
        try {
            PaymentInitiationResponse response = orderPaymentService.initiateOrderPayment(
                    orderIdLong,
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
                    .orderId(orderIdLong)
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
