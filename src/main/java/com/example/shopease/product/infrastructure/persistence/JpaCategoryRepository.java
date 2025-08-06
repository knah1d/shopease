package com.example.shopease.product.infrastructure.persistence;

import com.example.shopease.product.domain.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaCategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByName(String name);

    List<CategoryEntity> findByIsActiveTrue();

    @Query("SELECT c FROM CategoryEntity c WHERE c.isActive = true ORDER BY c.name ASC")
    List<CategoryEntity> findActiveCategories();

    boolean existsByName(String name);
}
