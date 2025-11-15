import { useContext } from 'react';
import { NewsContext } from '../Context/NewsContext';

/**
 * Custom hook to use the News context safely
 */
const useNews = () => {
    const context = useContext(NewsContext);

    if (!context) {
        throw new Error('❌ useNews must be used within a <NewsProvider>');
    }

    return context;
};

export default useNews;
