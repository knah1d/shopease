package com.example.shopease.order.application.usecases;

import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.exceptions.OrderNotFoundException;
import com.example.shopease.order.domain.repositories.OrderRepository;
import com.example.shopease.order.domain.valueobjects.OrderId;

public class GetOrderByIdUseCase {
    private final OrderRepository orderRepository;

    public GetOrderByIdUseCase(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order execute(String orderId) {
        OrderId id = OrderId.of(orderId);
        
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
    }
}
