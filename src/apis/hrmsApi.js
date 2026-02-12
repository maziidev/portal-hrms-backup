import {api} from "./index.js"


// =============================================================================
// SESSION & SEMESTER API
// =============================================================================

/**
 * List semesters (optionally filtered by session)
 * @param {number|null} sessionId - Optional session ID to filter by
 */
export const getSemesters = (sessionId = null) => {
    const params = sessionId ? { session_id: sessionId } : {};
    return api.get('/semester_list_create/', { params });
};

/**
 * Create a new semester
 * @param {number} sessionId - Session ID the semester belongs to
 * @param {string} name - Semester name (e.g., "first", "second")
 */
export const createSemester = (sessionId, name) => {
    return api.post(`/semester_list_create/?session_id=${sessionId}`, { name });
};

/**
 * Get a specific semester by ID
 * @param {number} semesterId
 */
export const getSemesterById = (semesterId) => {
    return api.get(`/semesters/${semesterId}/`);
};

/**
 * Update a semester
 * @param {number} semesterId
 * @param {number} sessionId - New session ID
 * @param {string} name - New semester name
 */
export const updateSemester = (semesterId, sessionId, name) => {
    return api.put(`/semesters/${semesterId}/?session_id=${sessionId}`, { name });
};

/**
 * Delete a semester
 * @param {number} semesterId
 */
export const deleteSemester = (semesterId) => {
    return api.delete(`/semesters/${semesterId}/`);
};

/**
 * Set a session as active
 * @param {number} sessionId
 */
export const setActiveSession = (sessionId) => {
    return api.post(`/set_active_session/${sessionId}/`);
};

/**
 * Set a semester as active
 * @param {number} semesterId
 */
export const setActiveSemester = (semesterId) => {
    return api.post(`/set_active_semester/${semesterId}/`);
};

/**
 * Get the currently active session and semester
 */
export const getActiveSessionSemester = () => {
    return api.get('/get_active_session_semester/');
};

// =============================================================================
// DASHBOARD STATISTICS API
// =============================================================================

/**
 * Get appraisal overview statistics for dashboard
 * Returns: active cycle info, in-progress count, pending count
 */
export const getAppraisalStats = () => {
    return api.get('/appraisals/stats/');
};

/**
 * Get leave and appraisal activity trends (last week, month, year)
 */
export const getLeaveAppraisalSummaryStats = () => {
    return api.get('/leave_appraisal_summary_stats/');
};

/**
 * Get staff summary statistics
 * Returns: active_staff, on_probation, on_study_leave, retired_staff
 */
export const getStaffSummaryStats = () => {
    return api.get('/staff_summary_stats/');
};

/**
 * Get detailed information for a single staff member
 * @param {number} staffId
 */
export const getDetailedStaffInfo = (staffId) => {
    return api.get(`/detailed_staff_info/${staffId}/`);
};

/**
 * Get completed appraisals (reviewed status only)
 * @param {Object} params - Optional filters
 * @param {number} params.period_id - Filter by appraisal period
 * @param {number} params.staff_id - Filter by staff member
 */
export const getCompletedAppraisals = (params = {}) => {
    return api.get('/completed_appraisals/stats/', { params });
};

/**
 * Get past (ended) appraisal periods
 */
export const getPastAppraisalPeriods = () => {
    return api.get('/past_appraisal_periods/');
};

/**
 * Get the currently active appraisal period
 */
export const getActiveAppraisalPeriod = () => {
    return api.get('/active_appraisal_period/');
};

// =============================================================================
// LEAVE MANAGEMENT API
// =============================================================================

/**
 * Get leave summary statistics
 * Returns: total_staff_applied, active_leaves, pending_leaves, approved_leaves
 */
export const getLeaveStats = () => {
    return api.get('/leave_stats/');
};

/**
 * Get leave breakdown by type
 */
export const getLeaveTypeStats = () => {
    return api.get('/leave_type_stats/');
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
    return api.get(`/leave_detail/${leaveId}/`);
};

// =============================================================================
// PROMOTION MANAGEMENT API
// =============================================================================

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
    return api.get(`/promotion_detail/${promotionId}/`);
};

// =============================================================================
// DEAN DEPARTMENT API
// =============================================================================

/**
 * Get department overview for a faculty (Dean view)
 * Returns all active departments with summary stats
 * @param {number} facultyId
 */
export const getDeanDepartmentOverview = (facultyId) => {
    return api.get(`/dean_department_overview/${facultyId}/`);
};

/**
 * Get aggregated faculty statistics (Dean view)
 * @param {number} facultyId
 */
export const getDeanFacultyStats = (facultyId) => {
    return api.get(`/dean_faculty_stats/${facultyId}/`);
};

/**
 * Get detailed department information
 * @param {number} departmentId
 */
export const getDepartmentInfo = (departmentId) => {
    return api.get(`/get_department_info/${departmentId}/`);
};

