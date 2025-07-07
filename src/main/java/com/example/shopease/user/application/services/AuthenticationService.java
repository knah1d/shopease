package com.example.shopease.user.application.services;

import com.example.shopease.user.domain.entities.User;

public interface AuthenticationService {
    User getCurrentUser();
    String getCurrentUserId();
    boolean isAuthenticated();
}
