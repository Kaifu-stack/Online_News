import api from "./api";

export const authService = {

    login: async (email, password) => {
        try {
            const res = await api.post("/api/auth/login", { email, password });

            if (res.data?.success) {
                return {
                    success: true,
                    user: res.data.data.user,
                    token: res.data.data.token,
                    message: res.data.message
                };
            }

            return { success: false, message: res.data?.message };

        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Login failed"
            };
        }
    },

    register: async (userData) => {
        try {
            const res = await api.post("/api/auth/register", userData);

            if (res.data?.success) {
                return {
                    success: true,
                    message: res.data.message || "Registration successful"
                };
            }

            return {
                success: false,
                message: res.data?.message || "Registration failed"
            };

        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    }
};
