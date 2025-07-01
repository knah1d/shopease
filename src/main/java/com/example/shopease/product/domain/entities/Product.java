package com.example.shopease.product.domain.entities;

import com.example.shopease.product.domain.valueobjects.Category;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.shared.domain.entities.BaseEntity;
import com.example.shopease.shared.domain.valueobjects.Money;

public class Product extends BaseEntity<ProductId> {
    private String name;
    private String description;
    private Money price;
    private Integer stockQuantity;
    private Category category;
    private String imageUrl;
    private boolean active;

    public Product(ProductId id, String name, String description, Money price, 
                  Integer stockQuantity, Category category, String imageUrl) {
        super(id);
        this.setName(name);
        this.setDescription(description);
        this.setPrice(price);
        this.setStockQuantity(stockQuantity);
        this.setCategory(category);
        this.setImageUrl(imageUrl);
        this.active = true;
    }
    
    public Product(String name, String description, Money price, 
                  Integer stockQuantity, Category category, String imageUrl) {
        this(ProductId.generate(), name, description, price, stockQuantity, category, imageUrl);
    }

    public void updatePrice(Money newPrice) {
        if (newPrice == null) {
            throw new IllegalArgumentException("Price cannot be null");
        }
        this.price = newPrice;
    }

    public void updateStock(Integer quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be negative");
        }
        this.stockQuantity = quantity;
    }

    public void reduceStock(Integer quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity to reduce must be positive");
        }
        if (this.stockQuantity < quantity) {
            throw new IllegalArgumentException("Insufficient stock available");
        }
        this.stockQuantity -= quantity;
    }

    public boolean isInStock() {
        return stockQuantity > 0;
    }

    public boolean isAvailable() {
        return active && isInStock();
    }

    public void activate() {
        this.active = true;
    }

    public void deactivate() {
        this.active = false;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Money getPrice() {
        return price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public Category getCategory() {
        return category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isActive() {
        return active;
    }

    // Private setters for validation
    private void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Product name cannot be null or empty");
        }
        this.name = name.trim();
    }

    private void setDescription(String description) {
        if (description == null) {
            this.description = "";
        } else {
            this.description = description.trim();
        }
    }

    private void setPrice(Money price) {
        if (price == null) {
            throw new IllegalArgumentException("Price cannot be null");
        }
        this.price = price;
    }

    private void setStockQuantity(Integer stockQuantity) {
        if (stockQuantity == null || stockQuantity < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be null or negative");
        }
        this.stockQuantity = stockQuantity;
    }

    private void setCategory(Category category) {
        if (category == null) {
            throw new IllegalArgumentException("Category cannot be null");
        }
        this.category = category;
    }

    private void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
