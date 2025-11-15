// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
};


// News Categories
export const NEWS_CATEGORIES = [
    { value: 'all', label: 'All News', color: 'gray' },
    { value: 'politics', label: 'Politics', color: 'blue' },
    { value: 'business', label: 'Business', color: 'green' },
    { value: 'technology', label: 'Technology', color: 'purple' },
    { value: 'sports', label: 'Sports', color: 'orange' },
    { value: 'entertainment', label: 'Entertainment', color: 'pink' },
    { value: 'health', label: 'Health', color: 'red' },
    { value: 'science', label: 'Science', color: 'indigo' },
    { value: 'world', label: 'World', color: 'teal' },
];

// Category Colors for Tailwind CSS
export const CATEGORY_COLORS = {
    politics: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-300',
        hover: 'hover:bg-blue-200',
    },
    business: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-300',
        hover: 'hover:bg-green-200',
    },
    technology: {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-300',
        hover: 'hover:bg-purple-200',
    },
    sports: {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-300',
        hover: 'hover:bg-orange-200',
    },
    entertainment: {
        bg: 'bg-pink-100',
        text: 'text-pink-700',
        border: 'border-pink-300',
        hover: 'hover:bg-pink-200',
    },
    health: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        hover: 'hover:bg-red-200',
    },
    science: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-700',
        border: 'border-indigo-300',
        hover: 'hover:bg-indigo-200',
    },
    world: {
        bg: 'bg-teal-100',
        text: 'text-teal-700',
        border: 'border-teal-300',
        hover: 'hover:bg-teal-200',
    },
    default: {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-300',
        hover: 'hover:bg-gray-200',
    },
};

// User Roles
export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    EDITOR: 'editor',
};

// User Status
export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
};

// News Status
export const NEWS_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    PENDING: 'pending',
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
    NEWS_PER_PAGE: 12,
    TRENDING_LIMIT: 5,
    RELATED_LIMIT: 4,
};

// Date Formats
export const DATE_FORMATS = {
    FULL: 'MMMM dd, yyyy HH:mm',
    DATE_ONLY: 'MMMM dd, yyyy',
    SHORT: 'MMM dd, yyyy',
    TIME_ONLY: 'HH:mm',
    RELATIVE: 'relative',
};

// Validation Rules
export const VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 30,
        PATTERN: /^[a-zA-Z0-9_-]+$/,
    },
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 128,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_NUMBER: false,
        REQUIRE_SPECIAL: false,
    },
    EMAIL: {
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    NEWS_TITLE: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 200,
    },
    NEWS_CONTENT: {
        MIN_LENGTH: 100,
        MAX_LENGTH: 50000,
    },
    NEWS_EXCERPT: {
        MAX_LENGTH: 300,
    },
    COMMENT: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 1000,
    },
};

// File Upload
export const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
};

// Social Media Links
export const SOCIAL_LINKS = {
    FACEBOOK: 'https://facebook.com/newsportal',
    TWITTER: 'https://twitter.com/newsportal',
    INSTAGRAM: 'https://instagram.com/newsportal',
    YOUTUBE: 'https://youtube.com/newsportal',
    LINKEDIN: 'https://linkedin.com/company/newsportal',
};

// Contact Information
export const CONTACT_INFO = {
    EMAIL: 'contact@newsportal.com',
    PHONE: '+1 (234) 567-890',
    ADDRESS: '123 News Street, Media City, NY 10001',
    SUPPORT_EMAIL: 'support@newsportal.com',
    BUSINESS_EMAIL: 'business@newsportal.com',
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    LOGIN_REQUIRED: 'Please login to continue.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
    FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
    INVALID_FILE_TYPE: 'Invalid file type. Please upload a valid image.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful!',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    REGISTER_SUCCESS: 'Registration successful! Please login.',
    NEWS_CREATED: 'News article created successfully!',
    NEWS_UPDATED: 'News article updated successfully!',
    NEWS_DELETED: 'News article deleted successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    PASSWORD_CHANGED: 'Password changed successfully!',
    COMMENT_ADDED: 'Comment added successfully!',
};

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    THEME: 'theme',
    RECENT_SEARCHES: 'recentSearches',
    BOOKMARKS: 'bookmarks',
    READING_HISTORY: 'readingHistory',
    PREFERENCES: 'preferences',
};

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    NEWS_DETAIL: '/news/:id',
    CATEGORY: '/category/:category',
    SEARCH: '/search',
    PROFILE: '/profile',
    ADMIN: '/admin',
    ADMIN_NEWS: '/admin/news',
    ADMIN_USERS: '/admin/users',
    ADMIN_CREATE_NEWS: '/admin/news/create',
    ADMIN_EDIT_NEWS: '/admin/news/edit/:id',
    ABOUT: '/about',
    CONTACT: '/contact',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    NOT_FOUND: '*',
};

