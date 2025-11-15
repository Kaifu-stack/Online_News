import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaClock, FaRegEye } from 'react-icons/fa';
import { newsService } from '../Service/newsService';
import { format } from 'date-fns';

const TrendingNews = () => {
    const [trendingNews, setTrendingNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrendingNews();
    }, []);

    const fetchTrendingNews = async () => {
        try {
            setLoading(true);

            const response = await newsService.getTrendingNews(5);

            if (response.success) {
                // FIX: backend returns { success, data: [...] }
                const data = Array.isArray(response.data)
                    ? response.data
                    : response.data?.news || response.data?.data || [];

                setTrendingNews(data);
            } else {
                setTrendingNews([]);
            }
        } catch (error) {
            console.error("Error loading trending news:", error);
            setTrendingNews([]);
        } finally {
            setLoading(false);
        }
    };

    // Loading
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow p-6 space-y-4 animate-pulse">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                </div>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
                ))}
            </div>
        );
    }

    // Empty
    if (!trendingNews.length) {
        return (
            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                No trending news available 🔕
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-5">
                <FaFire className="text-orange-500 text-2xl animate-pulse" />
                <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
            </div>

            <div className="space-y-4">
                {trendingNews.map((news, index) => (
                    <Link
                        key={news._id}
                        to={`/news/${news._id}`}
                        className="block group hover:bg-gray-50 p-2 rounded-lg transition"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-linear-to-r from-orange-400 to-red-500 text-white font-semibold text-xs shadow">
                                {index + 1}
                            </span>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 text-sm group-hover:text-orange-500 transition line-clamp-2">
                                    {news.title}
                                </h3>

                                <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                                    <FaClock className="text-gray-400" />
                                    <span>{news.createdAt ? format(new Date(news.createdAt), "MMM dd") : ""}</span>
                                    <span>•</span>
                                    <FaRegEye className="text-gray-400" />
                                    <span>{news.views || 0}</span>
                                </div>
                            </div>

                            {news.image && (
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-14 h-14 object-cover rounded-md border border-gray-100"
                                />
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TrendingNews;
