package com.example.shopease.user.application.services;

import com.example.shopease.user.application.usecases.GetUserProfileUseCase;
import com.example.shopease.user.application.usecases.LoginUserUseCase;
import com.example.shopease.user.application.usecases.RegisterUserUseCase;
import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.domain.repositories.UserRepository;
import com.example.shopease.user.domain.valueobjects.Email;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUserUseCase loginUserUseCase;
    private final GetUserProfileUseCase getUserProfileUseCase;
    private final UserRepository userRepository;

    public UserService(RegisterUserUseCase registerUserUseCase,
                      LoginUserUseCase loginUserUseCase,
                      GetUserProfileUseCase getUserProfileUseCase,
                      UserRepository userRepository) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.getUserProfileUseCase = getUserProfileUseCase;
        this.userRepository = userRepository;
    }

    public User registerUser(String name, String email, String phone,String password) {
        return registerUserUseCase.execute(name, email, phone, password);
    }

    public String loginUser(String email, String password) {
        return loginUserUseCase.execute(email, password);
    }

    public User getUserProfile(String userId) {
        return getUserProfileUseCase.execute(userId);
    }
    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(new Email(email))
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
