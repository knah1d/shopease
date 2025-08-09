"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/providers/AuthProvider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, LogIn, UserPlus, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserAvatar = () => {
    const { user, isAuthenticated, logout } = useAuthContext();
    const router = useRouter();

    // Debug logging
    React.useEffect(() => {
        console.log("UserAvatar Debug:", {
            isAuthenticated,
            user,
            hasUser: !!user,
            userName: user?.name,
        });
    }, [isAuthenticated, user]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const getRoleDashboard = () => {
        switch (user?.role) {
            case "ADMIN":
                return "/admin/dashboard";
            case "SELLER":
                return "/seller/dashboard";
            case "CUSTOMER":
                return "/customer/home";
            default:
                return "/profile";
        }
    };

    if (isAuthenticated && user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <h2 className="font-semibold text-lg">Welcome,</h2>
                        <p className="-mt-1">{user.name}</p>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                        <Link
                            href={getRoleDashboard()}
                            className="flex items-center gap-2"
                        >
                            <User size={16} />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link
                            href="/profile"
                            className="flex items-center gap-2"
                        >
                            <User size={16} />
                            My Profile
                        </Link>
                    </DropdownMenuItem>
                    {user.role === "CUSTOMER" && (
                        <DropdownMenuItem asChild>
                            <Link
                                href="/my-orders"
                                className="flex items-center gap-2"
                            >
                                <ShoppingBag size={16} />
                                My Orders
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                    >
                        <LogOut size={16} />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <h2 className="font-semibold text-lg">Welcome,</h2>
                    <p className="-mt-1">Guest</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                    <Link href="/sign-in" className="flex items-center gap-2">
                        <LogIn size={16} />
                        Sign In
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/sign-up" className="flex items-center gap-2">
                        <UserPlus size={16} />
                        Sign Up
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAvatar;
