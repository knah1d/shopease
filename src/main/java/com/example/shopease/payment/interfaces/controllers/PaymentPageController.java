package com.example.shopease.payment.interfaces.controllers;

import com.example.shopease.payment.application.services.SSLCommerzService;
import com.example.shopease.payment.infrastructure.entities.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PaymentPageController {
    
    private final SSLCommerzService sslCommerzService;
    
    @GetMapping(value = "/payment/success", produces = MediaType.TEXT_HTML_VALUE)
    public String paymentSuccessPage(@RequestParam String transaction) {
        log.info("Displaying payment success page for transaction: {}", transaction);
        
        try {
            Payment payment = sslCommerzService.getPaymentByTransactionId(transaction);
            
            return "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                    "<meta charset='UTF-8'>" +
                    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                    "<title>Payment Successful</title>" +
                    "<style>" +
                        "body { font-family: Arial, sans-serif; text-align: center; margin: 50px; background-color: #f8f9fa; }" +
                        ".container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }" +
                        ".success-icon { color: #28a745; font-size: 64px; margin-bottom: 20px; }" +
                        ".title { color: #28a745; margin-bottom: 10px; }" +
                        ".details { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: left; }" +
                        ".btn { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }" +
                        ".btn:hover { background: #0056b3; }" +
                    "</style>" +
                "</head>" +
                "<body>" +
                    "<div class='container'>" +
                        "<div class='success-icon'>✓</div>" +
                        "<h1 class='title'>Payment Successful!</h1>" +
                        "<p>Your payment has been processed successfully.</p>" +
                        "<div class='details'>" +
                            "<h3>Transaction Details:</h3>" +
                            "<p><strong>Transaction ID:</strong> " + transaction + "</p>" +
                            "<p><strong>Order ID:</strong> " + payment.getOrderId() + "</p>" +
                            "<p><strong>Amount:</strong> " + payment.getAmount() + " " + payment.getCurrency() + "</p>" +
                            "<p><strong>Status:</strong> " + payment.getStatus() + "</p>" +
                        "</div>" +
                        "<a href='/' class='btn'>Continue Shopping</a>" +
                    "</div>" +
                "</body>" +
                "</html>";
                
        } catch (Exception e) {
            log.error("Error displaying payment success page for transaction: {}", transaction, e);
            return getErrorPage("Error loading payment details", transaction);
        }
    }
    
    @GetMapping(value = "/payment/failed", produces = MediaType.TEXT_HTML_VALUE)
    public String paymentFailedPage(@RequestParam String transaction) {
        log.info("Displaying payment failed page for transaction: {}", transaction);
        
        try {
            Payment payment = sslCommerzService.getPaymentByTransactionId(transaction);
            
            return "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                    "<meta charset='UTF-8'>" +
                    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                    "<title>Payment Failed</title>" +
                    "<style>" +
                        "body { font-family: Arial, sans-serif; text-align: center; margin: 50px; background-color: #f8f9fa; }" +
                        ".container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }" +
                        ".error-icon { color: #dc3545; font-size: 64px; margin-bottom: 20px; }" +
                        ".title { color: #dc3545; margin-bottom: 10px; }" +
                        ".details { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: left; }" +
                        ".btn { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px; }" +
                        ".btn:hover { background: #0056b3; }" +
                        ".btn-retry { background: #28a745; }" +
                        ".btn-retry:hover { background: #1e7e34; }" +
                    "</style>" +
                "</head>" +
                "<body>" +
                    "<div class='container'>" +
                        "<div class='error-icon'>✗</div>" +
                        "<h1 class='title'>Payment Failed</h1>" +
                        "<p>Unfortunately, your payment could not be processed.</p>" +
                        "<div class='details'>" +
                            "<h3>Transaction Details:</h3>" +
                            "<p><strong>Transaction ID:</strong> " + transaction + "</p>" +
                            "<p><strong>Order ID:</strong> " + payment.getOrderId() + "</p>" +
                            "<p><strong>Amount:</strong> " + payment.getAmount() + " " + payment.getCurrency() + "</p>" +
                            "<p><strong>Status:</strong> " + payment.getStatus() + "</p>" +
                            (payment.getFailureReason() != null ? 
                                "<p><strong>Reason:</strong> " + payment.getFailureReason() + "</p>" : "") +
                        "</div>" +
                        "<a href='/orders/" + payment.getOrderId() + "/retry-payment' class='btn btn-retry'>Retry Payment</a>" +
                        "<a href='/' class='btn'>Back to Home</a>" +
                    "</div>" +
                "</body>" +
                "</html>";
                
        } catch (Exception e) {
            log.error("Error displaying payment failed page for transaction: {}", transaction, e);
            return getErrorPage("Error loading payment details", transaction);
        }
    }
    
    @GetMapping(value = "/payment/cancelled", produces = MediaType.TEXT_HTML_VALUE)
    public String paymentCancelledPage(@RequestParam String transaction) {
        log.info("Displaying payment cancelled page for transaction: {}", transaction);
        
        try {
            Payment payment = sslCommerzService.getPaymentByTransactionId(transaction);
            
            return "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                    "<meta charset='UTF-8'>" +
                    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                    "<title>Payment Cancelled</title>" +
                    "<style>" +
                        "body { font-family: Arial, sans-serif; text-align: center; margin: 50px; background-color: #f8f9fa; }" +
                        ".container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }" +
                        ".warning-icon { color: #ffc107; font-size: 64px; margin-bottom: 20px; }" +
                        ".title { color: #ffc107; margin-bottom: 10px; }" +
                        ".details { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: left; }" +
                        ".btn { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px; }" +
                        ".btn:hover { background: #0056b3; }" +
                        ".btn-retry { background: #28a745; }" +
                        ".btn-retry:hover { background: #1e7e34; }" +
                    "</style>" +
                "</head>" +
                "<body>" +
                    "<div class='container'>" +
                        "<div class='warning-icon'>⚠</div>" +
                        "<h1 class='title'>Payment Cancelled</h1>" +
                        "<p>You have cancelled the payment process.</p>" +
                        "<div class='details'>" +
                            "<h3>Transaction Details:</h3>" +
                            "<p><strong>Transaction ID:</strong> " + transaction + "</p>" +
                            "<p><strong>Order ID:</strong> " + payment.getOrderId() + "</p>" +
                            "<p><strong>Amount:</strong> " + payment.getAmount() + " " + payment.getCurrency() + "</p>" +
                            "<p><strong>Status:</strong> " + payment.getStatus() + "</p>" +
                        "</div>" +
                        "<a href='/orders/" + payment.getOrderId() + "/retry-payment' class='btn btn-retry'>Retry Payment</a>" +
                        "<a href='/' class='btn'>Back to Home</a>" +
                    "</div>" +
                "</body>" +
                "</html>";
                
        } catch (Exception e) {
            log.error("Error displaying payment cancelled page for transaction: {}", transaction, e);
            return getErrorPage("Error loading payment details", transaction);
        }
    }
    
    private String getErrorPage(String message, String transaction) {
        return "<!DOCTYPE html>" +
            "<html lang='en'>" +
            "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<title>Error</title>" +
                "<style>" +
                    "body { font-family: Arial, sans-serif; text-align: center; margin: 50px; background-color: #f8f9fa; }" +
                    ".container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }" +
                    ".error-icon { color: #dc3545; font-size: 64px; margin-bottom: 20px; }" +
                    ".title { color: #dc3545; margin-bottom: 10px; }" +
                    ".btn { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }" +
                    ".btn:hover { background: #0056b3; }" +
                "</style>" +
            "</head>" +
            "<body>" +
                "<div class='container'>" +
                    "<div class='error-icon'>⚠</div>" +
                    "<h1 class='title'>Error</h1>" +
                    "<p>" + message + "</p>" +
                    "<p><strong>Transaction ID:</strong> " + transaction + "</p>" +
                    "<a href='/' class='btn'>Back to Home</a>" +
                "</div>" +
            "</body>" +
            "</html>";
    }
}
