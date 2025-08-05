package com.example.shopease.payment.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "sslcommerz")
@Data
public class SSLCommerzConfig {
    
    private String storeId;
    private String storePassword;
    private String apiUrl = "https://sandbox.sslcommerz.com"; // Use https://securepay.sslcommerz.com for production
    private String successUrl;
    private String failUrl;
    private String cancelUrl;
    private String ipnUrl;
    private boolean sandbox = true;
    
    // Additional configuration
    private int connectionTimeout = 30000; // 30 seconds
    private int readTimeout = 60000; // 60 seconds
    
    public String getInitiateUrl() {
        return apiUrl + "/gwprocess/v4/api.php";
    }
    
    public String getValidationUrl() {
        return apiUrl + "/validator/api/validationserverAPI.php";
    }
    
    public String getRefundUrl() {
        return apiUrl + "/validator/api/merchantTransIDvalidationAPI.php";
    }
}
