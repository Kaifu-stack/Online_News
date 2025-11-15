// routes/newsRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
    getTrendingNews,
    getNewsByCategory,
} = require('../controllers/newsController');

const router = express.Router();

router.get('/trending', getTrendingNews);
router.get('/category/:category', getNewsByCategory);

router.route('/')
    .get(getAllNews)
    .post(protect, createNews);

router.route('/:id')
    .get(getNewsById)
    .put(protect, updateNews)
    .delete(protect, deleteNews);

module.exports = router;
