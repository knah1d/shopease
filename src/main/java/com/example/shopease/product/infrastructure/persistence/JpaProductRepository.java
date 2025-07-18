package com.example.shopease.product.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaProductRepository extends JpaRepository<ProductEntity, String> {
    List<ProductEntity> findByCategory(String category);
    List<ProductEntity> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT p FROM ProductEntity p WHERE p.active = true")
    List<ProductEntity> findActiveProducts();
}
