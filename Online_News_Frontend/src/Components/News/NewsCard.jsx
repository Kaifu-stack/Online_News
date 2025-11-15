import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaEye, FaUser } from 'react-icons/fa';
import { format } from 'date-fns';

const NewsCard = ({ news }) => {
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

    return (
        <Link to={`/news/${news._id}`}>
            <div className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={news.image || 'https://via.placeholder.com/400x300?text=News+Image'}
                        alt={news.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    <span className={`absolute top-4 left-4 badge ${getCategoryColor(news.category)}`}>
                        {news.category}
                    </span>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
                        {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {news.excerpt || news.content?.substring(0, 150) + '...'}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <FaUser className="text-gray-400" />
                                <span>{news.author?.name || 'Anonymous'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaClock className="text-gray-400" />
                                <span>{format(new Date(news.createdAt), 'MMM dd, yyyy')}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FaEye className="text-gray-400" />
                            <span>{news.views || 0} views</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;