package com.example.shopease.cart.domain.repositories;

import com.example.shopease.cart.domain.entities.Cart;
import com.example.shopease.cart.domain.valueobjects.CartId;
import com.example.shopease.user.domain.valueobjects.UserId;

import java.util.Optional;

public interface CartRepository {
    Cart save(Cart cart);
    Optional<Cart> findById(CartId id);
    Optional<Cart> findByUserId(UserId userId);
    void deleteById(CartId id);
    void deleteByUserId(UserId userId);
}
