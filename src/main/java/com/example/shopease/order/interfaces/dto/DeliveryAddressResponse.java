package com.example.shopease.order.interfaces.dto;

public record DeliveryAddressResponse(
    String street,
    String city,
    String state,
    String postalCode,
    String country
) {
}
