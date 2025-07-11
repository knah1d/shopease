package com.example.shopease.product.interfaces.mappers;

import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.interfaces.dto.ProductResponse;
import org.springframework.stereotype.Component;

@Component
public class ProductResponseMapper {

    public ProductResponse toResponse(Product product) {
        if (product == null) {
            return null;
        }

        return new ProductResponse(
                product.getId().getValue(),
                product.getName(),
                product.getDescription(),
                product.getPrice().getAmount(),
                product.getPrice().getCurrency(),
                product.getStockQuantity(),
                product.getCategory().getName(),
                product.getImageUrl(),
                product.isActive(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}
