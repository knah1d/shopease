package com.example.shopease.cart.domain.valueobjects;

import com.example.shopease.shared.domain.valueobjects.BaseId;

public class CartId extends BaseId {
    public CartId(String value) {
        super(value);
    }
    
    public CartId() {
        super();
    }
    
    public static CartId of(String value) {
        return new CartId(value);
    }
    
    public static CartId generate() {
        return new CartId();
    }
}
