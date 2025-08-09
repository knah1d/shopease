"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define Zod schema for form validation
const signUpSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
        role: z.enum(["CUSTOMER", "SELLER"], {
            required_error: "Please select a role",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>("");
    const { register: registerUser } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true);
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: data.role,
            });
            toast.success("Account created successfully! Please sign in.");
            router.push("/sign-in");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Registration failed"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-2">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Create an Account
                </h2>
                <div>
                    <Button className="w-full p-6 flex items-center justify-center gap-2 text-lg rounded-lg focus:outline-none mt-6">
                        <FaGoogle size={25} /> Sign Up With Google
                    </Button>
                    <p className="text-lg font-bold my-2 text-center">OR</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Full Name
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            className={`w-full border ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            placeholder="Your Email"
                            id="email"
                            className={`w-full border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Phone Number
                        </Label>
                        <Input
                            type="tel"
                            placeholder="Your Phone Number"
                            id="phone"
                            className={`w-full border ${
                                errors.phone
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Account Type
                        </Label>
                        <Select
                            value={selectedRole}
                            onValueChange={(value) => {
                                setSelectedRole(value);
                            }}
                        >
                            <SelectTrigger
                                className={`w-full ${
                                    errors.role
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            >
                                <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CUSTOMER">
                                    Customer - Buy products
                                </SelectItem>
                                <SelectItem value="SELLER">
                                    Seller - Sell products
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <input
                            type="hidden"
                            {...register("role")}
                            value={selectedRole}
                        />
                        {errors.role && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.role.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="******"
                            className={`w-full border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="******"
                            className={`w-full border ${
                                errors.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link className="underline" href="/sign-in">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
