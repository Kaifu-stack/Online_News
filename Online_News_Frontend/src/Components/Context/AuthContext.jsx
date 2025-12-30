import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authService } from '../Service/authService';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getStoredUser = () => {
        try {
            const data = localStorage.getItem("user");
            if (!data || data === "undefined" || data === "null") return null;
            return JSON.parse(data);
        } catch {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return null;
        }
    };

    useEffect(() => {
        setUser(getStoredUser());
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const result = await authService.login(email, password);
        if (!result.success) {
            toast.error(result.message);
            return { success: false };
        }

        console.log("🟢 Login successful — saving token");

        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);

        setUser(result.user);

        toast.success("Login successful!");
        return { success: true };
    };

    const register = async (userData) => {
        const result = await authService.register(userData);

        if (!result.success) {
            toast.error(result.message);
            return { success: false };
        }

        toast.success("🎉 Registration successful! Please login.");
        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        toast.info("Logged out");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
                isAdmin: user?.role === "admin",
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
