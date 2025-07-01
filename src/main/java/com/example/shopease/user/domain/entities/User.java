package com.example.shopease.user.domain.entities;

import com.example.shopease.shared.domain.entities.BaseEntity;
import com.example.shopease.user.domain.valueobjects.Email;
import com.example.shopease.user.domain.valueobjects.Role;
import com.example.shopease.user.domain.valueobjects.UserId;

public class User extends BaseEntity<UserId> {
    private String name;
    private Email email;
    private String passwordHash;
    private Role role;

    public User(UserId id, String name, Email email, String passwordHash, Role role) {
        super(id);
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        
        validateUser();
    }

    public User(String name, Email email, String passwordHash, Role role) {
        this(new UserId(), name, email, passwordHash, role);
    }

    private void validateUser() {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (email == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }
        if (passwordHash == null || passwordHash.trim().isEmpty()) {
            throw new IllegalArgumentException("Password hash cannot be null or empty");
        }
        if (role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }
    }

    public void updateProfile(String newName) {
        if (newName != null && !newName.trim().isEmpty()) {
            this.name = newName.trim();
            markAsUpdated();
        }
    }

    public boolean isSeller() {
        return role == Role.SELLER;
    }

    public boolean isCustomer() {
        return role == Role.CUSTOMER;
    }

    // Getters
    public String getName() {
        return name;
    }

    public Email getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Role getRole() {
        return role;
    }
}
