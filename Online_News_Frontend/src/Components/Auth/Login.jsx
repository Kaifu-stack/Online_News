import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    FaEnvelope,
    FaLock,
    FaNewspaper,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);

            const result = await login(values.email, values.password);

            setIsLoading(false);

            if (result.success) {
                navigate("/");
            }
        }
        ,
    });

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <FaNewspaper className="text-blue-600 text-5xl" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
                    <p className="mt-2 text-gray-500 text-sm">
                        Sign in to continue reading top stories
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={formik.handleSubmit} className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    {...formik.getFieldProps("email")}
                                    placeholder="you@example.com"
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg ${formik.touched.email && formik.errors.email
                                        ? "border-red-400"
                                        : "border-gray-200"
                                        }`}
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-sm text-red-500">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...formik.getFieldProps("password")}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-10 py-3 border-2 rounded-lg ${formik.touched.password && formik.errors.password
                                        ? "border-red-400"
                                        : "border-gray-200"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-sm text-red-500">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg text-white font-semibold ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-linear-to-r from-blue-600 to-purple-600"
                                }`}
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-8 flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-3 text-gray-500 text-sm">
                            Don’t have an account?
                        </span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    <Link
                        to="/register"
                        className="mt-6 block text-center w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                    >
                        Create New Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
