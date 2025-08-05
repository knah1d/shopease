package com.example.shopease.payment.interfaces.controllers;

import com.example.shopease.payment.config.SSLCommerzConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/payments/test")
@RequiredArgsConstructor
public class PaymentTestController {
    
    private final SSLCommerzConfig sslCommerzConfig;
    
    @GetMapping("/config")
    public ResponseEntity<Map<String, Object>> getConfig() {
        Map<String, Object> config = Map.of(
            "storeId", sslCommerzConfig.getStoreId() != null ? "***CONFIGURED***" : "NOT_SET",
            "storePassword", sslCommerzConfig.getStorePassword() != null ? "***CONFIGURED***" : "NOT_SET",
            "apiUrl", sslCommerzConfig.getApiUrl(),
            "initiateUrl", sslCommerzConfig.getInitiateUrl(),
            "validationUrl", sslCommerzConfig.getValidationUrl(),
            "successUrl", sslCommerzConfig.getSuccessUrl(),
            "failUrl", sslCommerzConfig.getFailUrl(),
            "cancelUrl", sslCommerzConfig.getCancelUrl(),
            "ipnUrl", sslCommerzConfig.getIpnUrl(),
            "sandbox", sslCommerzConfig.isSandbox()
        );
        
        return ResponseEntity.ok(config);
    }
}
