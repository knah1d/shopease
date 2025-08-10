"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks";
import { toast } from "sonner";

const PaymentFailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { handlePaymentCallback } = usePayment();
    const [isProcessing, setIsProcessing] = useState(true);
    const [failureReason, setFailureReason] = useState<string>("");

    useEffect(() => {
        const handlePaymentFailure = async () => {
            try {
                // Get parameters from URL
                const transactionId = searchParams.get("tran_id");
                const amount = searchParams.get("amount");
                const orderId = searchParams.get("val_id");
                const status = searchParams.get("status");
                const failReason =
                    searchParams.get("failedreason") || "Payment failed";

                setFailureReason(failReason);

                if (transactionId && orderId) {
                    const callbackData = {
                        transactionId,
                        status: status || "FAILED",
                        amount: amount ? parseFloat(amount) : undefined,
                        orderId,
                        gatewayResponse: Object.fromEntries(
                            searchParams.entries()
                        ),
                    };

                    await handlePaymentCallback("fail", callbackData);
                }

                toast.error(`Payment failed: ${failReason}`);
            } catch (error) {
                console.error("Payment failure handling error:", error);
                toast.error(
                    "An error occurred while processing payment failure"
                );
            } finally {
                setIsProcessing(false);
            }
        };

        handlePaymentFailure();
    }, [searchParams, handlePaymentCallback]);

    const handleRetryPayment = () => {
        router.push("/checkout");
    };

    const handleBackToCart = () => {
        router.push("/cart");
    };

    const handleContactSupport = () => {
        router.push("/contact");
    };

    if (isProcessing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Processing Payment Result
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
                    <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Payment Failed
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Unfortunately, your payment could not be processed.
                    </p>
                    {failureReason && (
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
                            <p className="text-red-700 dark:text-red-400 text-sm">
                                <strong>Reason:</strong> {failureReason}
                            </p>
                        </div>
                    )}
                    <div className="space-y-3">
                        <Button onClick={handleRetryPayment} className="w-full">
                            Retry Payment
                        </Button>
                        <Button
                            onClick={handleBackToCart}
                            variant="outline"
                            className="w-full"
                        >
                            Back to Cart
                        </Button>
                        <Button
                            onClick={handleContactSupport}
                            variant="ghost"
                            className="w-full text-sm"
                        >
                            Contact Support
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailPage;
