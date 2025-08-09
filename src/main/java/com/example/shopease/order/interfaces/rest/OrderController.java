package com.example.shopease.order.interfaces.rest;

import com.example.shopease.order.application.services.OrderService;
import com.example.shopease.order.interfaces.dto.*;
import com.example.shopease.order.interfaces.mappers.OrderApiMapper;
import com.example.shopease.shared.interfaces.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    
    private final OrderService orderService;
    private final OrderApiMapper apiMapper;
    
    public OrderController(OrderService orderService, OrderApiMapper apiMapper) {
        this.orderService = orderService;
        this.apiMapper = apiMapper;
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createOrder(
            @Valid @RequestBody CreateOrderRequest request) {
        
        var command = apiMapper.toCreateOrderCommand(request);
        var orderId = orderService.createOrder(command);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Order created successfully", orderId.getValue()));
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(
            @PathVariable String orderId) {
        
        var order = orderService.getOrderById(orderId);
        var response = apiMapper.toOrderResponse(order);
        
        return ResponseEntity.ok(ApiResponse.success("Order retrieved successfully", response));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrdersByUserId(
            @PathVariable String userId) {
        
        var orders = orderService.getOrdersByUser(userId);
        var response = apiMapper.toOrderResponseList(orders);
        
        return ResponseEntity.ok(ApiResponse.success("Orders retrieved successfully", response));
    }
    
    @PutMapping("/{orderId}/status")
    public ResponseEntity<ApiResponse<String>> updateOrderStatus(
            @PathVariable String orderId,
            @Valid @RequestBody UpdateOrderStatusRequest request) {
        
        var command = apiMapper.toUpdateOrderStatusCommand(orderId, request);
        orderService.updateOrderStatus(command);
        
        return ResponseEntity.ok(ApiResponse.success("Order status updated successfully", "Status updated"));
    }
}
