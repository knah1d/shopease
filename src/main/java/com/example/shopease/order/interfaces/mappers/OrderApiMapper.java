package com.example.shopease.order.interfaces.mappers;

import com.example.shopease.order.application.dto.CreateOrderCommand;
import com.example.shopease.order.application.dto.UpdateOrderStatusCommand;
import com.example.shopease.order.domain.entities.Order;
import com.example.shopease.order.domain.entities.OrderItem;
import com.example.shopease.order.domain.valueobjects.DeliveryAddress;
import com.example.shopease.order.domain.valueobjects.OrderStatus;
import com.example.shopease.order.interfaces.dto.*;
import com.example.shopease.shared.domain.valueobjects.Money;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderApiMapper {
    
    public CreateOrderCommand toCreateOrderCommand(CreateOrderRequest request) {
        return new CreateOrderCommand(
            UserId.of(request.userId()),
            request.orderItems().stream()
                .map(item -> new CreateOrderCommand.OrderItemData(
                    item.productId(),
                    item.quantity(),
                    Money.zero("USD") // Price will be fetched from product service
                ))
                .toList(),
            new DeliveryAddress(
                request.deliveryAddress().street(),
                request.deliveryAddress().city(),
                request.deliveryAddress().state(),
                request.deliveryAddress().postalCode(),
                request.deliveryAddress().country()
            ),
            "CREDIT_CARD", // Default payment method
            Money.zero("USD") // Default delivery charge
        );
    }
    
    public UpdateOrderStatusCommand toUpdateOrderStatusCommand(String orderId, UpdateOrderStatusRequest request) {
        return new UpdateOrderStatusCommand(
            orderId,
            OrderStatus.valueOf(request.status())
        );
    }
    
    public OrderResponse toOrderResponse(Order order) {
        Money totalAmount = order.calculateTotalAmount();
        return new OrderResponse(
            order.getId().getValue(),
            order.getBuyerId().getValue(),
            order.getStatus().name(),
            totalAmount.getAmount(),
            totalAmount.getCurrency(),
            toDeliveryAddressResponse(order.getDeliveryAddress()),
            order.getOrderItems().stream()
                .map(this::toOrderItemResponse)
                .toList(),
            order.getCreatedAt(),
            order.getUpdatedAt()
        );
    }
    
    public List<OrderResponse> toOrderResponseList(List<Order> orders) {
        return orders.stream()
            .map(this::toOrderResponse)
            .toList();
    }
    
    private DeliveryAddressResponse toDeliveryAddressResponse(DeliveryAddress address) {
        return new DeliveryAddressResponse(
            address.getStreet(),
            address.getCity(),
            address.getState(),
            address.getZipCode(),
            address.getCountry()
        );
    }
    
    private OrderItemResponse toOrderItemResponse(OrderItem orderItem) {
        return new OrderItemResponse(
            orderItem.getProductId().getValue(),
            orderItem.getQuantity(),
            orderItem.getUnitPrice().getAmount(),
            orderItem.getUnitPrice().getCurrency(),
            orderItem.getTotalPrice().getAmount()
        );
    }
}
