package com.example.shopease.user.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * User module-specific database configuration that overrides the global DatabaseConfig
 * when the 'user' profile is active. This ensures only user module repositories are scanned.
 */
@Configuration
@EnableJpaRepositories(basePackages = {"com.example.shopease.user.infrastructure.persistence"})
@EntityScan(basePackages = {
    "com.example.shopease.user.infrastructure.persistence",
    "com.example.shopease.shared.infrastructure.persistence"
})
@EnableTransactionManagement
@Primary
@Profile("user")
public class UserDatabaseConfig {
}
