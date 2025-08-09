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
import {
    Package,
    DollarSign,
    TrendingUp,
    Eye,
    Plus,
    ShoppingBag,
    Star,
    Users,
} from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const SellerDashboard = () => {
    const { user } = useAuthContext();
    const [stats] = useState({
        totalProducts: 0,
        totalSales: 0,
        monthlyRevenue: 0,
        pendingOrders: 0,
        averageRating: 0,
        totalViews: 0,
    });

    return (
        <ProtectedRoute requiredRoles={["SELLER"]}>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Seller Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Welcome back, {user?.name}! Manage your products and
                            orders.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Products
                                </CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.totalProducts}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Products in your store
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Sales
                                </CardTitle>
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.totalSales}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Items sold all time
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Monthly Revenue
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    ${stats.monthlyRevenue}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    This month's earnings
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Average Rating
                                </CardTitle>
                                <Star className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.averageRating > 0
                                        ? stats.averageRating.toFixed(1)
                                        : "N/A"}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Customer reviews
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Plus className="h-5 w-5" />
                                    Add Product
                                </CardTitle>
                                <CardDescription>
                                    List a new product in your store
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    Create New Product
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Manage Inventory
                                </CardTitle>
                                <CardDescription>
                                    Update stock levels and product details
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    View Inventory
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5" />
                                    Orders
                                </CardTitle>
                                <CardDescription>
                                    Process and fulfill customer orders
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    View Orders
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                                <CardDescription>
                                    Latest orders from your customers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-gray-500">
                                    <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p>No recent orders</p>
                                    <p className="text-sm">
                                        Orders will appear here when customers
                                        purchase your products
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Analytics</CardTitle>
                                <CardDescription>
                                    Your store's performance metrics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Eye className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm">
                                                Product Views
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium">
                                            {stats.totalViews}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Users className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm">
                                                Store Visits
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium">
                                            0
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm">
                                                Conversion Rate
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium">
                                            0%
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default SellerDashboard;
