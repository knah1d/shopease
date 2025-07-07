package com.example.shopease.user.application.usecases;

import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.domain.exceptions.UserNotFoundException;
import com.example.shopease.user.domain.repositories.UserRepository;
import com.example.shopease.user.domain.valueobjects.Email;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LoginUserUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public LoginUserUseCase(UserRepository userRepository, 
                           PasswordEncoder passwordEncoder,
                           TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public String execute(String email, String password) {
        Email userEmail = new Email(email);
        
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new UserNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new UserNotFoundException("Invalid email or password");
        }

        return tokenProvider.generateToken(user);
    }

    public interface PasswordEncoder {
        boolean matches(String password, String hashedPassword);
    }

    public interface TokenProvider {
        String generateToken(User user);
    }
}
