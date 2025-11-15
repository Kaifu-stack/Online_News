import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaClock, FaUser, FaEye, FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useNews } from "../Context/NewsContext";
import { newsService } from "../Service/newsService";
import Loader from "../Common/Loader";

const NewsDetailPage = () => {
    const { id } = useParams();
    const { fetchNewsById } = useNews();

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedNews, setRelatedNews] = useState([]);

    useEffect(() => {
        loadNews();
        newsService.incrementViews(id);
    }, [id]);

    const loadNews = async () => {
        setLoading(true);

        const res = await fetchNewsById(id);

        if (res.success) {
            setNews(res.data);

            if (res.data.category) {
                const r = await newsService.getNewsByCategory(res.data.category, 1, 5);

                if (r.success) {
                    setRelatedNews(
                        r.data.filter((item) => item._id !== id)
                    );
                }
            }
        }

        setLoading(false);
    };

    const getCategoryColor = (category) => {
        const map = {
            politics: "bg-blue-100 text-blue-700",
            business: "bg-green-100 text-green-700",
            technology: "bg-purple-100 text-purple-700",
            sports: "bg-orange-100 text-orange-700",
            entertainment: "bg-pink-100 text-pink-700",
            health: "bg-red-100 text-red-700",
        };
        return map[category?.toLowerCase()] || "bg-gray-100 text-gray-700";
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: news.title,
                text: news.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
        }
    };

    if (loading)
        return (
            <div className="min-h-screen pt-20 flex justify-center">
                <Loader />
            </div>
        );

    if (!news)
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center">
                <h2 className="text-xl font-bold">News Not Found</h2>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4">

                {/* Back */}
                <Link to="/" className="flex items-center gap-2 mb-6 text-gray-600 hover:text-primary-600">
                    <FaArrowLeft />
                    Back to News
                </Link>

                {/* Article */}
                <article className="bg-white rounded-xl shadow overflow-hidden">
                    {news.image && (
                        <div className="relative h-96">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                            <span className={`absolute top-6 left-6 badge ${getCategoryColor(news.category)}`}>
                                {news.category}
                            </span>
                        </div>
                    )}

                    <div className="p-8">
                        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>

                        <div className="flex flex-wrap gap-6 text-gray-600 pb-6 border-b">
                            <span className="flex items-center gap-2">
                                <FaUser /> {news.author?.name || "Anonymous"}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaClock /> {format(new Date(news.createdAt), "MMMM dd, yyyy")}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaEye /> {news.views || 0} views
                            </span>
                            <button onClick={handleShare} className="ml-auto flex items-center gap-2 text-primary-600">
                                <FaShareAlt /> Share
                            </button>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed pt-6 whitespace-pre-line">
                            {news.content}
                        </p>

                        {news.tags?.length > 0 && (
                            <div className="mt-6 pt-6 border-t flex flex-wrap gap-2">
                                {news.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </article>

                {/* Related Articles */}
                {relatedNews.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedNews.map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/news/${item._id}`}
                                    className="bg-white rounded-xl shadow hover:-translate-y-1 transition duration-300"
                                >
                                    <div className="flex">
                                        {item.image && (
                                            <img src={item.image} className="w-32 h-32 object-cover" />
                                        )}
                                        <div className="p-4">
                                            <h3 className="font-bold line-clamp-2">{item.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {format(new Date(item.createdAt), "MMM dd, yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsDetailPage;
