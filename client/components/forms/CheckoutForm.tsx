"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useOrders } from "@/hooks";
import { useAuth } from "@/hooks";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Defined Zod schema for form validation
const schema = z.object({
    firstName: z.string().min(3, "First Name is required"),
    lastName: z.string().min(3, "Last Name is required"),
    address: z.string().min(5, "Address is required"),
    phone: z.string().min(8, "Phone is required"),
    city: z.string().min(3, "City is required"),
    zip: z.string().min(5, "ZIP Code is required"),
    country: z.string().min(2, "Country is required"),
});

// Defined types for form data
type FormData = z.infer<typeof schema>;

const CheckoutForm: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { createOrder } = useOrders();
    const { user, isAuthenticated } = useAuth();
    const { cartItems, clearCart } = useCartStore();
    const router = useRouter();

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // Handle form submission
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!isAuthenticated || !user) {
            toast.error("Please sign in to place an order");
            router.push("/sign-in");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setIsProcessing(true);
        try {
            const orderData = {
                items: cartItems.map((item) => ({
                    productId: item.id.toString(),
                    quantity: item.quantity,
                })),
                shippingAddress: {
                    fullName: `${data.firstName} ${data.lastName}`,
                    address: data.address,
                    city: data.city,
                    postalCode: data.zip,
                    country: data.country,
                    phone: data.phone,
                },
            };

            const order = await createOrder(orderData);
            clearCart(); // Clear the cart after successful order
            toast.success("Order placed successfully!");
            router.push(`/my-orders`); // Redirect to orders page
        } catch (error) {
            toast.error("Failed to place order. Please try again.");
            console.error("Order placement failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            {...register("firstName")}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
                        />
                        {errors.firstName && (
                            <span className="text-red-500">
                                {errors.firstName.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
                        />
                        {errors.lastName && (
                            <span className="text-red-500">
                                {errors.lastName.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        {...register("address")}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
                    />
                    {errors.address && (
                        <span className="text-red-500">
                            {errors.address.message}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            type="tel"
                            id="phone"
                            {...register("phone")}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
                        />
                        {errors.phone && (
                            <span className="text-red-500">
                                {errors.phone.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            {...register("city")}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
                        />
                        {errors.city && (
                            <span className="text-red-500">
                                {errors.city.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                            id="zip"
                            {...register("zip")}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
                        />
                        {errors.zip && (
                            <span className="text-red-500">
                                {errors.zip.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            {...register("country")}
                            className="w-full p-6 border border-gray-300 dark:border-gray-700 rounded-lg  focus:outline-none"
                        />
                        {errors.country && (
                            <span className="text-red-500">
                                {errors.country.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <Button
                        type="submit"
                        disabled={isProcessing || cartItems.length === 0}
                        className="disabled:opacity-50"
                    >
                        {isProcessing ? "Placing Order..." : "Place Order"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
