package com.ecommerce.domain.repositories;

import com.ecommerce.domain.models.User;

public interface UserRepository {
    User save(User user);
    User findByEmail(String email);
}