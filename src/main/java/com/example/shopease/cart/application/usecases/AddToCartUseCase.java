package com.example.shopease.cart.application.usecases;

import com.example.shopease.cart.domain.entities.Cart;
import com.example.shopease.cart.domain.repositories.CartRepository;
import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.repositories.ProductRepository;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.stereotype.Component;

@Component
public class AddToCartUseCase {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public AddToCartUseCase(CartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public Cart execute(UserId userId, ProductId productId, Integer quantity) {
        // Get or create cart for user
        Cart cart = cartRepository.findByUserId(userId)
                .orElse(new Cart(userId));

        // Get product details
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        // Check stock availability
        if (!product.isAvailable() || product.getStockQuantity() < quantity) {
            throw new IllegalArgumentException("Insufficient stock available");
        }

        // Add item to cart
        cart.addItem(productId, product.getName(), product.getPrice(), quantity);

        return cartRepository.save(cart);
    }
}
