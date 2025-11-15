import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from '../Context/NewsContext';
import NewsList from '../News/AllNewsList';
import Loader from '../Common/Loader';
import { FaSearch } from 'react-icons/fa';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const { news, loading, searchNews } = useNews();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (query) {
            searchNews(query, currentPage);
        }
    }, [query, currentPage]);

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <FaSearch className="text-primary-500 text-5xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Search Results
                    </h1>
                    <p className="text-xl text-gray-600">
                        Showing results for: <span className="font-semibold">"{query}"</span>
                    </p>
                </div>

                {loading ? (
                    <Loader />
                ) : news.length > 0 ? (
                    <NewsList news={news} />
                ) : (
                    <div className="bg-white rounded-lg shadow-card p-12 text-center">
                        <p className="text-xl text-gray-500">
                            No results found for "{query}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;