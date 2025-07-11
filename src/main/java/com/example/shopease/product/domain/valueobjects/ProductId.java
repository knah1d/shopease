package com.example.shopease.product.domain.valueobjects;

import com.example.shopease.shared.domain.valueobjects.BaseId;

public class ProductId extends BaseId {
    public ProductId(String value) {
        super(value);
    }
    
    public ProductId() {
        super();
    }
    
    public static ProductId of(String value) {
        return new ProductId(value);
    }
    
    public static ProductId generate() {
        return new ProductId();
    }
}
