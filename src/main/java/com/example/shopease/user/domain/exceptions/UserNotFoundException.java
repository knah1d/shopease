package com.example.shopease.user.domain.exceptions;

import com.example.shopease.shared.domain.exceptions.DomainException;

public class UserNotFoundException extends DomainException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
