import { api } from "./index.js";


/**
 * Apply for promotion
 * @param {Object|FormData} data
 * @param {number} data.current_rank - Rank ID
 * @param {number} data.proposed_rank - Rank ID
 * @param {number} data.session - Optional session ID
 * @param {number} data.semester - Optional semester ID
 * @param {number} data.department - Optional department ID
 * @param {number} data.unit - Optional unit ID
 * @param {string} data.reason - Optional reason
 * @param {string} data.academic_contribution - Optional contribution
 * @param {File[]} data.documents - Optional files (multipart only)
 * @param {string[]} data.document_names - Optional document names
 */
export const applyForPromotion = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/hrms/apply_for_promotion/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my promotion history (paginated)
 * @param {Object} params
 * @param {number} params.page - Page number
 */
export const getMyPromotionHistory = (params = {}) => {
    return api.get('/hrms/my_promotion_history/', { params });
};

/**
 * Get my promotion statistics
 */
export const getMyPromotionStats = () => {
    return api.get('/hrms/my_promotion_stats/');
};