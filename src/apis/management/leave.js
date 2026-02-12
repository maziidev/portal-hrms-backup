/hrmsimport {api} from "./index.js";


/**
 * Get leave summary statistics
 * Returns: total_staff_applied, active_leaves, pending_leaves, approved_leaves
 */
export const getLeaveStats = () => {
    return api.get('/hrms/leave_stats/');
};

/**
 * Get leave breakdown by type
 */
export const getLeaveTypeStats = () => {
    return api.get('/hrms/leave_type_stats/');
};

/**
 * Get paginated list of leaves with optional filters
 * @param {Object} params - Filter parameters
 * @param {string} params.status - PENDING, APPROVED, REJECTED
 * @param {string} params.leave_type - ANNUAL, SICK, STUDY, etc.
 * @param {boolean} params.is_active - true/false
 * @param {number} params.staff_id - Filter by staff member
 * @param {string} params.start_from - Filter by start_date >= (YYYY-MM-DD)
 * @param {string} params.start_to - Filter by start_date <= (YYYY-MM-DD)
 * @param {string} params.q - Search staff by name/email
 * @param {number} params.page - Page number for pagination
 */
export const getLeaveList = (params = {}) => {
    return api.get('/list_leaves/', { params });
};

/**
 * Get single leave detail by ID
 * @param {number} leaveId
 */
export const getLeaveDetail = (leaveId) => {
    return api.get(`/hrms/leave_detail/${leaveId}/`);
};

/**
 * Review a leave request at its current stage
 * @param {number} leaveId
 * @param {Object} data
 * @param {string} data.decision - APPROVED or REJECTED
 * @param {string} data.comment - Optional review comment
 */
export const reviewLeave = (leaveId, data) => {
    return api.post(`/hrms/review_leave/${leaveId}/`, data);
};


