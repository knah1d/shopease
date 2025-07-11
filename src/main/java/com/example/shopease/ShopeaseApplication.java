package com.example.shopease;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@SpringBootApplication
//@EnableJpaRepositories(basePackages = "com.example.shopease")
@EntityScan(basePackages = "com.example.shopease")
public class ShopeaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopeaseApplication.class, args);
	}

}
