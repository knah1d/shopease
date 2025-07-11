package com.example.shopease.product.application.usecases;

import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.exceptions.ProductNotFoundException;
import com.example.shopease.product.domain.repositories.ProductRepository;
import com.example.shopease.product.domain.valueobjects.ProductId;
import org.springframework.stereotype.Component;

@Component
public class GetProductUseCase {
    private final ProductRepository productRepository;

    public GetProductUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product execute(ProductId productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId.getValue()));
    }
}
