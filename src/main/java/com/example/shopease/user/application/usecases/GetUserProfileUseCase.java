package com.example.shopease.user.application.usecases;

import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.domain.exceptions.UserNotFoundException;
import com.example.shopease.user.domain.repositories.UserRepository;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class GetUserProfileUseCase {
    private final UserRepository userRepository;

    public GetUserProfileUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User execute(String userId) {
        UserId userIdObj = new UserId(userId);
        
        return userRepository.findById(userIdObj)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
    }
}
