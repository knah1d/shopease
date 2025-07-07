package com.example.shopease.user.domain.valueobjects;

import com.example.shopease.shared.domain.valueobjects.ValueObject;

public class Role implements ValueObject<String> {
    public static final String CUSTOMER = "CUSTOMER";
    public static final String SELLER = "SELLER";
    public static final String BOTH = "BOTH";

    private final String value;

    public Role(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Role cannot be null or empty");
        }

        if (!value.equals(CUSTOMER) && !value.equals(SELLER) && !value.equals(BOTH)) {
            throw new IllegalArgumentException("Role must be CUSTOMER, SELLER, or BOTH");
        }

        this.value = value;
    }

    @Override
    public String getValue() {
        return value;
    }

    public boolean isSeller() {
        return value.equals(SELLER) || value.equals(BOTH);
    }

    public boolean isCustomer() {
        return value.equals(CUSTOMER) || value.equals(BOTH);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        Role role = (Role) o;
        return value.equals(role.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }

    @Override
    public String toString() {
        return value;
    }
}
