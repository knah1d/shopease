"use client";
import React, { useEffect } from "react";
import { useAdmin } from "@/hooks";
import {
    Users,
    ShoppingBag,
    Package,
    FolderOpen,
    UserCheck,
    Shield,
    Store,
} from "lucide-react";

const AdminDashboard = () => {
    const { dashboardStats, fetchDashboardStats, isLoading, error } =
        useAdmin();

    useEffect(() => {
        fetchDashboardStats();
    }, [fetchDashboardStats]);

    if (isLoading) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse"
                        >
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                    <p>Error loading dashboard: {error}</p>
                </div>
            </div>
        );
    }

    const StatCard = ({
        title,
        value,
        icon: Icon,
        color,
    }: {
        title: string;
        value: number;
        icon: React.ComponentType<any>;
        color: string;
    }) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Admin Dashboard
            </h1>

            {dashboardStats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Users"
                        value={dashboardStats.totalUsers}
                        icon={Users}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Active Users"
                        value={dashboardStats.activeUsers}
                        icon={UserCheck}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="Customers"
                        value={dashboardStats.totalCustomers}
                        icon={ShoppingBag}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="Sellers"
                        value={dashboardStats.totalSellers}
                        icon={Store}
                        color="bg-orange-500"
                    />
                    <StatCard
                        title="Admins"
                        value={dashboardStats.totalAdmins}
                        icon={Shield}
                        color="bg-red-500"
                    />
                    <StatCard
                        title="Products"
                        value={dashboardStats.totalProducts}
                        icon={Package}
                        color="bg-indigo-500"
                    />
                    <StatCard
                        title="Orders"
                        value={dashboardStats.totalOrders}
                        icon={ShoppingBag}
                        color="bg-yellow-500"
                    />
                    <StatCard
                        title="Categories"
                        value={dashboardStats.totalCategories}
                        icon={FolderOpen}
                        color="bg-teal-500"
                    />
                </div>
            )}

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            Category Management
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Create, edit, and manage product categories
                        </p>
                        <a
                            href="/dashboard/categories/add-category"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                        >
                            Add New Category
                        </a>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            User Management
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            View and manage user accounts and roles
                        </p>
                        <a
                            href="/dashboard/users"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                        >
                            Manage Users
                        </a>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            Product Management
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Add and manage products in the system
                        </p>
                        <a
                            href="/dashboard/products"
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg"
                        >
                            Manage Products
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
