"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    User,
    LogOut,
    Settings,
    ShoppingCart,
    Package,
    Users,
    LayoutDashboard,
    Menu,
    X,
    Shield,
    Heart,
    ShoppingBag,
    Home,
} from "lucide-react";
import { toast } from "sonner";

const AuthenticatedHeader = () => {
    const { user, isAuthenticated, logout } = useAuthContext();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        router.push("/");
    };

    const getRoleBasedLinks = () => {
        if (!user) return [];

        const commonLinks = [
            { href: "/profile", label: "My Profile", icon: User },
        ];

        switch (user.role) {
            case "ADMIN":
                return [
                    {
                        href: "/admin/dashboard",
                        label: "Admin Dashboard",
                        icon: LayoutDashboard,
                    },
                    {
                        href: "/admin/users",
                        label: "Manage Users",
                        icon: Users,
                    },
                    {
                        href: "/admin/products",
                        label: "Manage Products",
                        icon: Package,
                    },
                    ...commonLinks,
                ];
            case "SELLER":
                return [
                    {
                        href: "/seller/dashboard",
                        label: "Seller Dashboard",
                        icon: LayoutDashboard,
                    },
                    {
                        href: "/seller/products",
                        label: "My Products",
                        icon: Package,
                    },
                    {
                        href: "/seller/orders",
                        label: "Orders",
                        icon: ShoppingBag,
                    },
                    ...commonLinks,
                ];
            case "CUSTOMER":
                return [
                    { href: "/customer/home", label: "My Account", icon: Home },
                    {
                        href: "/my-orders",
                        label: "My Orders",
                        icon: ShoppingBag,
                    },
                    {
                        href: "/cart",
                        label: "Shopping Cart",
                        icon: ShoppingCart,
                    },
                    { href: "/wishlist", label: "Wishlist", icon: Heart },
                    ...commonLinks,
                ];
            default:
                return commonLinks;
        }
    };

    const getRoleBadgeColor = (role: string) => {
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

    const roleBasedLinks = getRoleBasedLinks();

    if (!isAuthenticated) {
        return (
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-blue-600">
                                ShopEase
                            </span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            <Link href="/sign-in">
                                <Button variant="outline">Sign In</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button>Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                            ShopEase
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {roleBasedLinks.slice(0, 3).map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {user && (
                            <Badge className={getRoleBadgeColor(user.role)}>
                                <Shield className="h-3 w-3 mr-1" />
                                {user.role}
                            </Badge>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center space-x-2"
                                >
                                    <User className="h-5 w-5" />
                                    <span className="hidden sm:block">
                                        {user?.name}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div>
                                        <p className="font-medium">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {roleBasedLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <DropdownMenuItem
                                            key={link.href}
                                            asChild
                                        >
                                            <Link
                                                href={link.href}
                                                className="flex items-center space-x-2 w-full"
                                            >
                                                <Icon className="h-4 w-4" />
                                                <span>{link.label}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    );
                                })}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/settings"
                                        className="flex items-center space-x-2 w-full"
                                    >
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-600"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t">
                        <nav className="px-2 pt-2 pb-4 space-y-1">
                            {roleBasedLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Sign Out</span>
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default AuthenticatedHeader;
