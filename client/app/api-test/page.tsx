"use client";

import React, { useState } from "react";
import {
    userService,
    productService,
    orderService,
    paymentService,
} from "@/services";

export default function ApiTestPage() {
    const [results, setResults] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const runTest = async (testName: string, testFn: () => Promise<any>) => {
        setLoading((prev) => ({ ...prev, [testName]: true }));
        try {
            const result = await testFn();
            setResults((prev) => ({
                ...prev,
                [testName]: { success: true, data: result },
            }));
        } catch (error) {
            setResults((prev) => ({
                ...prev,
                [testName]: {
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Unknown error",
                },
            }));
        }
        setLoading((prev) => ({ ...prev, [testName]: false }));
    };

    const testEndpoints = {
        // User API Tests
        "Get All Products": () => productService.getAllProducts(),
        "Search Products": () =>
            productService.searchProducts({ name: "test" }),
        "Get Payment Test Config": () => paymentService.getTestConfig(),

        // Authentication Tests (these require actual data)
        "Register User": () =>
            userService.register({
                name: "Test User",
                email: "test@example.com",
                password: "password123",
            }),

        "Login User": () =>
            userService.login({
                email: "test@example.com",
                password: "password123",
            }),

        // Order Tests (require authentication)
        "Get User Orders": () => orderService.getCurrentUserOrders(),

        // Payment Tests
        "Check Payment Status": () =>
            paymentService.getPaymentStatus("test-transaction-id"),
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
            <p className="text-gray-600 mb-8">
                Test all backend API endpoints. Make sure your backend server is
                running on the configured URL.
            </p>

            <div className="grid gap-4">
                {Object.entries(testEndpoints).map(([testName, testFn]) => (
                    <div key={testName} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                {testName}
                            </h2>
                            <button
                                onClick={() => runTest(testName, testFn)}
                                disabled={loading[testName]}
                                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                {loading[testName] ? "Testing..." : "Test"}
                            </button>
                        </div>

                        {results[testName] && (
                            <div className="mt-4">
                                <div
                                    className={`p-4 rounded ${
                                        results[testName].success
                                            ? "bg-green-100 border border-green-400"
                                            : "bg-red-100 border border-red-400"
                                    }`}
                                >
                                    <h3 className="font-semibold mb-2">
                                        {results[testName].success
                                            ? "✅ Success"
                                            : "❌ Error"}
                                    </h3>
                                    <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                                        {JSON.stringify(
                                            results[testName].success
                                                ? results[testName].data
                                                : results[testName].error,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                    API Configuration
                </h2>
                <p>
                    <strong>Base URL:</strong>{" "}
                    {process.env.NEXT_PUBLIC_API_BASE_URL ||
                        "http://localhost:8080/api"}
                </p>
                <p>
                    <strong>Environment:</strong>{" "}
                    {process.env.NEXT_PUBLIC_ENVIRONMENT || "development"}
                </p>
            </div>

            <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                    ⚠️ Important Notes
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        Make sure your backend Spring Boot server is running
                    </li>
                    <li>
                        Update the API base URL in your environment variables if
                        needed
                    </li>
                    <li>
                        Some tests require user registration/authentication to
                        work properly
                    </li>
                    <li>
                        Test the "Get All Products" and "Get Payment Test
                        Config" endpoints first as they don't require
                        authentication
                    </li>
                    <li>
                        After successful registration/login, test the
                        authenticated endpoints
                    </li>
                </ul>
            </div>
        </div>
    );
}