/**
 * Get all staff in a department
 * @param {number} departmentId
 * @param {Object} params - Optional filters
 * @param {string} params.fullname - Filter by name (case-insensitive)
 */
export const getDepartmentStaff = (departmentId, params = {}) => {
    return api.get(`/get_department_staff/${departmentId}/`, { params });
};

/**
 * Get all appraisals for staff in a department
 * @param {number} departmentId
 */
export const getDepartmentAppraisals = (departmentId) => {
    return api.get(`/get_department_appraisals/${departmentId}/`);
};

/**
 * Get all promotions for staff in a department
 * @param {number} departmentId
 */
export const getDepartmentPromotions = (departmentId) => {
    return api.get(`/get_department_promotions/${departmentId}/`);
};

/**
 * Get all leaves for staff in a department
 * @param {number} departmentId
 */
export const getDepartmentLeaves = (departmentId) => {
    return api.get(`/get_department_leaves/${departmentId}/`);
};

/**
 * Get staff statistics for a department
 * @param {number} departmentId
 */
export const getStaffStatsPerDepartment = (departmentId) => {
    return api.get(`/get_staff_stats_per_department/${departmentId}/`);
};

// =============================================================================
// REVIEW / WORKFLOW API (HOD, DEAN, HR, VC)
// =============================================================================

/**
 * Review an appraisal at its current stage
 * Stage flow: HOD → DEAN → HR → VC
 * @param {number} appraisalId
 * @param {Object} data
 * @param {string} data.decision - APPROVED or REJECTED
 * @param {string} data.comment - Optional review comment
 */
export const reviewAppraisal = (appraisalId, data) => {
    return api.post(`/review_appraisal/${appraisalId}/`, data);
};

/**
 * Review a leave request at its current stage
 * @param {number} leaveId
 * @param {Object} data
 * @param {string} data.decision - APPROVED or REJECTED
 * @param {string} data.comment - Optional review comment
 */
export const reviewLeave = (leaveId, data) => {
    return api.post(`/review_leave/${leaveId}/`, data);
};

/**
 * Review a promotion request at its current stage
 * @param {number} promotionId
 * @param {Object} data
 * @param {string} data.decision - APPROVED, REJECTED, or RETURNED
 * @param {string} data.comment - Optional review comment
 */
export const reviewPromotion = (promotionId, data) => {
    return api.post(`/review_promotion/${promotionId}/`, data);
};

// =============================================================================
// MY APPRAISALS API (Staff personal appraisals)
// =============================================================================

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
    return api.get('/my_appraisals/', { params });
};

/**
 * Get my appraisal statistics
 */
export const getMyAppraisalStats = () => {
    return api.get('/my_appraisal_stats/');
};

/**
 * Apply for or update appraisal for active period
 * @param {Object|FormData} data - JSON or multipart form data
 * @param {string} data.self_comments - Optional self comments
 * @param {File[]} data.documents - Optional files (multipart only)
 */
export const applyForAppraisal = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/apply_for_appraisal/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my appraisal detail by ID
 * @param {number} appraisalId
 */
export const getMyAppraisalDetail = (appraisalId) => {
    return api.get(`/get_my_appraisal_detail/${appraisalId}/`);
};

