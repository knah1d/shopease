package com.example.shopease.order.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderJpaRepository extends JpaRepository<OrderEntity, String> {
    
    @Query("SELECT o FROM OrderEntity o WHERE o.buyerId = :buyerId ORDER BY o.orderDate DESC")
    List<OrderEntity> findByBuyerIdOrderByOrderDateDesc(@Param("buyerId") String buyerId);
    
    @Query("SELECT o FROM OrderEntity o JOIN FETCH o.orderItems WHERE o.orderId = :orderId")
    OrderEntity findByIdWithOrderItems(@Param("orderId") String orderId);
}
