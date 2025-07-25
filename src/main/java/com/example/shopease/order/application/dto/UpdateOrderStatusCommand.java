package com.example.shopease.order.application.dto;

import com.example.shopease.order.domain.valueobjects.OrderStatus;

public class UpdateOrderStatusCommand {
    private final String orderId;
    private final OrderStatus newStatus;

    public UpdateOrderStatusCommand(String orderId, OrderStatus newStatus) {
        this.orderId = orderId;
        this.newStatus = newStatus;
    }

    public String getOrderId() { return orderId; }
    public OrderStatus getNewStatus() { return newStatus; }
}
