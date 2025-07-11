package com.example.shopease.product.application.usecases;

import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.exceptions.ProductNotFoundException;
import com.example.shopease.product.domain.repositories.ProductRepository;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.shared.domain.valueobjects.Money;
import org.springframework.stereotype.Component;

@Component
public class UpdateProductUseCase {
    private final ProductRepository productRepository;

    public UpdateProductUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product updatePrice(ProductId productId, Money newPrice) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId.getValue()));
        
        product.updatePrice(newPrice);
        return productRepository.save(product);
    }

    public Product updateStock(ProductId productId, Integer newStock) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId.getValue()));
        
        product.updateStock(newStock);
        return productRepository.save(product);
    }
}
