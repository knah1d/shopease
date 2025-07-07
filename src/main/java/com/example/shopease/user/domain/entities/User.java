package com.example.shopease.user.domain.entities;

import com.example.shopease.shared.domain.entities.BaseEntity;
import com.example.shopease.user.domain.valueobjects.Email;
import com.example.shopease.user.domain.valueobjects.UserId;

public class User extends BaseEntity<UserId> {
    private String name;
    private Email email;
    private String phone;
    private String passwordHash;

    public User(UserId id, String name, Email email, String phone, String passwordHash) {
        super(id);
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.passwordHash = passwordHash;

        validateUser();
    }

    public User(String name, Email email, String phone, String passwordHash) {
        this(new UserId(), name, email, phone, passwordHash);
    }

    private void validateUser() {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (email == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }
        if  (phone == null || phone.trim().isEmpty()) {
            throw new IllegalArgumentException("Phone cannot be null or empty");
        }
        if (passwordHash == null || passwordHash.trim().isEmpty()) {
            throw new IllegalArgumentException("Password hash cannot be null or empty");
        }
    }

    public void updateProfile(String newName) {
        if (newName != null && !newName.trim().isEmpty()) {
            this.name = newName.trim();
            markAsUpdated();
        }
    }

    public String getName() {
        return name;
    }

    public Email getEmail() {
        return email;
    }

    public  String getPhone() {
        return phone;
    }

    public String getPasswordHash() {
        return passwordHash;
    }
}
