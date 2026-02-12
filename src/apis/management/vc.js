import { api } from "./index.js";


/**
 * Get appraisal completion rate by faculty
 * @param {Object} params
 * @param {number} params.period_id - Optional appraisal period ID
 */
export const getAppraisalCompletionRateByFaculty = (params = {}) => {
    return api.get('/hrms/appraisal_completion_rate_by_faculty/', { params });
};

/**
 * Get VC dashboard statistics
 */
export const getVCDashboardStats = () => {
    return api.get('/hrms/vc_dashboard_stats/');
};

/**
 * Get VC department records for a faculty
 * @param {number} facultyId
 */
export const getVCDepartmentRecords = (facultyId) => {
    return api.get(`/hrms/vc_department_records/${facultyId}/`);
};

/**
 * Get promotion statistics for all faculties
 */
export const getFacultiesPromotionStats = () => {
    return api.get('/hrms/get_faculties_promotion_stats/');
};

/**
 * Get leave statistics for all faculties
 */
export const getFacultiesLeaveStats = () => {
    return api.get('/hrms/get_faculties_leave_stats/');
};

/**
 * Get publication statistics
 * @param {Object} params - Optional filters
 * @param {number} params.staff_id - Filter by staff
 * @param {string} params.type - Publication type
 * @param {string} params.date_from - YYYY-MM-DD
 * @param {string} params.date_to - YYYY-MM-DD
 */
export const getPublicationStats = (params = {}) => {
    return api.get('/hrms/publication_stats/', { params });
};

/**
 * Get publication summary per department
 */
export const getDepartmentPublications = () => {
    return api.get('/hrms/department_publications/');
};