// =============================================================================
// MY PUBLICATIONS API (Staff personal publications)
// =============================================================================

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
    return api.post('/create_publication/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get publication by ID
 * @param {number} publicationId
 */
export const getPublicationById = (publicationId) => {
    return api.get(`/publications/${publicationId}/`);
};

/**
 * Update publication (full update)
 * @param {number} publicationId
 * @param {Object|FormData} data
 */
export const updatePublication = (publicationId, data) => {
    const isFormData = data instanceof FormData;
    return api.put(`/publications/${publicationId}/`, data, {
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
    return api.patch(`/publications/${publicationId}/`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Delete publication
 * @param {number} publicationId
 */
export const deletePublication = (publicationId) => {
    return api.delete(`/publications/${publicationId}/`);
};

/**
 * Get my publication statistics
 * @param {Object} params - Optional date filters
 * @param {string} params.date_from - YYYY-MM-DD
 * @param {string} params.date_to - YYYY-MM-DD
 */
export const getMyPublicationStats = (params = {}) => {
    return api.get('/my_publication_stats/', { params });
};

// =============================================================================
// MY LEAVES API (Staff personal leave applications)
// =============================================================================

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
    return api.post('/apply_for_leave/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my leave history (paginated)
 * @param {Object} params
 * @param {number} params.page - Page number
 */
export const getMyLeaveHistory = (params = {}) => {
    return api.get('/my_leave_history/', { params });
};

/**
 * Get my leave statistics
 */
export const getMyLeaveStats = () => {
    return api.get('/my_leave_stats/');
};

// =============================================================================
// MY PROMOTIONS API (Staff personal promotion requests)
// =============================================================================

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
    return api.post('/apply_for_promotion/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

/**
 * Get my promotion history (paginated)
 * @param {Object} params
 * @param {number} params.page - Page number
 */
export const getMyPromotionHistory = (params = {}) => {
    return api.get('/my_promotion_history/', { params });
};

/**
 * Get my promotion statistics
 */
export const getMyPromotionStats = () => {
    return api.get('/my_promotion_stats/');
};

// =============================================================================
// HEAD OF DIVISION API (Division/Unit management)
// =============================================================================

/**
 * Get division head statistics
 * @param {number} divisionId - Query param
 */
export const getDivisionHeadStats = (divisionId) => {
    return api.get('/division_head_stats/', { params: { division_id: divisionId } });
};

/**
 * Get division ongoing appraisals by unit
 * @param {number} divisionId - Query param
 */
export const getDivisionOngoingAppraisals = (divisionId) => {
    return api.get('/division_head_ongoing_appraisals/', { params: { division_id: divisionId } });
};

/**
 * Get staff in a unit with their appraisals
 * @param {number} unitId
 */
export const getUnitStaff = (unitId) => {
    return api.get(`/get_unit_staff/${unitId}/`);
};

/**
 * Get promotion statistics for a division
 * @param {number} divisionId
 */
export const getDivisionPromotionStats = (divisionId) => {
    return api.get(`/division_promotion_stats/${divisionId}/`);
};

/**
 * Get all promotion requests for staff in a division
 * @param {number} divisionId
 */
export const getDivisionStaffPromotionRequests = (divisionId) => {
    return api.get(`/division_staff_promotion_requests/${divisionId}/`);
};

// =============================================================================
// VC (VICE CHANCELLOR) API
// =============================================================================

/**
 * Get appraisal completion rate by faculty
 * @param {Object} params
 * @param {number} params.period_id - Optional appraisal period ID
 */
export const getAppraisalCompletionRateByFaculty = (params = {}) => {
    return api.get('/appraisal_completion_rate_by_faculty/', { params });
};

/**
 * Get VC dashboard statistics
 */
export const getVCDashboardStats = () => {
    return api.get('/vc_dashboard_stats/');
};

/**
 * Get VC department records for a faculty
 * @param {number} facultyId
 */
export const getVCDepartmentRecords = (facultyId) => {
    return api.get(`/vc_department_records/${facultyId}/`);
};

/**
 * Get promotion statistics for all faculties
 */
export const getFacultiesPromotionStats = () => {
    return api.get('/get_faculties_promotion_stats/');
};

/**
 * Get leave statistics for all faculties
 */
export const getFacultiesLeaveStats = () => {
    return api.get('/get_faculties_leave_stats/');
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
    return api.get('/publication_stats/', { params });
};

/**
 * Get publication summary per department
 */
export const getDepartmentPublications = () => {
    return api.get('/department_publications/');
};

// =============================================================================
// EXPORT ALL
// =============================================================================

export default {
    // Session & Semester
    getSemesters,
    createSemester,
    getSemesterById,
    updateSemester,
    deleteSemester,
    setActiveSession,
    setActiveSemester,
    getActiveSessionSemester,

    // Dashboard Statistics
    getAppraisalStats,
    getLeaveAppraisalSummaryStats,
    getStaffSummaryStats,
    getDetailedStaffInfo,
    getCompletedAppraisals,
    getPastAppraisalPeriods,
    getActiveAppraisalPeriod,

    // Leave Management
    getLeaveStats,
    getLeaveTypeStats,
    getLeaveList,
    getLeaveDetail,

    // Promotion Management
    getPromotionStats,
    getPromotionList,
    getPromotionDetail,

    // Dean Department
    getDeanDepartmentOverview,
    getDeanFacultyStats,
    getDepartmentInfo,
    getDepartmentStaff,
    getDepartmentAppraisals,
    getDepartmentPromotions,
    getDepartmentLeaves,
    getStaffStatsPerDepartment,

    // Review/Workflow
    reviewAppraisal,
    reviewLeave,
    reviewPromotion,

    // My Appraisals
    getMyAppraisals,
    getMyAppraisalStats,
    applyForAppraisal,
    getMyAppraisalDetail,

    // My Publications
    getMyPublications,
    createPublication,
    getPublicationById,
    updatePublication,
    patchPublication,
    deletePublication,
    getMyPublicationStats,

    // My Leaves
    applyForLeave,
    getMyLeaveHistory,
    getMyLeaveStats,

    // My Promotions
    applyForPromotion,
    getMyPromotionHistory,
    getMyPromotionStats,

    // Head of Division
    getDivisionHeadStats,
    getDivisionOngoingAppraisals,
    getUnitStaff,
    getDivisionPromotionStats,
    getDivisionStaffPromotionRequests,

    // VC
    getAppraisalCompletionRateByFaculty,
    getVCDashboardStats,
    getVCDepartmentRecords,
    getFacultiesPromotionStats,
    getFacultiesLeaveStats,
    getPublicationStats,
    getDepartmentPublications,
};