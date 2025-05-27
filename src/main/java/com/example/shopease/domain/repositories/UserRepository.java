package com.example.shopease.domain.repositories;

import com.example.shopease.domain.models.User;

public interface UserRepository {
    User save(User user);
    User findByEmail(String email);
}