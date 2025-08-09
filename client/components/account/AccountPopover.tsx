"use client";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Heart,
    HelpCircle,
    ListOrdered,
    LogOut,
    User,
    LayoutDashboard,
    Package,
    Users,
    ShoppingBag,
    Shield,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import UserAvatar from "./UserAvatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/AuthProvider";
import { Badge } from "../ui/badge";

const AccountPopover = () => {
    const pathname = usePathname();
    const { user, isAuthenticated } = useAuthContext();

    const getRoutesByRole = () => {
        if (!user || !isAuthenticated) {
            return [
                {
                    link: "/sign-in",
                    label: "Sign In",
                    icon: <User />,
                    isActive: pathname.includes("/sign-in"),
                },
                {
                    link: "/sign-up",
                    label: "Sign Up",
                    icon: <User />,
                    isActive: pathname.includes("/sign-up"),
                },
            ];
        }

        const commonLinks = [
            {
                link: "/profile",
                label: "My Profile",
                icon: <User />,
                isActive: pathname.includes("/profile"),
            },
            {
                link: "/help",
                label: "Help",
                icon: <HelpCircle />,
                isActive: pathname.includes("/help"),
            },
        ];

        switch (user.role) {
            case "ADMIN":
                return [
                    {
                        link: "/admin/dashboard",
                        label: "Admin Dashboard",
                        icon: <LayoutDashboard />,
                        isActive: pathname.includes("/admin/dashboard"),
                    },
                    {
                        link: "/admin/users",
                        label: "Manage Users",
                        icon: <Users />,
                        isActive: pathname.includes("/admin/users"),
                    },
                    {
                        link: "/admin/products",
                        label: "Manage Products",
                        icon: <Package />,
                        isActive: pathname.includes("/admin/products"),
                    },
                    ...commonLinks,
                ];
            case "SELLER":
                return [
                    {
                        link: "/seller/dashboard",
                        label: "Seller Dashboard",
                        icon: <LayoutDashboard />,
                        isActive: pathname.includes("/seller/dashboard"),
                    },
                    {
                        link: "/seller/products",
                        label: "My Products",
                        icon: <Package />,
                        isActive: pathname.includes("/seller/products"),
                    },
                    {
                        link: "/seller/orders",
                        label: "Orders",
                        icon: <ShoppingBag />,
                        isActive: pathname.includes("/seller/orders"),
                    },
                    ...commonLinks,
                ];
            case "CUSTOMER":
                return [
                    {
                        link: "/customer/home",
                        label: "My Account",
                        icon: <User />,
                        isActive: pathname.includes("/customer/home"),
                    },
                    {
                        link: "/wishlist",
                        label: "Wishlist",
                        icon: <Heart />,
                        isActive: pathname.includes("/wishlist"),
                    },
                    {
                        link: "/my-orders",
                        label: "My Orders",
                        icon: <ListOrdered />,
                        isActive: pathname.includes("/my-orders"),
                    },
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

    const userLinks = getRoutesByRole();

    return (
        <div className="hidden lg:block">
            <Popover>
                <PopoverTrigger className="flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 duration-200 p-2 rounded-md">
                    <User size={25} />
                </PopoverTrigger>
                <PopoverContent className="rounded-2xl w-64">
                    <ul className="space-y-1 text-center">
                        <UserAvatar />
                        {user && (
                            <div className="flex justify-center mb-2">
                                <Badge className={getRoleBadgeColor(user.role)}>
                                    <Shield className="h-3 w-3 mr-1" />
                                    {user.role}
                                </Badge>
                            </div>
                        )}
                        <Separator className="!my-2" />
                        {userLinks.map((link) => (
                            <Link
                                key={link.link}
                                href={link.link}
                                className={cn(
                                    "flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-md text-left",
                                    link.isActive &&
                                        "bg-gray-200 dark:bg-gray-800"
                                )}
                            >
                                {link.icon} {link.label}
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <>
                                <Separator className="!my-2" />
                                <button className="flex items-center gap-2 p-2 bg-transparent hover:opacity-50 w-full">
                                    <LogOut />
                                    Logout
                                </button>
                            </>
                        )}
                    </ul>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default AccountPopover;
