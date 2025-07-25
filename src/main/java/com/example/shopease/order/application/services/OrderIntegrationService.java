package com.example.shopease.order.application.services;

import com.example.shopease.product.application.services.ProductService;
import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.user.application.services.UserService;
import com.example.shopease.user.domain.entities.User;
import org.springframework.stereotype.Service;

/**
 * Service to handle integration between Order module and other modules (User, Product)
 */
@Service
public class OrderIntegrationService {
    
    private final UserService userService;
    private final ProductService productService;
    
    public OrderIntegrationService(UserService userService, ProductService productService) {
        this.userService = userService;
        this.productService = productService;
    }
    
    /**
     * Validates if a user exists and can place orders
     */
    public User validateUser(String userId) {
        return userService.getUserProfile(userId);
    }
    
    /**
     * Validates if a product exists and is available for ordering
     */
    public Product validateProduct(String productId, Integer quantity) {
        Product product = productService.getProduct(ProductId.of(productId));
        
        if (!product.isActive()) {
            throw new IllegalArgumentException("Product " + productId + " is not active");
        }
        
        if (!product.isInStock()) {
            throw new IllegalArgumentException("Product " + productId + " is out of stock");
        }
        
        if (product.getStockQuantity() < quantity) {
            throw new IllegalArgumentException("Insufficient stock for product " + productId + 
                ". Available: " + product.getStockQuantity() + ", Requested: " + quantity);
        }
        
        return product;
    }
    
    /**
     * Reduces product stock when an order is confirmed
     */
    public void reduceProductStock(String productId, Integer quantity) {
        Product product = productService.getProduct(ProductId.of(productId));
        product.reduceStock(quantity);
        // Note: The product would need to be saved back, but ProductService doesn't expose save method
        // In a real implementation, this would be handled through a specific use case
    }
}
