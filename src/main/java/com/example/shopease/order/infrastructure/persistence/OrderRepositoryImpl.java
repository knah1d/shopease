package com.example.shopease.order.infrastructure.persistence;

import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.repositories.OrderRepository;
import com.example.shopease.order.domain.valueobjects.OrderId;
import com.example.shopease.order.infrastructure.mappers.OrderMapper;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class OrderRepositoryImpl implements OrderRepository {
    
    private final OrderJpaRepository jpaRepository;
    private final OrderMapper mapper;
    
    public OrderRepositoryImpl(OrderJpaRepository jpaRepository, OrderMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }
    
    @Override
    public Order save(Order order) {
        OrderEntity entity = mapper.toEntity(order);
        OrderEntity savedEntity = jpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }
    
    @Override
    public Optional<Order> findById(OrderId orderId) {
        Optional<OrderEntity> entity = jpaRepository.findById(orderId.getValue());
        return entity.map(mapper::toDomain);
    }
    
    @Override
    public List<Order> findByBuyerId(UserId buyerId) {
        List<OrderEntity> entities = jpaRepository.findByBuyerIdOrderByOrderDateDesc(buyerId.getValue());
        return entities.stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Order> findAll() {
        List<OrderEntity> entities = jpaRepository.findAll();
        return entities.stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public void deleteById(OrderId orderId) {
        jpaRepository.deleteById(orderId.getValue());
    }
    
    @Override
    public boolean existsById(OrderId orderId) {
        return jpaRepository.existsById(orderId.getValue());
    }
}
