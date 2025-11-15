// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
            }

            req.user = user;
            return next();
        }

        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

module.exports = { protect };
