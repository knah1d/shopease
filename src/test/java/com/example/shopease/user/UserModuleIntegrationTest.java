package com.example.shopease.user;

import com.example.shopease.UserOnlyApplication;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = UserOnlyApplication.class)
@ActiveProfiles("user")
public class UserModuleIntegrationTest {

    @Test
    public void contextLoads() {
        // Test that user module context loads successfully
    }
}
