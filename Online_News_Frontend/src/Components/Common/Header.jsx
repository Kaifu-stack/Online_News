import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
} from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
    const { user, isAuthenticated } = useAuth();

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            {/* 🔹 Top Section */}
            <div className="bg-linear-to-r from-blue-200 to-purple-300 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center flex-wrap gap-4">

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="bg-linear-to-r from-blue-600 to-purple-600 p-4 rounded-lg shadow-md">
                                <svg
                                    className="w-10 h-10 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    NewsPortal
                                </h1>
                                <p className="text-xs text-gray-500 font-medium">
                                    Your Trusted News Source
                                </p>
                            </div>
                        </Link>

                        {/* Date + Socials */}
                        <div className="flex items-center gap-6 text-gray-600">
                            <span className="text-sm hidden md:block">{currentDate}</span>

                            <div className="flex space-x-3 text-lg">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-blue-600 transition"
                                >
                                    <FaFacebook />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-sky-500 transition"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-pink-500 transition"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-red-600 transition"
                                >
                                    <FaYoutube />
                                </a>
                            </div>

                            {/* Optional Greeting for Logged-in Users */}
                            {isAuthenticated && (
                                <div className="text-sm font-semibold text-gray-700 hidden sm:block">
                                    👋 Welcome, {user?.name || 'User'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 Breaking News Section */}
            <div className="bg-red-600 text-white py-2 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4">
                        <span className="bg-white text-red-600 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">
                            BREAKING NEWS
                        </span>
                        <div className="flex-1 overflow-hidden">
                            <div className="animate-marquee whitespace-nowrap">
                                <span className="inline-block px-4">
                                    🔴 Latest: Major technology breakthrough announced today
                                </span>
                                <span className="inline-block px-4">
                                    🔴 Breaking: International summit concludes with historic agreement
                                </span>
                                <span className="inline-block px-4">
                                    🔴 Update: Market reaches all-time high amid economic recovery
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
