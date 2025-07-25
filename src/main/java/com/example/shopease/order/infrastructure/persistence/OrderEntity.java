package com.example.shopease.order.infrastructure.persistence;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class OrderEntity {
    
    @Id
    @Column(name = "order_id")
    private String orderId;
    
    @Column(name = "buyer_id", nullable = false)
    private String buyerId;
    
    @Column(name = "delivery_street", nullable = false)
    private String deliveryStreet;
    
    @Column(name = "delivery_city", nullable = false)
    private String deliveryCity;
    
    @Column(name = "delivery_state", nullable = false)
    private String deliveryState;
    
    @Column(name = "delivery_zip_code", nullable = false)
    private String deliveryZipCode;
    
    @Column(name = "delivery_country", nullable = false)
    private String deliveryCountry;
    
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;
    
    @Column(name = "delivery_charge_amount", nullable = false)
    private BigDecimal deliveryChargeAmount;
    
    @Column(name = "delivery_charge_currency", nullable = false)
    private String deliveryChargeCurrency;
    
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OrderStatusEnum status;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItemEntity> orderItems = new ArrayList<>();
    
    // JPA requires default constructor
    protected OrderEntity() {}
    
    // Constructor for creating new entities
    public OrderEntity(String orderId, String buyerId, String deliveryStreet, String deliveryCity,
                      String deliveryState, String deliveryZipCode, String deliveryCountry,
                      String paymentMethod, BigDecimal deliveryChargeAmount, String deliveryChargeCurrency,
                      LocalDateTime orderDate, OrderStatusEnum status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.orderId = orderId;
        this.buyerId = buyerId;
        this.deliveryStreet = deliveryStreet;
        this.deliveryCity = deliveryCity;
        this.deliveryState = deliveryState;
        this.deliveryZipCode = deliveryZipCode;
        this.deliveryCountry = deliveryCountry;
        this.paymentMethod = paymentMethod;
        this.deliveryChargeAmount = deliveryChargeAmount;
        this.deliveryChargeCurrency = deliveryChargeCurrency;
        this.orderDate = orderDate;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Getters and Setters
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    
    public String getBuyerId() { return buyerId; }
    public void setBuyerId(String buyerId) { this.buyerId = buyerId; }
    
    public String getDeliveryStreet() { return deliveryStreet; }
    public void setDeliveryStreet(String deliveryStreet) { this.deliveryStreet = deliveryStreet; }
    
    public String getDeliveryCity() { return deliveryCity; }
    public void setDeliveryCity(String deliveryCity) { this.deliveryCity = deliveryCity; }
    
    public String getDeliveryState() { return deliveryState; }
    public void setDeliveryState(String deliveryState) { this.deliveryState = deliveryState; }
    
    public String getDeliveryZipCode() { return deliveryZipCode; }
    public void setDeliveryZipCode(String deliveryZipCode) { this.deliveryZipCode = deliveryZipCode; }
    
    public String getDeliveryCountry() { return deliveryCountry; }
    public void setDeliveryCountry(String deliveryCountry) { this.deliveryCountry = deliveryCountry; }
    
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public BigDecimal getDeliveryChargeAmount() { return deliveryChargeAmount; }
    public void setDeliveryChargeAmount(BigDecimal deliveryChargeAmount) { this.deliveryChargeAmount = deliveryChargeAmount; }
    
    public String getDeliveryChargeCurrency() { return deliveryChargeCurrency; }
    public void setDeliveryChargeCurrency(String deliveryChargeCurrency) { this.deliveryChargeCurrency = deliveryChargeCurrency; }
    
    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
    
    public OrderStatusEnum getStatus() { return status; }
    public void setStatus(OrderStatusEnum status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public List<OrderItemEntity> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItemEntity> orderItems) { this.orderItems = orderItems; }
    
    public void addOrderItem(OrderItemEntity orderItem) {
        this.orderItems.add(orderItem);
        orderItem.setOrder(this);
    }
}
