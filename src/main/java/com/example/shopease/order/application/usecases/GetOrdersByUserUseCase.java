package com.example.shopease.order.application.usecases;

import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.repositories.OrderRepository;
import com.example.shopease.user.domain.valueobjects.UserId;

import java.util.List;

public class GetOrdersByUserUseCase {
    private final OrderRepository orderRepository;

    public GetOrdersByUserUseCase(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> execute(String userId) {
        UserId id = UserId.of(userId);
        return orderRepository.findByBuyerId(id);
    }
}
