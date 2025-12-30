import api from "./api";

export const newsService = {
    getNews: async (page = 1, limit = 10) => {
        try {
            const res = await api.get(`/api/news`, {
                params: { page, limit }
            });
            return { success: true, data: res.data };
        } catch (error) {
            console.error("❌ Error fetching news:", error);
            return { success: false };
        }
    },

    getTrendingNews: async (limit = 5) => {
        try {
            const res = await api.get(`/api/news/trending`, {
                params: { limit }
            });
            return { success: true, data: res.data.data };
        } catch (error) {
            console.error("❌ Trending error:", error);
            return { success: false };
        }
    },

    getNewsByCategory: async (category, page = 1, limit = 10) => {
        try {
            const res = await api.get(`/api/news/category/${category}`, {
                params: { page, limit }
            });
            return { success: true, data: res.data.data };
        } catch (error) {
            console.error(`❌ Category fetch error (${category}):`, error);
            return { success: false };
        }
    },
    searchNews: async (query, page = 1, limit = 10) => {
        try {
            const res = await api.get(`/api/news/search`, {
                params: { q: query, page, limit },
            });

            return { success: true, data: res.data.data };
        } catch (error) {
            console.error("❌ Search error:", error);
            return { success: false };
        }
    },


    getNewsById: async (id) => {
        try {
            const res = await api.get(`/api/news/${id}`);
            return { success: true, data: res.data.data };
        } catch (error) {
            console.error("❌ Error fetching single news:", error);
            return { success: false };
        }
    },

    createNews: async (data) => {
        try {
            const res = await api.post(`/api/news`, data);
            return { success: true, data: res.data };
        } catch (error) {
            console.error("❌ Create news error:", error);
            return { success: false };
        }
    },

    updateNews: async (id, data) => {
        try {
            const res = await api.put(`/api/news/${id}`, data);
            return { success: true, data: res.data };
        } catch (error) {
            console.error("❌ Update news error:", error);
            return { success: false };
        }
    },

    deleteNews: async (id) => {
        try {
            const res = await api.delete(`/api/news/${id}`);
            return { success: true, data: res.data };
        } catch (error) {
            console.error("❌ Delete news error:", error);
            return { success: false };
        }
    }
};
