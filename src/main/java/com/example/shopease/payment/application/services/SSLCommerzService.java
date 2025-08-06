package com.example.shopease.payment.application.services;

import com.example.shopease.payment.application.dto.PaymentInitiationRequest;
import com.example.shopease.payment.application.dto.PaymentInitiationResponse;
import com.example.shopease.payment.config.SSLCommerzConfig;
import com.example.shopease.payment.domain.repositories.PaymentRepository;
import com.example.shopease.payment.infrastructure.entities.Payment;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SSLCommerzService {

    private final SSLCommerzConfig sslCommerzConfig;
    private final PaymentRepository paymentRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public PaymentInitiationResponse initiatePayment(PaymentInitiationRequest request) {
        try {
            // Generate unique transaction ID
            String transactionId = generateTransactionId();

            // Create payment record
            Payment payment = createPaymentRecord(request, transactionId);

            // Prepare SSLCommerz request
            Map<String, Object> sslCommerzRequest = buildSSLCommerzRequest(request, transactionId);

            // Make API call to SSLCommerz
            PaymentInitiationResponse response = callSSLCommerzAPI(sslCommerzRequest);

            // Update payment with session details
            updatePaymentWithSessionDetails(payment, response);

            // Set additional response fields
            response.setOrderId(request.getOrderId());
            response.setTransactionId(transactionId);

            log.info("Payment initiation successful for order: {}, transaction: {}",
                    request.getOrderId(), transactionId);

            return response;

        } catch (Exception e) {
            log.error("Failed to initiate payment for order: {}", request.getOrderId(), e);
            throw new RuntimeException("Payment initiation failed: " + e.getMessage(), e);
        }
    }

    @Transactional
    public boolean validatePayment(String transactionId, Map<String, String> sslCommerzResponse) {
        try {
            Payment payment = paymentRepository.findByTransactionId(transactionId)
                    .orElseThrow(() -> new RuntimeException("Payment not found for transaction: " + transactionId));

            // Call SSLCommerz validation API
            Map<String, Object> validationResponse = callValidationAPI(transactionId);

            // Update payment based on validation response
            updatePaymentFromValidation(payment, validationResponse, sslCommerzResponse);

            return Payment.PaymentStatus.SUCCESS.equals(payment.getStatus());

        } catch (Exception e) {
            log.error("Failed to validate payment for transaction: {}", transactionId, e);
            return false;
        }
    }

    private String generateTransactionId() {
        return "TXN" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0, 8);
    }

    private Payment createPaymentRecord(PaymentInitiationRequest request, String transactionId) {
        Payment payment = Payment.builder()
                .transactionId(transactionId)
                .orderId(request.getOrderId())
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .status(Payment.PaymentStatus.PENDING)
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerPhone(request.getCustomerPhone())
                .build();

        return paymentRepository.save(payment);
    }

    private Map<String, Object> buildSSLCommerzRequest(PaymentInitiationRequest request, String transactionId) {
        Map<String, Object> params = new HashMap<>();

        // Store credentials
        params.put("store_id", sslCommerzConfig.getStoreId());
        params.put("store_passwd", sslCommerzConfig.getStorePassword());

        // Transaction details
        params.put("total_amount", request.getAmount().toString());
        params.put("currency", request.getCurrency());
        params.put("tran_id", transactionId);

        // URLs
        params.put("success_url", sslCommerzConfig.getSuccessUrl());
        params.put("fail_url", sslCommerzConfig.getFailUrl());
        params.put("cancel_url", sslCommerzConfig.getCancelUrl());
        params.put("ipn_url", sslCommerzConfig.getIpnUrl());

        // Customer information
        params.put("cus_name", request.getCustomerName());
        params.put("cus_email", request.getCustomerEmail());
        params.put("cus_add1",
                request.getCustomerAddress() != null ? request.getCustomerAddress() : "Customer Address");
        params.put("cus_city", request.getCustomerCity() != null ? request.getCustomerCity() : "Dhaka");
        params.put("cus_postcode", request.getCustomerPostcode() != null ? request.getCustomerPostcode() : "1000");
        params.put("cus_country", request.getCustomerCountry());
        params.put("cus_phone", request.getCustomerPhone());

        // Product information
        params.put("product_name",
                request.getProductName() != null ? request.getProductName() : "Order #" + request.getOrderId());
        params.put("product_category", request.getProductCategory());
        params.put("product_profile", request.getProductProfile());

        // Shipping information
        params.put("shipping_method", "NO");
        params.put("num_of_item", "1");

        return params;
    }

    private PaymentInitiationResponse callSSLCommerzAPI(Map<String, Object> requestParams) throws Exception {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(sslCommerzConfig.getInitiateUrl());

            // SSLCommerz expects form data, not JSON
            StringBuilder formData = new StringBuilder();
            for (Map.Entry<String, Object> entry : requestParams.entrySet()) {
                if (formData.length() > 0) {
                    formData.append("&");
                }
                formData.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8))
                        .append("=")
                        .append(URLEncoder.encode(entry.getValue().toString(), StandardCharsets.UTF_8));
            }

            httpPost.setHeader("Content-Type", "application/x-www-form-urlencoded");
            httpPost.setEntity(new StringEntity(formData.toString(), ContentType.APPLICATION_FORM_URLENCODED));

            log.info("Making SSLCommerz API call to: {}", sslCommerzConfig.getInitiateUrl());
            log.debug("Request params: {}", requestParams);

            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                String responseString = EntityUtils.toString(response.getEntity());
                log.info("SSLCommerz API Response Status: {}", response.getCode());
                log.info("SSLCommerz API Response: {}", responseString);

                // Parse the response more carefully
                try {
                    return objectMapper.readValue(responseString, PaymentInitiationResponse.class);
                } catch (Exception parseEx) {
                    log.error(
                            "Failed to parse SSLCommerz response as PaymentInitiationResponse, creating manual response",
                            parseEx);

                    // If parsing fails, create a basic response with the error info
                    PaymentInitiationResponse errorResponse = PaymentInitiationResponse.builder()
                            .status("FAILED")
                            .failedreason("SSLCommerz response parsing failed: " + parseEx.getMessage())
                            .build();

                    // Try to extract basic info manually if possible
                    try {
                        Map<String, Object> rawResponse = objectMapper.readValue(responseString, Map.class);
                        if (rawResponse.containsKey("status")) {
                            errorResponse.setStatus(String.valueOf(rawResponse.get("status")));
                        }
                        if (rawResponse.containsKey("failedreason")) {
                            errorResponse.setFailedreason(String.valueOf(rawResponse.get("failedreason")));
                        }
                        if (rawResponse.containsKey("sessionkey")) {
                            errorResponse.setSessionkey(String.valueOf(rawResponse.get("sessionkey")));
                        }
                        if (rawResponse.containsKey("GatewayPageURL")) {
                            errorResponse.setGatewayPageURL(String.valueOf(rawResponse.get("GatewayPageURL")));
                        }
                    } catch (Exception e) {
                        log.error("Failed to parse even basic response fields", e);
                    }

                    return errorResponse;
                }
            }
        }
    }

    private void updatePaymentWithSessionDetails(Payment payment, PaymentInitiationResponse response) {
        if (response.isSuccessful()) {
            payment.setSslSessionId(response.getSessionkey());
            paymentRepository.save(payment);
        } else {
            payment.setStatus(Payment.PaymentStatus.FAILED);
            payment.setFailureReason(response.getFailedreason());
            paymentRepository.save(payment);
        }
    }

    private Map<String, Object> callValidationAPI(String transactionId) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("store_id", sslCommerzConfig.getStoreId());
        params.put("store_passwd", sslCommerzConfig.getStorePassword());
        params.put("tran_id", transactionId);

        String jsonRequest = objectMapper.writeValueAsString(params);

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(sslCommerzConfig.getValidationUrl());
            httpPost.setHeader("Content-Type", "application/json");
            httpPost.setEntity(new StringEntity(jsonRequest, ContentType.APPLICATION_JSON));

            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                String responseString = EntityUtils.toString(response.getEntity());
                log.debug("SSLCommerz Validation Response: {}", responseString);

                @SuppressWarnings("unchecked")
                Map<String, Object> responseMap = objectMapper.readValue(responseString, Map.class);
                return responseMap;
            }
        }
    }

    private void updatePaymentFromValidation(Payment payment, Map<String, Object> validationResponse,
            Map<String, String> sslCommerzResponse) {
        try {
            String status = (String) validationResponse.get("status");

            if ("VALID".equalsIgnoreCase(status)) {
                payment.setStatus(Payment.PaymentStatus.SUCCESS);
                payment.setGatewayTransactionId(sslCommerzResponse.get("tran_id"));
                payment.setBankTransactionId(sslCommerzResponse.get("bank_tran_id"));
                payment.setCardType(sslCommerzResponse.get("card_type"));
                payment.setCardBrand(sslCommerzResponse.get("card_brand"));
            } else {
                payment.setStatus(Payment.PaymentStatus.FAILED);
                payment.setFailureReason("Payment validation failed");
            }

            payment.setGatewayResponse(objectMapper.writeValueAsString(sslCommerzResponse));
            paymentRepository.save(payment);

        } catch (Exception e) {
            log.error("Error updating payment from validation", e);
            payment.setStatus(Payment.PaymentStatus.FAILED);
            payment.setFailureReason("Validation processing error");
            paymentRepository.save(payment);
        }
    }

    public Payment getPaymentByTransactionId(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found for transaction: " + transactionId));
    }
}
