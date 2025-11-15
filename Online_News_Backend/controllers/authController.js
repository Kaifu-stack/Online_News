// controllers/authController.js
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailLower = email.toLowerCase();

        const existing = await User.findOne({ email: emailLower });
        if (existing) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
        const role = emailLower === adminEmail ? "admin" : "user";

        // ❗ FIX: Create document first then save() — ensures pre('save') runs
        const user = new User({
            name,
            email: emailLower,
            password,
            role,
        });

        await user.save(); // 🔥 Password hashing runs here

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                token: generateToken(user._id),
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error("❌ Register Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailLower = (email || "").toLowerCase();
        const user = await User.findOne({ email: emailLower });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token: generateToken(user._id),
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error("❌ Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports = { registerUser, loginUser };
