import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsService } from "../Service/newsService";

const CategoryPage = () => {
    const { category } = useParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCategoryNews = async () => {
        setLoading(true);

        const res = await newsService.getNewsByCategory(category);

        if (res.success && res.data?.news) {
            setNews(res.data.news);
        } else {
            setNews([]);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadCategoryNews();
    }, [category]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 capitalize">{category} News</h1>

            {loading ? (
                <p>Loading...</p>
            ) : news.length === 0 ? (
                <p>No news found for this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <div key={item._id} className="bg-white shadow rounded p-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h2 className="mt-2 font-bold">{item.title}</h2>
                            <p className="text-gray-600 text-sm line-clamp-2">{item.excerpt}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
