import React from "react";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    const categories = [
        { value: "all", label: "All News" },
        { value: "politics", label: "Politics" },
        { value: "business", label: "Business" },
        { value: "technology", label: "Technology" },
        { value: "sports", label: "Sports" },
        { value: "entertainment", label: "Entertainment" },
        { value: "health", label: "Health" },
    ];

    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => onCategoryChange(cat.value)}
                        className={`px-6 py-2 rounded-full border transition-all ${selectedCategory === cat.value
                                ? "bg-blue-600 text-white shadow"
                                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
