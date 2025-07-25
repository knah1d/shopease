package com.example.shopease.order.infrastructure.mappers;

import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.entities.OrderItem;
import com.example.shopease.order.domain.valueobjects.DeliveryAddress;
import com.example.shopease.order.domain.valueobjects.OrderId;
import com.example.shopease.order.domain.valueobjects.OrderStatus;
import com.example.shopease.order.infrastructure.persistence.OrderEntity;
import com.example.shopease.order.infrastructure.persistence.OrderItemEntity;
import com.example.shopease.order.infrastructure.persistence.OrderStatusEnum;
import com.example.shopease.product.domain.valueobjects.ProductId;
import com.example.shopease.shared.domain.valueobjects.Money;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {
    
    public Order toDomain(OrderEntity entity) {
        if (entity == null) {
            return null;
        }
        
        // Map value objects
        OrderId orderId = OrderId.of(entity.getOrderId());
        UserId buyerId = UserId.of(entity.getBuyerId());
        
        DeliveryAddress deliveryAddress = new DeliveryAddress(
                entity.getDeliveryStreet(),
                entity.getDeliveryCity(),
                entity.getDeliveryState(),
                entity.getDeliveryZipCode(),
                entity.getDeliveryCountry()
        );
        
        Money deliveryCharge = new Money(
                entity.getDeliveryChargeAmount(),
                entity.getDeliveryChargeCurrency()
        );
        
        OrderStatus status = mapToOrderStatus(entity.getStatus());
        
        // Map order items
        List<OrderItem> orderItems = entity.getOrderItems().stream()
                .map(this::toOrderItemDomain)
                .collect(Collectors.toList());
        
        return new Order(
                orderId,
                buyerId,
                orderItems,
                deliveryAddress,
                entity.getPaymentMethod(),
                deliveryCharge,
                entity.getOrderDate(),
                status,
                entity.getUpdatedAt()
        );
    }
    
    public OrderEntity toEntity(Order domain) {
        if (domain == null) {
            return null;
        }
        
        DeliveryAddress address = domain.getDeliveryAddress();
        Money deliveryCharge = domain.getDeliveryCharge();
        
        OrderEntity entity = new OrderEntity(
                domain.getOrderId().getValue(),
                domain.getBuyerId().getValue(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getCountry(),
                domain.getPaymentMethod(),
                deliveryCharge.getAmount(),
                deliveryCharge.getCurrency(),
                domain.getOrderDate(),
                mapToOrderStatusEnum(domain.getStatus()),
                domain.getCreatedAt(),
                domain.getUpdatedAt()
        );
        
        // Map order items
        List<OrderItemEntity> orderItemEntities = domain.getOrderItems().stream()
                .map(this::toOrderItemEntity)
                .collect(Collectors.toList());
        
        entity.setOrderItems(orderItemEntities);
        orderItemEntities.forEach(item -> item.setOrder(entity));
        
        return entity;
    }
    
    private OrderItem toOrderItemDomain(OrderItemEntity entity) {
        OrderId orderId = OrderId.of(entity.getOrder().getOrderId());
        ProductId productId = ProductId.of(entity.getProductId());
        Money unitPrice = new Money(entity.getUnitPriceAmount(), entity.getUnitPriceCurrency());
        
        return new OrderItem(orderId, productId, entity.getQuantity(), unitPrice);
    }
    
    private OrderItemEntity toOrderItemEntity(OrderItem domain) {
        Money unitPrice = domain.getUnitPrice();
        Money totalPrice = domain.getTotalPrice();
        
        return new OrderItemEntity(
                domain.getProductId().getValue(),
                domain.getQuantity(),
                unitPrice.getAmount(),
                unitPrice.getCurrency(),
                totalPrice.getAmount(),
                totalPrice.getCurrency()
        );
    }
    
    private OrderStatus mapToOrderStatus(OrderStatusEnum statusEnum) {
        return switch (statusEnum) {
            case PENDING -> OrderStatus.PENDING;
            case CONFIRMED -> OrderStatus.CONFIRMED;
            case PROCESSING -> OrderStatus.PROCESSING;
            case SHIPPED -> OrderStatus.SHIPPED;
            case DELIVERED -> OrderStatus.DELIVERED;
            case CANCELLED -> OrderStatus.CANCELLED;
            case REFUNDED -> OrderStatus.REFUNDED;
        };
    }
    
    private OrderStatusEnum mapToOrderStatusEnum(OrderStatus status) {
        return switch (status) {
            case PENDING -> OrderStatusEnum.PENDING;
            case CONFIRMED -> OrderStatusEnum.CONFIRMED;
            case PROCESSING -> OrderStatusEnum.PROCESSING;
            case SHIPPED -> OrderStatusEnum.SHIPPED;
            case DELIVERED -> OrderStatusEnum.DELIVERED;
            case CANCELLED -> OrderStatusEnum.CANCELLED;
            case REFUNDED -> OrderStatusEnum.REFUNDED;
        };
    }
}
