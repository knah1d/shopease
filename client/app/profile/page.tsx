"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Edit,
    Save,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/services/userService";

const ProfilePage = () => {
    const { user, refreshProfile } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                address: user.address || "",
            });
        }
    }, [user]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            // Here you would call an API to update the user profile
            // For now, we'll just simulate a successful update
            toast.success("Profile updated successfully!");
            await refreshProfile();
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile");
            console.error("Profile update error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                address: user.address || "",
            });
        }
        setIsEditing(false);
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

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        No user data found
                    </h2>
                    <p className="text-gray-600">
                        Please sign in to view your profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Profile
                    </h1>
                    <p className="text-gray-600">
                        Manage your account information
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Profile Information Card */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Profile Information
                                    </CardTitle>
                                    <CardDescription>
                                        Your account details and contact
                                        information
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        className={getRoleBadgeColor(user.role)}
                                    >
                                        <Shield className="h-3 w-3 mr-1" />
                                        {user.role}
                                    </Badge>
                                    {!isEditing ? (
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Edit className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                    ) : (
                                        <div className="flex gap-1">
                                            <Button
                                                onClick={handleSave}
                                                size="sm"
                                                disabled={isLoading}
                                            >
                                                <Save className="h-4 w-4 mr-1" />
                                                Save
                                            </Button>
                                            <Button
                                                onClick={handleCancel}
                                                variant="outline"
                                                size="sm"
                                                disabled={isLoading}
                                            >
                                                <X className="h-4 w-4 mr-1" />
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    {isEditing ? (
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-900">
                                                {user.name}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-900">
                                            {user.email}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Email cannot be changed
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    {isEditing ? (
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-900">
                                                {user.phone || "Not provided"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                                        <Shield className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-900">
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                {isEditing ? (
                                    <Textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your address"
                                        rows={3}
                                    />
                                ) : (
                                    <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-md">
                                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                        <span className="text-gray-900">
                                            {user.address || "Not provided"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Status</CardTitle>
                            <CardDescription>
                                Your account information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Account Status
                                </span>
                                <Badge
                                    variant={
                                        user.isActive
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    User ID
                                </span>
                                <span className="text-sm font-mono text-gray-900">
                                    {user.id}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">
                                        Member since
                                    </span>
                                    <p className="text-sm text-gray-900">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common account actions
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Shield className="h-4 w-4 mr-2" />
                                Change Password
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Mail className="h-4 w-4 mr-2" />
                                Email Preferences
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                disabled
                            >
                                <User className="h-4 w-4 mr-2" />
                                Delete Account
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
