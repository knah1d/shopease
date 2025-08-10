# SSLCommerz Payment Integration - Backend Setup Guide

This guide helps you implement the required backend endpoints for SSLCommerz payment integration in your Spring Boot application.

## 🏗️ Backend Architecture

### Required Dependencies (pom.xml)

Add these dependencies to your Spring Boot project:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<!-- HTTP Client for SSLCommerz API calls -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```

## 📋 Database Schema

### Payment Entity

```sql
CREATE TABLE payments (
    id VARCHAR(255) PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,
    transaction_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BDT',
    status VARCHAR(20) NOT NULL,
    payment_method VARCHAR(50),
    gateway_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE INDEX idx_payment_transaction_id ON payments(transaction_id);
CREATE INDEX idx_payment_order_id ON payments(order_id);
CREATE INDEX idx_payment_status ON payments(status);
```

## 🛠️ Backend Implementation

### 1. Payment Entity (Payment.java)

```java
package com.shopease.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    private String id;

    @Column(name = "order_id", nullable = false)
    private String orderId;

    @Column(name = "transaction_id", unique = true)
    private String transactionId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(length = 3)
    private String currency = "BDT";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus status;

    @Column(name = "payment_method", length = 50)
    private String paymentMethod;

    @Lob
    @Column(name = "gateway_response")
    private String gatewayResponse;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors, getters, setters
    public Payment() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // ... getters and setters
}
```

### 2. Payment Status Enum (PaymentStatus.java)

```java
package com.shopease.entity;

public enum PaymentStatus {
    PENDING,
    PROCESSING,
    COMPLETED,
    FAILED,
    CANCELLED,
    REFUNDED
}
```

### 3. Payment DTOs

#### InitiatePaymentRequest.java

```java
package com.shopease.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class InitiatePaymentRequest {
    @NotBlank
    private String orderId;

    @NotNull
    @Positive
    private BigDecimal amount;

    private String currency = "BDT";
    private String paymentMethod;

    // Constructors, getters, setters
}
```

#### InitiatePaymentResponse.java

```java
package com.shopease.dto;

public class InitiatePaymentResponse {
    private String paymentUrl;
    private String transactionId;
    private String sessionKey;

    // Constructors, getters, setters
}
```

#### PaymentCallbackRequest.java

```java
package com.shopease.dto;

import java.math.BigDecimal;
import java.util.Map;

public class PaymentCallbackRequest {
    private String transactionId;
    private String status;
    private BigDecimal amount;
    private String orderId;
    private Map<String, Object> gatewayResponse;

    // Constructors, getters, setters
}
```

### 4. SSLCommerz Configuration (SSLCommerzConfig.java)

```java
package com.shopease.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SSLCommerzConfig {

    @Value("${sslcommerz.store.id}")
    private String storeId;

    @Value("${sslcommerz.store.password}")
    private String storePassword;

    @Value("${sslcommerz.test.mode:true}")
    private boolean testMode;

    @Value("${sslcommerz.gateway.url:https://sandbox.sslcommerz.com}")
    private String gatewayUrl;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    // Getters
    public String getStoreId() { return storeId; }
    public String getStorePassword() { return storePassword; }
    public boolean isTestMode() { return testMode; }
    public String getGatewayUrl() { return gatewayUrl; }
    public String getFrontendUrl() { return frontendUrl; }
}
```

### 5. Payment Service (PaymentService.java)

```java
package com.shopease.service;

