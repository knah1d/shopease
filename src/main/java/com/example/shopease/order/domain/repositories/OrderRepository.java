package com.example.shopease.order.domain.repositories;

import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.valueobjects.OrderId;
import com.example.shopease.user.domain.valueobjects.UserId;

import java.util.List;
import java.util.Optional;

public interface OrderRepository {
    
    Order save(Order order);
    
    Optional<Order> findById(OrderId orderId);
    
    List<Order> findByBuyerId(UserId buyerId);
    
    List<Order> findAll();
    
    void deleteById(OrderId orderId);
    
    boolean existsById(OrderId orderId);
}
