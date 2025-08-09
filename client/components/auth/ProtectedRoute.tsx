"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";
import { UserRole } from "@/types/user";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: UserRole[];
    requireAuth?: boolean;
    redirectTo?: string;
    fallbackComponent?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRoles = [],
    requireAuth = true,
    redirectTo,
    fallbackComponent,
}) => {
    const { user, isAuthenticated, isLoading } = useAuthContext();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if (isLoading) {
            setIsAuthorized(null);
            return;
        }

        // Check if authentication is required
        if (requireAuth && !isAuthenticated) {
            setIsAuthorized(false);
            if (redirectTo) {
                router.push(redirectTo);
            } else {
                router.push("/sign-in");
            }
            return;
        }

        // Check if specific roles are required
        if (requiredRoles.length > 0 && user) {
            const hasRequiredRole = requiredRoles.includes(user.role);
            setIsAuthorized(hasRequiredRole);

            if (!hasRequiredRole) {
                if (redirectTo) {
                    router.push(redirectTo);
                } else {
                    router.push("/unauthorized");
                }
                return;
            }
        }

        setIsAuthorized(true);
    }, [
        user,
        isAuthenticated,
        isLoading,
        requiredRoles,
        requireAuth,
        redirectTo,
        router,
    ]);

    // Show loading state
    if (isLoading || isAuthorized === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show unauthorized state
    if (isAuthorized === false) {
        if (fallbackComponent) {
            return <>{fallbackComponent}</>;
        }

        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800">403</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Unauthorized
                    </h2>
                    <p className="text-gray-600">
                        You don't have permission to access this page.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    // Render children if authorized
    return <>{children}</>;
};

export default ProtectedRoute;