import com.shopease.entity.*;
import com.shopease.dto.*;
import com.shopease.repository.PaymentRepository;
import com.shopease.repository.OrderRepository;
import com.shopease.config.SSLCommerzConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SSLCommerzConfig sslConfig;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private ObjectMapper objectMapper;

    public InitiatePaymentResponse initiateOrderPayment(String orderId) {
        // Get order details
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));

        // Create payment record
        Payment payment = new Payment();
        payment.setOrderId(orderId);
        payment.setAmount(order.getTotalAmount());
        payment.setCurrency("BDT");
        payment.setStatus(PaymentStatus.PENDING);

        String transactionId = "TXN_" + System.currentTimeMillis() + "_" + orderId;
        payment.setTransactionId(transactionId);

        paymentRepository.save(payment);

        // Prepare SSLCommerz request
        Map<String, Object> sslcommerzData = new HashMap<>();
        sslcommerzData.put("store_id", sslConfig.getStoreId());
        sslcommerzData.put("store_passwd", sslConfig.getStorePassword());
        sslcommerzData.put("total_amount", order.getTotalAmount().toString());
        sslcommerzData.put("currency", "BDT");
        sslcommerzData.put("tran_id", transactionId);
        sslcommerzData.put("success_url", sslConfig.getFrontendUrl() + "/payment-success");
        sslcommerzData.put("fail_url", sslConfig.getFrontendUrl() + "/payment-fail");
        sslcommerzData.put("cancel_url", sslConfig.getFrontendUrl() + "/payment-cancel");
        sslcommerzData.put("ipn_url", sslConfig.getFrontendUrl() + "/api/payments/ipn");

        // Customer info
        sslcommerzData.put("cus_name", order.getShippingAddress().getFullName());
        sslcommerzData.put("cus_email", order.getUser().getEmail());
        sslcommerzData.put("cus_add1", order.getShippingAddress().getAddress());
        sslcommerzData.put("cus_city", order.getShippingAddress().getCity());
        sslcommerzData.put("cus_country", order.getShippingAddress().getCountry());
        sslcommerzData.put("cus_phone", order.getShippingAddress().getPhone());

        // Product info
        sslcommerzData.put("product_name", "Order #" + orderId);
        sslcommerzData.put("product_category", "General");
        sslcommerzData.put("product_profile", "general");

        // Make request to SSLCommerz
        try {
            WebClient webClient = webClientBuilder.build();
            String response = webClient.post()
                .uri(sslConfig.getGatewayUrl() + "/gwprocess/v3/api.php")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue(buildFormData(sslcommerzData))
                .retrieve()
                .bodyToMono(String.class)
                .block();

            // Parse response
            Map<String, Object> responseMap = objectMapper.readValue(response, Map.class);

            if ("SUCCESS".equals(responseMap.get("status"))) {
                String paymentUrl = (String) responseMap.get("GatewayPageURL");
                String sessionKey = (String) responseMap.get("sessionkey");

                // Update payment with session info
                payment.setGatewayResponse(response);
                paymentRepository.save(payment);

                return new InitiatePaymentResponse(paymentUrl, transactionId, sessionKey);
            } else {
                throw new RuntimeException("Failed to initiate payment: " + responseMap.get("failedreason"));
            }

        } catch (Exception e) {
            // Update payment status to failed
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            throw new RuntimeException("Payment initiation failed", e);
        }
    }

    public void handlePaymentSuccess(PaymentCallbackRequest callback) {
        Payment payment = paymentRepository.findByTransactionId(callback.getTransactionId())
            .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setUpdatedAt(LocalDateTime.now());

        try {
            payment.setGatewayResponse(objectMapper.writeValueAsString(callback.getGatewayResponse()));
        } catch (Exception e) {
            // Log error but don't fail the process
        }

        paymentRepository.save(payment);

        // Update order status
        Order order = orderRepository.findById(payment.getOrderId()).orElse(null);
        if (order != null) {
            order.setStatus(OrderStatus.PAID);
            orderRepository.save(order);
        }
    }

    public void handlePaymentFailure(PaymentCallbackRequest callback) {
        Payment payment = paymentRepository.findByTransactionId(callback.getTransactionId())
            .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(PaymentStatus.FAILED);
        payment.setUpdatedAt(LocalDateTime.now());
        paymentRepository.save(payment);
    }

    public void handlePaymentCancel(PaymentCallbackRequest callback) {
        Payment payment = paymentRepository.findByTransactionId(callback.getTransactionId())
            .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(PaymentStatus.CANCELLED);
        payment.setUpdatedAt(LocalDateTime.now());
        paymentRepository.save(payment);
    }

    public PaymentStatusResponse getPaymentStatus(String transactionId) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));

        return new PaymentStatusResponse(
            payment.getTransactionId(),
            payment.getStatus(),
            payment.getAmount(),
            payment.getCurrency(),
            payment.getOrderId(),
            payment.getPaymentMethod()
        );
    }

    private String buildFormData(Map<String, Object> data) {
        StringBuilder form = new StringBuilder();
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            if (form.length() > 0) {
                form.append("&");
            }
            form.append(entry.getKey()).append("=").append(entry.getValue());
        }
        return form.toString();
    }
}
```

### 6. Payment Controller (PaymentController.java)

```java
package com.shopease.controller;

