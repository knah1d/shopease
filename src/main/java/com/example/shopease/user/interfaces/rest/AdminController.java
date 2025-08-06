package com.example.shopease.user.interfaces.rest;

import com.example.shopease.shared.interfaces.dto.ApiResponse;
import com.example.shopease.user.application.services.UserService;
import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.domain.valueobjects.Role;
import com.example.shopease.user.interfaces.dto.UserResponse;
import com.example.shopease.user.interfaces.mappers.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserService userService;
    private final UserMapper userMapper;

    public AdminController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserResponse> responses = users.stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", responses));
    }

    @GetMapping("/users/customers")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getCustomers() {
        List<User> customers = userService.getUsersByRole(Role.CUSTOMER);
        List<UserResponse> responses = customers.stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Customers retrieved successfully", responses));
    }

    @GetMapping("/users/sellers")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getSellers() {
        List<User> sellers = userService.getUsersByRole(Role.SELLER);
        List<UserResponse> responses = sellers.stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Sellers retrieved successfully", responses));
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserRole(
            @PathVariable String userId,
            @RequestParam String role) {

        User updatedUser = userService.updateUserRole(userId, new Role(role));
        UserResponse response = userMapper.toResponse(updatedUser);

        return ResponseEntity.ok(ApiResponse.success("User role updated successfully", response));
    }

    @PutMapping("/users/{userId}/activate")
    public ResponseEntity<ApiResponse<UserResponse>> activateUser(@PathVariable String userId) {
        User user = userService.activateUser(userId);
        UserResponse response = userMapper.toResponse(user);

        return ResponseEntity.ok(ApiResponse.success("User activated successfully", response));
    }

    @PutMapping("/users/{userId}/deactivate")
    public ResponseEntity<ApiResponse<UserResponse>> deactivateUser(@PathVariable String userId) {
        User user = userService.deactivateUser(userId);
        UserResponse response = userMapper.toResponse(user);

        return ResponseEntity.ok(ApiResponse.success("User deactivated successfully", response));
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<AdminDashboardStats>> getAdminDashboardStats() {
        AdminDashboardStats stats = new AdminDashboardStats();

        // Get user counts
        List<User> allUsers = userService.getAllUsers();
        stats.setTotalUsers(allUsers.size());
        stats.setActiveUsers((int) allUsers.stream().filter(User::getIsActive).count());
        stats.setTotalCustomers((int) allUsers.stream().filter(u -> u.getRole().isCustomer()).count());
        stats.setTotalSellers((int) allUsers.stream().filter(u -> u.getRole().isSeller()).count());
        stats.setTotalAdmins((int) allUsers.stream().filter(u -> u.getRole().isAdmin()).count());

        return ResponseEntity.ok(ApiResponse.success("Dashboard stats retrieved successfully", stats));
    }

    // Inner class for dashboard statistics
    public static class AdminDashboardStats {
        private int totalUsers;
        private int activeUsers;
        private int totalCustomers;
        private int totalSellers;
        private int totalAdmins;
        private int totalProducts;
        private int totalOrders;
        private int totalCategories;

        // Getters and Setters
        public int getTotalUsers() {
            return totalUsers;
        }

        public void setTotalUsers(int totalUsers) {
            this.totalUsers = totalUsers;
        }

        public int getActiveUsers() {
            return activeUsers;
        }

        public void setActiveUsers(int activeUsers) {
            this.activeUsers = activeUsers;
        }

        public int getTotalCustomers() {
            return totalCustomers;
        }

        public void setTotalCustomers(int totalCustomers) {
            this.totalCustomers = totalCustomers;
        }

        public int getTotalSellers() {
            return totalSellers;
        }

        public void setTotalSellers(int totalSellers) {
            this.totalSellers = totalSellers;
        }

        public int getTotalAdmins() {
            return totalAdmins;
        }

        public void setTotalAdmins(int totalAdmins) {
            this.totalAdmins = totalAdmins;
        }

        public int getTotalProducts() {
            return totalProducts;
        }

        public void setTotalProducts(int totalProducts) {
            this.totalProducts = totalProducts;
        }

        public int getTotalOrders() {
            return totalOrders;
        }

        public void setTotalOrders(int totalOrders) {
            this.totalOrders = totalOrders;
        }

        public int getTotalCategories() {
            return totalCategories;
        }

        public void setTotalCategories(int totalCategories) {
            this.totalCategories = totalCategories;
        }
    }
}
