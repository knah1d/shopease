package com.example.shopease.cart.application.usecases;

import com.example.shopease.cart.domain.entities.Cart;
import com.example.shopease.cart.domain.exceptions.CartNotFoundException;
import com.example.shopease.cart.domain.repositories.CartRepository;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.stereotype.Component;

@Component
public class RemoveFromCartUseCase {
    private final CartRepository cartRepository;

    public RemoveFromCartUseCase(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart execute(UserId userId, ProductId productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId.getValue()));

        cart.removeItem(productId);
        return cartRepository.save(cart);
    }
}