import com.shopease.service.PaymentService;
import com.shopease.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000"})
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/orders/{orderId}/payment")
    public ResponseEntity<InitiatePaymentResponse> initiateOrderPayment(
            @PathVariable String orderId) {
        InitiatePaymentResponse response = paymentService.initiateOrderPayment(orderId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/payments/success")
    public ResponseEntity<String> handlePaymentSuccess(
            @RequestBody PaymentCallbackRequest callback) {
        paymentService.handlePaymentSuccess(callback);
        return ResponseEntity.ok("Payment success handled");
    }

    @PostMapping("/payments/fail")
    public ResponseEntity<String> handlePaymentFailure(
            @RequestBody PaymentCallbackRequest callback) {
        paymentService.handlePaymentFailure(callback);
        return ResponseEntity.ok("Payment failure handled");
    }

    @PostMapping("/payments/cancel")
    public ResponseEntity<String> handlePaymentCancel(
            @RequestBody PaymentCallbackRequest callback) {
        paymentService.handlePaymentCancel(callback);
        return ResponseEntity.ok("Payment cancellation handled");
    }

    @PostMapping("/payments/ipn")
    public ResponseEntity<String> handlePaymentIPN(
            @RequestParam Map<String, String> ipnData) {
        // Handle IPN (Instant Payment Notification)
        // This is called directly by SSLCommerz server
        return ResponseEntity.ok("IPN received");
    }

    @GetMapping("/payments/status/{transactionId}")
    public ResponseEntity<PaymentStatusResponse> getPaymentStatus(
            @PathVariable String transactionId) {
        PaymentStatusResponse response = paymentService.getPaymentStatus(transactionId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/payments/test/config")
    public ResponseEntity<PaymentTestConfigResponse> getTestConfig() {
        // Return test configuration for frontend
        PaymentTestConfigResponse config = new PaymentTestConfigResponse();
        config.setTestMode(true);
        config.setGatewayUrl("https://sandbox.sslcommerz.com");
        return ResponseEntity.ok(config);
    }
}
```

### 7. Payment Repository (PaymentRepository.java)

```java
package com.shopease.repository;

import com.shopease.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
    Optional<Payment> findByTransactionId(String transactionId);
    List<Payment> findByOrderId(String orderId);
    List<Payment> findByStatus(PaymentStatus status);
}
```

## ⚙️ Configuration

### application.properties

```properties
# SSLCommerz Configuration
sslcommerz.store.id=your_store_id
sslcommerz.store.password=your_store_password
sslcommerz.test.mode=true
sslcommerz.gateway.url=https://sandbox.sslcommerz.com

# Frontend URL for callbacks
app.frontend.url=http://localhost:3000

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/shopease
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 🧪 Testing

1. **Get SSLCommerz Test Credentials**:

    - Visit [SSLCommerz Integration](https://developer.sslcommerz.com/)
    - Get sandbox credentials
    - Update `application.properties`

2. **Test Payment Flow**:

    - Create an order via `/api/orders`
    - Initiate payment via `/api/orders/{orderId}/payment`
    - Complete payment on SSLCommerz sandbox
    - Verify callback handling

3. **Test Endpoints**:

    ```bash
    # Get payment config
    GET http://localhost:8080/api/payments/test/config

    # Check payment status
    GET http://localhost:8080/api/payments/status/{transactionId}

    # Initiate order payment
    POST http://localhost:8080/api/orders/{orderId}/payment
    ```

## 🔒 Security Considerations

1. **Validate Callbacks**: Always verify transaction status with SSLCommerz
2. **Secure Credentials**: Store SSLCommerz credentials securely
3. **IPN Verification**: Implement proper IPN signature verification
4. **HTTPS**: Use HTTPS in production for all callback URLs
5. **Rate Limiting**: Implement rate limiting on payment endpoints

## 📝 Next Steps

1. Implement the backend code in your Spring Boot application
2. Update your `application.properties` with SSLCommerz credentials
3. Test the payment flow using the API test page
4. Configure proper callback URLs for production
5. Implement additional security measures

## 🆘 Troubleshooting

-   **Payment initiation fails**: Check SSLCommerz credentials and network connectivity
-   **Callbacks not working**: Verify callback URLs are accessible and correct
-   **Transaction not found**: Ensure transaction IDs are properly generated and stored
-   **Status mismatch**: Implement proper status synchronization with SSLCommerz

For more details, refer to the [SSLCommerz Documentation](https://developer.sslcommerz.com/doc/v4/).
