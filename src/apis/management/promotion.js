import { api } from "./index.js";


/**
 * Get promotion summary statistics
 * Returns: total_staff_applied, pending_promotions, rejected_promotions, approved_promotions
 */
export const getPromotionStats = () => {
    return api.get('/promotion_stats/');
};

/**
 * Get paginated list of promotions with optional filters
 * @param {Object} params - Filter parameters
 * @param {string} params.status - DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED
 * @param {string} params.q - Search staff by name/email
 * @param {number} params.page - Page number for pagination
 */
export const getPromotionList = (params = {}) => {
    return api.get('/list_promotions/', { params });
};

/**
 * Get single promotion detail by ID
 * @param {number} promotionId
 */
export const getPromotionDetail = (promotionId) => {
    return api.get(`/hrms/promotion_detail/${promotionId}/`);
};

/**
 * Review a promotion request at its current stage
 * @param {number} promotionId
 * @param {Object} data
 * @param {string} data.decision - APPROVED, REJECTED, or RETURNED
 * @param {string} data.comment - Optional review comment
 */
export const reviewPromotion = (promotionId, data) => {
    return api.post(`/hrms/review_promotion/${promotionId}/`, data);
};

