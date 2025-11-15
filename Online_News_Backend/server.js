require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const seedAdmin = require('./config/SeedAdmin');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

app.get('/', (req, res) => res.send({ success: true, message: 'API running' }));

// DB + start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
    try {
        if (!MONGO_URI) throw new Error('MONGO_URI not set in .env');
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB connected');

        // Seed admin (safe: will not duplicate)
        await seedAdmin();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Server start error:', err);
        process.exit(1);
    }
};

start();
