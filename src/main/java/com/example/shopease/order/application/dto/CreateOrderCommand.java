package com.example.shopease.order.application.dto;

import com.example.shopease.order.domain.valueobjects.DeliveryAddress;
import com.example.shopease.shared.domain.valueobjects.Money;
import com.example.shopease.user.domain.valueobjects.UserId;

import java.util.List;

public class CreateOrderCommand {
    private final UserId buyerId;
    private final List<OrderItemData> orderItems;
    private final DeliveryAddress deliveryAddress;
    private final String paymentMethod;
    private final Money deliveryCharge;

    public CreateOrderCommand(UserId buyerId, List<OrderItemData> orderItems, 
                             DeliveryAddress deliveryAddress, String paymentMethod, Money deliveryCharge) {
        this.buyerId = buyerId;
        this.orderItems = orderItems;
        this.deliveryAddress = deliveryAddress;
        this.paymentMethod = paymentMethod;
        this.deliveryCharge = deliveryCharge;
    }

    // Getters
    public UserId getBuyerId() { return buyerId; }
    public List<OrderItemData> getOrderItems() { return orderItems; }
    public DeliveryAddress getDeliveryAddress() { return deliveryAddress; }
    public String getPaymentMethod() { return paymentMethod; }
    public Money getDeliveryCharge() { return deliveryCharge; }

    public static class OrderItemData {
        private final String productId;
        private final int quantity;
        private final Money unitPrice;

        public OrderItemData(String productId, int quantity, Money unitPrice) {
            this.productId = productId;
            this.quantity = quantity;
            this.unitPrice = unitPrice;
        }

        public String getProductId() { return productId; }
        public int getQuantity() { return quantity; }
        public Money getUnitPrice() { return unitPrice; }
    }
}
