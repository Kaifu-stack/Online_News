import React, { createContext, useState, useContext } from 'react';
import { newsService } from '../Service/newsService';
import { toast } from 'react-toastify';

const NewsContext = createContext(null);

export const useNews = () => {
    const context = useContext(NewsContext);
    if (!context) {
        throw new Error('useNews must be used within NewsProvider');
    }
    return context;
};

export const NewsProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    // ✅ Fetch All News
    const fetchNews = async (page = 1, limit = 10, filters = {}) => {
        setLoading(true);
        try {
            const response = await newsService.getNews(page, limit, filters);

            if (response.success) {
                const data = response.data?.data || {};
                setNews(data.news || []);
                setTotalPages(data.totalPages || 1);
            }
            return response;
        } catch (error) {
            toast.error("Failed to fetch news");
            console.error("❌ Error fetching news:", error);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch News By Category (FIXED)
    const fetchNewsByCategory = async (category, page = 1) => {
        setLoading(true);
        try {
            const response = await newsService.getNewsByCategory(category, page);

            if (response.success && response.data) {
                // backend returns: { news, totalPages }
                setNews(response.data.news || []);
                setTotalPages(response.data.totalPages || 1);
            } else {
                setNews([]);
                setTotalPages(1);
            }

            return response;
        } catch (error) {
            console.error("❌ Failed to fetch news by category:", error.message);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch News By ID
    const fetchNewsById = async (id) => {
        setLoading(true);
        try {
            return await newsService.getNewsById(id);
        } catch (error) {
            toast.error("Failed to fetch news details");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // ✅ Search News (FIXED)
    const searchNews = async (query, page = 1) => {
        setLoading(true);
        try {
            const response = await newsService.searchNews(query, page);

            if (response.success) {
                const data = response.data?.data || {};
                setNews(data.news || []);
                setTotalPages(data.totalPages || 1);
            }

            return response;
        } catch (error) {
            toast.error("Search failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // ✅ Create News
    const createNews = async (newsData) => {
        try {
            const response = await newsService.createNews(newsData);
            if (response.success) {
                toast.success("✅ News created successfully");
                return { success: true, data: response.data };
            }
            toast.error(response.message || "Failed to create news");
            return { success: false };
        } catch {
            toast.error("Failed to create news");
            return { success: false };
        }
    };

    // ✅ Update News
    const updateNews = async (id, newsData) => {
        try {
            const response = await newsService.updateNews(id, newsData);
            if (response.success) {
                toast.success("✅ News updated successfully");
                return { success: true, data: response.data };
            }
            toast.error(response.message || "Failed to update news");
            return { success: false };
        } catch {
            toast.error("Failed to update news");
            return { success: false };
        }
    };

    // ✅ Delete News
    const deleteNews = async (id) => {
        try {
            const response = await newsService.deleteNews(id);

            if (response.success) {
                toast.success("🗑️ News deleted successfully");
                setNews((prev) => prev.filter((item) => item._id !== id));
                return { success: true };
            }

            toast.error(response.message || "Failed to delete news");
            return { success: false };

        } catch {
            toast.error("Failed to delete news");
            return { success: false };
        }
    };

    const value = {
        news,
        loading,
        totalPages,
        fetchNews,
        fetchNewsByCategory,
        fetchNewsById,
        searchNews,
        createNews,
        updateNews,
        deleteNews,
    };

    return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
