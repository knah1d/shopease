package com.example.shopease.order.application.usecases;

import com.example.shopease.order.application.dto.CreateOrderCommand;
import com.example.shopease.order.application.services.OrderIntegrationService;
import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.entities.OrderItem;
import com.example.shopease.order.domain.repositories.OrderRepository;
import com.example.shopease.order.domain.valueobjects.OrderId;
import com.example.shopease.product.domain.entities.Product;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.shared.domain.valueobjects.Money;

public class CreateOrderUseCase {
    private final OrderRepository orderRepository;
    private final OrderIntegrationService integrationService;

    public CreateOrderUseCase(OrderRepository orderRepository, OrderIntegrationService integrationService) {
        this.orderRepository = orderRepository;
        this.integrationService = integrationService;
    }

    public OrderId execute(CreateOrderCommand command) {
        // 1. Validate user exists
        integrationService.validateUser(command.getBuyerId().getValue());
        
        // 2. Create new order
        Order order = new Order(
                command.getBuyerId(),
                command.getDeliveryAddress(),
                command.getPaymentMethod(),
                command.getDeliveryCharge()
        );

        // 3. Add and validate order items
        command.getOrderItems().forEach(itemData -> {
            // Validate product and get current price
            Product product = integrationService.validateProduct(itemData.getProductId(), itemData.getQuantity());
            
            // Use current product price instead of the one from command
            Money currentPrice = product.getPrice();
            
            OrderItem orderItem = new OrderItem(
                    order.getOrderId(),
                    ProductId.of(itemData.getProductId()),
                    itemData.getQuantity(),
                    currentPrice
            );
            order.addOrderItem(orderItem);
        });

        // 4. Save order (domain repository interface)
        Order savedOrder = orderRepository.save(order);

        return savedOrder.getOrderId();
    }
}
