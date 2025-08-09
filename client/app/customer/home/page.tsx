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
import {
    ShoppingCart,
    Heart,
    Package,
    TrendingUp,
    Star,
    Eye,
    Search,
    Filter,
} from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const CustomerHome = () => {
    const { user } = useAuthContext();
    const [stats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        wishlistItems: 0,
        recentViews: 0,
    });

    const [recentProducts] = useState([
        // Placeholder data - replace with actual data from API
        {
            id: "1",
            name: "Sample Product 1",
            price: 99.99,
            image: "/images/placeholder.jpg",
            rating: 4.5,
            category: "Electronics",
        },
        {
            id: "2",
            name: "Sample Product 2",
            price: 149.99,
            image: "/images/placeholder.jpg",
            rating: 4.8,
            category: "Clothing",
        },
    ]);

    return (
        <ProtectedRoute requiredRoles={["CUSTOMER"]}>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {user?.name}!
                        </h1>
                        <p className="text-gray-600">
                            Discover new products and manage your orders
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Orders
                                </CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
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

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Pending Orders
                                </CardTitle>
                                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.pendingOrders}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Being processed
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Wishlist
                                </CardTitle>
                                <Heart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.wishlistItems}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Saved items
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Recent Views
                                </CardTitle>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.recentViews}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Products viewed
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid gap-6 md:grid-cols-3 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Search className="h-5 w-5" />
                                    Browse Products
                                </CardTitle>
                                <CardDescription>
                                    Discover new products and deals
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Shop Now</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    My Orders
                                </CardTitle>
                                <CardDescription>
                                    Track your orders and delivery status
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    View Orders
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-5 w-5" />
                                    Wishlist
                                </CardTitle>
                                <CardDescription>
                                    View your saved items
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    View Wishlist
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recently Viewed Products</CardTitle>
                                <CardDescription>
                                    Products you've looked at recently
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {recentProducts.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50"
                                            >
                                                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                                    <Package className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        {product.category}
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                            <span className="text-xs text-gray-600 ml-1">
                                                                {product.rating}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-medium">
                                                            ${product.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                        <p>No recently viewed products</p>
                                        <p className="text-sm">
                                            Products you view will appear here
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Order History</CardTitle>
                                <CardDescription>
                                    Your recent orders and their status
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-gray-500">
                                    <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p>No orders yet</p>
                                    <p className="text-sm">
                                        Your orders will appear here when you
                                        make a purchase
                                    </p>
                                    <Button className="mt-4" size="sm">
                                        Start Shopping
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default CustomerHome;
