package com.example.shopease.payment.interfaces.controllers;

import com.example.shopease.payment.application.dto.PaymentInitiationRequest;
import com.example.shopease.payment.application.dto.PaymentInitiationResponse;
import com.example.shopease.payment.application.services.SSLCommerzService;
import com.example.shopease.payment.infrastructure.entities.Payment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class PaymentController {
    
    private final SSLCommerzService sslCommerzService;
    
    @PostMapping("/initiate")
    public ResponseEntity<PaymentInitiationResponse> initiatePayment(
            @Valid @RequestBody PaymentInitiationRequest request) {
        
        log.info("Initiating payment for order: {}", request.getOrderId());
        
        try {
            PaymentInitiationResponse response = sslCommerzService.initiatePayment(request);
            
            if (response.isSuccessful()) {
                return ResponseEntity.ok(response);
            } else {
                log.error("Payment initiation failed: {}", response.getFailedreason());
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            log.error("Payment initiation error for order: {}", request.getOrderId(), e);
            
            PaymentInitiationResponse errorResponse = PaymentInitiationResponse.builder()
                    .status("FAILED")
                    .failedreason("Payment initiation failed: " + e.getMessage())
                    .orderId(request.getOrderId())
                    .build();
            
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    @PostMapping("/success")
    public RedirectView paymentSuccess(@RequestParam Map<String, String> params) {
        String transactionId = params.get("tran_id");
        String status = params.get("status");
        
        log.info("Payment success callback received for transaction: {}, status: {}", transactionId, status);
        log.info("All received parameters: {}", params); // Add this for debugging
        
        try {
            // Validate payment with SSLCommerz
            boolean isValid = sslCommerzService.validatePayment(transactionId, params);
            
            log.info("Payment validation result for transaction {}: {}", transactionId, isValid); // Add this
            
            // Temporary: For debugging, also check if it's a successful status from SSLCommerz
            boolean isStatusSuccess = "VALID".equalsIgnoreCase(status) || "SUCCESS".equalsIgnoreCase(status);
            log.info("SSLCommerz status check for transaction {}: status={}, isStatusSuccess={}", transactionId, status, isStatusSuccess);
            
            if (isValid || isStatusSuccess) { // Temporary OR condition for debugging
                log.info("Payment validation successful for transaction: {}", transactionId);
                // Redirect to success page
                return new RedirectView("/payment/success?transaction=" + transactionId);
            } else {
                log.error("Payment validation failed for transaction: {}", transactionId);
                return new RedirectView("/payment/failed?transaction=" + transactionId);
            }
            
        } catch (Exception e) {
            log.error("Error processing payment success for transaction: {}", transactionId, e);
            return new RedirectView("/payment/failed?transaction=" + transactionId);
        }
    }
    
    @PostMapping("/fail")
    public RedirectView paymentFail(@RequestParam Map<String, String> params) {
        String transactionId = params.get("tran_id");
        String status = params.get("status");
        
        log.info("Payment fail callback received for transaction: {}, status: {}", transactionId, status);
        
        try {
            sslCommerzService.getPaymentByTransactionId(transactionId);
            // Payment status should already be updated by the callback
            
            return new RedirectView("/payment/failed?transaction=" + transactionId);
            
        } catch (Exception e) {
            log.error("Error processing payment failure for transaction: {}", transactionId, e);
            return new RedirectView("/payment/failed?transaction=" + transactionId);
        }
    }
    
    @PostMapping("/cancel")
    public RedirectView paymentCancel(@RequestParam Map<String, String> params) {
        String transactionId = params.get("tran_id");
        
        log.info("Payment cancel callback received for transaction: {}", transactionId);
        
        try {
            sslCommerzService.getPaymentByTransactionId(transactionId);
            // Update payment status to cancelled if not already updated
            
            return new RedirectView("/payment/cancelled?transaction=" + transactionId);
            
        } catch (Exception e) {
            log.error("Error processing payment cancellation for transaction: {}", transactionId, e);
            return new RedirectView("/payment/error?transaction=" + transactionId);
        }
    }
    
    @PostMapping("/ipn")
    public ResponseEntity<String> ipnListener(@RequestParam Map<String, String> params) {
        String transactionId = params.get("tran_id");
        String status = params.get("status");
        
        log.info("IPN received for transaction: {}, status: {}", transactionId, status);
        
        try {
            // Process IPN (Instant Payment Notification)
            boolean isValid = sslCommerzService.validatePayment(transactionId, params);
            
            if (isValid) {
                log.info("IPN validation successful for transaction: {}", transactionId);
                return ResponseEntity.ok("IPN processed successfully");
            } else {
                log.error("IPN validation failed for transaction: {}", transactionId);
                return ResponseEntity.badRequest().body("IPN validation failed");
            }
            
        } catch (Exception e) {
            log.error("Error processing IPN for transaction: {}", transactionId, e);
            return ResponseEntity.internalServerError().body("IPN processing failed");
        }
    }
    
    @GetMapping("/status/{transactionId}")
    public ResponseEntity<Map<String, Object>> getPaymentStatus(@PathVariable String transactionId) {
        try {
            Payment payment = sslCommerzService.getPaymentByTransactionId(transactionId);
            
            Map<String, Object> response = Map.of(
                "transactionId", payment.getTransactionId(),
                "orderId", payment.getOrderId(),
                "status", payment.getStatus(),
                "amount", payment.getAmount(),
                "currency", payment.getCurrency(),
                "createdAt", payment.getCreatedAt()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error getting payment status for transaction: {}", transactionId, e);
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Map<String, Object>> getOrderPayments(@PathVariable Long orderId) {
        try {
            // This would typically fetch payments for an order
            // Implementation depends on your requirements
            return ResponseEntity.ok(Map.of("message", "Order payments endpoint - to be implemented"));
            
        } catch (Exception e) {
            log.error("Error getting payments for order: {}", orderId, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
