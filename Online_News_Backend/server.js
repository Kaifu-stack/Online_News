require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const seedAdmin = require('./config/SeedAdmin');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
    res.send({ success: true, message: 'API is running on Render 🚀' });
});

// DB + Start
const PORT = Number(process.env.PORT) || 5000;
const HOST = '0.0.0.0';
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
    try {
        if (!MONGO_URI) throw new Error('MONGO_URI not set in environment variables');

        await mongoose.connect(MONGO_URI);

        console.log('✅ MongoDB connected');

        // Seed admin user only once
        await seedAdmin();

        app.listen(PORT, HOST, () => {
            console.log(`🚀 Server running at http://${HOST}:${PORT}`);
        });

    } catch (err) {
        console.error('❌ Server start error:', err);
        process.exit(1);
    }
};

start();



