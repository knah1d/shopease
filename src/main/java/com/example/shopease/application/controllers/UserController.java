package com.example.shopease.application.controllers;

import com.example.shopease.application.dtos.UserRequest;
import com.example.shopease.application.services.UserService;
import com.example.shopease.domain.models.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody UserRequest request) {
        return userService.register(request);
    }
}