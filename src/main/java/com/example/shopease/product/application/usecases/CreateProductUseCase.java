package com.example.shopease.product.application.usecases;

import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.repositories.ProductRepository;
import com.example.shopease.product.domain.valueobjects.Category;
import com.example.shopease.shared.domain.valueobjects.Money;
import org.springframework.stereotype.Component;

@Component
public class CreateProductUseCase {
    private final ProductRepository productRepository;

    public CreateProductUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product execute(String name, String description, Money price, 
                          Integer stockQuantity, Category category, String imageUrl) {
        Product product = new Product(name, description, price, stockQuantity, category, imageUrl);
        return productRepository.save(product);
    }
}
