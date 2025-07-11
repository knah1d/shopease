package com.example.shopease.product.domain.exceptions;

import com.example.shopease.shared.domain.exceptions.BusinessException;

public class InsufficientStockException extends BusinessException {
    public InsufficientStockException(String productName, int available, int requested) {
        super(String.format("Insufficient stock for product '%s'. Available: %d, Requested: %d", 
              productName, available, requested));
    }
}
