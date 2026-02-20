import { api } from "./index.js";

/**
 * Apply for leave
 * @param {Object|FormData} data
 * @param {string} data.leave_type - ANNUAL, SICK, STUDY, etc.
 * @param {string} data.start_date - YYYY-MM-DD
 * @param {string} data.end_date - YYYY-MM-DD
 * @param {string} data.phone_during_leave - Phone number
 * @param {string} data.reason - Optional reason
 * @param {File[]} data.documents - Optional files (multipart only)
 */
export const applyForLeave = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/hrms/apply_for_leave/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my leave history (paginated)
 * @param {Object} params
 * @param {number} params.page - Page number
 */
export const getMyLeaveHistory = (params = {}) => {
    return api.get('/hrms/my_leave_history/', { params });
};

/**
 * Get my leave statistics
 */
export const getMyLeaveStats = () => {
    return api.get('/hrms/my_leave_stats/');
};
