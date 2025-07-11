package com.example.shopease.product.domain.valueobjects;

import java.util.Objects;

public class Category {
    private final String name;
    
    public Category(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be null or empty");
        }
        this.name = name.trim();
    }
    
    public String getName() {
        return name;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return Objects.equals(name, category.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
    
    @Override
    public String toString() {
        return name;
    }
}
