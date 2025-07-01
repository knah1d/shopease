package com.example.shopease.cart.domain.exceptions;

import com.example.shopease.shared.domain.exceptions.DomainException;

public class CartNotFoundException extends DomainException {
    public CartNotFoundException(String userId) {
        super("Cart not found for user: " + userId);
    }
}
