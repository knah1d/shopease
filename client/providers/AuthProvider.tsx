"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { User, LoginUserRequest, RegisterUserRequest } from "@/types/user";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginUserRequest) => Promise<any>;
    register: (userData: RegisterUserRequest) => Promise<any>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
