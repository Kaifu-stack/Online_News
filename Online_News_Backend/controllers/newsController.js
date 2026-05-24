const News = require("../models/newsModel");

exports.searchNews = async (req, res) => {
    try {
        const query = req.query.q?.trim();

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Query is required",
            });
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } },
            ],
        };

        const news = await News.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await News.countDocuments(filter);

        return res.json({
            success: true,
            data: {
                news,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("❌ Search Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to search news",
        });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 10, 100);
        const skip = (page - 1) * limit;
        const category = req.query.category;

        const query = {};
        if (category) {
            query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }

        const news = await News.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await News.countDocuments(query);

        res.json({ success: true, data: { news, totalPages: Math.ceil(total / limit) } });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id).populate('author', 'name email');
        if (!news) return res.status(404).json({ success: false, message: 'News not found' });

        res.json({ success: true, data: news });
    } catch (error) {
        console.error('Error getNewsById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        const payload = {
            title: req.body.title,
            content: req.body.content,
            excerpt: req.body.excerpt,
            image: req.body.image,
            category: (req.body.category || '').toString().toLowerCase(),
            tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags || []).map
                ? req.body.tags
                : (typeof req.body.tags === 'string' ? req.body.tags.split(',').map(t => t.trim()) : []),
            author: req.user ? req.user._id : undefined,
        };

        const news = new News(payload);
        const created = await news.save();
        res.status(201).json({ success: true, data: created });
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ success: false, message: 'News not found' });

        const updates = { ...req.body };
        if (updates.category) updates.category = updates.category.toString().toLowerCase();
        if (updates.tags && typeof updates.tags === 'string') {
            updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
        }

        Object.assign(news, updates);
        const updated = await news.save();
        res.json({ success: true, data: updated });
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ success: false, message: 'News not found' });

        await news.deleteOne();
        res.json({ success: true, message: 'News deleted' });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getNewsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 10, 100);
        const skip = (page - 1) * limit;

        const query = { category: { $regex: new RegExp(`^${category}$`, 'i') } };

        const news = await News.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await News.countDocuments(query);
        res.status(200).json({
            success: true,
            data: { news: Array.isArray(news) ? news : [], totalPages: Math.ceil(total / limit) || 0 },
        });
    } catch (error) {
        console.error('❌ Error fetching category news:', error);
        res.status(500).json({ success: false, message: error.message || 'Server Error' });
    }
};

exports.getTrendingNews = async (req, res) => {
    try {
        const limit = Math.min(Number(req.query.limit) || 5, 50);

        const news = await News.find({})
            .sort({ views: -1, createdAt: -1 })
            .limit(limit)
            .select('title category views image createdAt');

        res.status(200).json({ success: true, data: Array.isArray(news) ? news : [] });
    } catch (error) {
        console.error('Error fetching trending news:', error);
        res.status(500).json({ success: false, message: 'Server Error fetching trending news' });
    }
};
exports.incrementNewsView = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found",
            });
        }

        res.status(200).json({
            success: true,
            views: news.views,
        });
    } catch (error) {
        console.error("❌ Error incrementing views:", error);
        res.status(500).json({
            success: false,
            message: "Failed to increment views",
        });
    }
};
