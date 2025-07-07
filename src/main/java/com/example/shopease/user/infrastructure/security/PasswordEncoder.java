package com.example.shopease.user.infrastructure.security;

import com.example.shopease.user.application.usecases.LoginUserUseCase;
import com.example.shopease.user.application.usecases.RegisterUserUseCase;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncoder implements RegisterUserUseCase.PasswordEncoder, LoginUserUseCase.PasswordEncoder {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public String encode(String password) {
        return encoder.encode(password);
    }

    @Override
    public boolean matches(String password, String hashedPassword) {
        return encoder.matches(password, hashedPassword);
    }
}
