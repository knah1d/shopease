package com.example.shopease.order.interfaces.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
    String productId,
    Integer quantity,
    BigDecimal unitPrice,
    String currency,
    BigDecimal totalPrice
) {
}
