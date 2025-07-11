package com.example.shopease.product.infrastructure.persistence;

import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.repositories.ProductRepository;
import com.example.shopease.product.domain.valueobjects.Category;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.product.infrastructure.mappers.ProductMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.product.domain.valueobjects.Category;
import com.example.shopease.product.domain.repositories.ProductRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class ProductRepositoryImpl implements ProductRepository {
    private final JpaProductRepository jpaRepository;
    private final ProductMapper mapper;

    public ProductRepositoryImpl(JpaProductRepository jpaRepository, ProductMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Product save(Product product) {
        ProductEntity entity = mapper.toEntity(product);
        ProductEntity savedEntity = jpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<Product> findById(ProductId id) {
        return jpaRepository.findById(id.getValue())
                .map(mapper::toDomain);
    }

    @Override
    public List<Product> findAll() {
        return jpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> findByCategory(Category category) {
        return jpaRepository.findByCategory(category.getName()).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> findByNameContaining(String name) {
        return jpaRepository.findByNameContainingIgnoreCase(name).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> findActiveProducts() {
        return jpaRepository.findActiveProducts().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(ProductId id) {
        jpaRepository.deleteById(id.getValue());
    }

    @Override
    public boolean existsById(ProductId id) {
        return jpaRepository.existsById(id.getValue());
    }
}
