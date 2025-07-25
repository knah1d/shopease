package com.example.shopease.order.domain.exceptions;

import com.example.shopease.shared.domain.exceptions.BusinessException;

public class InvalidOrderStateTransitionException extends BusinessException {
    public InvalidOrderStateTransitionException(String currentStatus, String newStatus) {
        super(String.format("Cannot transition order from %s to %s", currentStatus, newStatus));
    }
}
