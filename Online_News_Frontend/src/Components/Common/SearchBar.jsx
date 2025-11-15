import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaClock, FaChartLine } from 'react-icons/fa';
import { newsService } from '../Service/newsService';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [trendingSearches, setTrendingSearches] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const debounceTimer = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem('recentSearches');
        if (stored) setRecentSearches(JSON.parse(stored));

        setTrendingSearches([
            'Breaking News',
            'Technology Updates',
            'Sports Highlights',
            'Political Events',
            'Market Analysis',
        ]);

        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsExpanded(false);
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length >= 2) {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => fetchSuggestions(query), 300);
        } else {
            setSuggestions([]);
        }

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [query]);

    const fetchSuggestions = async (searchQuery) => {
        setLoading(true);
        try {
            const response = await newsService.searchNews(searchQuery, 1);

            // FIXED PATH
            const list =
                response.success && response.data?.data?.news
                    ? response.data.data.news
                    : [];

            setSuggestions(list);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) performSearch(query);
    };

    const performSearch = (searchQuery) => {
        const updated = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));

        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setQuery('');
        setIsExpanded(false);
        setSuggestions([]);

        if (onSearch) onSearch();
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const highlightMatch = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.split(regex).map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="bg-yellow-200 font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        placeholder="Search news articles..."
                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('');
                                setSuggestions([]);
                            }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </form>

            {/* Dropdown Results */}
            {isExpanded && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                    {/* Loading */}
                    {loading && query.length >= 2 && (
                        <div className="p-6 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Suggestions */}
                    {!loading && suggestions.length > 0 && (
                        <div className="p-3">
                            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Suggestions</p>
                            {suggestions.map((item) => (
                                <button
                                    key={item._id}
                                    onClick={() => {
                                        navigate(`/news/${item._id}`);
                                        setIsExpanded(false);
                                        setQuery('');
                                        if (onSearch) onSearch();
                                    }}
                                    className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <div className="flex items-start space-x-3">
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-16 h-16 rounded-lg object-cover shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 line-clamp-2">
                                                {highlightMatch(item.title, query)}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1 capitalize">
                                                {item.category} • {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && query.length >= 2 && suggestions.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            <p>No results found for "{query}"</p>
                            <p className="text-sm mt-1">Try different keywords</p>
                        </div>
                    )}

                    {/* Recent Searches */}
                    {query.length === 0 && recentSearches.length > 0 && (
                        <div className="p-3">
                            <div className="flex justify-between items-center px-3 py-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase">Recent Searches</p>
                                <button
                                    onClick={clearRecentSearches}
                                    className="text-xs text-primary-500 hover:text-primary-600 font-medium"
                                >
                                    Clear
                                </button>
                            </div>
                            {recentSearches.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => performSearch(item)}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                                >
                                    <FaClock className="text-gray-400 text-sm" />
                                    <span className="text-gray-700">{item}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Trending Searches */}
                    {query.length === 0 && trendingSearches.length > 0 && (
                        <div className="p-3 border-t border-gray-100">
                            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                Trending Searches
                            </p>
                            {trendingSearches.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => performSearch(item)}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                                >
                                    <FaChartLine className="text-danger-500 text-sm" />
                                    <span className="text-gray-700">{item}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Search Tips */}
                    {query.length === 0 && recentSearches.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            <FaSearch className="text-4xl text-gray-300 mx-auto mb-3" />
                            <p className="text-sm font-medium">Start typing to search</p>
                            <p className="text-xs mt-1">Find articles, topics, and more...</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
