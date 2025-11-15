import axios from "axios";
import { toast } from "react-toastify";

// ✅ Backend base URL
const API_URL = "http://localhost:5000/api/news";

// ✅ Helper for Authorization
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
};

export const newsService = {

    // 📰 Fetch paginated news
    getNews: async (page = 1, limit = 10, filters = {}) => {
        try {
            const response = await axios.get(`${API_URL}`, {
                params: { page, limit, ...filters },
            });

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching news:", error);
            toast.error("⚠️ Failed to load news");
            return { success: false, error };
        }
    },

    // 🔍 Get news by ID
    getNewsById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error loading news:", error);
            toast.error("❌ Failed to load news details");
            return { success: false, error };
        }
    },

    // 📂 Get news by category
    getNewsByCategory: async (category, page = 1, limit = 10) => {
        try {
            const response = await axios.get(`${API_URL}/category/${category}`, {
                params: { page, limit },
            });

            return {
                success: true,
                data: response.data.data || { news: [], totalPages: 1 },
            };
        } catch (error) {
            console.error(`Error fetching ${category} news:`, error);
            toast.error(`❌ Failed to load ${category} news`);
            return { success: false, error };
        }
    },

    // 🔥 Get trending news
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
            return { success: false, error };
        }
    },

    // ✍️ Create news
    createNews: async (newsData) => {
        try {
            const response = await axios.post(API_URL, newsData, getAuthHeaders());
            toast.success("✅ News created successfully");
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error creating news:", error);
            toast.error("❌ Failed to create news");
            return { success: false, error };
        }
    },

    // ✏️ Update news
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
            return { success: false, error };
        }
    },

    // 🗑 Delete news
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
            return { success: false, error };
        }
    },

    // 📤 Upload Image
    uploadImage: async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                ...getAuthHeaders(),
            });

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("❌ Failed to upload image");
            return { success: false, error };
        }
    },

    // 👁 Increment view count
    incrementViews: async (id) => {
        try {
            await axios.post(`${API_URL}/${id}/view`);
            return { success: true };
        } catch {
            return { success: false };
        }
    },
};
