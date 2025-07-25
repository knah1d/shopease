package com.example.shopease.user.domain.valueobjects;

import com.example.shopease.shared.domain.valueobjects.BaseId;

public class UserId extends BaseId {
    public UserId(String value) {
        super(value);
    }

    public UserId() {
        super();
    }
    
    public static UserId of(String value) {
        return new UserId(value);
    }
    
    public static UserId generate() {
        return new UserId();
    }
}
