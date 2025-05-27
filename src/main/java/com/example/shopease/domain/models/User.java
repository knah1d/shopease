package com.example.shopease.domain.models;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String role; // "CUSTOMER" or "SELLER"
}