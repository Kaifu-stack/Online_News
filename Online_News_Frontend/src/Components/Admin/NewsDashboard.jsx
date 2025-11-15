import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaNewspaper,
    FaUsers,
    FaEye,
    FaChartLine,
    FaEdit,
    FaTrash,
    FaPlus,
} from 'react-icons/fa';
import { newsService } from '../Service/newsService';   // ✅ FIXED IMPORT
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const NewsDashboard = () => {
    const [stats, setStats] = useState({
        totalNews: 0,
        totalViews: 0,
        totalUsers: 0,
        recentNews: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);

        try {
            const response = await newsService.getNews(1, 50);

            if (response.success && response.data?.data) {
                const news = response.data.data.news || [];

                setStats({
                    totalNews: response.data.data.total || news.length,
                    totalViews: news.reduce((sum, n) => sum + (n.views || 0), 0),
                    totalUsers: 150, // Backend required
                    recentNews: news.slice(0, 5),
                });
            }
        } catch (err) {
            console.error("Dashboard Error:", err);
            toast.error("Failed to load dashboard data");
        }

        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this news?")) return;

        const result = await newsService.deleteNews(id);
        if (result.success) {
            toast.success("Deleted successfully");
            fetchDashboardData();
        }
    };

    const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
        <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`${bgColor} ${color} p-4 rounded-lg`}>
                    <Icon className="text-2xl" />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
                </div>

                <Link to="/admin/news/create" className="btn-primary flex items-center space-x-2">
                    <FaPlus /> <span>Create News</span>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={FaNewspaper}
                    title="Total News"
                    value={stats.totalNews}
                    color="text-blue-600"
                    bgColor="bg-blue-100"
                />

                <StatCard
                    icon={FaEye}
                    title="Total Views"
                    value={stats.totalViews.toLocaleString()}
                    color="text-green-600"
                    bgColor="bg-green-100"
                />

                <StatCard
                    icon={FaUsers}
                    title="Total Users"
                    value={stats.totalUsers}
                    color="text-purple-600"
                    bgColor="bg-purple-100"
                />

                <StatCard
                    icon={FaChartLine}
                    title="Avg. Views/News"
                    value={stats.totalNews ? Math.round(stats.totalViews / stats.totalNews) : 0}
                    color="text-orange-600"
                    bgColor="bg-orange-100"
                />
            </div>

            {/* Recent News */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">Recent News</h2>
                        <Link to="/admin/news" className="text-primary-500 hover:text-primary-600">
                            View All →
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {stats.recentNews.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {item.image && (
                                                <img src={item.image} className="w-12 h-12 rounded-lg object-cover mr-3" />
                                            )}

                                            <div>
                                                <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 capitalize">{item.category}</td>

                                    <td className="px-6 py-4">{item.views || 0}</td>

                                    <td className="px-6 py-4 text-gray-500">
                                        {format(new Date(item.createdAt), "MMM dd, yyyy")}
                                    </td>

                                    <td className="px-6 py-4 flex space-x-2">
                                        <Link to={`/admin/news/edit/${item._id}`} className="text-primary-600">
                                            <FaEdit />
                                        </Link>

                                        <button onClick={() => handleDelete(item._id)} className="text-danger-600">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default NewsDashboard;
