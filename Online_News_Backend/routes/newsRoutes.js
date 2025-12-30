const express = require("express");
const router = express.Router();

const {
    getAllNews,
    getTrendingNews,
    getNewsByCategory,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
    searchNews,
    incrementNewsView
} = require("../controllers/newsController");

router.get("/search", searchNews);

router.get("/trending", getTrendingNews);

router.get("/category/:category", getNewsByCategory);

router.get("/", getAllNews);
router.post("/:id/increment-views", incrementNewsView);

router.get("/:id", getNewsById);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

router.post("/", createNews);

module.exports = router;
