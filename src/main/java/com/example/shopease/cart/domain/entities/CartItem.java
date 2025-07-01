package com.example.shopease.cart.domain.entities;

import com.example.shopease.cart.domain.valueobjects.CartItemId;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.shared.domain.entities.BaseEntity;
import com.example.shopease.shared.domain.valueobjects.Money;

public class CartItem extends BaseEntity<CartItemId> {
    private final ProductId productId;
    private String productName;
    private Money unitPrice;
    private Integer quantity;

    public CartItem(CartItemId id, ProductId productId, String productName, Money unitPrice, Integer quantity) {
        super(id);
        this.productId = productId;
        this.setProductName(productName);
        this.setUnitPrice(unitPrice);
        this.setQuantity(quantity);
    }
    
    public CartItem(ProductId productId, String productName, Money unitPrice, Integer quantity) {
        this(CartItemId.generate(), productId, productName, unitPrice, quantity);
    }

    public void updateQuantity(Integer newQuantity) {
        if (newQuantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        this.quantity = newQuantity;
        markAsUpdated();
    }

    public void increaseQuantity(Integer amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        this.quantity += amount;
        markAsUpdated();
    }

    public Money getTotalPrice() {
        return new Money(
            unitPrice.getAmount().multiply(java.math.BigDecimal.valueOf(quantity)),
            unitPrice.getCurrency()
        );
    }

    // Getters
    public ProductId getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public Money getUnitPrice() {
        return unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    // Private setters for validation
    private void setProductName(String productName) {
        if (productName == null || productName.trim().isEmpty()) {
            throw new IllegalArgumentException("Product name cannot be null or empty");
        }
        this.productName = productName.trim();
    }

    private void setUnitPrice(Money unitPrice) {
        if (unitPrice == null) {
            throw new IllegalArgumentException("Unit price cannot be null");
        }
        this.unitPrice = unitPrice;
    }

    private void setQuantity(Integer quantity) {
        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        this.quantity = quantity;
    }
}
