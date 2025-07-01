package com.example.shopease.cart.domain.entities;

import com.example.shopease.cart.domain.valueobjects.CartId;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.shared.domain.entities.BaseEntity;
import com.example.shopease.shared.domain.valueobjects.Money;
import com.example.shopease.user.domain.valueobjects.UserId;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class Cart extends BaseEntity<CartId> {
    private final UserId userId;
    private final List<CartItem> items;

    public Cart(CartId id, UserId userId) {
        super(id);
        this.userId = userId;
        this.items = new ArrayList<>();
    }
    
    public Cart(UserId userId) {
        this(CartId.generate(), userId);
    }

    public void addItem(ProductId productId, String productName, Money unitPrice, Integer quantity) {
        if (productId == null) {
            throw new IllegalArgumentException("Product ID cannot be null");
        }
        
        Optional<CartItem> existingItem = findItemByProductId(productId);
        if (existingItem.isPresent()) {
            existingItem.get().increaseQuantity(quantity);
        } else {
            CartItem newItem = new CartItem(productId, productName, unitPrice, quantity);
            items.add(newItem);
        }
        markAsUpdated();
    }

    public void removeItem(ProductId productId) {
        items.removeIf(item -> item.getProductId().equals(productId));
        markAsUpdated();
    }

    public void updateItemQuantity(ProductId productId, Integer newQuantity) {
        if (newQuantity <= 0) {
            removeItem(productId);
        } else {
            CartItem item = findItemByProductId(productId)
                    .orElseThrow(() -> new IllegalArgumentException("Item not found in cart"));
            item.updateQuantity(newQuantity);
            markAsUpdated();
        }
    }

    public void clearCart() {
        items.clear();
        markAsUpdated();
    }

    public Money getTotalAmount() {
        Money total = new Money(java.math.BigDecimal.ZERO, "USD");
        for (CartItem item : items) {
            Money itemTotal = item.getTotalPrice();
            // Assuming all items have the same currency for simplicity
            total = new Money(
                total.getAmount().add(itemTotal.getAmount()),
                total.getCurrency()
            );
        }
        return total;
    }

    public int getTotalItemCount() {
        return items.stream().mapToInt(CartItem::getQuantity).sum();
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    private Optional<CartItem> findItemByProductId(ProductId productId) {
        return items.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
    }

    // Getters
    public UserId getUserId() {
        return userId;
    }

    public List<CartItem> getItems() {
        return Collections.unmodifiableList(items);
    }
}
