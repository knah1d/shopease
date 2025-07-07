package com.example.shopease.shared.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Global database configuration. When using with isolated module applications,
 * each module should provide its own specific repository scanning configuration
 * to override this global one.
 */
@Configuration
@EnableTransactionManagement
public class DatabaseConfig {
}
