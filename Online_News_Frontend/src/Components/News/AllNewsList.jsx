import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { newsService } from '../Service/newsService';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from "../Context/AuthContext";

const AllNewsList = () => {

    // 🔥 FIXED: correct way to detect admin
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const categories = ['all', 'politics', 'business', 'technology', 'sports', 'entertainment', 'health'];

    useEffect(() => {
        fetchNews();
    }, [currentPage, categoryFilter]);

    const fetchNews = async () => {
        try {
            setLoading(true);

            const filters = categoryFilter !== 'all' ? { category: categoryFilter } : {};
            const response = await newsService.getNews(currentPage, 10, filters);

            // 🔥 CLEAN & ACCURATE RESPONSE EXTRACTION
            if (response.success) {
                const data = response.data?.data || {};
                setNews(data.news || []);
                setTotalPages(data.totalPages || 1);
            } else {
                setNews([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('❌ Error fetching news:', error.message);
            toast.error('Failed to fetch news.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            const result = await newsService.deleteNews(id);
            if (result.success) {
                toast.success('🗑️ News deleted successfully');
                fetchNews();
            } else {
                toast.error('Failed to delete news');
            }
        }
    };

    const filteredNews = Array.isArray(news)
        ? news.filter((item) =>
            item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const getCategoryColor = (category) => {
        const colors = {
            politics: 'bg-blue-100 text-blue-700',
            business: 'bg-green-100 text-green-700',
            technology: 'bg-purple-100 text-purple-700',
            sports: 'bg-orange-100 text-orange-700',
            entertainment: 'bg-pink-100 text-pink-700',
            health: 'bg-red-100 text-red-700',
        };
        return colors[category?.toLowerCase()] || 'bg-gray-100 text-gray-700';
    };

    const isValidDate = (date) => {
        const parsed = new Date(date);
        return date && !isNaN(parsed);
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">All News Articles</h1>
                    <p className="text-gray-600 mt-1">Manage all your news content</p>
                </div>

                {isAdmin && (
                    <Link
                        to="/admin/news/create"
                        className="btn-primary flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        <FaPlus />
                        <span>Create News</span>
                    </Link>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-600 text-sm mb-2">Total Articles</p>
                    <p className="text-3xl font-bold text-gray-900">{news?.length || 0}</p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-600 text-sm mb-2">Published Today</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {Array.isArray(news)
                            ? news.filter((n) => {
                                if (!isValidDate(n.createdAt)) return false;
                                return (
                                    format(new Date(n.createdAt), 'yyyy-MM-dd') ===
                                    format(new Date(), 'yyyy-MM-dd')
                                );
                            }).length
                            : 0}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-600 text-sm mb-2">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {Array.isArray(news)
                            ? news.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()
                            : 0}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search news by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <FaFilter className="text-gray-400" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => {
                                setCategoryFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="input-field border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : filteredNews.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No news articles found</p>

                        {isAdmin && (
                            <Link
                                to="/admin/news/create"
                                className="btn-primary mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Create First Article
                            </Link>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">

                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredNews.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50">

                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-16 h-16 rounded-lg object-cover mr-4"
                                                        />
                                                    )}
                                                    <div className="max-w-md">
                                                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                                            {item.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getCategoryColor(item.category)}`}>
                                                    {item.category}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.author?.name || 'Anonymous'}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center">
                                                    <FaEye className="text-gray-400 mr-1" />
                                                    {item.views || 0}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {isValidDate(item.createdAt)
                                                    ? format(new Date(item.createdAt), 'MMM dd, yyyy')
                                                    : '—'}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-3">

                                                    <Link
                                                        to={`/news/${item._id}`}
                                                        target="_blank"
                                                        className="text-gray-600 hover:text-gray-900"
                                                        title="View"
                                                    >
                                                        <FaEye className="text-lg" />
                                                    </Link>

                                                    {isAdmin && (
                                                        <Link
                                                            to={`/admin/news/edit/${item._id}`}
                                                            className="text-blue-600 hover:text-blue-800"
                                                            title="Edit"
                                                        >
                                                            <FaEdit className="text-lg" />
                                                        </Link>
                                                    )}

                                                    {isAdmin && (
                                                        <button
                                                            onClick={() => handleDelete(item._id)}
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Delete"
                                                        >
                                                            <FaTrash className="text-lg" />
                                                        </button>
                                                    )}

                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    Previous
                                </button>

                                <span className="text-gray-600 font-medium">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}

                    </>
                )}

            </div>
        </div>
    );
};

export default AllNewsList;
