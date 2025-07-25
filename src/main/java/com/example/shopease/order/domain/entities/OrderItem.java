package com.example.shopease.order.domain.entities;

import com.example.shopease.order.domain.valueobjects.OrderId;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.shared.domain.valueobjects.Money;

public class OrderItem {
    private final OrderId orderId;
    private final ProductId productId;
    private final int quantity;
    private final Money unitPrice;
    private final Money totalPrice;

    public OrderItem(OrderId orderId, ProductId productId, int quantity, Money unitPrice) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        if (unitPrice == null) {
            throw new IllegalArgumentException("Unit price cannot be null");
        }
        
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = unitPrice.multiply(quantity);
    }

    // Getters
    public OrderId getOrderId() { return orderId; }
    public ProductId getProductId() { return productId; }
    public int getQuantity() { return quantity; }
    public Money getUnitPrice() { return unitPrice; }
    public Money getTotalPrice() { return totalPrice; }
}
