package com.example.shopease.product.domain.exceptions;

import com.example.shopease.shared.domain.exceptions.DomainException;

public class ProductNotFoundException extends DomainException {
    public ProductNotFoundException(String productId) {
        super("Product not found with ID: " + productId);
    }
}
