package com.example.shopease.order.domain.entities;

import com.example.shopease.order.domain.valueobjects.OrderId;
import com.example.shopease.order.domain.valueobjects.OrderStatus;
import com.example.shopease.order.domain.valueobjects.DeliveryAddress;
import com.example.shopease.order.domain.exceptions.InvalidOrderStateTransitionException;
import com.example.shopease.shared.domain.entities.BaseEntity;
import com.example.shopease.shared.domain.valueobjects.Money;
import com.example.shopease.user.domain.valueobjects.UserId;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Order extends BaseEntity<OrderId> {
    private final UserId buyerId;
    private final List<OrderItem> orderItems;
    private final DeliveryAddress deliveryAddress;
    private final String paymentMethod;
    private final LocalDateTime orderDate;
    private final Money deliveryCharge;
    private OrderStatus status;

    // Constructor for creating new orders
    public Order(UserId buyerId, DeliveryAddress deliveryAddress, String paymentMethod, Money deliveryCharge) {
        super(OrderId.generate());
        this.buyerId = buyerId;
        this.orderItems = new ArrayList<>();
        this.deliveryAddress = deliveryAddress;
        this.paymentMethod = paymentMethod;
        this.deliveryCharge = deliveryCharge;
        this.orderDate = LocalDateTime.now();
        this.status = OrderStatus.PENDING;
    }

    // Constructor for reconstructing from persistence
    public Order(OrderId orderId, UserId buyerId, List<OrderItem> orderItems,
                 DeliveryAddress deliveryAddress, String paymentMethod, Money deliveryCharge,
                 LocalDateTime orderDate, OrderStatus status, LocalDateTime lastUpdated) {
        super(orderId);
        this.buyerId = buyerId;
        this.orderItems = new ArrayList<>(orderItems);
        this.deliveryAddress = deliveryAddress;
        this.paymentMethod = paymentMethod;
        this.deliveryCharge = deliveryCharge;
        this.orderDate = orderDate;
        this.status = status;
        // Note: BaseEntity handles updatedAt, but we respect the provided lastUpdated
    }

    // Business methods
    public void addOrderItem(OrderItem orderItem) {
        if (this.status != OrderStatus.PENDING) {
            throw new IllegalStateException("Cannot modify order items when status is " + status);
        }
        this.orderItems.add(orderItem);
        markAsUpdated(); // Use BaseEntity's method instead of lastUpdated
    }

    public void updateStatus(OrderStatus newStatus) {
        if (!this.status.canTransitionTo(newStatus)) {
            throw new InvalidOrderStateTransitionException(this.status.name(), newStatus.name());
        }
        this.status = newStatus;
        markAsUpdated(); // Use BaseEntity's method instead of lastUpdated
    }

    public Money calculateTotalAmount() {
        if (orderItems.isEmpty()) {
            return deliveryCharge;
        }
        
        String currency = deliveryCharge.getCurrency();
        Money itemsTotal = orderItems.stream()
                .map(OrderItem::getTotalPrice)
                .reduce(Money.zero(currency), Money::add);
        return itemsTotal.add(deliveryCharge);
    }

    public boolean canBeCancelled() {
        return status == OrderStatus.PENDING || status == OrderStatus.CONFIRMED;
    }

    public boolean isCompleted() {
        return status == OrderStatus.DELIVERED;
    }

    // Getters
    public OrderId getOrderId() { return getId(); } // Use BaseEntity's getId()
    public UserId getBuyerId() { return buyerId; }
    public List<OrderItem> getOrderItems() { return new ArrayList<>(orderItems); }
    public DeliveryAddress getDeliveryAddress() { return deliveryAddress; }
    public String getPaymentMethod() { return paymentMethod; }
    public Money getDeliveryCharge() { return deliveryCharge; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public OrderStatus getStatus() { return status; }
    public LocalDateTime getLastUpdated() { return getUpdatedAt(); } // Use BaseEntity's getUpdatedAt()
}
