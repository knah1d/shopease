"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Users,
    ShoppingCart,
    Package,
    TrendingUp,
    UserCheck,
    UserX,
    Shield,
    Search,
    Filter,
} from "lucide-react";
import { adminService } from "@/services/adminService";
import { User, UserRole } from "@/types/user";
import { AdminDashboardStats } from "@/types/admin";
import { toast } from "sonner";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const AdminDashboard = () => {
    const [stats, setStats] = useState<AdminDashboardStats | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    useEffect(() => {
        loadDashboardData();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, searchTerm, roleFilter, statusFilter]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [statsData, usersData] = await Promise.all([
                adminService.getDashboardStats(),
                adminService.getAllUsers(),
            ]);
            setStats(statsData);
            setUsers(usersData);
        } catch (error) {
            toast.error("Failed to load dashboard data");
            console.error("Dashboard load error:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        let filtered = users;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply role filter
        if (roleFilter !== "all") {
            filtered = filtered.filter((user) => user.role === roleFilter);
        }

        // Apply status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter((user) =>
                statusFilter === "active" ? user.isActive : !user.isActive
            );
        }

        setFilteredUsers(filtered);
    };

    const handleRoleChange = async (userId: string, newRole: UserRole) => {
        try {
            await adminService.updateUserRole(userId, newRole);
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
            toast.success("User role updated successfully");
        } catch (error) {
            toast.error("Failed to update user role");
            console.error("Role update error:", error);
        }
    };

    const handleStatusToggle = async (userId: string, isActive: boolean) => {
        try {
            if (isActive) {
                await adminService.activateUser(userId);
            } else {
                await adminService.deactivateUser(userId);
            }
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? { ...user, isActive } : user
                )
            );
            toast.success(
                `User ${isActive ? "activated" : "deactivated"} successfully`
            );
        } catch (error) {
            toast.error("Failed to update user status");
            console.error("Status update error:", error);
        }
    };

    const getRoleBadgeColor = (role: UserRole) => {
        switch (role) {
            case "ADMIN":
                return "bg-red-100 text-red-800 border-red-200";
            case "SELLER":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "CUSTOMER":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <ProtectedRoute requiredRoles={["ADMIN"]}>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Manage users, view statistics, and monitor system
                            activity
                        </p>
                    </div>

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Users
                                    </CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.totalUsers}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stats.activeUsers} active users
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Customers
                                    </CardTitle>
                                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.totalCustomers}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Customer accounts
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Sellers
                                    </CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.totalSellers}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Seller accounts
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Orders
                                    </CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.totalOrders}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        All time orders
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* User Management */}
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                View and manage all users in the system
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>

                                <Select
                                    value={roleFilter}
                                    onValueChange={setRoleFilter}
                                >
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Filter by role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Roles
                                        </SelectItem>
                                        <SelectItem value="ADMIN">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="SELLER">
                                            Seller
                                        </SelectItem>
                                        <SelectItem value="CUSTOMER">
                                            Customer
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Users Table */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredUsers.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="text-center py-8"
                                                >
                                                    <div className="text-gray-500">
                                                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                                        No users found
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredUsers.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {user.email}
                                                            </div>
                                                            {user.phone && (
                                                                <div className="text-sm text-gray-500">
                                                                    {user.phone}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={getRoleBadgeColor(
                                                                user.role
                                                            )}
                                                        >
                                                            <Shield className="h-3 w-3 mr-1" />
                                                            {user.role}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                user.isActive
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                        >
                                                            {user.isActive
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-gray-500">
                                                        {new Date(
                                                            user.createdAt
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Select
                                                                value={
                                                                    user.role
                                                                }
                                                                onValueChange={(
                                                                    value: UserRole
                                                                ) =>
                                                                    handleRoleChange(
                                                                        user.id,
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-[120px]">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="ADMIN">
                                                                        Admin
                                                                    </SelectItem>
                                                                    <SelectItem value="SELLER">
                                                                        Seller
                                                                    </SelectItem>
                                                                    <SelectItem value="CUSTOMER">
                                                                        Customer
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>

                                                            <Button
                                                                variant={
                                                                    user.isActive
                                                                        ? "outline"
                                                                        : "default"
                                                                }
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleStatusToggle(
                                                                        user.id,
                                                                        !user.isActive
                                                                    )
                                                                }
                                                            >
                                                                {user.isActive ? (
                                                                    <>
                                                                        <UserX className="h-4 w-4 mr-1" />
                                                                        Deactivate
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <UserCheck className="h-4 w-4 mr-1" />
                                                                        Activate
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminDashboard;
