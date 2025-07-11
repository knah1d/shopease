package com.example.shopease.product.application.services;

import com.example.shopease.product.application.usecases.CreateProductUseCase;
import com.example.shopease.product.application.usecases.GetProductUseCase;
import com.example.shopease.product.application.usecases.SearchProductsUseCase;
import com.example.shopease.product.application.usecases.UpdateProductUseCase;
import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.valueobjects.Category;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.shared.domain.valueobjects.Money;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {
    private final CreateProductUseCase createProductUseCase;
    private final GetProductUseCase getProductUseCase;
    private final SearchProductsUseCase searchProductsUseCase;
    private final UpdateProductUseCase updateProductUseCase;

    public ProductService(CreateProductUseCase createProductUseCase,
                         GetProductUseCase getProductUseCase,
                         SearchProductsUseCase searchProductsUseCase,
                         UpdateProductUseCase updateProductUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.getProductUseCase = getProductUseCase;
        this.searchProductsUseCase = searchProductsUseCase;
        this.updateProductUseCase = updateProductUseCase;
    }

    public Product createProduct(String name, String description, Money price, 
                               Integer stockQuantity, Category category, String imageUrl) {
        return createProductUseCase.execute(name, description, price, stockQuantity, category, imageUrl);
    }

    public Product getProduct(ProductId productId) {
        return getProductUseCase.execute(productId);
    }

    public List<Product> searchByCategory(Category category) {
        return searchProductsUseCase.executeByCategory(category);
    }

    public List<Product> searchByName(String name) {
        return searchProductsUseCase.executeByName(name);
    }

    public List<Product> getActiveProducts() {
        return searchProductsUseCase.executeActiveProducts();
    }

    public Product updatePrice(ProductId productId, Money newPrice) {
        return updateProductUseCase.updatePrice(productId, newPrice);
    }

    public Product updateStock(ProductId productId, Integer newStock) {
        return updateProductUseCase.updateStock(productId, newStock);
    }
}
