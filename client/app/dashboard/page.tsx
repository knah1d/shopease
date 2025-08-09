"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";
import { Loader2 } from "lucide-react";

const DashboardRedirect = () => {
    const { user, isAuthenticated, isLoading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated || !user) {
            router.push("/sign-in");
            return;
        }

        // Redirect based on user role
        switch (user.role) {
            case "ADMIN":
                router.push("/admin/dashboard");
                break;
            case "SELLER":
                router.push("/seller/dashboard");
                break;
            case "CUSTOMER":
                router.push("/customer/home");
                break;
            default:
                router.push("/");
        }
    }, [user, isAuthenticated, isLoading, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-gray-600">
                    Redirecting to your dashboard...
                </p>
            </div>
        </div>
    );
};

export default DashboardRedirect;
