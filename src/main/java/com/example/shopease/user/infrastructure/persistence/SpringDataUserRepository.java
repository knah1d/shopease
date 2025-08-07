package com.example.shopease.user.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpringDataUserRepository extends JpaRepository<UserEntity, String> {

    // Basic query methods
    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<UserEntity> findByPhone(String phone);

    boolean existsByPhone(String phone);

    // Role-based queries (using String instead of Role enum)
    List<UserEntity> findByRole(String role);

    // Activity status queries
    List<UserEntity> findByIsActive(boolean isActive);

    List<UserEntity> findByRoleAndIsActive(String role, boolean isActive);

    // Custom queries for admin functionality
    @Query("SELECT u FROM UserEntity u WHERE u.name LIKE %:name%")
    List<UserEntity> findByNameContaining(@Param("name") String name);

    @Query("SELECT u FROM UserEntity u WHERE u.email LIKE %:email%")
    List<UserEntity> findByEmailContaining(@Param("email") String email);

    // Count queries
    long countByRole(String role);

    long countByIsActive(boolean isActive);

    long countByRoleAndIsActive(String role, boolean isActive);

    // Find recent users
    @Query("SELECT u FROM UserEntity u ORDER BY u.createdAt DESC")
    List<UserEntity> findRecentUsers();

    // Find users created within a date range
    @Query("SELECT u FROM UserEntity u WHERE u.createdAt BETWEEN :startDate AND :endDate")
    List<UserEntity> findUsersByDateRange(
            @Param("startDate") java.time.LocalDateTime startDate,
            @Param("endDate") java.time.LocalDateTime endDate);

    // Admin management queries
    @Query("SELECT u FROM UserEntity u WHERE u.role = :role ORDER BY u.createdAt DESC")
    List<UserEntity> findByRoleOrderByCreatedAtDesc(@Param("role") String role);

    // User verification queries
    @Query("SELECT u FROM UserEntity u WHERE u.isActive = false")
    List<UserEntity> findInactiveUsers();

    @Query("SELECT u FROM UserEntity u WHERE u.isActive = true")
    List<UserEntity> findActiveUsers();
}
