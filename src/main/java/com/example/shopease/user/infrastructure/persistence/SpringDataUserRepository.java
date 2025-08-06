package com.example.shopease.user.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpringDataUserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    // Admin query methods removed since columns don't exist in current DB
}
