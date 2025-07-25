package com.example.shopease.order.application.services;

import com.example.shopease.order.application.dto.CreateOrderCommand;
import com.example.shopease.order.application.dto.UpdateOrderStatusCommand;
import com.example.shopease.order.application.usecases.CreateOrderUseCase;
import com.example.shopease.order.application.usecases.GetOrderByIdUseCase;
import com.example.shopease.order.application.usecases.GetOrdersByUserUseCase;
import com.example.shopease.order.application.usecases.UpdateOrderStatusUseCase;
import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.valueobjects.OrderId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderService {
    private final CreateOrderUseCase createOrderUseCase;
    private final UpdateOrderStatusUseCase updateOrderStatusUseCase;
    private final GetOrderByIdUseCase getOrderByIdUseCase;
    private final GetOrdersByUserUseCase getOrdersByUserUseCase;

    public OrderService(CreateOrderUseCase createOrderUseCase,
                       UpdateOrderStatusUseCase updateOrderStatusUseCase,
                       GetOrderByIdUseCase getOrderByIdUseCase,
                       GetOrdersByUserUseCase getOrdersByUserUseCase) {
        this.createOrderUseCase = createOrderUseCase;
        this.updateOrderStatusUseCase = updateOrderStatusUseCase;
        this.getOrderByIdUseCase = getOrderByIdUseCase;
        this.getOrdersByUserUseCase = getOrdersByUserUseCase;
    }

    public OrderId createOrder(CreateOrderCommand command) {
        return createOrderUseCase.execute(command);
    }

    public void updateOrderStatus(UpdateOrderStatusCommand command) {
        updateOrderStatusUseCase.execute(command);
    }

    @Transactional(readOnly = true)
    public Order getOrderById(String orderId) {
        return getOrderByIdUseCase.execute(orderId);
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByUser(String userId) {
        return getOrdersByUserUseCase.execute(userId);
    }
}
