package com.example.shopease.user.domain.exceptions;

import com.example.shopease.shared.domain.exceptions.DomainException;

public class DuplicateEmailException extends DomainException {
    public DuplicateEmailException(String message) {
        super(message);
    }
}
