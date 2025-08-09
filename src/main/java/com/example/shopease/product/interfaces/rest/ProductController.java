package com.example.shopease.product.interfaces.rest;

import com.example.shopease.product.application.services.ProductService;
import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.valueobjects.Category;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.product.interfaces.dto.CreateProductRequest;
import com.example.shopease.product.interfaces.dto.ProductResponse;
import com.example.shopease.product.interfaces.dto.UpdateProductRequest;
import com.example.shopease.product.interfaces.mappers.ProductResponseMapper;
import com.example.shopease.shared.domain.valueobjects.Money;
import com.example.shopease.shared.interfaces.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductService productService;
    private final ProductResponseMapper mapper;

    public ProductController(ProductService productService, ProductResponseMapper mapper) {
        this.productService = productService;
        this.mapper = mapper;
    }

    @PostMapping("/createProduct")
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(@Valid @RequestBody CreateProductRequest request) {
        Money price = new Money(request.getPrice(), request.getCurrency());
        Category category = new Category(request.getCategory());
        
        Product product = productService.createProduct(
                request.getName(),
                request.getDescription(),
                price,
                request.getStockQuantity(),
                category,
                request.getImageUrl()
        );

        ProductResponse response = mapper.toResponse(product);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Product created successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable String id) {
        Product product = productService.getProduct(ProductId.of(id));
        ProductResponse response = mapper.toResponse(product);
        return ResponseEntity.ok(ApiResponse.success("Product retrieved successfully", response));
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {
        List<Product> products = productService.getActiveProducts();
        List<ProductResponse> responses = products.stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success("Products retrieved successfully", responses));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category) {
        
        List<Product> products;
        if (category != null && !category.trim().isEmpty()) {
            products = productService.searchByCategory(new Category(category));
        } else if (name != null && !name.trim().isEmpty()) {
            products = productService.searchByName(name);
        } else {
            products = productService.getActiveProducts();
        }

        List<ProductResponse> responses = products.stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success("Products found successfully", responses));
    }

    @PutMapping("/{id}/price")
    public ResponseEntity<ApiResponse<ProductResponse>> updatePrice(
            @PathVariable String id,
            @Valid @RequestBody UpdateProductRequest request) {
        
        if (request.getPrice() == null) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Price is required"));
        }

        Money newPrice = new Money(request.getPrice(), "USD"); // Default currency
        Product product = productService.updatePrice(ProductId.of(id), newPrice);
        ProductResponse response = mapper.toResponse(product);
        return ResponseEntity.ok(ApiResponse.success("Product price updated successfully", response));
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<ApiResponse<ProductResponse>> updateStock(
            @PathVariable String id,
            @Valid @RequestBody UpdateProductRequest request) {
        
        if (request.getStockQuantity() == null) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Stock quantity is required"));
        }

        Product product = productService.updateStock(ProductId.of(id), request.getStockQuantity());
        ProductResponse response = mapper.toResponse(product);
        return ResponseEntity.ok(ApiResponse.success("Product stock updated successfully", response));
    }
}