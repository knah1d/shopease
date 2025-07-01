package com.example.shopease.user.domain.valueobjects;

public enum Role {
    CUSTOMER("CUSTOMER"),
    SELLER("SELLER");

    private final String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Role fromString(String value) {
        for (Role role : Role.values()) {
            if (role.value.equalsIgnoreCase(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + value);
    }

    @Override
    public String toString() {
        return value;
    }
}
