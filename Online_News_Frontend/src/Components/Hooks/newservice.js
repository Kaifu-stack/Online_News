import axios from "axios";
import { toast } from "react-toastify";

//  Backend base URL
const API_URL = `${import.meta.env.VITE_API_URL}/api/news`;

//  Helper for Authorization
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
};

export const newsService = {

    //  Fetch paginated news
    getNews: async (page = 1, limit = 10, filters = {}) => {
        try {
            const response = await axios.get(API_URL, {
                params: { page, limit, ...filters },
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching news:", error);
            toast.error("⚠️ Failed to load news");
            return { success: false };
        }
    },

    //  Get news by ID
    getNewsById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error loading news:", error);
            toast.error("❌ Failed to load news details");
            return { success: false };
        }
    },

    //  Get news by category
    getNewsByCategory: async (category, page = 1, limit = 10) => {
        try {
            const response = await axios.get(
                `${API_URL}/category/${category}`,
                { params: { page, limit } }
            );

            return {
                success: true,
                data: response.data.data || { news: [], totalPages: 1 },
            };
        } catch (error) {
            console.error(`Error fetching ${category} news:`, error);
            toast.error(`❌ Failed to load ${category} news`);
            return { success: false };
        }
    },

    //  Get trending news
    getTrendingNews: async (limit = 5) => {
        try {
            const response = await axios.get(`${API_URL}/trending`, {
                params: { limit },
            });

            return {
                success: true,
                data: response.data.data || [],
            };
        } catch (error) {
            console.error("Error fetching trending news:", error);
            toast.error("⚡ Failed to load trending news");
            return { success: false };
        }
    },

    //  Create news
    createNews: async (newsData) => {
        try {
            const response = await axios.post(
                API_URL,
                newsData,
                getAuthHeaders()
            );
            toast.success("✅ News created successfully");
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error creating news:", error);
            toast.error("❌ Failed to create news");
            return { success: false };
        }
    },

    //  Update news
    updateNews: async (id, newsData) => {
        try {
            const response = await axios.put(
                `${API_URL}/${id}`,
                newsData,
                getAuthHeaders()
            );
            toast.success("✅ News updated successfully");
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error updating news:", error);
            toast.error("❌ Failed to update news");
            return { success: false };
        }
    },

    // Delete news
    deleteNews: async (id) => {
        try {
            const response = await axios.delete(
                `${API_URL}/${id}`,
                getAuthHeaders()
            );
            toast.success("🗑 News deleted successfully");
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error deleting news:", error);
            toast.error("⚠️ Failed to delete news");
            return { success: false };
        }
    },

    // Increment view count (FIXED)
    incrementViews: async (id) => {
        try {
            await axios.post(`${API_URL}/${id}/increment-views`);
            return { success: true };
        } catch (error) {
            console.error("View increment failed:", error);
            return { success: false };
        }
    },
};
