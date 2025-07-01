package com.example.shopease.user.interfaces.rest;

import com.example.shopease.shared.interfaces.dto.ApiResponse;
import com.example.shopease.user.application.services.UserService;
import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.interfaces.dto.LoginRequest;
import com.example.shopease.user.interfaces.dto.LoginResponse;
import com.example.shopease.user.interfaces.dto.RegisterRequest;
import com.example.shopease.user.interfaces.dto.UserResponse;
import com.example.shopease.user.interfaces.mappers.UserMapper;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.registerUser(
            request.getName(),
            request.getEmail(),
            request.getPassword(),
            request.getRole()
        );
        
        UserResponse userResponse = userMapper.toResponse(user);
        ApiResponse<UserResponse> response = new ApiResponse<>(
            true,
            "User registered successfully",
            userResponse
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        String token = userService.loginUser(request.getEmail(), request.getPassword());
        User user = userService.getUserByEmail(request.getEmail());
        
        UserResponse userResponse = userMapper.toResponse(user);
        LoginResponse loginResponse = new LoginResponse(token, userResponse);
        
        ApiResponse<LoginResponse> response = new ApiResponse<>(
            true,
            "Login successful",
            loginResponse
        );
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(@PathVariable String userId) {
        User user = userService.getUserProfile(userId);
        UserResponse userResponse = userMapper.toResponse(user);
        
        ApiResponse<UserResponse> response = new ApiResponse<>(
            true,
            "User profile retrieved successfully",
            userResponse
        );
        
        return ResponseEntity.ok(response);
    }
}
