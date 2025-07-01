package com.example.shopease.shared.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.example.shopease.*.infrastructure.persistence")
@EnableTransactionManagement
public class DatabaseConfig {
}
