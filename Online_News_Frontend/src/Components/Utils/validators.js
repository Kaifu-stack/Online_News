import { VALIDATION_RULES } from './constants';

export const validateEmail = (email) => {
    if (!email) {
        return { valid: false, error: 'Email is required' };
    }

    if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
        return { valid: false, error: 'Invalid email format' };
    }

    return { valid: true, error: null };
};

export const validatePassword = (password) => {
    if (!password) {
        return { valid: false, error: 'Password is required' };
    }

    if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
        return {
            valid: false,
            error: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
        };
    }

    if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
        return {
            valid: false,
            error: `Password must be less than ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters`,
        };
    }

    if (VALIDATION_RULES.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one uppercase letter' };
    }

    if (VALIDATION_RULES.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one lowercase letter' };
    }

    if (VALIDATION_RULES.PASSWORD.REQUIRE_NUMBER && !/\d/.test(password)) {
        return { valid: false, error: 'Password must contain at least one number' };
    }

    if (VALIDATION_RULES.PASSWORD.REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one special character' };
    }

    return { valid: true, error: null };
};

/**
 * Validate password match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validatePasswordMatch = (password, confirmPassword) => {
    if (!confirmPassword) {
        return { valid: false, error: 'Please confirm your password' };
    }

    if (password !== confirmPassword) {
        return { valid: false, error: 'Passwords do not match' };
    }

    return { valid: true, error: null };
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateUsername = (username) => {
    if (!username) {
        return { valid: false, error: 'Username is required' };
    }

    if (username.length < VALIDATION_RULES.USERNAME.MIN_LENGTH) {
        return {
            valid: false,
            error: `Username must be at least ${VALIDATION_RULES.USERNAME.MIN_LENGTH} characters`,
        };
    }

    if (username.length > VALIDATION_RULES.USERNAME.MAX_LENGTH) {
        return {
            valid: false,
            error: `Username must be less than ${VALIDATION_RULES.USERNAME.MAX_LENGTH} characters`,
        };
    }

    if (!VALIDATION_RULES.USERNAME.PATTERN.test(username)) {
        return {
            valid: false,
            error: 'Username can only contain letters, numbers, underscores, and hyphens',
        };
    }

    return { valid: true, error: null };
};

/**
 * Validate news title
 * @param {string} title - Title to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateNewsTitle = (title) => {
    if (!title) {
        return { valid: false, error: 'Title is required' };
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length < VALIDATION_RULES.NEWS_TITLE.MIN_LENGTH) {
        return {
            valid: false,
            error: `Title must be at least ${VALIDATION_RULES.NEWS_TITLE.MIN_LENGTH} characters`,
        };
    }

    if (trimmedTitle.length > VALIDATION_RULES.NEWS_TITLE.MAX_LENGTH) {
        return {
            valid: false,
            error: `Title must be less than ${VALIDATION_RULES.NEWS_TITLE.MAX_LENGTH} characters`,
        };
    }

    return { valid: true, error: null };
};

/**
 * Validate news content
 * @param {string} content - Content to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateNewsContent = (content) => {
    if (!content) {
        return { valid: false, error: 'Content is required' };
    }

    const trimmedContent = content.trim();

    if (trimmedContent.length < VALIDATION_RULES.NEWS_CONTENT.MIN_LENGTH) {
        return {
            valid: false,
            error: `Content must be at least ${VALIDATION_RULES.NEWS_CONTENT.MIN_LENGTH} characters`,
        };
    }

    if (trimmedContent.length > VALIDATION_RULES.NEWS_CONTENT.MAX_LENGTH) {
        return {
            valid: false,
            error: `Content must be less than ${VALIDATION_RULES.NEWS_CONTENT.MAX_LENGTH} characters`,
        };
    }

    return { valid: true, error: null };
};

/**
 * Validate news excerpt
 * @param {string} excerpt - Excerpt to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateNewsExcerpt = (excerpt) => {
    if (!excerpt) {
        return { valid: true, error: null }; // Excerpt is optional
    }

    if (excerpt.length > VALIDATION_RULES.NEWS_EXCERPT.MAX_LENGTH) {
        return {
            valid: false,
            error: `Excerpt must be less than ${VALIDATION_RULES.NEWS_EXCERPT.MAX_LENGTH} characters`,
        };
    }

    return { valid: true, error: null };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateUrl = (url) => {
    if (!url) {
        return { valid: true, error: null }; // URL might be optional
    }

    try {
        new URL(url);
        return { valid: true, error: null };
    } catch {
        return { valid: false, error: 'Invalid URL format' };
    }
};

/**
 * Validate category
 * @param {string} category - Category to validate
 * @param {Array} validCategories - List of valid categories
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateCategory = (category, validCategories = []) => {
    if (!category) {
        return { valid: false, error: 'Category is required' };
    }

    if (validCategories.length > 0 && !validCategories.includes(category.toLowerCase())) {
        return { valid: false, error: 'Invalid category' };
    }

    return { valid: true, error: null };
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateRequired = (value, fieldName = 'This field') => {
    if (value === null || value === undefined || value === '') {
        return { valid: false, error: `${fieldName} is required` };
    }

    if (typeof value === 'string' && value.trim() === '') {
        return { valid: false, error: `${fieldName} is required` };
    }

    return { valid: true, error: null };
};

/**
 * Validate string length
 * @param {string} value - Value to validate
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateLength = (value, min, max, fieldName = 'This field') => {
    if (!value) {
        return { valid: false, error: `${fieldName} is required` };
    }

    const length = value.length;

    if (min && length < min) {
        return { valid: false, error: `${fieldName} must be at least ${min} characters` };
    }

    if (max && length > max) {
        return { valid: false, error: `${fieldName} must be less than ${max} characters` };
    }

    return { valid: true, error: null };
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateRange = (value, min, max, fieldName = 'This field') => {
    if (value === null || value === undefined) {
        return { valid: false, error: `${fieldName} is required` };
    }

    const numValue = Number(value);

    if (isNaN(numValue)) {
        return { valid: false, error: `${fieldName} must be a number` };
    }

    if (min !== null && numValue < min) {
        return { valid: false, error: `${fieldName} must be at least ${min}` };
    }

    if (max !== null && numValue > max) {
        return { valid: false, error: `${fieldName} must be at most ${max}` };
    }

    return { valid: true, error: null };
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validatePhone = (phone) => {
    if (!phone) {
        return { valid: false, error: 'Phone number is required' };
    }

    // Basic phone validation (allows various formats)
    const phonePattern = /^[\d\s\-\+\(\)]+$/;

    if (!phonePattern.test(phone)) {
        return { valid: false, error: 'Invalid phone number format' };
    }

    // Check length (between 10-15 digits)
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        return { valid: false, error: 'Phone number must be between 10-15 digits' };
    }

    return { valid: true, error: null };
};

/**
 * Validate date
 * @param {string|Date} date - Date to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateDate = (date) => {
    if (!date) {
        return { valid: false, error: 'Date is required' };
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
        return { valid: false, error: 'Invalid date format' };
    }

    return { valid: true, error: null };
};

/**
 * Validate array
 * @param {Array} array - Array to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateArray = (array, minLength = 0, maxLength = null, fieldName = 'This field') => {
    if (!Array.isArray(array)) {
        return { valid: false, error: `${fieldName} must be an array` };
    }

    if (minLength && array.length < minLength) {
        return { valid: false, error: `${fieldName} must have at least ${minLength} items` };
    }

    if (maxLength && array.length > maxLength) {
        return { valid: false, error: `${fieldName} must have at most ${maxLength} items` };
    }

    return { valid: true, error: null };
};

/**
 * Validate comment
 * @param {string} comment - Comment to validate
 * @returns {object} Validation result {valid: boolean, error: string}
 */
