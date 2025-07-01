package com.example.shopease.shared.domain.valueobjects;

import java.util.Objects;
import java.util.UUID;

public abstract class BaseId {
    protected final String value;

    protected BaseId(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("ID cannot be null or empty");
        }
        this.value = value;
    }

    protected BaseId() {
        this.value = UUID.randomUUID().toString();
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseId baseId = (BaseId) o;
        return Objects.equals(value, baseId.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    @Override
    public String toString() {
        return value;
    }
}
