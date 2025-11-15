import { format, formatDistanceToNow, parseISO, isToday, isYesterday } from 'date-fns';
import { CATEGORY_COLORS, FILE_UPLOAD, DEFAULTS } from './constants';

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string (optional)
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
    if (!date) return '';
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return format(dateObj, formatStr);
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
    if (!date) return '';
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;

        if (isToday(dateObj)) {
            return `Today at ${format(dateObj, 'HH:mm')}`;
        }

        if (isYesterday(dateObj)) {
            return `Yesterday at ${format(dateObj, 'HH:mm')}`;
        }

        return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (error) {
        console.error('Error getting relative time:', error);
        return '';
    }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Get category colors for Tailwind CSS
 * @param {string} category - Category name
 * @returns {object} Color classes object
 */
export const getCategoryColors = (category) => {
    const normalized = String(category || "").trim().toLowerCase();
    return CATEGORY_COLORS[normalized] || CATEGORY_COLORS.default;
};

/**
 * Format number with commas (e.g., 1000 -> 1,000)
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format large numbers (e.g., 1000 -> 1K, 1000000 -> 1M)
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatLargeNumber = (num) => {
    if (!num && num !== 0) return '0';

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

/**
 * Generate excerpt from content
 * @param {string} content - Full content
 * @param {number} maxLength - Maximum length
 * @returns {string} Excerpt
 */
export const generateExcerpt = (content, maxLength = 150) => {
    if (!content) return '';

    // Remove HTML tags if present
    const strippedContent = content.replace(/<[^>]*>/g, '');

    // Get first sentence or truncate to max length
    const firstSentence = strippedContent.split(/[.!?]/)[0];
    if (firstSentence.length <= maxLength) {
        return firstSentence + '.';
    }

    return truncateText(strippedContent, maxLength);
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateImageFile = (file) => {
    if (!file) {
        return { valid: false, error: 'No file provided' };
    }

    // Check file size
    if (file.size > FILE_UPLOAD.MAX_SIZE) {
        return {
            valid: false,
            error: `File size must be less than ${FILE_UPLOAD.MAX_SIZE / (1024 * 1024)}MB`,
        };
    }

    // Check file type
    if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Only images are allowed.',
        };
    }

    return { valid: true, error: null };
};

/**
 * Convert file to base64
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

/**
 * Get reading time estimate
 * @param {string} content - Article content
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 * @returns {string} Reading time (e.g., "5 min read")
 */
export const getReadingTime = (content, wordsPerMinute = 200) => {
    if (!content) return '0 min read';

    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return `${minutes} min read`;
};

/**
 * Highlight search terms in text
 * @param {string} text - Text to highlight
 * @param {string} query - Search query
 * @returns {string} HTML string with highlighted terms
 */
export const highlightText = (text, query) => {
    if (!text || !query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 font-semibold">$1</mark>');
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
};

/**
 * Generate slug from title
 * @param {string} title - Title to slugify
 * @returns {string} URL-friendly slug
 */
export const generateSlug = (title) => {
    if (!title) return '';

    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with single
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Parse query string
 * @param {string} queryString - Query string
 * @returns {object} Parsed query parameters
 */
export const parseQueryString = (queryString) => {
    if (!queryString) return {};

    const params = new URLSearchParams(queryString);
    const result = {};

    for (const [key, value] of params) {
        result[key] = value;
    }

    return result;
};

/**
 * Build query string from object
 * @param {object} params - Parameters object
 * @returns {string} Query string
 */
export const buildQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return '';

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            searchParams.append(key, value);
        }
    });

    return searchParams.toString();
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = DEFAULTS.DEBOUNCE_DELAY) => {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 1000) => {
    let inThrottle;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Get image URL or default
 * @param {string} imageUrl - Image URL
 * @param {string} defaultUrl - Default URL
 * @returns {string} Valid image URL
 */
export const getImageUrl = (imageUrl, defaultUrl = DEFAULTS.NEWS_IMAGE) => {
    if (!imageUrl) return defaultUrl;

    try {
        // Full URL → OK
        new URL(imageUrl);
        return imageUrl;
    } catch {
        // If backend returns relative URLs → fix automatically
        if (imageUrl.startsWith("/")) {
            return `${API_CONFIG.BASE_URL}${imageUrl}`;
        }
        return defaultUrl;
    }
};


/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Capitalize each word
 * @param {string} str - String to capitalize
 * @returns {string} Title case string
 */
export const toTitleCase = (str) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Remove HTML tags from string
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
export const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
};

/**
 * Check if user is logged in
 * @returns {boolean} Login status
 */
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

/**
 * Get user from localStorage
 * @returns {object|null} User object
 */
export const getStoredUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Error parsing stored user:', error);
        return null;
    }
};

/**
 * Check if user is admin
 * @returns {boolean} Admin status
 */
export const isAdmin = () => {
    const user = getStoredUser();
    return user?.role === 'admin';
};

/**
 * Generate random ID
 * @param {number} length - ID length
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Sort array by date
 * @param {Array} array - Array to sort
 * @param {string} dateField - Date field name
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export const sortByDate = (array, dateField = 'createdAt', order = 'desc') => {
    return [...array].sort((a, b) => {
        const dateA = new Date(a[dateField]);
        const dateB = new Date(b[dateField]);
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
};

/**
 * Group array by field
 * @param {Array} array - Array to group
 * @param {string} field - Field to group by
 * @returns {object} Grouped object
 */
export const groupBy = (array, field) => {
    return array.reduce((acc, item) => {
        const key = item[field];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};

/**
 * Calculate percentage
 * @param {number} value - Value
 * @param {number} total - Total
 * @param {number} decimals - Decimal places
 * @returns {number} Percentage
 */
export const calculatePercentage = (value, total, decimals = 1) => {
    if (!total || total === 0) return 0;
    return parseFloat(((value / total) * 100).toFixed(decimals));
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Valid status
 */
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Get social share URLs
 * @param {string} url - URL to share
 * @param {string} title - Title to share
 * @returns {object} Social share URLs
 */
export const getSocialShareUrls = (url, title) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };
};

/**
 * Scroll to top smoothly
 */
export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} In viewport status
 */
export const isInViewport = (element) => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

export default {
    formatDate,
    getRelativeTime,
    truncateText,
    getCategoryColors,
    formatNumber,
    formatLargeNumber,
    generateExcerpt,
    validateImageFile,
    fileToBase64,
    getReadingTime,
    highlightText,
    copyToClipboard,
    generateSlug,
    parseQueryString,
    buildQueryString,
    debounce,
    throttle,
    getImageUrl,
    capitalizeFirst,
    toTitleCase,
    stripHtml,
    isLoggedIn,
    getStoredUser,
    isAdmin,
    generateId,
    sortByDate,
    groupBy,
    calculatePercentage,
    isValidUrl,
    getSocialShareUrls,
    scrollToTop,
    isInViewport,
};