package com.example.shopease.order.application.usecases;

import com.example.shopease.order.application.dto.UpdateOrderStatusCommand;
import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.exceptions.OrderNotFoundException;
import com.example.shopease.order.domain.repositories.OrderRepository;
import com.example.shopease.order.domain.valueobjects.OrderId;

public class UpdateOrderStatusUseCase {
    private final OrderRepository orderRepository;

    public UpdateOrderStatusUseCase(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void execute(UpdateOrderStatusCommand command) {
        OrderId orderId = OrderId.of(command.getOrderId());
        
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(command.getOrderId()));
        
        order.updateStatus(command.getNewStatus());
        
        orderRepository.save(order);
    }
}
