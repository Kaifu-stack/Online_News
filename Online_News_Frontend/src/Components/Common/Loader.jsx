import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin-slow"></div>

                {/* Inner ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin-fast"></div>
                </div>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Accessible loading text (hidden visually, visible to screen readers) */}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;
