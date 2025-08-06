package com.example.shopease.user.domain.entities;

import com.example.shopease.shared.domain.entities.BaseEntity;
import com.example.shopease.user.domain.valueobjects.Email;
import com.example.shopease.user.domain.valueobjects.UserId;
import com.example.shopease.user.domain.valueobjects.Role;

public class User extends BaseEntity<UserId> {
    private String name;
    private Email email;
    private String phone;
    private String passwordHash;
    private Role role;
    private Boolean isActive;

    public User(UserId id, String name, Email email, String phone, String passwordHash, Role role, Boolean isActive) {
        super(id);
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.passwordHash = passwordHash;
        this.role = role != null ? role : new Role(Role.CUSTOMER);
        this.isActive = isActive != null ? isActive : true;

        validateUser();
    }

    public User(String name, Email email, String phone, String passwordHash) {
        this(new UserId(), name, email, phone, passwordHash, new Role(Role.CUSTOMER), true);
    }

    public User(String name, Email email, String phone, String passwordHash, Role role) {
        this(new UserId(), name, email, phone, passwordHash, role, true);
    }

    private void validateUser() {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (email == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }
        if (phone == null || phone.trim().isEmpty()) {
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

    public String getPhone() {
        return phone;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
        markAsUpdated();
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
        markAsUpdated();
    }

    // Role-based methods
    public boolean isSeller() {
        return role != null && role.isSeller();
    }

    public boolean isCustomer() {
        return role != null && role.isCustomer();
    }

    public boolean isAdmin() {
        return role != null && role.isAdmin();
    }
}
