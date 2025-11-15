// models/newsModel.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        excerpt: { type: String },
        image: { type: String },
        // store category in lowercase and restrict to allowed values
        category: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['politics', 'business', 'technology', 'sports', 'entertainment', 'health'],
        },
        tags: [{ type: String }],
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);
