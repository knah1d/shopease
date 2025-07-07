package com.example.shopease;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.shopease.user",
    "com.example.shopease.shared"
})
public class UserOnlyApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserOnlyApplication.class, args);
    }
}
