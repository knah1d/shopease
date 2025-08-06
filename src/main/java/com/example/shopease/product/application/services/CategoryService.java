package com.example.shopease.product.application.services;

import com.example.shopease.product.domain.entities.CategoryEntity;
import com.example.shopease.product.infrastructure.persistence.JpaCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {

    private final JpaCategoryRepository categoryRepository;

    public CategoryService(JpaCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryEntity createCategory(String name, String description, String imageUrl) {
        // Check if category already exists
        if (categoryRepository.existsByName(name)) {
            throw new IllegalArgumentException("Category with name '" + name + "' already exists");
        }

        CategoryEntity category = new CategoryEntity(name, description, imageUrl);
        return categoryRepository.save(category);
    }

    @Transactional(readOnly = true)
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<CategoryEntity> getActiveCategories() {
        return categoryRepository.findActiveCategories();
    }

    @Transactional(readOnly = true)
    public Optional<CategoryEntity> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<CategoryEntity> getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    public CategoryEntity updateCategory(Long id, String name, String description, String imageUrl) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));

        // Check if name is being changed and if new name already exists
        if (!category.getName().equals(name) && categoryRepository.existsByName(name)) {
            throw new IllegalArgumentException("Category with name '" + name + "' already exists");
        }

        category.setName(name);
        category.setDescription(description);
        category.setImageUrl(imageUrl);

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));

        // Soft delete by setting isActive to false
        category.setIsActive(false);
        categoryRepository.save(category);
    }

    public CategoryEntity activateCategory(Long id) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));

        category.setIsActive(true);
        return categoryRepository.save(category);
    }
}
