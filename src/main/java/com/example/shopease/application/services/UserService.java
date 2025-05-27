package com.example.shopease.application.services;


import com.example.shopease.application.dtos.UserRequest;
import com.example.shopease.domain.models.User;
import com.example.shopease.domain.repositories.UserRepository;
import com.example.shopease.domain.usecases.UserInteractor;
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