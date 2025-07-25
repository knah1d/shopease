package com.example.shopease.order.domain.exceptions;

import com.example.shopease.shared.domain.exceptions.DomainException;

public class OrderNotFoundException extends DomainException {
    public OrderNotFoundException(String orderId) {
        super("Order not found with id: " + orderId);
    }
}
