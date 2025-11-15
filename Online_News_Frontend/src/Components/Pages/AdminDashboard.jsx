import React from "react";
import { Routes, Route } from "react-router-dom";

// Admin Components
import AdminSidebar from "../Admin/AdminSidebar";
import NewsDashboard from "../Admin/NewsDashboard";
import NewsForm from "../Admin/NewsForm";
import UserManagement from "../Admin/UserManagement";

// Local Page Components (defined in this file)
const AnalyticsPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600 mt-1">Track your portal's performance</p>
            </div>

            {/* Sample Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Page Views", value: "125,456", change: "↑ 12%" },
                    { label: "Unique Visitors", value: "42,350", change: "↑ 8%" },
                    { label: "Avg. Session Duration", value: "3:24", change: "↓ 2%", negative: true },
                    { label: "Bounce Rate", value: "34.5%", change: "↓ 5%" }
                ].map((card, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-card p-6">
                        <p className="text-gray-600 text-sm mb-2">{card.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                        <p className={`text-sm mt-2 ${card.negative ? "text-red-600" : "text-green-600"}`}>
                            {card.change} from last month
                        </p>
                    </div>
                ))}
            </div>

            {/* Traffic Overview */}
            <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Traffic Overview</h2>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart visualization would go here</p>
                </div>
            </div>

            {/* Top Articles */}
            <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Articles</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-900">Article Title {i}</h3>
                                <p className="text-sm text-gray-500">Technology • 2 days ago</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">
                                    {(5000 - i * 500).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">views</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ========================================
// SETTINGS PAGE
// ========================================
const SettingsPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your portal settings</p>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6 space-y-6">
                {/* Site Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                    </label>
                    <input
                        type="text"
                        defaultValue="NewsPortal"
                        className="input-field"
                        placeholder="Enter site name"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                    </label>
                    <textarea
                        rows={3}
                        defaultValue="Your trusted source for latest news"
                        className="input-field"
                        placeholder="Enter site description"
                    ></textarea>
                </div>

                {/* Contact Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        defaultValue="contact@newsportal.com"
                        className="input-field"
                        placeholder="Enter contact email"
                    />
                </div>

                {/* Toggles */}
                {[
                    {
                        title: "Email Notifications",
                        desc: "Receive notifications for new comments",
                        defaultChecked: true,
                    },
                    {
                        title: "Maintenance Mode",
                        desc: "Temporarily disable the site",
                        defaultChecked: false,
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between py-3 border-t border-gray-200"
                    >
                        <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked={item.defaultChecked}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:left-0.5 after:top-0.5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                    </div>
                ))}

                <button className="btn-primary mt-4">Save Changes</button>
            </div>
        </div>
    );
};

// ========================================
// MAIN ADMIN DASHBOARD
// ========================================
const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex pt-16">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 transition-all">
                <div className="p-8">
                    <Routes>
                        <Route index element={<NewsDashboard />} />
                        <Route path="news" element={<NewsDashboard />} />
                        <Route path="news/create" element={<NewsForm />} />
                        <Route path="news/edit/:id" element={<NewsForm isEdit={true} />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