export const validateComment = (comment) => {
    if (!comment) {
        return { valid: false, error: 'Comment is required' };
    }

    const trimmedComment = comment.trim();

    if (trimmedComment.length < VALIDATION_RULES.COMMENT.MIN_LENGTH) {
        return {
            valid: false,
            error: `Comment must be at least ${VALIDATION_RULES.COMMENT.MIN_LENGTH} character`,
        };
    }

    if (trimmedComment.length > VALIDATION_RULES.COMMENT.MAX_LENGTH) {
        return {
            valid: false,
            error: `Comment must be less than ${VALIDATION_RULES.COMMENT.MAX_LENGTH} characters`,
        };
    }

    return { valid: true, error: null };
};

/**
 * Validate form data
 * @param {object} data - Form data
 * @param {object} rules - Validation rules
 * @returns {object} Validation result {valid: boolean, errors: object}
 */
export const validateForm = (data, rules) => {
    const errors = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
        const rule = rules[field];
        const value = data[field];

        if (rule.required) {
            const result = validateRequired(value, rule.label || field);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
                return;
            }
        }

        if (rule.type === 'email') {
            const result = validateEmail(value);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.type === 'password') {
            const result = validatePassword(value);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.type === 'url') {
            const result = validateUrl(value);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.minLength || rule.maxLength) {
            const result = validateLength(
                value,
                rule.minLength,
                rule.maxLength,
                rule.label || field
            );
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.min !== undefined || rule.max !== undefined) {
            const result = validateRange(value, rule.min, rule.max, rule.label || field);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.pattern) {
            if (!rule.pattern.test(value)) {
                errors[field] = rule.message || 'Invalid format';
                isValid = false;
            }
        }

        if (rule.custom) {
            const result = rule.custom(value, data);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }
    });

    return { valid: isValid, errors };
};

/**
 * Sanitize input (remove dangerous characters)
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
    if (!input) return '';

    return input
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim();
};

/**
 * Check if string contains profanity (basic check)
 * @param {string} text - Text to check
 * @returns {boolean} Contains profanity
 */
export const containsProfanity = (text) => {
    if (!text) return false;

    // Add your profanity list here
    const profanityList = ['badword1', 'badword2']; // Example list
    const lowerText = text.toLowerCase();

    return profanityList.some(word => lowerText.includes(word));
};

export default {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateUsername,
    validateNewsTitle,
    validateNewsContent,
    validateNewsExcerpt,
    validateUrl,
    validateCategory,
    validateRequired,
    validateLength,
    validateRange,
    validatePhone,
    validateDate,
    validateArray,
    validateComment,
    validateForm,
    sanitizeInput,
    containsProfanity,
};