package com.example.shopease.shared.domain.entities;

import com.example.shopease.shared.domain.valueobjects.BaseId;
import java.time.LocalDateTime;

public abstract class BaseEntity<T extends BaseId> {
    protected final T id;
    protected LocalDateTime createdAt;
    protected LocalDateTime updatedAt;

    protected BaseEntity(T id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        this.id = id;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public T getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    protected void markAsUpdated() {
        this.updatedAt = LocalDateTime.now();
    }
}
