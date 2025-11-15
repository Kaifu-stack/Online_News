import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (adminOnly && !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-2">🚫 Access Denied</h2>
                    <p>You do not have permission to access this page.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="btn-primary mt-4"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
