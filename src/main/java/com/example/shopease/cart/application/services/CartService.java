package com.example.shopease.cart.application.services;

import com.example.shopease.cart.application.usecases.AddToCartUseCase;
import com.example.shopease.cart.application.usecases.GetCartUseCase;
import com.example.shopease.cart.application.usecases.RemoveFromCartUseCase;
import com.example.shopease.cart.domain.entities.Cart;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CartService {
    private final AddToCartUseCase addToCartUseCase;
    private final GetCartUseCase getCartUseCase;
    private final RemoveFromCartUseCase removeFromCartUseCase;

    public CartService(AddToCartUseCase addToCartUseCase, 
                      GetCartUseCase getCartUseCase,
                      RemoveFromCartUseCase removeFromCartUseCase) {
        this.addToCartUseCase = addToCartUseCase;
        this.getCartUseCase = getCartUseCase;
        this.removeFromCartUseCase = removeFromCartUseCase;
    }

    public Cart addToCart(UserId userId, ProductId productId, Integer quantity) {
        return addToCartUseCase.execute(userId, productId, quantity);
    }

    public Cart getCart(UserId userId) {
        return getCartUseCase.execute(userId);
    }

    public Cart removeFromCart(UserId userId, ProductId productId) {
        return removeFromCartUseCase.execute(userId, productId);
    }
}
