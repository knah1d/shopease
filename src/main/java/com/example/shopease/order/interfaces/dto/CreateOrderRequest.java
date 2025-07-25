package com.example.shopease.order.interfaces.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateOrderRequest(
    @NotNull(message = "User ID is required")
    String userId,
    
    @NotEmpty(message = "Order items cannot be empty")
    @Valid
    List<CreateOrderItemRequest> orderItems,
    
    @NotNull(message = "Delivery address is required")
    @Valid
    CreateDeliveryAddressRequest deliveryAddress
) {
}
