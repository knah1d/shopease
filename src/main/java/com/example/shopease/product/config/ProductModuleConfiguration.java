package com.example.shopease.product.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = "com.example.shopease.product")
@EnableJpaRepositories(basePackages = "com.example.shopease.product.infrastructure.persistence")
@EntityScan(basePackages = {"com.example.shopease.product.domain.entities", "com.example.shopease.product.infrastructure.persistence"})
public class ProductModuleConfiguration {
    // Configuration specific to Product module
}