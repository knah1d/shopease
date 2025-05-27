package com.example.shopease.infrastructure.persistence;


import com.example.shopease.domain.repositories.UserRepository;
import com.example.shopease.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaUserRepository extends JpaRepository<User, Long>, UserRepository {
    @Override
    default User save(User user) {
        return saveAndFlush(user);
    }

    User findByEmail(String email);
}