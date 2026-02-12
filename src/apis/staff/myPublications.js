import { api } from "./index.js";


/**
 * Get paginated list of my publications
 * @param {Object} params - Filter parameters
 * @param {string} params.approved - "true" or "false"
 * @param {string} params.type - Publication type (case-insensitive)
 * @param {string} params.q - Search title, publisher, author, keywords
 * @param {string} params.date_from - YYYY-MM-DD
 * @param {string} params.date_to - YYYY-MM-DD
 * @param {number} params.page - Page number
 */
export const getMyPublications = (params = {}) => {
    return api.get('/my_publications/', { params });
};

/**
 * Create a new publication
 * @param {Object|FormData} data - JSON or multipart form data
 */
export const createPublication = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/hrms/create_publication/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get publication by ID
 * @param {number} publicationId
 */
export const getPublicationById = (publicationId) => {
    return api.get(`/hrms/publications/${publicationId}/`);
};

/**
 * Update publication (full update)
 * @param {number} publicationId
 * @param {Object|FormData} data
 */
export const updatePublication = (publicationId, data) => {
    const isFormData = data instanceof FormData;
    return api.put(`/hrms/publications/${publicationId}/`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Update publication (partial update)
 * @param {number} publicationId
 * @param {Object|FormData} data
 */
export const patchPublication = (publicationId, data) => {
    const isFormData = data instanceof FormData;
    return api.patch(`/hrms/publications/${publicationId}/`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Delete publication
 * @param {number} publicationId
 */
export const deletePublication = (publicationId) => {
    return api.delete(`/hrms/publications/${publicationId}/`);
};

/**
 * Get my publication statistics
 * @param {Object} params - Optional date filters
 * @param {string} params.date_from - YYYY-MM-DD
 * @param {string} params.date_to - YYYY-MM-DD
 */
export const getMyPublicationStats = (params = {}) => {
    return api.get('/hrms/my_publication_stats/', { params });
};