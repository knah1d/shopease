package com.example.shopease.cart.domain.valueobjects;

import com.example.shopease.shared.domain.valueobjects.BaseId;

public class CartItemId extends BaseId {
    public CartItemId(String value) {
        super(value);
    }
    
    public CartItemId() {
        super();
    }
    
    public static CartItemId of(String value) {
        return new CartItemId(value);
    }
    
    public static CartItemId generate() {
        return new CartItemId();
    }
}
