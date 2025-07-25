package com.example.shopease.order.domain.valueobjects;

import com.example.shopease.shared.domain.valueobjects.BaseId;

public class OrderId extends BaseId {
    public OrderId(String value) {
        super(value);
    }
    
    public OrderId() {
        super();
    }
    
    public static OrderId of(String value) {
        return new OrderId(value);
    }
    
    public static OrderId generate() {
        return new OrderId();
    }
}
