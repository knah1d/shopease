package com.example.shopease.user.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = {
    "com.example.shopease.user",
    "com.example.shopease.shared"
})
@EntityScan(basePackages = {
    "com.example.shopease.user.infrastructure.persistence",
    "com.example.shopease.shared.infrastructure.persistence"
})
@EnableJpaRepositories(basePackages = {
    "com.example.shopease.user.infrastructure.persistence"
})
public class UserModuleConfiguration {
    // Configuration specific to User module
}
