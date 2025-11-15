import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaHome,
    FaNewspaper,
    FaUsers,
    FaChartBar,
    FaCog,
    FaBars,
    FaTimes,
    FaPlus,
    FaList,
} from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';

const AdminSidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});
    const location = useLocation();
    const { isAdmin } = useAuth();

    const menuItems = [
        { title: 'Dashboard', icon: FaHome, path: '/admin' },

        {
            title: 'News',
            icon: FaNewspaper,
            subItems: [
                { title: 'All News', icon: FaList, path: '/admin/news' },
                ...(isAdmin ? [{ title: 'Create News', icon: FaPlus, path: '/admin/news/create' }] : [])
            ],
        },

        ...(isAdmin
            ? [
                { title: 'Users', icon: FaUsers, path: '/admin/users' },
                { title: 'Analytics', icon: FaChartBar, path: '/admin/analytics' },
                { title: 'Settings', icon: FaCog, path: '/admin/settings' }
            ]
            : [])
    ];

    const isActive = (path) => location.pathname === path;

    const toggleExpand = (title) => {
        setExpandedItems((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const renderMenuItem = (item) => {
        const Icon = item.icon;

        if (item.subItems) {
            const expanded = expandedItems[item.title];

            return (
                <div key={item.title}>
                    <button
                        onClick={() => toggleExpand(item.title)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg"
                    >
                        <div className="flex items-center space-x-3">
                            <Icon className="text-xl" />
                            <span>{item.title}</span>
                        </div>

                        <svg
                            className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {expanded && (
                        <div className="ml-4 mt-2 space-y-1">
                            {item.subItems.map((sub) => {
                                const SubIcon = sub.icon;
                                return (
                                    <Link
                                        key={sub.path}
                                        to={sub.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${isActive(sub.path)
                                                ? "bg-primary-600 text-white"
                                                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                            }`}
                                    >
                                        <SubIcon className="text-lg" />
                                        <span>{sub.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive(item.path)
                        ? "bg-primary-600 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
            >
                <Icon className="text-xl" />
                <span>{item.title}</span>
            </Link>
        );
    };

    return (
        <>
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-20 left-4 z-50 bg-gray-800 text-white p-3 rounded-lg"
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen bg-gray-800 w-64 text-white transition-transform duration-300 z-40 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-2xl font-bold">Admin Panel</h2>
                        <p className="text-gray-400 text-sm">News Portal Management</p>
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                        {menuItems.map((item) => renderMenuItem(item))}
                    </nav>

                    <div className="p-4 border-t border-gray-700">
                        <Link
                            to="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                        >
                            <FaHome />
                            <span>Back to Site</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </>
    );
};

export default AdminSidebar;