// Breaking News Keywords (for highlighting)
export const BREAKING_NEWS_KEYWORDS = [
    'breaking',
    'urgent',
    'alert',
    'developing',
    'just in',
    'live',
    'update',
];

// Sort Options
export const SORT_OPTIONS = {
    LATEST: 'latest',
    OLDEST: 'oldest',
    MOST_VIEWED: 'most_viewed',
    TRENDING: 'trending',
    RELEVANCE: 'relevance',
};

// Time Ranges for Filters
export const TIME_RANGES = {
    TODAY: 'today',
    THIS_WEEK: 'week',
    THIS_MONTH: 'month',
    THIS_YEAR: 'year',
    ALL_TIME: 'all',
};

// Notification Types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

// Theme Options
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
};

// Language Options
export const LANGUAGES = {
    EN: 'en',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
};

// Admin Sidebar Menu Items
export const ADMIN_MENU = [
    { title: 'Dashboard', path: '/admin', icon: 'FaHome' },
    { title: 'News', path: '/admin/news', icon: 'FaNewspaper' },
    { title: 'Create News', path: '/admin/news/create', icon: 'FaPlus' },
    { title: 'Users', path: '/admin/users', icon: 'FaUsers' },
    { title: 'Analytics', path: '/admin/analytics', icon: 'FaChartBar' },
    { title: 'Settings', path: '/admin/settings', icon: 'FaCog' },
];

// SEO Defaults
export const SEO_DEFAULTS = {
    TITLE: 'NewsPortal - Your Trusted News Source',
    DESCRIPTION: 'Stay updated with the latest news from around the world. Breaking news, politics, business, technology, sports, and more.',
    KEYWORDS: 'news, breaking news, world news, politics, business, technology, sports',
    IMAGE: '/og-image.jpg',
    URL: 'https://newsportal.com',
};

// Analytics Events
export const ANALYTICS_EVENTS = {
    PAGE_VIEW: 'page_view',
    NEWS_VIEW: 'news_view',
    NEWS_SHARE: 'news_share',
    SEARCH: 'search',
    CATEGORY_CLICK: 'category_click',
    USER_REGISTER: 'user_register',
    USER_LOGIN: 'user_login',
};

// Rate Limiting
export const RATE_LIMITS = {
    SEARCH_REQUESTS: 10, // per minute
    API_REQUESTS: 100, // per minute
    UPLOAD_REQUESTS: 5, // per minute
};

// Default Values
export const DEFAULTS = {
    NEWS_IMAGE: 'https://via.placeholder.com/800x600?text=News+Image',
    USER_AVATAR: 'https://via.placeholder.com/150?text=User',
    ITEMS_PER_PAGE: 12,
    DEBOUNCE_DELAY: 300, // milliseconds
    TOAST_DURATION: 3000, // milliseconds
};

export default {
    API_CONFIG,
    NEWS_CATEGORIES,
    CATEGORY_COLORS,
    USER_ROLES,
    USER_STATUS,
    NEWS_STATUS,
    PAGINATION,
    DATE_FORMATS,
    VALIDATION_RULES,
    FILE_UPLOAD,
    SOCIAL_LINKS,
    CONTACT_INFO,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    STORAGE_KEYS,
    ROUTES,
    BREAKING_NEWS_KEYWORDS,
    SORT_OPTIONS,
    TIME_RANGES,
    NOTIFICATION_TYPES,
    THEMES,
    LANGUAGES,
    ADMIN_MENU,
    SEO_DEFAULTS,
    ANALYTICS_EVENTS,
    RATE_LIMITS,
    DEFAULTS,
};