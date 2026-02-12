import { api } from "./index.js";


/**
 * Get division head statistics
 * @param {number} divisionId - Query param
 */
export const getDivisionHeadStats = (divisionId) => {
    return api.get('/hrms/division_head_stats/', { params: { division_id: divisionId } });
};

/**
 * Get division ongoing appraisals by unit
 * @param {number} divisionId - Query param
 */
export const getDivisionOngoingAppraisals = (divisionId) => {
    return api.get('/hrms/division_head_ongoing_appraisals/', { params: { division_id: divisionId } });
};

/**
 * Get staff in a unit with their appraisals
 * @param {number} unitId
 */
export const getUnitStaff = (unitId) => {
    return api.get(`/hrms/get_unit_staff/${unitId}/`);
};

/**
 * Get promotion statistics for a division
 * @param {number} divisionId
 */
export const getDivisionPromotionStats = (divisionId) => {
    return api.get(`/hrms/division_promotion_stats/${divisionId}/`);
};

/**
 * Get all promotion requests for staff in a division
 * @param {number} divisionId
 */
export const getDivisionStaffPromotionRequests = (divisionId) => {
    return api.get(`/hrms/division_staff_promotion_requests/${divisionId}/`);
};