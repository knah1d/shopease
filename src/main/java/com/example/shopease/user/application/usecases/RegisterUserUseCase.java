package com.example.shopease.user.application.usecases;

import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.domain.exceptions.DuplicateEmailException;
import com.example.shopease.user.domain.repositories.UserRepository;
import com.example.shopease.user.domain.valueobjects.Email;
import com.example.shopease.user.domain.valueobjects.Role;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RegisterUserUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterUserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User execute(String name, String email, String password, String role) {
        Email userEmail = new Email(email);
        
        if (userRepository.existsByEmail(userEmail)) {
            throw new DuplicateEmailException("User with email " + email + " already exists");
        }

        String hashedPassword = passwordEncoder.encode(password);
        Role userRole = Role.fromString(role);
        
        User user = new User(name, userEmail, hashedPassword, userRole);
        return userRepository.save(user);
    }

    public interface PasswordEncoder {
        String encode(String password);
    }
}
