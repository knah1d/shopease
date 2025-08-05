package com.example.shopease.payment.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = "com.example.shopease.payment")
@EnableJpaRepositories(basePackages = "com.example.shopease.payment.domain.repositories")
@EntityScan(basePackages = "com.example.shopease.payment.domain.entities")
@EnableConfigurationProperties(SSLCommerzConfig.class)
public class PaymentModuleConfiguration {
}
