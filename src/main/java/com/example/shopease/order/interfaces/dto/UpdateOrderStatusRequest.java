package com.example.shopease.order.interfaces.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateOrderStatusRequest(
    @NotNull(message = "Order status is required")
    String status
) {
}
