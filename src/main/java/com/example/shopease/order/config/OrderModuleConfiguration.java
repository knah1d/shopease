package com.example.shopease.order.config;

import com.example.shopease.order.application.services.OrderIntegrationService;
import com.example.shopease.order.application.usecases.CreateOrderUseCase;
import com.example.shopease.order.application.usecases.GetOrderByIdUseCase;
import com.example.shopease.order.application.usecases.GetOrdersByUserUseCase;
import com.example.shopease.order.application.usecases.UpdateOrderStatusUseCase;
import com.example.shopease.order.domain.repositories.OrderRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = "com.example.shopease.order")
@EnableJpaRepositories(basePackages = "com.example.shopease.order.infrastructure.persistence")
@EntityScan(basePackages = {"com.example.shopease.order.domain.entities", "com.example.shopease.order.infrastructure.persistence"})
public class OrderModuleConfiguration {
    
    @Bean
    public CreateOrderUseCase createOrderUseCase(OrderRepository orderRepository, 
                                               OrderIntegrationService integrationService) {
        return new CreateOrderUseCase(orderRepository, integrationService);
    }
    
    @Bean
    public UpdateOrderStatusUseCase updateOrderStatusUseCase(OrderRepository orderRepository) {
        return new UpdateOrderStatusUseCase(orderRepository);
    }
    
    @Bean
    public GetOrderByIdUseCase getOrderByIdUseCase(OrderRepository orderRepository) {
        return new GetOrderByIdUseCase(orderRepository);
    }
    
    @Bean
    public GetOrdersByUserUseCase getOrdersByUserUseCase(OrderRepository orderRepository) {
        return new GetOrdersByUserUseCase(orderRepository);
    }
}
