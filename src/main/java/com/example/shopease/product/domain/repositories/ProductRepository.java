package com.example.shopease.product.domain.repositories;

import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.valueobjects.Category;
import com.example.shopease.product.domain.valueobjects.ProductId;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    Product save(Product product);
    Optional<Product> findById(ProductId id);
    List<Product> findAll();
    List<Product> findByCategory(Category category);
    List<Product> findByNameContaining(String name);
    List<Product> findActiveProducts();
    void deleteById(ProductId id);
    boolean existsById(ProductId id);
}
