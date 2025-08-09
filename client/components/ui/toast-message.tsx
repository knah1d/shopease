"use client";

import React from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessageProps {
    type: ToastType;
    title?: string;
    message: string;
    onClose?: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
    type,
    title,
    message,
    onClose,
}) => {
    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle2 className="h-5 w-5 text-green-600" />;
            case "error":
                return <XCircle className="h-5 w-5 text-red-600" />;
            case "warning":
                return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
            case "info":
            default:
                return <Info className="h-5 w-5 text-blue-600" />;
        }
    };

    const getColors = () => {
        switch (type) {
            case "success":
                return "bg-green-50 border-green-200 text-green-800";
            case "error":
                return "bg-red-50 border-red-200 text-red-800";
            case "warning":
                return "bg-yellow-50 border-yellow-200 text-yellow-800";
            case "info":
            default:
                return "bg-blue-50 border-blue-200 text-blue-800";
        }
    };

    return (
        <div
            className={`p-4 rounded-lg border ${getColors()} flex items-start space-x-3`}
        >
            {getIcon()}
            <div className="flex-1">
                {title && <h4 className="font-medium mb-1">{title}</h4>}
                <p className="text-sm">{message}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <XCircle className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default ToastMessage;
