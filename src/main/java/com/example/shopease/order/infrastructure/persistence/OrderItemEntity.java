package com.example.shopease.order.infrastructure.persistence;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItemEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private OrderEntity order;
    
    @Column(name = "product_id", nullable = false)
    private String productId;
    
    @Column(name = "quantity", nullable = false)
    private int quantity;
    
    @Column(name = "unit_price_amount", nullable = false)
    private BigDecimal unitPriceAmount;
    
    @Column(name = "unit_price_currency", nullable = false)
    private String unitPriceCurrency;
    
    @Column(name = "total_price_amount", nullable = false)
    private BigDecimal totalPriceAmount;
    
    @Column(name = "total_price_currency", nullable = false)
    private String totalPriceCurrency;
    
    // JPA requires default constructor
    protected OrderItemEntity() {}
    
    public OrderItemEntity(String productId, int quantity, 
                          BigDecimal unitPriceAmount, String unitPriceCurrency,
                          BigDecimal totalPriceAmount, String totalPriceCurrency) {
        this.productId = productId;
        this.quantity = quantity;
        this.unitPriceAmount = unitPriceAmount;
        this.unitPriceCurrency = unitPriceCurrency;
        this.totalPriceAmount = totalPriceAmount;
        this.totalPriceCurrency = totalPriceCurrency;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public OrderEntity getOrder() { return order; }
    public void setOrder(OrderEntity order) { this.order = order; }
    
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    
    public BigDecimal getUnitPriceAmount() { return unitPriceAmount; }
    public void setUnitPriceAmount(BigDecimal unitPriceAmount) { this.unitPriceAmount = unitPriceAmount; }
    
    public String getUnitPriceCurrency() { return unitPriceCurrency; }
    public void setUnitPriceCurrency(String unitPriceCurrency) { this.unitPriceCurrency = unitPriceCurrency; }
    
    public BigDecimal getTotalPriceAmount() { return totalPriceAmount; }
    public void setTotalPriceAmount(BigDecimal totalPriceAmount) { this.totalPriceAmount = totalPriceAmount; }
    
    public String getTotalPriceCurrency() { return totalPriceCurrency; }
    public void setTotalPriceCurrency(String totalPriceCurrency) { this.totalPriceCurrency = totalPriceCurrency; }
}
