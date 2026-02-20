import { api } from "./index.js";
/**
 * Get paginated list of my appraisals
 * @param {Object} params - Filter parameters
 * @param {string} params.status - draft, submitted, reviewed
 * @param {string} params.approval_status - pending, approved, rejected
 * @param {string} params.completed - "true" or "false"
 * @param {number} params.period_id - Filter by appraisal period
 * @param {number} params.page - Page number
 */
export const getMyAppraisals = (params = {}) => {
    return api.get('/hrms/my_appraisals/', { params });
};

/**
 * Get my appraisal statistics
 */
export const getMyAppraisalStats = () => {
    return api.get('/hrms/my_appraisal_stats/');
};

/**
 * Apply for or update appraisal for active period
 * @param {Object|FormData} data - JSON or multipart form data
 * @param {string} data.self_comments - Optional self comments
 * @param {File[]} data.documents - Optional files (multipart only)
 */
export const applyForAppraisal = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/hrms/apply_for_appraisal/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my appraisal detail by ID
 * @param {number} appraisalId
 */
export const getMyAppraisalDetail = (appraisalId) => {
    return api.get(`/hrms/get_my_appraisal_detail/${appraisalId}/`);
};