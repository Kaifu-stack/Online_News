import React, { useEffect, useState } from 'react';
import { useNews } from '../Context/NewsContext';
import NewsList from '../News/AllNewsList';
import TrendingNews from '../News/TrendingNews';
import Loader from '../Common/Loader';

const Home = () => {
    const { news = [], loading, totalPages = 1, fetchNews } = useNews();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (typeof fetchNews === "function") {
            fetchNews(currentPage, 12, {});
        }
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen py-10 bg-linear-to-r from-blue-200 to-purple-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Latest News
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Stay updated with the latest news from around the world 🌍
                    </p>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-3 space-y-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader />
                            </div>
                        ) : Array.isArray(news) && news.length > 0 ? (
                            <>
                                <NewsList news={news} />

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center space-x-4 mt-8">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`px-5 py-2.5 rounded-lg text-white font-medium shadow transition-all duration-200 
                                                ${currentPage === 1
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-lg'
                                                }`}
                                        >
                                            ← Previous
                                        </button>

                                        <span className="text-gray-700 font-semibold">
                                            Page {currentPage} of {totalPages}
                                        </span>

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`px-5 py-2.5 rounded-lg text-white font-medium shadow transition-all duration-200 
                                                ${currentPage === totalPages
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-linear-to-r from-purple-600 to-blue-600 hover:shadow-lg'
                                                }`}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-10 bg-white rounded-xl shadow">
                                <p className="text-gray-500 text-lg">No news articles found 📰</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow p-4 sticky top-4 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                🔥 Trending
                            </h2>
                            <TrendingNews />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Home;
