"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";

const PaymentSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { handlePaymentCallback, checkPaymentStatus } = usePayment();
    const { clearCart } = useCartStore();
    const [isVerifying, setIsVerifying] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<
        "verifying" | "success" | "failed"
    >("verifying");

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Get parameters from URL
                const transactionId = searchParams.get("tran_id");
                const amount = searchParams.get("amount");
                const orderId = searchParams.get("val_id");
                const status = searchParams.get("status");

                if (!transactionId || !orderId) {
                    toast.error("Missing payment information");
                    setPaymentStatus("failed");
                    return;
                }

                // Handle payment success callback
                const callbackData = {
                    transactionId,
                    status: status || "VALID",
                    amount: amount ? parseFloat(amount) : undefined,
                    orderId,
                    gatewayResponse: Object.fromEntries(searchParams.entries()),
                };

                await handlePaymentCallback("success", callbackData);

                // Verify payment status
                const statusResponse = await checkPaymentStatus(transactionId);

                if (statusResponse.status === "COMPLETED") {
                    setPaymentStatus("success");
                    clearCart(); // Clear cart on successful payment
                    toast.success("Payment completed successfully!");
                } else {
                    setPaymentStatus("failed");
                    toast.error("Payment verification failed");
                }
            } catch (error) {
                console.error("Payment verification failed:", error);
                setPaymentStatus("failed");
                toast.error("Failed to verify payment");
            } finally {
                setIsVerifying(false);
            }
        };

        verifyPayment();
    }, [searchParams, handlePaymentCallback, checkPaymentStatus, clearCart]);

    const handleContinueShopping = () => {
        router.push("/shop");
    };

    const handleViewOrders = () => {
        router.push("/my-orders");
    };

    if (isVerifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <Clock className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Verifying Payment
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Please wait while we confirm your payment...
                    </p>
                </div>
            </div>
        );
    }

    if (paymentStatus === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Payment Successful!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Thank you for your purchase. Your order has been
                            confirmed and will be processed shortly.
                        </p>
                        <div className="space-y-3">
                            <Button
                                onClick={handleViewOrders}
                                className="w-full"
                            >
                                View My Orders
                            </Button>
                            <Button
                                onClick={handleContinueShopping}
                                variant="outline"
                                className="w-full"
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                    <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Payment Verification Failed
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        We couldn't verify your payment. Please contact support
                        if you believe this is an error.
                    </p>
                    <div className="space-y-3">
                        <Button
                            onClick={handleContinueShopping}
                            className="w-full"
                        >
                            Back to Shop
                        </Button>
                        <Button
                            onClick={() => router.push("/contact")}
                            variant="outline"
                            className="w-full"
                        >
                            Contact Support
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
