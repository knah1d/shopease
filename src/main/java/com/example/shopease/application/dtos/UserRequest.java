package com.ecommerce.application.dtos;

import lombok.Data;

@Data
public class UserRequest {
    private String email;
    private String password;
    private String name;
    private String role;
}