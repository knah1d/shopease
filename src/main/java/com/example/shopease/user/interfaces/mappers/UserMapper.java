package com.example.shopease.user.interfaces.mappers;

import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.interfaces.dto.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public UserResponse toResponse(User user) {
        return new UserResponse(
            user.getId().getValue(),
            user.getName(),
            user.getEmail().getValue(),
            user.getPhone()
        );
    }
}
