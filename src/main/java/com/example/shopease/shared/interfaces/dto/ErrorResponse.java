package com.example.shopease.shared.interfaces.dto;

import java.time.LocalDateTime;

public class ErrorResponse {
    private boolean success;
    private String message;
    private String error;
    private LocalDateTime timestamp;
    private String path;

    // Default constructor
    public ErrorResponse() {
        this.success = false;
        this.timestamp = LocalDateTime.now();
    }

    // Constructor
    public ErrorResponse(String message, String error, String path) {
        this();
        this.message = message;
        this.error = error;
        this.path = path;
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
