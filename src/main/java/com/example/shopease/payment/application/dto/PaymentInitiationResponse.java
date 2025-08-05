package com.example.shopease.payment.application.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInitiationResponse {
    
    private String status;
    private String failedreason;
    private String sessionkey;
    private String gw;
    private String redirectGatewayURL;
    private String directPaymentURLBank;
    private String directPaymentURLCard;
    private String directPaymentURL;
    private String redirectGatewayURLFailed;
    private String GatewayPageURL;
    private String storeBanner;
    private String storeLogo;
    private String desc;
    private String isDirectPayEnable;
    private String transactionId;
    
    // Additional fields for our internal use
    private Long orderId;
    private String paymentUrl; // The URL to redirect user for payment
    
    public boolean isSuccessful() {
        return "SUCCESS".equalsIgnoreCase(status);
    }
    
    public String getPaymentRedirectUrl() {
        if (GatewayPageURL != null && !GatewayPageURL.isEmpty()) {
            return GatewayPageURL;
        }
        return redirectGatewayURL;
    }
}
