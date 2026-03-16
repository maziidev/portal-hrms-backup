import { api } from "../index.js";

/**
 * ==========================================
 * STAFF MANAGEMENT
 * ==========================================
 */

/**
 * Get all staff with optional filters
 * @param {Object} params - { dept_code, employment_type, search }
 */
export const getAllStaff = (params = {}) => {
    return api.get('/hrms/list_staff/', { params });
};

/**
 * Get high-level staff distribution snapshot (active, probation, etc.)
 */
export const getStaffSummaryStats = () => {
    return api.get('/hrms/staff_summary_stats/');
};

/**
 * Get detailed information for a specific staff member
 * @param {number|string} staffId
 */
export const getStaffById = (staffId) => {
    return api.get(`/hrms/get_staff_by_id/${staffId}/`);
};

/**
 * Fetch full profile of a single staff member (Detailed version)
 * @param {number|string} staffId
 */
export const getDetailedStaffInfo = (staffId) => {
    return api.get(`/hrms/detailed_staff_info/${staffId}/`);
};

/**
 * Get the current logged-in user's staff profile
 */
export const getMyStaffInfo = () => {
    return api.get('/hrms/get_my_staff_info/');
};

/**
 * Add a new staff member using Form Data
 * @param {FormData} staffData
 */
export const addStaff = (staffData) => {
    return api.postForm('/hrms/add_staff/', staffData);
};


/**
 * ==========================================
 * PROMOTIONS
 * ==========================================
 */

/**
 * Get high-level promotion statistics for management
 */
export const getPromotionStats = () => {
    return api.get('/hrms/promotion_stats/');
};

/**
 * Get paginated list of promotions for management
 * @param {Object} params - { status, q, page }
 */
export const getPromotionList = (params = {}) => {
    return api.get('/hrms/list_promotions/', { params });
};

/**
 * Get single promotion detail
 * @param {number} promotionId
 */
export const getPromotionDetail = (promotionId) => {
    return api.get(`/hrms/promotion_detail/${promotionId}/`);
};

/**
 * Review a promotion request (APPROVED, REJECTED, or RETURNED)
 * @param {number} promotionId
 * @param {Object} data - { decision, comment }
 */
export const reviewPromotion = (promotionId, data) => {
    return api.post(`/hrms/review_promotion/${promotionId}/`, data);
};

/**
 * Apply for promotion
 */
export const applyForPromotion = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/hrms/apply_for_promotion/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my personal promotion history
 */
export const getMyPromotionHistory = (params = {}) => {
    return api.get('/hrms/my_promotion_history/', { params });
};

/**
 * Get my personal promotion statistics
 */
export const getMyPromotionStats = () => {
    return api.get('/hrms/my_promotion_stats/');
};


/**
 * ==========================================
 * APPRAISALS
 * ==========================================
 */

/**
 * Get appraisal overview stats for currently active cycle (Management)
 */
export const getAppraisalOverviewStats = () => {
    return api.get('/hrms/appraisals/stats/');
};

/**
 * Get trends for last week, month, and year (Leave & Appraisals)
 */
export const getLeaveAppraisalSummaryStats = () => {
    return api.get('/hrms/leave_appraisal_summary_stats/');
};

/**
 * Get reviewed (completed) appraisals only
 */
export const getCompletedAppraisals = (params = {}) => {
    return api.get('/hrms/completed_appraisals/stats/', { params });
};

/**
 * Get all past appraisal periods that have ended
 */
export const getPastAppraisalPeriods = () => {
    return api.get('/hrms/past_appraisal_periods/');
};

/**
 * Get the currently active appraisal cycle
 */
export const getActiveAppraisalPeriod = () => {
    return api.get('/hrms/active_appraisal_period/');
};

/**
 * Review an appraisal stage (HOD → DEAN → HR → VC)
 */
export const reviewAppraisal = (appraisalId, data) => {
    return api.post(`/hrms/review_appraisal/${appraisalId}/`, data);
};

/**
 * Get paginated list of my appraisals
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
 */
export const applyForAppraisal = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/hrms/apply_for_appraisal/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my appraisal detail by ID
 */
export const getMyAppraisalDetail = (appraisalId) => {
    return api.get(`/hrms/get_my_appraisal_detail/${appraisalId}/`);
};


/**
 * ==========================================
 * LEAVE MANAGEMENT
 * ==========================================
 */

/**
 * Get dashboard overview for leaves (Management)
 */
export const getLeaveSummaryStats = () => {
    return api.get('/hrms/leave_stats/');
};

/**
 * Get count of leaves grouped by leave_type
 */
export const getLeaveTypeStats = () => {
    return api.get('/hrms/leave_type_stats/');
};

/**
 * Get paginated list of leave records for management
 */
export const getLeaveList = (params = {}) => {
    return api.get('/hrms/list_leaves/', { params });
};

/**
 * Retrieve a single leave record detail
 */
export const getLeaveDetail = (leaveId) => {
    return api.get(`/hrms/leave_detail/${leaveId}/`);
};

/**
 * Review a leave request
 */
export const reviewLeave = (leaveId, data) => {
    return api.post(`/hrms/review_leave/${leaveId}/`, data);
};

/**
 * Apply for leave
 */
export const applyForLeave = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/hrms/apply_for_leave/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my personal leave history
 */
export const getMyLeaveHistory = (params = {}) => {
    return api.get('/hrms/my_leave_history/', { params });
};

/**
 * Get my personal leave statistics
 */
export const getMyLeaveStats = () => {
    return api.get('/hrms/my_leave_stats/');
};


/**
 * ==========================================
 * PUBLICATIONS
 * ==========================================
 */

/**
 * Get paginated list of my publications
 */
export const getMyPublications = (params = {}) => {
    return api.get('/hrms/my_publications/', { params });
};

/**
 * Create a new publication
 */
export const createPublication = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/hrms/create_publication/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get publication by ID
 */
export const getPublicationById = (publicationId) => {
    return api.get(`/hrms/publications/${publicationId}/`);
};

/**
 * Update publication (full update)
 */
export const updatePublication = (publicationId, data) => {
    const isFormData = data instanceof FormData;
    return api.put(`/hrms/publications/${publicationId}/`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Update publication (partial update)
 */
export const patchPublication = (publicationId, data) => {
    const isFormData = data instanceof FormData;
    return api.patch(`/hrms/publications/${publicationId}/`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Delete publication
 */
export const deletePublication = (publicationId) => {
    return api.delete(`/hrms/publications/${publicationId}/`);
};

/**
 * Get my personal publication statistics
 */
export const getMyPublicationStats = (params = {}) => {
    return api.get('/hrms/my_publication_stats/', { params });
};