package com.example.shopease.product.interfaces.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;

import java.math.BigDecimal;

public class UpdateProductRequest {
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;
    
    @Min(value = 0, message = "Stock quantity cannot be negative")
    private Integer stockQuantity;

    public UpdateProductRequest() {}

    public UpdateProductRequest(BigDecimal price, Integer stockQuantity) {
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}
