package com.example.shopease;

import com.example.shopease.order.config.OrderModuleConfiguration;
import com.example.shopease.product.config.ProductModuleConfiguration;
import com.example.shopease.user.config.UserModuleConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.shopease")
@EntityScan(basePackages = "com.example.shopease")
@Import({UserModuleConfiguration.class, ProductModuleConfiguration.class, OrderModuleConfiguration.class})
public class ShopeaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopeaseApplication.class, args);
	}

}
