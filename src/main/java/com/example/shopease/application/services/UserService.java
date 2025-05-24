package com.ecommerce.application.services;

import com.ecommerce.domain.models.User;
import com.ecommerce.domain.repositories.UserRepository;
import com.ecommerce.domain.usecases.UserInteractor;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserInteractor userInteractor;

    public UserService(UserRepository userRepository) {
        this.userInteractor = new UserInteractor(userRepository);
    }

    public User register(UserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Hash in real impl.
        user.setName(request.getName());
        user.setRole(request.getRole());
        return userInteractor.register(user);
    }
}