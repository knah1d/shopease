package com.example.shopease.product.infrastructure.mappers;

import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.valueobjects.Category;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.product.infrastructure.persistence.ProductEntity;
import com.example.shopease.shared.domain.valueobjects.Money;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductEntity toEntity(Product product) {
        if (product == null) {
            return null;
        }

        return new ProductEntity(
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

    public Product toDomain(ProductEntity entity) {
        if (entity == null) {
            return null;
        }

        Money price = new Money(entity.getPrice(), entity.getCurrency());
        Category category = new Category(entity.getCategory());
        
        Product product = new Product(
                ProductId.of(entity.getId()),
                entity.getName(),
                entity.getDescription(),
                price,
                entity.getStockQuantity(),
                category,
                entity.getImageUrl()
        );

        if (!entity.getActive()) {
            product.deactivate();
        }

        return product;
    }
}
