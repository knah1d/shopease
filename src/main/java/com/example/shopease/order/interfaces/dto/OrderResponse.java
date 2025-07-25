package com.example.shopease.order.interfaces.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
    String id,
    String userId,
    String status,
    BigDecimal totalAmount,
    String currency,
    DeliveryAddressResponse deliveryAddress,
    List<OrderItemResponse> orderItems,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
}
