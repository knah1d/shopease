package com.example.shopease.shared.domain.exceptions;

public class BusinessException extends DomainException {
    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
