package com.ecommerce.domain.usecases;

import com.ecommerce.domain.models.User;
import com.ecommerce.domain.repositories.UserRepository;

public class UserInteractor {
    private final UserRepository userRepository;

    public UserInteractor(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        // Validate email uniqueness, hash password, etc.
        return userRepository.save(user);
    }
}