package com.example.shopease.product.application.usecases;

import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.repositories.ProductRepository;
import com.example.shopease.product.domain.valueobjects.Category;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SearchProductsUseCase {
    private final ProductRepository productRepository;

    public SearchProductsUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> executeByCategory(Category category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> executeByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    public List<Product> executeActiveProducts() {
        return productRepository.findActiveProducts();
    }
}
