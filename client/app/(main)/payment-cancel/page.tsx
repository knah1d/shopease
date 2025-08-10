"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Ban, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks";
import { toast } from "sonner";

const PaymentCancelPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { handlePaymentCallback } = usePayment();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const handlePaymentCancel = async () => {
            try {
                // Get parameters from URL
                const transactionId = searchParams.get("tran_id");
                const amount = searchParams.get("amount");
                const orderId = searchParams.get("val_id");
                const status = searchParams.get("status");

                if (transactionId && orderId) {
                    const callbackData = {
                        transactionId,
                        status: status || "CANCELLED",
                        amount: amount ? parseFloat(amount) : undefined,
                        orderId,
                        gatewayResponse: Object.fromEntries(
                            searchParams.entries()
                        ),
                    };

                    await handlePaymentCallback("cancel", callbackData);
                }

                toast.info("Payment was cancelled");
            } catch (error) {
                console.error("Payment cancellation handling error:", error);
                toast.error(
                    "An error occurred while processing payment cancellation"
                );
            } finally {
                setIsProcessing(false);
            }
        };

        handlePaymentCancel();
    }, [searchParams, handlePaymentCallback]);

    const handleRetryPayment = () => {
        router.push("/checkout");
    };

    const handleBackToCart = () => {
        router.push("/cart");
    };

    const handleContinueShopping = () => {
        router.push("/shop");
    };

    if (isProcessing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <Clock className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Processing Cancellation
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Please wait...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                    <Ban className="w-20 h-20 text-orange-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Payment Cancelled
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        You have cancelled the payment process. Your order has
                        not been completed and your cart items are still
                        available.
                    </p>
                    <div className="space-y-3">
                        <Button onClick={handleRetryPayment} className="w-full">
                            Try Again
                        </Button>
                        <Button
                            onClick={handleBackToCart}
                            variant="outline"
                            className="w-full"
                        >
                            Back to Cart
                        </Button>
                        <Button
                            onClick={handleContinueShopping}
                            variant="ghost"
                            className="w-full"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelPage;
