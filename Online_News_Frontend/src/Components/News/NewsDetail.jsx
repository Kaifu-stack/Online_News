import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaClock, FaUser, FaEye, FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { useNews } from '../Context/NewsContext';
import { newsService } from '../Hooks/newservice';
import Loader from '../Common/Loader';

const NewsDetailPage = () => {
    const { id } = useParams();
    const { fetchNewsById } = useNews();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedNews, setRelatedNews] = useState([]);

    useEffect(() => {
        loadNewsDetail();
        // Increment view count
        newsService.incrementViews(id);
    }, [id]);

    const loadNewsDetail = async () => {
        setLoading(true);
        const response = await fetchNewsById(id);
        if (response.success) {
            setNews(response.data);
            // Fetch related news
            if (response.data.category) {
                const relatedResponse = await newsService.getNewsByCategory(
                    response.data.category,
                    1,
                    4
                );
                if (relatedResponse.success) {
                    setRelatedNews(
                        relatedResponse.data.news.filter((item) => item._id !== id)
                    );
                }
            }
        }
        setLoading(false);
    };

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

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: news.title,
                text: news.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20">
                <Loader />
            </div>
        );
    }

    if (!news) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">News Not Found</h2>
                    <Link to="/" className="btn-primary">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-500 mb-6 transition-colors"
                >
                    <FaArrowLeft />
                    <span>Back to News</span>
                </Link>

                {/* Main Article */}
                <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    {/* Featured Image */}
                    {news.image && (
                        <div className="relative h-96">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover"
                            />
                            <span
                                className={`absolute top-6 left-6 badge text-base ${getCategoryColor(
                                    news.category
                                )}`}
                            >
                                {news.category}
                            </span>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {news.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <FaUser className="text-gray-400" />
                                <span>{news.author?.name || 'Anonymous'}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <FaClock className="text-gray-400" />
                                <span>{format(new Date(news.createdAt), 'MMMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <FaEye className="text-gray-400" />
                                <span>{news.views || 0} views</span>
                            </div>
                            <button
                                onClick={handleShare}
                                className="ml-auto flex items-center space-x-2 text-primary-500 hover:text-primary-600 transition-colors"
                            >
                                <FaShareAlt />
                                <span>Share</span>
                            </button>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                                {news.content}
                            </p>
                        </div>

                        {/* Tags */}
                        {news.tags && news.tags.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                    {news.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedNews.map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/news/${item._id}`}
                                    className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <div className="flex h-full">
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-32 h-32 object-cover"
                                            />
                                        )}
                                        <div className="p-4 flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsDetailPage;